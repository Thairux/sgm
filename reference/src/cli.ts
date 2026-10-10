#!/usr/bin/env node
/**
 * SGM Reference CLI — executable documentation.
 *
 * Demonstrates the observable SGM contract and runs the conformance checks
 * against this in-memory implementation. Not a production tool.
 *
 *   sgm store <id> --type fact --scope project=demo --content "..."
 *   sgm retrieve --scope project=demo --text "..."
 *   sgm conformance
 */
import { SgmStore, SgmError, type MemoryRecord } from "./store.ts";

const store = new SgmStore(["core", "collaboration", "history", "transport"]);

function parseScope(s?: string) {
  const scope: Record<string, string> = {};
  if (s) for (const kv of s.split(",")) { const [k, v] = kv.split("="); if (k) scope[k.trim()] = (v ?? "").trim(); }
  return scope;
}

const [, , cmd, ...rest] = process.argv;

function flag(name: string): string | undefined {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
}

switch (cmd) {
  case "store": {
    const id = rest[0];
    const rec: MemoryRecord = {
      id,
      type: flag("type") ?? "note",
      title: flag("title"),
      content: flag("content"),
      scope: parseScope(flag("scope")),
      tags: flag("tags")?.split(","),
      created_at: new Date().toISOString(),
      schema_version: "0.1.0",
      provenance: {
        agent: flag("agent") ?? "cli",
        origin: "cli",
        scope: parseScope(flag("scope")),
        created_at: new Date().toISOString(),
      },
    };
    console.log(JSON.stringify(store.store(rec), null, 2));
    break;
  }
  case "retrieve": {
    const rs = store.retrieve({
      scope: parseScope(flag("scope")),
      text: flag("text"),
      types: flag("types")?.split(","),
      limit: flag("limit") ? Number(flag("limit")) : undefined,
    });
    console.log(JSON.stringify(rs, null, 2));
    break;
  }
  case "discover": {
    console.log(JSON.stringify(store.discover(), null, 2));
    break;
  }
  case "conformance": {
    runConformance();
    break;
  }
  default:
    console.log("sgm <store|retrieve|discover|conformance> [...options]");
}

/** A compact behavioral check of the core contract. */
function runConformance() {
  const s = new SgmStore(["core"]);
  const scope = { project: "conf" };
  const base = {
    id: "c1", type: "fact" as const, content: "hello", scope,
    created_at: new Date().toISOString(), schema_version: "0.1.0",
    provenance: { agent: "test", origin: "cli", scope, created_at: new Date().toISOString() },
  };
  const results: Array<[string, boolean]> = [];
  const check = (name: string, cond: boolean) => results.push([name, cond]);

  // C1 store & recall by identity
  s.store(base);
  const got = s.retrieve({ scope, ids: ["c1"] });
  check("C1 store/recall by identity", got.records.length === 1 && got.records[0].content === "hello");

  // C2 idempotent
  s.store(base);
  check("C2 idempotent store", s.retrieve({ scope, ids: ["c1"] }).records.length === 1);

  // C4 unknown type preserved
  s.store({ ...base, id: "c4", type: "future-type", metadata: { x: 1 } });
  const c4 = s.read("c4", scope);
  check("C4 unknown type preserved", c4.type === "future-type" && (c4.metadata as any)?.x === 1);

  // C5 sibling isolation
  s.store({ ...base, id: "alpha", scope: { project: "alpha" } });
  check("C5 sibling isolation", s.retrieve({ scope: { project: "beta" } }).records.length === 0);

  // C8 discovery reports core
  check("C8 discovery reports core", s.discover().capabilities.includes("core"));

  // C10 empty retrieval not an error
  check("C10 empty retrieval", s.retrieve({ scope, text: "zzz-nomatch" }).total === 0);

  // S3 scope_denied on cross-scope
  let denied = false;
  try { s.retrieveCrossScope({ scope: { project: "other" } }, null); }
  catch (e) { denied = e instanceof SgmError && e.code === "scope_denied"; }
  check("S3 scope_denied", denied);

  let pass = 0;
  for (const [name, ok] of results) {
    console.log(`${ok ? "✓" : "✗"} ${name}`);
    if (ok) pass++;
  }
  console.log(`\n${pass}/${results.length} passed`);
  process.exit(pass === results.length ? 0 : 1);
}
