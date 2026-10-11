---
layout: default
title: SGM Scopes
---

Scope is the isolation boundary that keeps memory from leaking across contexts.
Despite the name *Shared Global Memory*, SGM memory is **not** globally public —
isolation is mandatory and enforced by every conforming implementation.

## The scope hierarchy

```
User
 └── Organization
      └── Workspace
           └── Project
                └── Session
                     └── Task
```

Narrower scopes are contained within broader ones. A `task` scope belongs to a
`session`, which belongs to a `project`, and so on up.

## The scope object

A record's `scope` is an object naming the levels that apply. A record MUST
declare at least the levels down to where it lives; unlisted broader levels are
inherited from context.

```json
{ "user": "alice", "project": "myproject" }
```

```json
{ "organization": "acme", "workspace": "platform", "project": "api", "session": "20261010-104120" }
```

At minimum, a scope MUST include enough to place the record unambiguously. The
`project` level is the most common isolation boundary in practice.

## Isolation guarantees

A conforming implementation MUST enforce:

1. **Containment.** A record in scope `S` is visible to retrievals scoped to `S`
   or to any broader scope containing `S`.
2. **No leakage.** A retrieval scoped to `S` MUST NOT return records in a scope
   that `S` does not contain — including sibling projects, other users, and
   other organizations.
3. **No assumed cross-scope access.** Cross-user or cross-project retrieval MUST
   NOT happen unless explicitly requested AND permitted by the implementation's
   authorization. It is never implicit.
4. **Authorization boundaries exist.** Even though the auth *mechanism* is
   implementation-specific, the protocol requires that a boundary exists and is
   enforced around every operation. An implementation with no auth MUST treat
   every scope as private to its own process.

## "Global" ≠ public

The word *global* in SGM's name means *shared across an agent's own tools and
sessions* — one brain, many clients. It never means *world-readable*. The
`user` scope is the top of the hierarchy, not the whole internet.

## Cross-scope retrieval

An implementation MAY support explicitly-authorized cross-scope retrieval (e.g.
an org-wide search). When it does, it:

- MUST require an explicit request — never a default,
- MUST advertise the capability (see [capabilities.md](capabilities.md)),
- MUST return each record with its own scope intact so the consumer can see
  where each came from.

## Interoperability requirement

Two independent implementations MUST agree on:

1. the scope level names (`user`, `organization`, `workspace`, `project`,
   `session`, `task`),
2. that containment holds (narrower ⊂ broader), and
3. that isolation is enforced — no cross-scope leakage by default.

They need NOT agree on the authorization mechanism, how scopes are stored, or
whether they support cross-scope search at all.
