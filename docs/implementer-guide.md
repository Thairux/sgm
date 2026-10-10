# SGM Implementer Guide

You are building an SGM implementation in your own language, against your own
storage. This guide is the contract you must satisfy to interoperate with any
other SGM implementation.

## The independence principle

You should be able to implement SGM **from the specification and schemas alone**,
without reading the reference implementation's source. If you find yourself
needing the reference code to understand a behavior, the spec is unclear — please
file an issue.

## Step 1 — Implement the Core

Every conforming implementation MUST support (see [spec/capabilities.md](../spec/capabilities.md)):

1. **Store** — create/update memory records ([memory.md](../spec/memory.md)).
2. **Retrieve** — recall by query/scope ([retrieval.md](../spec/retrieval.md)).
3. **Read** — return a record by identity.
4. **Identity** — carry session + agent identity in provenance
   ([provenance.md](../spec/provenance.md)).
5. **Scope** — enforce the scope model with isolation ([scopes.md](../spec/scopes.md)).
6. **Discovery** — advertise capabilities + protocol version.

## Step 2 — Conform to the schemas

Every protocol object MUST validate against its [JSON Schema](../schemas/):

- `memory.schema.json` — the record
- `context.schema.json` — the assembled context
- `annotation.schema.json` — annotations
- `handoff.schema.json` — handoff records
- `capability.schema.json` — discovery response

The schemas are normative for structure; the spec is normative for semantics.
Satisfy both.

## Step 3 — Enforce the guarantees

The non-negotiables:

- **Scope isolation.** No cross-scope leakage by default; unauthorized
  cross-scope returns `scope_denied`, never a silent empty result.
- **Provenance integrity.** `created_at` is immutable; provenance round-trips
  losslessly.
- **Lossless round-trip.** `metadata` and unknown `type`/`kind` values are
  preserved, never dropped or coerced.
- **Error codes.** Branch on `code`, never on `message` text
  ([errors.md](../spec/errors.md)).

## Step 4 — Add optional capabilities

Pick the profiles you support and **advertise them**:

- **Collaboration** — decisions, rules, status, tasks, handoffs.
- **Code Intelligence** — symbols, references, diffs.
- **History** — versions, snapshots, restoration.
- **Transport** — MCP/HTTP/CLI bindings.

A consumer MUST NOT assume an unadvertised capability. Degrade gracefully.

## Step 5 — Pass conformance

Run the [conformance suite](../conformance/) against your implementation. Passing
`core` makes you an SGM implementation; passing an optional profile makes you
conformant for it. The suite tests observable behavior only — it never pokes at
your internals.

## Step 6 — Expose a transport

Map the five core operations onto your preferred transport (see
[transports/](../transports/)). Reuse the schemas verbatim; keep the error codes;
expose discovery first.

## What you are free to choose

SGM standardizes the contract, not the technology. You choose:

- storage engine (SQLite, Postgres, files, object store, in-memory),
- language and framework,
- retrieval/ranking algorithm,
- embedding model (or none),
- transport(s),
- auth mechanism (as long as a boundary is enforced).

## The over-standardization test

Before adding a behavior to your implementation and calling it "SGM", ask:
*would two independent implementations need to agree on this to interoperate?*
If not, it's your implementation's business, not the protocol's
([architecture.md](../spec/architecture.md#over-standardization-guard)).
