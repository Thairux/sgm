# MCP Transport Binding

MCP is **one way** to expose SGM operations — a transport binding, not the
protocol. The same `SgmStore` could be reached over HTTP or CLI; this binding
maps SGM operations to MCP tools.

```
SGM Specification
       │
   ┌───┼───┐
  MCP HTTP CLI        ← transports (this is MCP)
   └───┼───┘
       │
  SGM Implementation
```

## Tool mapping

| MCP tool | SGM operation | Spec |
|---|---|---|
| `sgm_store` | store | [memory.md](../../spec/memory.md) |
| `sgm_retrieve` | retrieve | [retrieval.md](../../spec/retrieval.md) |
| `sgm_read` | read | [memory.md](../../spec/memory.md) |
| `sgm_discover` | capability discovery | [capabilities.md](../../spec/capabilities.md) |
| `sgm_assemble_context` | context assembly | [context.md](../../spec/context.md) |

## Rules for this binding

- It MUST NOT add protocol semantics — only transport mechanics.
- Error codes map to MCP error responses but keep the same `code` values (see
  [errors.md](../../spec/errors.md)).
- `sgm_discover` MUST be callable before any other tool so a client can
  negotiate (see [versioning.md](../../spec/versioning.md)).

## Example: stdio server

```typescript
import { SgmStore } from "../../reference/src/store.ts";

const store = new SgmStore(["core", "collaboration", "transport"]);

// stdio JSON-RPC: initialize -> tools/list -> tools/call
// initialize:  reply with { protocolVersion, capabilities, serverInfo }
// tools/list:  advertise sgm_store, sgm_retrieve, sgm_read, sgm_discover
// tools/call:  route to store.store / store.retrieve / store.read / store.discover
//
// See the reference implementation for a complete, runnable stdio server.
```

A client connects, calls `sgm_discover` to learn capabilities and
`protocol_version`, then uses the advertised tools. If it needs `collaboration`
and the server doesn't advertise it, it degrades to `note`/`fact` records rather
than failing (see [capabilities.md](../../spec/capabilities.md)).
