---
layout: default
title: SGM Provenance
---

Memory must not be anonymous text. Provenance is the who/what/when/where
metadata that lets a consumer judge whether a record is trustworthy, current,
and relevant. It is **mandatory on every record** — this is a core requirement,
not an optional capability.

## Why provenance is core

AI-generated memory is uniquely easy to misuse. An agent retrieving a record
must be able to tell:

- **who or what created it** — a human decision vs. an automated guess,
- **when** — is this current or months stale,
- **where it originated** — which tool, which session,
- **whether it was modified** — has it been edited since creation,
- **what it relates to** — its scope and links.

Without provenance, an agent cannot distinguish a fact from a stale status from
a superseded decision, and will eventually act on the wrong one. So SGM makes
provenance a required part of the memory record.

## Required provenance fields

Every memory record's `provenance` object MUST carry:

| Field | Type | Meaning |
|---|---|---|
| `agent` | string | Identity of the creator (human, tool, or automated agent) |
| `created_at` | string (RFC 3339) | When the record was created |
| `origin` | string | Where it came from (e.g. `cli`, `mcp`, `http`, `import`) |
| `scope` | object | The scope the record belongs to (see [scopes.md](scopes.md)) |

## Optional provenance fields

| Field | Type | Meaning |
|---|---|---|
| `session` | string | The tool session that created it |
| `modified` | boolean | Whether the record was edited after creation |
| `modified_at` | string (RFC 3339) | Last modification time |
| `modified_by` | string | Who last modified it |
| `links` | string[] | Related record IDs (see [memory.md](memory.md)) |
| `source` | string | Upstream source, if imported |

## Semantics

- `created_at` is immutable once set.
- If `modified` is `true`, `modified_at` and `modified_by` SHOULD be present.
- `scope` in provenance MUST match the record's top-level `scope`.
- Provenance MUST round-trip losslessly through store → retrieve. A consumer
  reading a record gets the exact provenance it was written with.

## Interoperability requirement

Two independent implementations MUST agree on:

1. the required provenance fields and their meaning,
2. that provenance is preserved unmodified across retrieval, and
3. that an unknown provenance field is preserved, not dropped.

They need NOT agree on how provenance is stored or indexed.

## Example

```json
"provenance": {
  "agent": "build-agent",
  "session": "20261010-104120",
  "origin": "cli",
  "scope": { "project": "myproject" },
  "created_at": "2026-10-10T18:21:47Z",
  "modified": true,
  "modified_at": "2026-10-10T19:30:00Z",
  "modified_by": "build-agent",
  "source": "session-handoff"
}
```
