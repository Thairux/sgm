# SGM Context

A **context** is the assembled, consumable object produced from one or more
retrieved memory records. Where a memory record is the stored unit, a context
is the *delivery* unit — what one tool hands to another.

## Structure

```json
{
  "id": "ctx_01HZX...",
  "scope": { "project": "myproject" },
  "records": [ /* memory records */ ],
  "assembled_at": "2026-10-10T19:00:00Z",
  "provenance": { "agent": "build-agent", "session": "..." },
  "summary": "Optional human-readable digest of the included records."
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Context identity |
| `scope` | yes | The scope this context was assembled within |
| `records` | yes | The retrieved memory records |
| `assembled_at` | yes | When the context was built |
| `provenance` | yes | Who assembled it (see [provenance.md](provenance.md)) |
| `summary` | no | Optional digest |

Normative structure: [`context.schema.json`](../schemas/context.schema.json).

## Semantics

- **Records are not copied.** A context references records; it does not become a
  second source of truth. If a record changes, a freshly-assembled context
  reflects the change.
- **Scope is carried.** Every context records the scope it was assembled in, so
  a consumer never has to guess whether cross-scope data leaked in.
- **Provenance is carried.** The context inherits provenance from its records
  and adds its own assembly provenance.
- **Ordering is implementation-defined** unless the query specified an explicit
  ordering.

## What a context is for

A context is the object that crosses the boundary between tools:

```
Agent A ──store──► SGM ──retrieve──► context ──consume──► Agent B
```

Because every context carries its scope and provenance, Agent B can trust
*where the memory came from* without re-deriving it — this is the core
interoperability guarantee SGM provides (see [handoffs.md](handoffs.md) for the
cross-tool case).

## Empty contexts

An assembly that matches no records returns a context with an empty `records`
array — not an error. `records: []` is a valid, meaningful context ("nothing
relevant was found").
