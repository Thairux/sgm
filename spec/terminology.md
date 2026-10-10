# SGM Terminology

This document defines the vocabulary used throughout the SGM specification.
Terms are listed alphabetically within each group.

## Conformance keywords

The key words below are interpreted as in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119):

| Keyword | Meaning |
|---|---|
| **MUST** / **REQUIRED** / **SHALL** | Absolute requirement |
| **MUST NOT** / **SHALL NOT** | Absolute prohibition |
| **SHOULD** / **RECOMMENDED** | May be ignored only with documented, valid reason |
| **SHOULD NOT** | Discouraged; may be acceptable in documented cases |
| **MAY** / **OPTIONAL** | Truly optional |

## Core concepts

### Memory

Persistent, named context that survives individual sessions. Memory is the
thing SGM shares. It is scoped (see [scopes.md](scopes.md)).

### Memory record

The atomic unit of stored memory. A record has a stable **identity**, a
**type**, optional **content** or a **reference** to stored content, **scope**,
**timestamps**, and **provenance**. Defined in [memory.md](memory.md); structured
by [`memory.schema.json`](../schemas/memory.schema.json).

### Reference

A pointer to stored content kept outside the record's inline body — e.g. a
content-addressed block. A record MAY carry inline content, a reference, or
both. See [memory.md](memory.md#content-and-references).

### Retrieval

The act of recalling records matching a query, identity, or scope. Retrieval
returns a set of records; the ranking algorithm is implementation-defined.
See [retrieval.md](retrieval.md).

### Context

A structured object assembled from one or more retrieved records, ready to be
consumed by another tool or agent. See [context.md](context.md).

### Annotation

Metadata attached to a record that is not itself the primary content:
decisions, rules, status, and tasks. See [annotations.md](annotations.md).

### Decision

A record type capturing a resolved choice, its rationale, and its status. A
decision is a first-class annotation so that agents can distinguish *"we chose
X because Y"* from raw facts.

### Rule

A standing constraint an implementation or workflow SHOULD follow.

### Handoff

A record that packages state so another tool or agent can resume work without
re-derivation: what was done, what's next, blockers, open questions, and files
touched. See [handoffs.md](handoffs.md).

### Provenance

The who/what/when/where metadata on every record: creator identity, creation
time, origin, scope, and modification history. See [provenance.md](provenance.md).

## Identity & scope

### Scope

The isolation boundary a record belongs to. The defined scope levels are:

```
User → Organization → Workspace → Project → Session → Task
```

Narrower scopes are contained within broader ones. Cross-scope retrieval MUST
NOT be assumed permitted. See [scopes.md](scopes.md).

### Session identity

An identifier for the tool session that created or is consuming a record.

### Agent identity

An identifier for the actor — human, tool, or automated agent — that created a
record.

## Capabilities & versions

### Capability

A named, independently-implementable protocol feature. Core capabilities are
required; optional capabilities are advertised. See [capabilities.md](capabilities.md).

### Capability discovery

The handshake by which one implementation learns which capabilities another
supports, before relying on them.

### Protocol version

The version of the SGM specification an implementation conforms to. Independent
of implementation and binding versions. See [versioning.md](versioning.md).

### Implementation version

The version of a specific SGM implementation. Never part of protocol identity.

### Transport binding

A concrete way to invoke SGM operations (MCP, HTTP, CLI). A binding is labeled
as a binding, never as the protocol. See [transports/](../transports/).

## Records taxonomy

| Type | Meaning | Optional? |
|---|---|---|
| `fact` | A verified piece of information | core |
| `decision` | A resolved choice with rationale | optional (Collaboration) |
| `rule` | A standing constraint | optional (Collaboration) |
| `status` | Current state of work | optional (Collaboration) |
| `task` | A tracked unit of work | optional (Collaboration) |
| `handoff` | A resumable work package | optional (Collaboration) |
| `annotation` | Metadata on another record | optional (Collaboration) |
| `note` | Loose context, unclassified | core |

The exact set MAY be extended by an implementation, but unknown types MUST be
stored and returned losslessly by conforming implementations (see
[memory.md](memory.md#unknown-types)).
