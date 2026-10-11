---
layout: default
title: Handoff Conformance Suite
---

Tests the cross-tool handoff guarantees from
[spec/handoffs.md](../spec/handoffs.md). Requires the **collaboration**
capability.

---

## H1. Handoff stores and retrieves

**Given:** a valid `type:"handoff"` record with canonical annotation sections
**When:** stored then retrieved by id
**Then:** the record returns with `type:"handoff"` and all annotations intact.

## H2. Canonical sections round-trip

**Given:** a handoff with `what_i_did`, `next`, `blockers`, `files_touched`,
`open_questions`, `as_of` annotations
**When:** stored then retrieved
**Then:** every annotation's `kind` and `value` is preserved exactly.

## H3. Handoff carries provenance

**Given:** a handoff created by agent "A" in session "S"
**When:** retrieved by another consumer
**Then:** `provenance.agent == "A"` and `provenance.session == "S"`.

## H4. Cross-agent retrieval within scope

**Given:** a handoff stored by agent A in scope `{project: "p"}`
**When:** agent B retrieves handoffs in scope `{project: "p"}`
**Then:** agent B receives agent A's handoff with full provenance.

## H5. Unknown annotation kind is preserved

**Given:** a handoff with a custom annotation `kind:"future_section"`
**When:** stored then retrieved
**Then:** the custom annotation is returned, not dropped.

## H6. Handoff is retrievable by type filter

**Given:** several handoffs among other record types
**When:** retrieval runs with `types:["handoff"]`
**Then:** only handoff records are returned.
