# Security Conformance Suite

Tests the isolation and provenance-integrity guarantees from
[spec/scopes.md](../spec/scopes.md), [spec/provenance.md](../spec/provenance.md),
and [spec/security.md](../spec/security.md). Requires the **core** capability.

---

## S1. Sibling project isolation

**Given:** a record in scope `{project: "alpha"}`
**When:** retrieval runs in scope `{project: "beta"}`
**Then:** the alpha record is NOT returned.

## S2. Cross-user isolation

**Given:** a record in scope `{user: "alice", project: "p"}`
**When:** retrieval runs in scope `{user: "bob", project: "p"}`
**Then:** alice's record is NOT returned.

## S3. Unauthorized cross-scope returns scope_denied

**Given:** a record in scope `{project: "alpha"}`
**When:** an explicit cross-scope retrieval for `{project: "beta"}` is attempted
without authorization
**Then:** the error `scope_denied` is returned — NOT a silent empty result.

## S4. Provenance is immutable on retrieval

**Given:** a record with `provenance.created_at = T0`
**When:** the record is updated (content change) then retrieved
**Then:** `provenance.created_at` is still `T0`; `modified` is true and
`modified_at` is set.

## S5. Provenance not forgeable by the caller

**Given:** a store request whose body claims `provenance.agent = "someone-else"`
**When:** the implementation stores it
**Then:** the stored provenance reflects the actual authenticated caller, not the
claimed value (or the claim is rejected). *(Mechanism is implementation-specific;
the boundary must exist.)*

## S6. Sensitivity metadata round-trips

**Given:** a record with `sensitivity: {level: "confidential", pii: true}`
**When:** stored then retrieved
**Then:** the `sensitivity` object is returned intact.

## S7. Secret flag is surfaced

**Given:** a record with `sensitivity.contains_secrets = true`
**When:** retrieved or exported
**Then:** the flag is preserved so a consumer can exclude it.

## S8. Scope is present on every record

**Given:** any stored record
**When:** retrieved
**Then:** a non-empty `scope` object is present.

## S9. Capability discovery reports protocol version

**Given:** a fresh implementation
**When:** discovery is invoked
**Then:** `protocol_version` is present and parseable (repeated from core C9 to
assert the security-relevant negotiation surface).
