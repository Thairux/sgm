# Reference Implementation

A minimal, dependency-light SGM implementation that serves as **executable
documentation**. It is NOT the protocol — [spec/](../spec/) is authoritative.

## Purpose

1. **Executable documentation** — show the spec working end to end.
2. **Practical demonstration** — a known-good target.
3. **Conformance fixture** — a source of example records.
4. **Development/testing target** — run the conformance suite against it.

The reference implementation MUST NOT become a hidden dependency of the
protocol. Two independent implementations MUST interoperate without either
reading the other's source (see
[spec/architecture.md](../spec/architecture.md#the-independence-test)).

## Design

- **In-memory store** — no database, no external services.
- **Zero runtime dependencies** — Bun's built-in runtime only.
- **Readable over clever** — the code mirrors the spec section by section.

A production implementation would persist, index, rank, and secure. This one
proves the observable contract.

## Files

| File | Contents |
|---|---|
| `src/store.ts` | The `SgmStore` class: store, retrieve, read, discover, assembleContext |
| `src/cli.ts` | A CLI that exercises the store and runs conformance checks |

## Usage

```bash
# capability discovery
sgm discover

# store a record
sgm store fact-hello --type fact --scope project=demo --content "SGM works."

# retrieve
sgm retrieve --scope project=demo --text "SGM"

# run the core conformance checks
sgm conformance
```

## What it demonstrates

- Scope containment and isolation (`scopeContains`)
- Store idempotency by identity
- Immutable `created_at` + `modified` tracking on update
- Unknown-type / metadata lossless round-trip
- `scope_denied` on unauthorized cross-scope retrieval
- Capability discovery with `protocol_version`

## What it deliberately omits

Persistence, ranking, embeddings, auth, and transport servers are all
implementation concerns left to real adopters. See the
[Implementer Guide](../docs/implementer-guide.md).
