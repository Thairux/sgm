---
layout: default
title: SGM Architecture
permalink: /spec/architecture/
---

## The four layers

SGM is organized into four strictly-separated layers. Dependencies flow in one
direction only:

```
┌─────────────────────────────────────────────────────────────┐
│  1. SPECIFICATION          authoritative; normative semantics │
├─────────────────────────────────────────────────────────────┤
│  2. SCHEMAS                machine-readable; normative shape  │
├─────────────────────────────────────────────────────────────┤
│  3. CONFORMANCE            behavioral tests; normative proof  │
├─────────────────────────────────────────────────────────────┤
│  4. REFERENCE IMPL         executable documentation only      │
│     └── transports/        optional bindings (MCP/HTTP/CLI)   │
└─────────────────────────────────────────────────────────────┘
```

### 1. Specification

The prose documents in [`spec/`](./). These define what every term and operation
*means*. They are the source of truth. If code and spec disagree, the code is
wrong.

### 2. Schemas

The JSON Schemas in [`../schemas/`](https://github.com/Thairux/sgm/blob/main/schemas/). These define the *structure*
of every protocol object: required fields, types, enums, and relationships.
The schemas are normative for shape; the spec is normative for semantics. A
conforming implementation MUST satisfy both.

Schemas describe the **logical object**, never a physical storage table. An
implementation MUST NOT leak its internal schema into the protocol objects.

### 3. Conformance

The behavioral test suite in [`../conformance/`](../conformance/). These test
**externally observable behavior** — what a client can see — not internal
functions or database structure. Any independent implementation can run them to
answer: *"Do I actually implement SGM correctly?"*

The canonical invocation is conceptually:

```
sgm conformance            # run all suites
sgm conformance retrieval   # run one capability profile
```

The suite reports which capabilities an implementation satisfies.

### 4. Reference Implementation

A minimal, readable implementation in [`../reference/`](../reference/). Its only
jobs are:

1. **executable documentation** — show the spec working end to end,
2. **practical demonstration** — a known-good target,
3. **conformance fixture** — a source of example records,
4. **development/testing target**.

The reference implementation MUST NOT become a hidden dependency of the
protocol. Two independent implementations MUST be able to interoperate without
either reading the other's source.

## The independence test

Before treating this repository as complete, it must pass:

> **Imagine the reference implementation does not exist. Does the SGM
> repository still make sense?**

If no, the repo is too coupled. An independent developer must be able to, using
only this public repository:

1. discover SGM,
2. understand the protocol,
3. read the schemas,
4. implement it in their own language,
5. run the conformance tests,
6. expose it through their preferred transport, and
7. interoperate with another SGM implementation.

## Transports are outside the core

Transport bindings live in [`../transports/`](https://github.com/Thairux/sgm/blob/main/tree/main/transports/), outside the
protocol core. A binding:

- MUST be labeled a binding, not the protocol,
- MUST NOT add protocol semantics,
- SHOULD be one of several ways to reach the same operations.

See [overview.md](overview.md#transport-independence).

## Over-standardization guard

Before promoting any implementation detail to a protocol requirement, ask:

> *Would two completely independent implementations need to agree on this to
> interoperate?*

- **Yes** → standardize it.
- **No** → keep it implementation-specific.

SGM defines the **smallest strong standard** capable of meaningful
interoperability. The implementation may be far more sophisticated than the
protocol. See [capabilities.md](capabilities.md).
