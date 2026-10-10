# SGM Adopter Guide

You want to use SGM in your tool or workflow without implementing it yourself.
This guide covers consuming an existing SGM implementation.

## What you get

- **Persistent memory** that survives across sessions and tools.
- **Provenance on everything** — you always know who/what/when.
- **Scope isolation** — memory stays in its lane.
- **Portable handoffs** — resume work in a different tool with no re-explanation.

## Connect to an implementation

An SGM implementation exposes operations over a transport (MCP, HTTP, or CLI).
Pick one that fits your tool:

| Transport | Best for |
|---|---|
| MCP | AI agents and coding assistants |
| HTTP | services and web integrations |
| CLI | scripts and local workflows |

## Step 1 — Discover capabilities first

Always call discovery before relying on anything:

```bash
sgm discover
```

```json
{
  "protocol_version": "0.1.0",
  "implementation": "sgm-reference",
  "capabilities": ["core", "collaboration"]
}
```

Check two things:

1. **`protocol_version`** — compatible with what you expect? (If the major
   version differs, don't assume interoperability — see
   [versioning.md](../spec/versioning.md).)
2. **`capabilities`** — does it support what you need? If you need handoffs and
   it doesn't advertise `collaboration`, degrade to plain records.

## Step 2 — Store memory

Write records that validate against [`memory.schema.json`](../schemas/memory.schema.json).
Always set `scope` — that's your isolation boundary:

```json
{
  "id": "fact-user-prefers-dark-mode",
  "type": "fact",
  "content": "User prefers dark mode in all tools.",
  "scope": { "user": "alice" },
  "created_at": "2026-10-10T19:00:00Z",
  "schema_version": "0.1.0",
  "provenance": { "agent": "my-tool", "origin": "mcp", "scope": { "user": "alice" }, "created_at": "2026-10-10T19:00:00Z" }
}
```

## Step 3 — Retrieve and consume

```bash
sgm retrieve --scope user=alice --text "dark mode"
```

Each returned record carries its scope and provenance, so you can trust where it
came from. Assemble a **context** when handing memory to another component (see
[context.md](../spec/context.md)).

## Step 4 — Use the right record types

Don't dump everything as `fact`. Typed records keep agents from misusing memory:

- `fact` — verified information
- `decision` — a resolved choice (with rationale)
- `rule` — a standing constraint
- `status` — point-in-time state (check `as_of` for staleness)
- `task` — a unit of work
- `handoff` — a resumable work package

See [annotations.md](../spec/annotations.md).

## Best practices

- **Always set scope.** Unscoped memory is a leak waiting to happen.
- **Respect `sensitivity`.** Don't surface `contains_secrets` or `pii` records
  carelessly.
- **Branch on error `code`**, never `message` text.
- **Degrade gracefully** when a capability isn't advertised.
- **Preserve provenance** — don't strip it when re-storing.

## Getting help

- [Getting Started](getting-started.md)
- [Full specification](../spec/)
- [Examples](../examples/)
