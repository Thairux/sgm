# SGM Memory Model

The memory record is the atomic unit of shared memory in SGM. This document
defines its fields, identity, content model, and lifecycle semantics. The
normative structure is [`memory.schema.json`](../schemas/memory.schema.json).

## Required fields

Every memory record MUST carry:

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Stable, unique record identity within its scope |
| `type` | string enum | `fact`, `note`, `decision`, `rule`, `status`, `task`, `handoff`, `annotation` |
| `scope` | object | The isolation boundary (see [scopes.md](scopes.md)) |
| `created_at` | string (RFC 3339) | Creation timestamp |
| `provenance` | object | Creator + origin (see [provenance.md](provenance.md)) |
| `schema_version` | string | The SGM schema version this record conforms to |

## Optional fields

| Field | Type | Meaning |
|---|---|---|
| `title` | string | Human-readable label |
| `content` | string | Inline content body |
| `reference` | object | Pointer to stored content (see below) |
| `tags` | string[] | Free-form classification labels |
| `links` | string[] | IDs of related records |
| `annotations` | object[] | Structured annotations (see [annotations.md](annotations.md)) |
| `sensitivity` | object | Security/sensitivity metadata (see [security.md](security.md)) |
| `updated_at` | string (RFC 3339) | Last modification time |
| `version` | integer | Record revision counter, starts at 1 |
| `metadata` | object | Implementation-specific extras, MUST round-trip losslessly |

## Identity

- `id` MUST be unique **within its scope**. The same `id` MAY appear in
  different scopes without collision.
- `id` SHOULD be stable for the life of the record. Renaming an `id` is a
  breaking change for anything holding the old reference.
- A fully-qualified reference is `{scope}:{id}`.

## Content and references

A record MAY store content in exactly one of three ways:

1. **Inline** — `content` holds the body directly.
2. **Referenced** — `reference` points to content stored elsewhere:

   ```json
   "reference": {
     "kind": "content-hash",
     "hash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
     "encoding": "utf-8",
     "bytes": 4211
   }
   ```

3. **Both** — inline summary plus a reference to the full body.

An implementation MUST be able to return a referenced record's content on
request (`read`), or MUST clearly signal that it stores references it cannot
itself resolve (see capability `references`).

## Versioning a record

- `version` starts at `1` and increments on every content mutation.
- `updated_at` MUST reflect the last mutation time.
- History (prior versions) is an **optional** capability (`history`); the core
  protocol requires only the current version.

## Unknown types

An implementation that encounters a `type` it does not recognize MUST:

1. store it without loss,
2. return it byte-for-byte on read, and
3. NOT reject or coerce it.

This guarantees forward compatibility as new record types are added.

## Lifecycle semantics

| Operation | Effect |
|---|---|
| store | Create or update a record |
| read | Return a record by identity |
| retrieve | Return a set of records matching a query/scope |
| delete | Remove a record (optional `history`-aware) |

Deletion is **soft by default** if the implementation supports the `history`
capability; otherwise physical. Either way, a deleted record MUST NOT be
returned by `retrieve`.

## Minimal example

```json
{
  "id": "decision-db-choice",
  "type": "decision",
  "title": "Keep the current datastore",
  "scope": { "project": "myproject" },
  "content": "Chose to keep the current datastore and add a scheduled health-check rather than migrate.",
  "tags": ["database", "infra"],
  "created_at": "2026-10-10T18:21:47Z",
  "schema_version": "0.1.0",
  "provenance": {
    "agent": "build-agent",
    "session": "20261010-104120",
    "origin": "cli"
  }
}
```
