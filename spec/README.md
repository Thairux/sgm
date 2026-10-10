# SGM Specification

This directory contains the authoritative SGM protocol specification. Where the
specification and the reference implementation disagree, **the specification
wins** — implementations are demonstrations of the spec, never its definition.

## Reading order

| # | Document | Defines |
|---|---|---|
| 1 | [overview.md](overview.md) | What SGM is, the problem it solves, the layer model |
| 2 | [terminology.md](terminology.md) | The protocol vocabulary (MUST/SHOULD/MAY, record, scope, …) |
| 3 | [architecture.md](architecture.md) | Specification / schemas / conformance / reference split |
| 4 | [memory.md](memory.md) | The memory record: identity, type, content, references |
| 5 | [retrieval.md](retrieval.md) | Retrieval, context assembly, references |
| 6 | [context.md](context.md) | What a retrieved context object looks like |
| 7 | [annotations.md](annotations.md) | Annotations, decisions, rules, status, tasks |
| 8 | [handoffs.md](handoffs.md) | Cross-tool / cross-agent handoff records |
| 9 | [provenance.md](provenance.md) | Who/what/when/where on every record |
| 10 | [scopes.md](scopes.md) | Scope model and isolation guarantees |
| 11 | [capabilities.md](capabilities.md) | Core vs optional capability profiles; discovery |
| 12 | [versioning.md](versioning.md) | Protocol vs implementation versioning; negotiation |
| 13 | [errors.md](errors.md) | The error model and standard error codes |
| 14 | [security.md](security.md) | Sensitivity metadata, authorization boundaries, licensing |

## Conformance keywords

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**,
**SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in these
documents are to be interpreted as described in
[RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Schema authority

Every structured object defined here has a corresponding machine-readable
[JSON Schema](../schemas/). The prose is normative for semantics; the schemas
are normative for structure. A conforming implementation MUST satisfy both.
