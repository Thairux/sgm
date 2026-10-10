# Example 2 — Multi-Agent Collaboration

Multiple agents share one scope. Each stores its own work; any other agent in
the scope retrieves the assembled context.

```
Agent A ─┐
Agent B ─┼──► SGM ◄── Agent C
Agent D ─┘
```

## Walkthrough

Three agents work in scope `{project: "platform"}`.

**Agent A stores a decision:**

```json
{
  "id": "dec-auth",
  "type": "decision",
  "title": "Use OAuth for admin",
  "content": "Chose Git-backed OAuth over a hosted CMS for the admin panel.",
  "scope": { "project": "platform" },
  "annotations": [
    { "kind": "rationale", "value": "Git-as-CMS, no third-party service." },
    { "kind": "status", "value": "accepted" }
  ],
  "provenance": { "agent": "agent-a", "origin": "mcp", "scope": { "project": "platform" }, "created_at": "..." }
}
```

**Agent B stores a rule:**

```json
{
  "id": "rule-quality",
  "type": "rule",
  "content": "Build complete, production-quality work, not throwaway prototypes.",
  "scope": { "project": "platform" },
  "provenance": { "agent": "agent-b", "origin": "mcp", "scope": { "project": "platform" }, "created_at": "..." }
}
```

**Agent C assembles the full context:**

```bash
sgm retrieve --scope project=platform
```

Agent C receives both the decision and the rule, each tagged with the agent
that created it. Because annotations are typed, Agent C can tell the *decision*
(accepted, with rationale) from the *rule* (standing constraint) and act
accordingly.

## Why typed annotations matter here

Agent C must not confuse:
- the **decision** (a resolved choice) with
- the **rule** (a normative constraint) or
- a stale **status**.

Typed records + provenance (see [spec/annotations.md](../../spec/annotations.md)
and [spec/provenance.md](../../spec/provenance.md)) make that distinction
machine-readable instead of guesswork.
