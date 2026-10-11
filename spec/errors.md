---
layout: default
title: SGM Errors
---

SGM defines a small, transport-independent error model. The same error codes
apply whether the operation arrived over MCP, HTTP, or CLI — the binding maps
them to its native mechanism but MUST NOT invent new semantics.

## Error object

Every failed operation returns an error with this shape:

```json
{
  "error": {
    "code": "not_found",
    "message": "No record with id 'dec-x' in scope {project: myproject}",
    "details": { "id": "rec-x", "scope": { "project": "myproject" } }
  }
}
```

| Field | Required | Meaning |
|---|---|---|
| `code` | yes | One of the standard codes below |
| `message` | yes | Human-readable description |
| `details` | no | Structured context (the offending id/scope/field) |

## Standard error codes

| Code | HTTP analog | Meaning |
|---|---|---|
| `invalid_record` | 400 | The record violates a schema or fails validation |
| `not_found` | 404 | No record matches the requested identity in scope |
| `scope_denied` | 403 | The requested cross-scope access is not permitted |
| `conflict` | 409 | A write conflicts with an existing record (e.g. version mismatch) |
| `capability_unsupported` | 501 | The operation needs a capability the peer doesn't advertise |
| `version_mismatch` | 400 | Protocol/schema versions are incompatible |
| `rate_limited` | 429 | The implementation is throttling the caller |
| `internal` | 500 | Unexpected implementation failure |

## Semantics

- `code` is **normative**; `message` is informative and MAY vary.
- `not_found` is **not** an error in the "something broke" sense — it is a valid
  answer meaning "no such record." A consumer MUST handle it gracefully.
- An empty retrieval result is **not** an error (see [retrieval.md](retrieval.md)).
- `capability_unsupported` is the graceful-degradation signal: the consumer
  SHOULD fall back to a core capability rather than crash.
- `scope_denied` MUST be returned (never silently return empty) when a
  cross-scope retrieval is attempted without authorization — a silent empty
  result would hide a real isolation boundary (see [scopes.md](scopes.md)).

## Interoperability requirement

Two implementations MUST agree on the `code` values and their meanings. They
need NOT agree on `message` wording or HTTP status mapping. A consumer MUST
branch on `code`, never on `message` text.

## Example

```json
{
  "error": {
    "code": "scope_denied",
    "message": "Cross-project retrieval not permitted without authorization",
    "details": { "requested_scope": { "project": "other" } }
  }
}
```
