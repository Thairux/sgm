---
layout: default
title: SGM Annotations
---

Annotations are structured metadata attached to memory that is not itself the
primary content. They let an agent distinguish a *decision* from a *fact* from
a *standing rule* — critical because agents must not treat a past decision as a
current instruction, or a stale status as truth.

## The annotation model

Annotations are record types (see [terminology.md](terminology.md#records-taxonomy))
plus an optional `annotations` array on any record. The Collaboration capability
profile makes the annotation types first-class.

## Annotation types

### `decision`

A resolved choice with rationale.

```json
{
  "id": "dec-keep-datastore",
  "type": "decision",
  "title": "Keep the current datastore",
  "content": "Chose to keep the current datastore and add a scheduled health-check rather than migrate.",
  "annotations": [
    { "kind": "rationale", "value": "The current platform provides auth + realtime + rules in one place; a scheduled job solves the idle-reset." },
    { "kind": "status", "value": "accepted" }
  ]
}
```

A `decision` SHOULD carry a `rationale` and a `status`
(`proposed` | `accepted` | `superseded` | `rejected`).

### `rule`

A standing constraint. Rules are normative: they tell future agents what to do.

```json
{
  "id": "rule-quality",
  "type": "rule",
  "content": "Build complete, production-quality work, not throwaway prototypes."
}
```

### `status`

Current state of a piece of work. Status is explicitly **point-in-time** — a
consumer MUST treat it as potentially stale and check provenance
(see [provenance.md](provenance.md)).

```json
{
  "id": "status-build",
  "type": "status",
  "content": "Notification migration shipped; provider secrets pending.",
  "annotations": [{ "kind": "as_of", "value": "2026-10-10T19:00:00Z" }]
}
```

### `task`

A tracked unit of work with an optional completion state.

```json
{
  "id": "task-set-secrets",
  "type": "task",
  "title": "Set the mail provider credentials",
  "annotations": [{ "kind": "state", "value": "open" }]
}
```

### `annotation` (attached)

Lightweight key/value metadata attached to any record via the `annotations`
array. Common `kind` values: `rationale`, `status`, `state`, `as_of`, `source`,
`confidence`.

```json
"annotations": [
  { "kind": "confidence", "value": "high" },
  { "kind": "source", "value": "verified-2026-10-10" }
]
```

Normative structure: [`annotation.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/annotation.schema.json).

## Why this matters for AI memory

AI-generated memory is easy to misuse. Without typed annotations, an agent
cannot tell:

- a **fact** ("the DB is at project X") from
- a **decision** ("we chose the current datastore because…") from
- a **rule** ("never build an MVP") from
- a **status** ("secrets pending as of 19:00") from
- an **instruction** it should no longer follow.

Typed annotations + provenance (who/what/when) are how SGM keeps agents from
acting on stale or misclassified memory. A conforming implementation MUST
preserve annotation types losslessly and MUST NOT coerce an unknown `kind`.

## Interoperability requirement

Two independent implementations MUST agree on:

- the annotation `type` values (the enum),
- that `annotations` round-trip losslessly, and
- that an unknown annotation `kind` is preserved, not dropped.

They need NOT agree on how annotations are stored or indexed.
