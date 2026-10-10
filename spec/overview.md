# SGM Overview

## What SGM is

**SGM (Shared Global Memory)** is an open protocol for persistent,
interoperable memory and context sharing between AI agents and software tools.

It lets an agent, coding assistant, or developer tool:

- **store** durable memory records (facts, decisions, context, tasks, handoffs),
- **retrieve** them later by identity, scope, or query,
- **assemble** them into a context object for another tool to consume,
- **provenance-tag** everything with who/what/when/where,
- **isolate** memory by scope so nothing leaks across boundaries,
- **discover** what capabilities a peer implementation supports, and
- **hand off** work between tools without re-explaining state.

## The problem

Every AI tool today keeps its own private, session-scoped memory. The moment
you switch tools, start a new session, or delegate to another agent, that
context evaporates and must be rebuilt manually. Teams re-explain the same
plans, decisions, and constraints dozens of times a week.

The root cause is that each tool invented its own memory format, with no shared
contract. SGM provides that contract.

## The design stance

SGM is **a protocol first, an implementation second**. Four layers, in strict
dependency order:

```
SGM Protocol
     │
     ├── Specification   ← authoritative; normative for semantics
     ├── Schemas         ← machine-readable; normative for structure
     ├── Conformance     ← behavioral tests any implementation can run
     │
     └── Reference Implementation   ← executable documentation only
              │
              └── Optional transports / adapters
```

Two rules follow from this:

1. **The specification is authoritative.** If the reference implementation and
   the spec disagree, the spec wins and the implementation is wrong.
2. **A third party must be able to implement SGM from the public specification
   alone**, without reading or depending on any implementation's source code.

## What SGM standardizes — and what it does not

SGM standardizes the **interoperability contract**: the shape of records, the
semantics of retrieval, the meaning of scope and isolation, the provenance
fields, and the capability/version handshake.

SGM does **not** standardize implementation technology. A conforming
implementation is free to use any storage engine (SQLite, Postgres, files,
object store, in-memory), any language, any retrieval algorithm, any embedding
model, any LLM, and any transport. Storage and ranking are implementation
concerns unless interoperability *requires* their behavior to be pinned.

## Transport independence

SGM is **not** an MCP protocol. MCP is one supported *transport binding*.

```
                    SGM Specification
                           │
             ┌─────────────┼─────────────┐
             │             │             │
            MCP           HTTP           CLI
             │             │             │
             └─────────────┼─────────────┘
                           │
                    SGM Implementation
```

The same SGM implementation SHOULD be usable through multiple transports. A
transport-specific binding is labeled as a binding, never as part of the core
protocol. See [transports/](../transports/).

## Core vs optional

SGM defines a small **Core** that every conformant implements — Store,
Retrieve, Read, Identity, Scope, Capability Discovery — plus **optional
capability profiles** (Collaboration, Code Intelligence, History, Transport)
that an implementation MAY support and MUST advertise if it does. See
[capabilities.md](capabilities.md).

## "Global" does not mean public

The name *Shared Global Memory* describes shared memory across an agent's tools
and sessions — **not** globally public memory. Scope isolation is mandatory:
cross-user and cross-project retrieval MUST never be assumed permitted. See
[scopes.md](scopes.md).

## Status

SGM is at protocol version **0.1.0 (draft / experimental)**. Semantics may
change before 1.0, but changes will always be documented with their
compatibility impact. See [versioning.md](versioning.md).
