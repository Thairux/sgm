/**
 * SGM Reference Implementation
 * ----------------------------
 * Executable documentation for the SGM specification. This is NOT the
 * protocol — spec/ is authoritative. This exists to demonstrate the spec,
 * serve as a conformance target, and provide example records.
 *
 * Deliberately minimal: in-memory store, no external dependencies. A real
 * implementation would persist, index, and rank; this one just proves the
 * observable contract.
 */

export type RecordType =
  | "fact" | "note" | "decision" | "rule"
  | "status" | "task" | "handoff" | "annotation";

export interface Scope {
  user?: string;
  organization?: string;
  workspace?: string;
  project?: string;
  session?: string;
  task?: string;
}

export interface Annotation {
  kind: string;
  value: string | number | boolean | object | unknown[] | null;
}

export interface Sensitivity {
  level?: "public" | "internal" | "confidential" | "restricted";
  contains_secrets?: boolean;
  pii?: boolean;
}

export interface Reference {
  kind: string;
  hash: string;
  encoding?: string;
  bytes?: number;
}

export interface Provenance {
  agent: string;
  session?: string;
  origin: string;
  scope: Scope;
  created_at: string;
  modified?: boolean;
  modified_at?: string;
  modified_by?: string;
  source?: string;
}

export interface MemoryRecord {
  id: string;
  type: RecordType | string;
  title?: string;
  content?: string;
  reference?: Reference;
  scope: Scope;
  tags?: string[];
  links?: string[];
  annotations?: Annotation[];
  sensitivity?: Sensitivity;
  created_at: string;
  updated_at?: string;
  version?: number;
  schema_version: string;
  provenance: Provenance;
  metadata?: Record<string, unknown>;
}

export interface Query {
  scope: Scope;
  text?: string;
  ids?: string[];
  types?: string[];
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface ResultSet {
  records: MemoryRecord[];
  total: number;
  limit: number;
  offset: number;
  truncated: boolean;
}

export interface Context {
  id: string;
  scope: Scope;
  records: MemoryRecord[];
  assembled_at: string;
  provenance: { agent: string; session?: string };
  summary?: string;
}

export interface CapabilityInfo {
  protocol_version: string;
  implementation: string;
  implementation_version: string;
  capabilities: string[];
  transports?: string[];
  limits?: { max_records_per_retrieve?: number; max_content_bytes?: number };
}

export type ErrorCode =
  | "invalid_record" | "not_found" | "scope_denied" | "conflict"
  | "capability_unsupported" | "version_mismatch" | "rate_limited" | "internal";

export class SgmError extends Error {
  code: ErrorCode;
  details?: unknown;
  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export const PROTOCOL_VERSION = "0.1.0";
const SCOPE_LEVELS = ["user", "organization", "workspace", "project", "session", "task"] as const;

/** Does scope `outer` contain scope `inner`? (containment check) */
export function scopeContains(outer: Scope, inner: Scope): boolean {
  return SCOPE_LEVELS.every((lvl) => {
    const o = outer[lvl];
    const i = inner[lvl];
    if (o === undefined) return true;       // outer doesn't constrain this level
    if (i === undefined) return false;      // outer constrains, inner doesn't
    return o === i;
  });
}

/** Stable string key for a scope, for indexing. */
export function scopeKey(scope: Scope): string {
  return SCOPE_LEVELS.map((l) => `${l}=${scope[l] ?? ""}`).join("|");
}

/**
 * A minimal, in-memory SGM implementation.
 * Demonstrates the observable contract: store, retrieve, read, discover.
 */
export class SgmStore {
  private records = new Map<string, MemoryRecord[]>();
  readonly capabilities: string[];

  constructor(capabilities: string[] = ["core"]) {
    this.capabilities = capabilities;
  }

  /** Capability discovery (spec/capabilities.md). */
  discover(): CapabilityInfo {
    return {
      protocol_version: PROTOCOL_VERSION,
      implementation: "sgm-reference",
      implementation_version: "0.1.0",
      capabilities: this.capabilities.includes("core") ? this.capabilities : ["core", ...this.capabilities],
      limits: { max_records_per_retrieve: 1000 },
    };
  }

  /** Validate required fields; throw invalid_record otherwise (spec/errors.md). */
  private validate(rec: MemoryRecord): void {
    if (!rec.id || typeof rec.id !== "string") {
      throw new SgmError("invalid_record", "record.id is required");
    }
    if (!rec.type || typeof rec.type !== "string") {
      throw new SgmError("invalid_record", "record.type is required");
    }
    if (!rec.scope || Object.keys(rec.scope).length === 0) {
      throw new SgmError("invalid_record", "record.scope is required");
    }
    if (!rec.provenance || !rec.provenance.agent) {
      throw new SgmError("invalid_record", "record.provenance.agent is required");
    }
    if (!rec.created_at) {
      throw new SgmError("invalid_record", "record.created_at is required");
    }
  }

  /** Store (create or update) a record (spec/memory.md). */
  store(rec: MemoryRecord): MemoryRecord {
    this.validate(rec);
    const key = scopeKey(rec.scope);
    const bucket = this.records.get(key) ?? [];
    const idx = bucket.findIndex((r) => r.id === rec.id);

    const now = new Date().toISOString();
    let stored: MemoryRecord;
    if (idx >= 0) {
      const prev = bucket[idx];
      stored = {
        ...rec,
        version: (prev.version ?? 1) + 1,
        updated_at: now,
        provenance: {
          ...rec.provenance,
          created_at: prev.provenance.created_at, // immutable
          modified: true,
          modified_at: now,
          modified_by: rec.provenance.agent,
        },
      };
      bucket[idx] = stored;
    } else {
      stored = { ...rec, version: rec.version ?? 1, updated_at: rec.updated_at ?? now };
      bucket.push(stored);
    }
    this.records.set(key, bucket);
    return stored;
  }

  /** Read a record by identity within a scope (spec/retrieval.md). */
  read(id: string, scope: Scope): MemoryRecord {
    const rec = (this.records.get(scopeKey(scope)) ?? []).find((r) => r.id === id);
    if (!rec) {
      throw new SgmError("not_found", `No record '${id}' in scope ${scopeKey(scope)}`, { id, scope });
    }
    return rec;
  }

  /** Retrieve records matching a query, enforcing scope isolation (spec/scopes.md). */
  retrieve(query: Query): ResultSet {
    const limit = query.limit ?? 50;
    const offset = query.offset ?? 0;

    // Collect records from scopes contained within the query scope.
    let matched: MemoryRecord[] = [];
    for (const [key, bucket] of this.records) {
      // Reconstruct a probe scope: only keep levels the query constrains.
      const probe: Scope = {};
      for (const lvl of SCOPE_LEVELS) if (query.scope[lvl] !== undefined) probe[lvl] = query.scope[lvl];
      // A bucket belongs to this query only if the query scope contains it.
      // Rebuild the bucket's scope from the key.
      const bucketScope: Scope = {};
      for (const part of key.split("|")) {
        const [k, v] = part.split("=");
        if (v) (bucketScope as Record<string, string>)[k] = v;
      }
      if (!scopeContains(probe, bucketScope)) continue;
      matched = matched.concat(bucket);
    }

    if (query.ids) matched = matched.filter((r) => query.ids!.includes(r.id));
    if (query.types) matched = matched.filter((r) => query.types!.includes(r.type));
    if (query.tags) matched = matched.filter((r) => query.tags!.some((t) => (r.tags ?? []).includes(t)));
    if (query.text) {
      const q = query.text.toLowerCase();
      matched = matched.filter((r) =>
        (r.content ?? "").toLowerCase().includes(q) ||
        (r.title ?? "").toLowerCase().includes(q)
      );
    }

    const total = matched.length;
    const page = matched.slice(offset, offset + limit);
    return { records: page, total, limit, offset, truncated: offset + page.length < total };
  }

  /** Assemble a context from a query (spec/context.md). */
  assembleContext(query: Query, agent: string, session?: string): Context {
    const rs = this.retrieve(query);
    return {
      id: `ctx_${Math.random().toString(36).slice(2, 10)}`,
      scope: query.scope,
      records: rs.records,
      assembled_at: new Date().toISOString(),
      provenance: { agent, session },
    };
  }

  /** Attempted cross-scope retrieval without authorization (spec/errors.md). */
  retrieveCrossScope(query: Query, _token: string | null): ResultSet {
    if (!_token) {
      throw new SgmError("scope_denied", "Cross-scope retrieval requires authorization", {
        requested_scope: query.scope,
      });
    }
    return this.retrieve(query);
  }
}
