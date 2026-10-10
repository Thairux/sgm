# SGM — Shared Global Memory

**SGM is an open protocol for persistent, interoperable memory and context sharing between AI agents and software tools.**

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Spec version](https://img.shields.io/badge/spec-0.1.0--draft-informational)](spec/versioning.md)

---

Modern AI agents, coding assistants, and developer tools each keep their own
private, short-lived memory. When you switch tools, start a new session, or
hand work to another agent, that context is lost and has to be rebuilt by hand
— re-explaining plans, decisions, and project state every single time.

SGM fixes that. It defines a small, transport-independent contract for storing,
retrieving, and sharing memory so that **any conforming implementation can
exchange context with any other**, regardless of language, storage backend, or
host tool.

> SGM is a protocol first, an implementation second. This repository contains
> the specification, machine-readable schemas, a conformance suite, and a
> reference implementation. The specification is authoritative.

## What SGM defines

SGM standardizes the **interoperability contract**, not implementation
technology. It defines concepts such as:

- persistent **memory records** and **references** to stored content
- **retrieval** and **context** assembly
- **provenance** — who/what created a record, when, and from where
- **scopes** and isolation (user, organization, workspace, project, session, task)
- **annotations**, **decisions**, **rules**, **status**, and **tasks**
- **handoffs** between tools and agents
- **identity** for sessions and agents
- **capability discovery** and **version negotiation**
- sensitivity/security metadata and a defined error model

SGM deliberately does **not** mandate a storage engine, query language,
programming language, embedding model, vector database, LLM, operating system,
or transport. MCP and HTTP are supported *transport bindings*, not the protocol
itself.

## Repository layout

```
sgm/
├── spec/            The authoritative protocol specification
├── schemas/         Machine-readable JSON Schemas for every protocol object
├── conformance/     Behavior tests any implementation can run
├── reference/       A reference implementation (executable documentation)
├── transports/      Transport bindings (MCP, HTTP, CLI)
├── examples/        End-to-end scenarios using generic tool names
├── docs/            Getting-started, implementer, and adopter guides
└── .vitepress/      Documentation site configuration
```

The architectural separation is:

```
specification → schemas → conformance → implementations → transports/adapters
```

## Quick start

Read the specification in order:

1. [Overview](spec/overview.md) — what SGM is and the problem it solves
2. [Terminology](spec/terminology.md) — the vocabulary
3. [Architecture](spec/architecture.md) — the four protocol layers
4. [Memory](spec/memory.md) — the core record model
5. [Retrieval & Context](spec/retrieval.md) — how memory is recalled
6. [Scopes](spec/scopes.md) — isolation and access boundaries

Then implement against the [schemas](schemas/) and validate with the
[conformance suite](conformance/).

## Implementing SGM

A conforming implementation must:

1. Store and retrieve memory records with the semantics in the [spec](spec/).
2. Represent protocol objects according to the [JSON Schemas](schemas/).
3. Enforce [scope isolation](spec/scopes.md).
4. Carry [provenance](spec/provenance.md) on every record.
5. Pass the [conformance suite](conformance/) for the capabilities it claims.
6. Advertise its capabilities and negotiate [versions](spec/versioning.md).

See the [Implementer Guide](docs/implementer-guide.md) for the full contract.

## Protocol status

| Component | Version | Status |
|---|---|---|
| SGM Protocol | 0.1.0 | draft / experimental |
| Reference Implementation | 0.1.0 | draft |
| MCP Binding | 0.1.0 | draft |

Protocol, implementation, and binding versions are independent — see
[Versioning](spec/versioning.md).

## License

Released under the [GNU Affero General Public License v3.0](LICENSE). See
[Licensing](spec/security.md#licensing) for how the specification, schemas,
reference implementation, and conformance tests are covered.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Interoperability is the goal — if a
change is not necessary for two independent implementations to interoperate, it
belongs in an implementation, not the core protocol.
