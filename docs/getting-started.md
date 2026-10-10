# Getting Started with SGM

This guide gets you from zero to storing and retrieving your first SGM memory in
a few minutes.

## 1. Understand the model

SGM shares **memory records** across tools. A record has an identity, a type,
content (or a reference), a scope, timestamps, and provenance. Read
[spec/overview.md](../spec/overview.md) and [spec/memory.md](../spec/memory.md)
first — they're short.

## 2. Pick your role

- **Adopting SGM in your tool?** → [Adopter Guide](adopter-guide.md)
- **Implementing SGM yourself?** → [Implementer Guide](implementer-guide.md)
- **Just exploring?** → keep reading.

## 3. Run the reference implementation

The reference implementation is executable documentation. Clone, install Bun,
and run:

```bash
# store a fact
sgm store fact-hello --type fact --scope project=demo --content "SGM works."

# retrieve it
sgm retrieve --scope project=demo --text "SGM"

# see what this implementation supports
sgm discover

# run the conformance checks
sgm conformance
```

Expected `sgm discover` output:

```json
{
  "protocol_version": "0.1.0",
  "implementation": "sgm-reference",
  "capabilities": ["core", "collaboration", "history", "transport"]
}
```

## 4. Look at a real record

Every record follows [`memory.schema.json`](../schemas/memory.schema.json):

```json
{
  "id": "fact-hello",
  "type": "fact",
  "content": "SGM works.",
  "scope": { "project": "demo" },
  "created_at": "2026-10-10T19:00:00Z",
  "schema_version": "0.1.0",
  "provenance": {
    "agent": "cli",
    "origin": "cli",
    "scope": { "project": "demo" },
    "created_at": "2026-10-10T19:00:00Z"
  }
}
```

## 5. Try a handoff

The flagship use case — see [examples/cross-tool/](../examples/cross-tool/). One
tool stores a handoff; another resumes from it with no re-explanation.

## Next steps

- Read the full [specification](../spec/).
- Validate your records against the [schemas](../schemas/).
- Run the [conformance suite](../conformance/) against your implementation.
