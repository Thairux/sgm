---
layout: default
title: Core Conformance Suite
permalink: /conformance/core/
---

Tests the mandatory SGM Core capabilities: **Store, Retrieve, Read, Identity,
Scope, Discovery**. Every conforming implementation MUST pass all of these.

Each test is Given/When/Then over public operations only.

---

## C1. Store and recall by identity

**Given:** a valid memory record with `id="c1"` in scope `{project: "conf"}`
**When:** the implementation stores it, then retrieves with `{ids:["c1"], scope}`
**Then:** the record is returned with identical `content`, `type`, and `id`.

## C2. Store is idempotent by identity

**Given:** a record `id="c2"` stored once
**When:** the same `id` is stored again with the same content
**Then:** retrieval returns exactly one record for `id="c2"` (no duplicate).

## C3. Read returns full provenance

**Given:** a stored record with a complete `provenance` object
**When:** the record is read
**Then:** every provenance field (`agent`, `created_at`, `origin`, `scope`) is
returned unmodified.

## C4. Unknown record type is preserved

**Given:** a record with `type="future-type"` (not in the enum) and custom
`metadata`
**When:** stored then retrieved
**Then:** the record returns with `type="future-type"` and `metadata` intact —
not rejected, not coerced.

## C5. Scope isolation (no sibling leakage)

**Given:** a record in scope `{project: "alpha"}`
**When:** retrieval runs in scope `{project: "beta"}`
**Then:** the alpha record is NOT returned.

## C6. Scope isolation (no parent leakage without request)

**Given:** a record in scope `{project: "alpha", session: "s1"}`
**When:** retrieval runs in scope `{project: "alpha"}` without cross-scope request
**Then:** the narrower-scoped record is not assumed accessible by default per the
implementation's declared behavior; if returned, it MUST carry its own scope.

## C7. Identity fields present on provenance

**Given:** any stored record
**When:** it is retrieved
**Then:** `provenance.agent` and `provenance.created_at` are present and
non-empty.

## C8. Capability discovery reports core

**Given:** a fresh implementation
**When:** capability discovery is invoked
**Then:** the response contains `protocol_version`, `implementation`, and a
`capabilities` array that includes `"core"`.

## C9. Protocol version is reported

**Given:** a fresh implementation
**When:** capability discovery is invoked
**Then:** `protocol_version` is a valid version string the consumer can parse.

## C10. Empty retrieval is not an error

**Given:** a query that matches nothing
**When:** retrieval runs
**Then:** the result is an empty `records` array with `total: 0` — NOT an error
object.

## C11. Reference round-trips

**Given:** a record carrying a `reference` object
**When:** stored then retrieved
**Then:** the `reference` object is returned intact (even if the implementation
cannot resolve its content).

## C12. Record schema validation

**Given:** a record missing a required field (e.g. no `scope`)
**When:** the implementation attempts to store it
**Then:** it returns `invalid_record` with a `message`, and does not store it.
