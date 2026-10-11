---
layout: default
title: SGM Security
permalink: /spec/security/
---

SGM defines the *boundaries* an implementation must enforce, while leaving the
*mechanism* implementation-specific. This document covers sensitivity metadata,
authorization boundaries, and licensing.

## Sensitivity metadata

A record MAY carry a `sensitivity` object declaring how it should be handled:

```json
"sensitivity": {
  "level": "confidential",
  "contains_secrets": false,
  "pii": true
}
```

| Field | Type | Meaning |
|---|---|---|
| `level` | enum | `public` \| `internal` \| `confidential` \| `restricted` |
| `contains_secrets` | boolean | Whether the content includes credentials/keys |
| `pii` | boolean | Whether the content includes personal data |

An implementation SHOULD surface `sensitivity` to consumers and MUST round-trip
it losslessly. An implementation that detects `contains_secrets: true` SHOULD
warn on export but MUST NOT silently drop the field.

## Authorization boundaries

The protocol requires that a **boundary exists and is enforced** around every
operation, even though the auth *mechanism* is implementation-specific:

1. Every operation runs within a scope (see [scopes.md](scopes.md)).
2. Cross-scope access MUST be explicitly authorized, never implicit.
3. An unauthorized cross-scope attempt MUST return `scope_denied`, never a
   silent empty result.
4. An implementation with no authentication MUST treat every scope as private to
   its own process — no cross-process/cross-user leakage.

SGM does not mandate OAuth, API keys, mTLS, or any specific scheme. It mandates
that *some* boundary is enforced.

## Secrets hygiene

- SGM records MUST NOT be a place to store live secrets. `contains_secrets`
  exists so consumers can flag and exclude them.
- An implementation SHOULD provide a blocklist/secret-scanner that refuses to
  store content matching known secret patterns, or at minimum flags it.
- App passwords, tokens, and keys belong in the host's secret manager, not in
  shared memory.

## Provenance as a security control

Provenance (see [provenance.md](provenance.md)) is a security feature: because
every record identifies its creator, session, and origin, a consumer can judge
trustworthiness and detect records from unexpected agents. An implementation
MUST preserve provenance unmodified — tampering with it would defeat this.

## Licensing

SGM is released under the **GNU Affero General Public License v3.0**
([LICENSE](https://github.com/Thairux/sgm/blob/main/LICENSE)) for the entire repository — specification, schemas,
reference implementation, and conformance tests alike.

### Why AGPL for the whole repo

AGPL-3.0 was chosen deliberately for a protocol that will often run as a
network service (an MCP or HTTP SGM server):

- The AGPL's network-use clause closes the "SaaS loophole" — anyone offering SGM
  as a service must offer their corresponding source.
- It keeps the protocol and its reference implementation copyleft-consistent,
  so improvements to the standard flow back.
- A single license across spec + schemas + code avoids accidental licensing
  conflicts from mixing CC-BY spec text with differently-licensed code.

### What this means for adopters

- **Implementing SGM** in your own tool does not, by itself, make your tool
  AGPL — the protocol is an interface, and the schemas are data. Interoperating
  with an SGM service is not creating a derivative work of this repository.
- **Copying or modifying** this repository's spec text, schemas, reference
  implementation, or conformance suite brings those files under AGPL-3.0.
- **Offering SGM as a network service** using modified code from this repository
  triggers the AGPL source-offer requirement.

See [LICENSE](https://github.com/Thairux/sgm/blob/main/LICENSE) for the full terms.

## Reporting security issues

See [SECURITY.md](https://github.com/Thairux/sgm/blob/main/SECURITY.md).
