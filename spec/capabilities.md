---
layout: default
title: SGM Capabilities
permalink: /spec/capabilities/
---

SGM avoids making every feature mandatory. It defines a small **Core** that
every conformant implements, plus **optional capability profiles** that an
implementation MAY support and MUST advertise if it does. The goal is
interoperability without forcing every implementation to implement everything.

## SGM Core

Every conforming implementation MUST support:

```
SGM Core
├── Store         create/update memory records
├── Retrieve      recall records by query/scope
├── Read          return a record by identity
├── Identity      session + agent identity on provenance
├── Scope         the scope model with enforced isolation
└── Discovery     advertise capabilities + negotiate version
```

If an implementation does not support a Core capability, it is not a conforming
SGM implementation.

## Optional capability profiles

An implementation MAY support any subset of these, and MUST advertise each one
it supports via capability discovery.

### Collaboration

```
Collaboration
├── decisions     typed decision records with rationale + status
├── rules         standing normative constraints
├── status        point-in-time work state
├── tasks         tracked units of work
└── handoffs      resumable cross-tool work packages
```

### Code Intelligence

```
Code Intelligence
├── symbols       code symbol records
├── references    code-reference records
└── diffs         diff/change records
```

### History

```
History
├── versions      record version history
├── snapshots     point-in-time snapshots
└── restoration   restore a prior version
```

### Transport

```
Transport
├── mcp           SGM exposed over MCP
├── http          SGM exposed over HTTP
└── cli           SGM exposed over a CLI
```

## Capability discovery

Before relying on an optional capability, a consumer MUST discover whether the
peer supports it. Discovery returns the peer's capability set:

```json
{
  "protocol_version": "0.1.0",
  "implementation": "sgm-reference",
  "implementation_version": "0.1.0",
  "capabilities": ["core", "collaboration", "history", "mcp"]
}
```

- `protocol_version` is the SGM spec version (see [versioning.md](versioning.md)).
- `capabilities` lists the profiles the implementation supports; `core` is
  always present.
- A consumer MUST NOT assume an unadvertised capability exists. If it needs
  `collaboration` and the peer doesn't advertise it, it MUST degrade gracefully
  (store as `note`/`fact`) rather than fail.

Normative structure: [`capability.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/capability.schema.json).

## Interoperability requirement

Two implementations interoperate on a capability if and only if both support it.
Discovery makes this explicit and testable rather than assumed. The conformance
suite (see [../conformance/](../conformance/)) verifies each advertised
capability independently.
