---
layout: default
title: SGM Retrieval & References
permalink: /spec/retrieval/
---

Retrieval is how stored memory is recalled and turned into usable context. This
document defines the retrieval contract: what MUST be observable, and what is
left to the implementation.

## The retrieval contract

SGM standardizes **what is returned**, not **how it is ranked**. Storage,
indexing, embedding, and ranking algorithms are implementation concerns. Two
conforming implementations MAY rank the same query differently and both be
correct — as long as both return records satisfying the query's stated filters.

## Retrieve operation

A retrieval takes a **query** and returns a **result set**.

### Query

| Field | Type | Meaning |
|---|---|---|
| `scope` | object | Restrict to a scope (required for isolation — see [scopes.md](scopes.md)) |
| `text` | string | Free-text query (implementation-defined matching) |
| `ids` | string[] | Exact record IDs |
| `types` | string[] | Filter by record type |
| `tags` | string[] | Filter by tag (AND or OR is implementation-defined; MUST be documented) |
| `limit` | integer | Max records to return |
| `offset` | integer | Pagination offset |

At least one of `text`, `ids`, `types`, or `tags` SHOULD be present.

### Result set

```json
{
  "records": [ /* memory records (see memory.md) */ ],
  "total": 42,
  "limit": 10,
  "offset": 0,
  "truncated": false
}
```

- `total` is the count of records matching the query **before** limit/offset.
- `truncated` is `true` if records were omitted due to `limit`.
- Records MUST each carry their full provenance and scope (see
  [provenance.md](provenance.md)).

## Mandatory retrieval guarantees

A conforming implementation MUST guarantee:

1. **Recall by identity.** A record stored under `id` in `scope` is retrievable
   by `{ids:[id], scope}` with the same content it was stored with.
2. **Scope isolation.** Retrieval in scope `S` MUST NOT return records outside
   `S` unless cross-scope retrieval is explicitly requested and permitted (see
   [scopes.md](scopes.md)).
3. **Provenance preservation.** Every returned record carries its provenance
   fields unchanged.
4. **Type fidelity.** A record returns with the same `type` it was stored with.
5. **Lossless round-trip.** `metadata` and unknown `type`s round-trip unchanged
   (see [memory.md](memory.md#unknown-types)).

## Free-text matching

`text` matching is **implementation-defined**. An implementation MAY use:

- substring / keyword match,
- full-text search,
- embedding / vector similarity, or
- any combination.

The only protocol requirement is that a record whose content matches the query
is *eligible* to be returned. Ranking order is not standardized.

## References

Records MAY reference content stored outside the record (see
[memory.md](memory.md#content-and-references)). Two reference behaviors:

- **Resolvable** — the implementation can return the referenced content via
  `read`. Advertised by the `references` capability.
- **Opaque** — the implementation stores and returns the reference object but
  cannot resolve it. Still conforming; the record's identity and metadata are
  fully usable.

A consumer MUST treat an unresolvable reference as valid: the reference object
itself is the shared contract.

## Context assembly

Retrieval produces records; **context** is the assembled, consumable object
handed to another tool. See [context.md](context.md). The mapping from result
set to context is part of retrieval: a conforming implementation MUST be able
to emit a context object containing the retrieved records with their scope and
provenance intact.

## Pagination

- `limit` + `offset` MUST be supported for deterministic paging.
- If `offset` exceeds `total`, an empty `records` array is returned with
  `total` intact — this is not an error.
- `limit` is capped by the implementation; the cap MUST be discoverable via
  capability discovery (see [capabilities.md](capabilities.md)).
