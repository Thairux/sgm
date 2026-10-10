# Example 1 — Basic Memory

The simplest SGM flow: one agent stores context, another retrieves it.

```
Agent A
   │
   └── stores context
           │
           ▼
         SGM
           │
           ▼
Agent B
   └── retrieves context
```

## Walkthrough

**Agent A stores a fact:**

```json
{
  "id": "fact-datastore",
  "type": "fact",
  "content": "The service database lives in the primary datastore.",
  "scope": { "project": "myproject" },
  "created_at": "2026-10-10T18:00:00Z",
  "schema_version": "0.1.0",
  "provenance": {
    "agent": "agent-a",
    "origin": "cli",
    "scope": { "project": "myproject" },
    "created_at": "2026-10-10T18:00:00Z"
  }
}
```

**Agent B retrieves it later, in a different tool:**

```json
// retrieve { scope: { project: "myproject" }, text: "database" }
{
  "records": [
    { "id": "fact-datastore", "type": "fact", "content": "...", "provenance": { "agent": "agent-a", ... } }
  ],
  "total": 1,
  "truncated": false
}
```

Because the record carries its **scope** and **provenance**, Agent B knows
exactly where the memory came from — no re-explanation needed.

## Why this matters

Without SGM, Agent B would start blind and Agent A's context would be lost at
session end. With SGM, memory persists across tools and sessions by contract.

## Run it

```bash
sgm store fact-db-project --type fact --scope project=myproject --content "The service database lives in the primary datastore."
sgm retrieve --scope project=myproject --text "database"
```
