---
layout: default
title: Retrieval Conformance Suite
---

Tests the retrieval and context guarantees from
[spec/retrieval.md](../spec/retrieval.md) and [spec/context.md](../spec/context.md).
Requires the **core** capability.

---

## R1. Pagination is deterministic

**Given:** 25 stored records in one scope
**When:** retrieval runs with `limit=10, offset=0`, then `limit=10, offset=10`
**Then:** the two pages are disjoint and together cover 20 distinct records.

## R2. Total counts before limit

**Given:** 25 stored records
**When:** retrieval runs with `limit=5`
**Then:** `total` is 25 and `truncated` is true.

## R3. Offset beyond total is empty, not an error

**Given:** 5 stored records
**When:** retrieval runs with `offset=100`
**Then:** `records` is empty, `total` is 5, and no error is returned.

## R4. Type filter returns only matching types

**Given:** a mix of `fact` and `decision` records
**When:** retrieval runs with `types:["decision"]`
**Then:** only `decision` records are returned.

## R5. Context assembly carries scope

**Given:** records retrieved from scope `{project: "x"}`
**When:** a context is assembled
**Then:** `context.scope` equals `{project: "x"}`.

## R6. Context assembly carries provenance

**Given:** retrieved records with provenance
**When:** a context is assembled
**Then:** each record in `context.records` retains its provenance, and the
context itself has assembly `provenance.agent`.

## R7. Empty context is valid

**Given:** a query matching nothing
**When:** a context is assembled from it
**Then:** a context with `records: []` is returned — not an error.

## R8. Metadata round-trips through retrieval

**Given:** a record with a custom `metadata` object
**When:** stored then retrieved
**Then:** `metadata` is returned unchanged.

## R9. Tags filter

**Given:** records tagged `infra` and `ui`
**When:** retrieval runs with `tags:["infra"]`
**Then:** only `infra`-tagged records are returned (per the implementation's
documented AND/OR semantics).

## R10. Limit cap is discoverable

**Given:** an implementation with a max retrieve limit
**When:** capability discovery is invoked
**Then:** `limits.max_records_per_retrieve` is reported (or the limit is
unbounded and documented).
