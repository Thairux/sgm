# Example 3 — Cross-Tool Handoff

The flagship SGM use case: hand work from one coding tool to another without
re-explaining anything.

```
Coding Tool A                    SGM                     Coding Tool B
     │                             │                           │
     │  store(handoff)  ──────────► │                           │
     │                             │  retrieve(handoff)  ◄───── │
     │                             │  ── context ──►            │
     │  (session ends)             │              (resumes with full state)
```

## Walkthrough

**Coding Tool A finishes a session and stores a handoff** (see
[spec/handoffs.md](../../spec/handoffs.md)):

```json
{
  "id": "handoff-20261010",
  "type": "handoff",
  "title": "Web app + API session resume",
  "scope": { "project": "webapp" },
  "content": "Everything below is verified as of the handoff timestamp.",
  "annotations": [
    { "kind": "what_i_did", "value": "Shipped auth flow, email notifications, and admin panel." },
    { "kind": "next", "value": "Configure the mail provider secrets; verify live send." },
    { "kind": "blockers", "value": "None." },
    { "kind": "files_touched", "value": "src/auth.ts, src/mailer.ts, config/settings.yml" },
    { "kind": "open_questions", "value": "Docs framework: static site generator choice." },
    { "kind": "as_of", "value": "2026-10-10T19:00:00Z" }
  ],
  "created_at": "2026-10-10T19:00:00Z",
  "schema_version": "0.1.0",
  "provenance": {
    "agent": "coding-tool-a",
    "session": "20261010-104120",
    "origin": "mcp",
    "scope": { "project": "webapp" },
    "created_at": "2026-10-10T19:00:00Z"
  }
}
```

**Coding Tool B starts cold and retrieves the handoff:**

```bash
sgm retrieve --scope project=webapp --types handoff
```

Tool B receives a complete, resumable package: what was done, what's next,
blockers, files touched, and open questions — all with provenance showing it
came from Tool A's session. **Zero re-explanation.**

## Why this is the payoff

This is the exact scenario SGM was built for. When you switch tools, start a new
session, or delegate to a sub-agent, the receiving side resumes with full state
instead of rebuilding context by hand. Two independent SGM implementations
interoperate here as long as both agree on the handoff record shape (see
[conformance/handoff](../../conformance/handoff/)).
