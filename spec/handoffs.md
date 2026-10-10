# SGM Handoffs

A **handoff** is the record type that makes cross-tool and cross-agent work
resumable without re-derivation. It is the reason SGM exists: when you switch
from one coding assistant to another, or hand work to a sub-agent, the receiving
side should not have to re-explain what was done, what's next, and what's
blocking.

## The handoff record

```json
{
  "id": "handoff-session-20261010",
  "type": "handoff",
  "title": "Web app + API session resume",
  "scope": { "project": "webapp" },
  "content": "Everything below is verified as of the handoff timestamp.",
  "annotations": [
    { "kind": "what_i_did", "value": "Shipped auth flow, email notifications, and admin panel." },
    { "kind": "next", "value": "Configure the mail provider secrets; verify live send." },
    { "kind": "blockers", "value": "None." },
    { "kind": "files_touched", "value": "src/auth.ts, src/mailer.ts, config/settings.yml" },
    { "kind": "open_questions", "value": "Docs framework: static site generator choice." }
  ],
  "created_at": "2026-10-10T19:00:00Z",
  "provenance": { "agent": "build-agent", "session": "20261010-104120" }
}
```

Normative structure: [`handoff.schema.json`](../schemas/handoff.schema.json).

## The canonical handoff sections

A handoff SHOULD include these annotation kinds (each is a string value):

| kind | Purpose |
|---|---|
| `what_i_did` | Completed, verified work |
| `next` | The immediate next actions, in order |
| `blockers` | What is currently blocking progress |
| `files_touched` | Paths changed, so a resuming agent knows where to look |
| `open_questions` | Decisions awaiting input |
| `as_of` | Timestamp the handoff state is valid as of |

These are conventions, not a rigid schema — the `annotations` array accepts any
`kind`. But conforming consumers SHOULD recognize these six so handoffs are
portable across implementations.

## Why handoffs are a distinct type

A handoff is not a `status` and not a `task`:

- a **status** is point-in-time state,
- a **task** is one unit of work,
- a **handoff** is a *complete resumable package* — enough for a different
  agent, in a different tool, to continue without a single re-explanation.

That last property is the interoperability payoff. Two independent SGM
implementations MUST agree that:

1. `type: "handoff"` is retrievable like any record,
2. its `annotations` round-trip losslessly, and
3. its `provenance` identifies the handing-off agent and session.

They need NOT agree on how handoffs are stored, ranked, or surfaced in a UI.

## Cross-tool handoff flow

```
Coding Tool A                    SGM                     Coding Tool B
     │                             │                           │
     │  store(handoff)  ──────────► │                           │
     │                             │  retrieve(handoff)  ◄───── │
     │                             │  ── context ──►            │
     │                             │                           │
     │  (session ends)             │              (resumes with full state)
```

Because the handoff carries scope + provenance + the canonical sections, Tool B
resumes with zero re-explanation. See [examples/cross-tool/](../examples/cross-tool/).

## Multi-agent flow

```
Agent A ─┐
Agent B ─┼──► SGM ◄── Agent C
Agent D ─┘
```

Each agent stores its own handoff into the shared scope; any other agent in that
scope retrieves the assembled context. Isolation is enforced by scope (see
[scopes.md](scopes.md)).
