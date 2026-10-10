---
layout: page
---

# Schemas

Every structured SGM protocol object has a machine-readable JSON Schema. The
schemas are **normative for structure**; the [specification](../spec/) is
normative for semantics. A conforming implementation MUST satisfy both.

Schemas describe the **logical object**, never a physical storage table. An
implementation MUST NOT leak its internal schema into protocol objects.

| Schema | Object | Spec |
|---|---|---|
| [`memory.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/memory.schema.json) | Memory record | [memory.md](../spec/memory) |
| [`context.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/context.schema.json) | Assembled context | [context.md](../spec/context) |
| [`annotation.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/annotation.schema.json) | Annotation | [annotations.md](../spec/annotations) |
| [`handoff.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/handoff.schema.json) | Handoff record | [handoffs.md](../spec/handoffs) |
| [`capability.schema.json`](https://github.com/Thairux/sgm/blob/main/schemas/capability.schema.json) | Capability discovery | [capabilities.md](../spec/capabilities) |

All schemas use JSON Schema draft 2020-12.

## Every protocol object defines

- identity
- type
- schema version
- scope
- timestamps
- provenance
- content / reference
- metadata
- relationships where applicable
