---
layout: default
title: SGM Versioning
---

SGM versions the **protocol** independently from any **implementation** or
**transport binding**. An implementation's version number is never part of the
protocol's identity.

## Three independent version axes

```
SGM Protocol:        0.1.0     ← this specification
Reference Impl:      0.1.0     ← the code in reference/
MCP Binding:         0.1.0     ← the binding in transports/mcp/
```

A consumer negotiating with a peer cares about the **protocol** version. The
other two are informational. Do not conflate them.

## Compatibility rules

SGM follows semantic versioning of the protocol contract:

| Bump | Meaning | Example |
|---|---|---|
| **Patch** (`0.1.0` → `0.1.1`) | Clarifications, doc improvements, non-breaking fixes | rewording an error description |
| **Minor** (`0.1.0` → `0.2.0`) | Backward-compatible protocol additions | a new optional annotation `kind` |
| **Major** (`0.1.0` → `1.0.0`, or `0.x` → next) | Breaking changes to semantics, required fields, or interoperability | removing a required field, changing scope semantics |

## Pre-1.0 status

SGM is at **0.1.0 (draft / experimental)**. Before 1.0:

- it is acceptable to be explicitly experimental/draft,
- but semantics MUST NOT change casually — every change documents its
  compatibility impact in [CHANGELOG.md](https://github.com/Thairux/sgm/blob/main/CHANGELOG.md),
- a `minor` bump MAY carry breaking changes while pre-1.0, but this MUST be
  called out explicitly.

## Version negotiation

During capability discovery (see [capabilities.md](capabilities.md)), a peer
reports its `protocol_version`. The rules:

1. A consumer MUST check the peer's `protocol_version` before relying on any
   behavior.
2. If versions differ in **major**, the consumer MUST NOT assume
   interoperability and SHOULD either negotiate down or refuse.
3. If they differ in **minor/patch**, they are interoperable: higher-minor
   peers MUST remain readable by lower-minor consumers (forward compatibility
   via unknown-field preservation — see [memory.md](memory.md#unknown-types)).

## Schema version vs protocol version

Each record carries a `schema_version` (see [memory.md](memory.md)). This is the
version of the *object schema* the record conforms to, which may advance on a
different cadence than the protocol. A consumer SHOULD check `schema_version`
when parsing records it did not create.

## The compatibility contract

- **Required fields are never removed** in a minor/patch bump.
- **Optional fields are never removed** in a minor/patch bump — they may be
  deprecated.
- **Enum values** (record `type`, annotation `kind`, error `code`) MAY be added
  in a minor bump; existing values keep their meaning forever.
- **Semantics** of an existing field MUST NOT change in a minor/patch bump.
