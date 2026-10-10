# Changelog

All notable changes to the SGM protocol are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioning follows
[spec/versioning.md](spec/versioning.md).

Protocol, reference-implementation, and binding versions are independent.

## [0.1.0] — 2026-10-10 — Initial draft

First public draft of the SGM protocol.

### Added

**Specification** (`spec/`)
- `overview.md` — what SGM is, the problem it solves, the layer model
- `terminology.md` — vocabulary and RFC 2119 keywords
- `architecture.md` — the four-layer protocol/implementation separation
- `memory.md` — the memory record model (identity, content, references, lifecycle)
- `retrieval.md` — the retrieval contract (query, result set, guarantees)
- `context.md` — the assembled context object
- `annotations.md` — decisions, rules, status, tasks, annotations
- `handoffs.md` — cross-tool/cross-agent resumable handoffs
- `provenance.md` — mandatory who/what/when/where metadata
- `scopes.md` — the scope hierarchy and isolation guarantees
- `capabilities.md` — core vs optional capability profiles; discovery
- `versioning.md` — protocol vs implementation versioning; negotiation
- `errors.md` — the transport-independent error model
- `security.md` — sensitivity metadata, authorization boundaries, licensing

**Schemas** (`schemas/`)
- `memory.schema.json`
- `context.schema.json`
- `annotation.schema.json`
- `handoff.schema.json`
- `capability.schema.json`

**Conformance suite** (`conformance/`)
- `core/` — store, retrieve, read, identity, scope, discovery (C1–C12)
- `retrieval/` — pagination, context, round-trip (R1–R10)
- `handoff/` — handoff fidelity (H1–H6)
- `annotations/` — annotation fidelity (A1–A7)
- `security/` — isolation, provenance integrity (S1–S9)

**Reference implementation** (`reference/`)
- `src/store.ts` — in-memory `SgmStore` (store, retrieve, read, discover, assembleContext)
- `src/cli.ts` — CLI with a runnable conformance check

**Transports** (`transports/`)
- `mcp/` — MCP tool mapping (draft)

**Examples** (`examples/`)
- `basic/` — store and retrieve across agents
- `multi-agent/` — shared-scope collaboration
- `cross-tool/` — the flagship handoff scenario

**Docs** (`docs/`)
- `getting-started.md`
- `implementer-guide.md`
- `adopter-guide.md`

**Repository**
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (AGPL-3.0)
- VitePress documentation site configuration

### Status

Protocol **0.1.0 — draft / experimental**. Semantics may change before 1.0;
every change will document its compatibility impact here.

[0.1.0]: https://github.com/Thairux/sgm/releases/tag/v0.1.0
