# Security Policy

## Supported versions

SGM is at protocol version **0.1.0 (draft / experimental)**. Only the latest
released version receives security attention.

| Version | Supported |
|---|---|
| 0.1.x | ✅ |

## Reporting a vulnerability

Please report security issues privately rather than in a public issue.

- Open a **private** security advisory on the repository, or
- Contact the maintainer directly.

Include:

- the affected component (spec section, schema, reference code),
- a description of the vulnerability and its impact on interoperability or
  isolation,
- a proof of concept if you have one,
- any suggested remediation.

You will receive an acknowledgment, and we will coordinate a fix and disclosure
timeline with you.

## Security-relevant protocol areas

When reviewing SGM for security, pay particular attention to:

1. **Scope isolation** ([spec/scopes.md](spec/scopes.md)) — cross-scope leakage
   is the highest-severity class of bug. An unauthorized cross-scope retrieval
   MUST return `scope_denied`, never a silent empty result.
2. **Provenance integrity** ([spec/provenance.md](spec/provenance.md)) —
   `created_at` is immutable and provenance MUST NOT be forgeable by the caller.
3. **Sensitivity metadata** ([spec/security.md](spec/security.md)) — records
   flagged `contains_secrets` or `pii` must round-trip that flag so consumers
   can exclude them.
4. **Secret hygiene** — SGM records are not a secret store. Implementations
   SHOULD scan for and flag credential-like content.

## Scope of this policy

This policy covers the SGM protocol specification, schemas, conformance suite,
and reference implementation in this repository. Vulnerabilities in a specific
third-party SGM implementation should be reported to that implementation's
maintainers, though we're happy to help route them.
