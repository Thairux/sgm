# SGM Transports

SGM is transport-independent. A transport binding is a concrete way to invoke
SGM operations; it is **never** the protocol itself.

```
                    SGM Specification
                           │
             ┌─────────────┼─────────────┐
             │             │             │
            MCP           HTTP           CLI
             │             │             │
             └─────────────┼─────────────┘
                           │
                    SGM Implementation
```

## Rules for every binding

1. MUST be labeled a binding, not the protocol.
2. MUST NOT add protocol semantics — only transport mechanics.
3. SHOULD be one of several ways to reach the same operations.
4. MUST expose capability discovery first so clients can negotiate.

## Available bindings

| Binding | Directory | Status |
|---|---|---|
| MCP | [`mcp/`](mcp/) | draft — tool mapping documented |
| HTTP | — | planned |
| CLI | [`../reference/`](../reference/) | draft — the reference CLI |

## Adding a binding

A new binding maps the five core operations (`store`, `retrieve`, `read`,
`discover`, `assemble_context`) onto its native mechanism, reuses the
[schemas](../../schemas/) verbatim, and keeps the [error codes](../../spec/errors.md)
intact. It does not redefine any protocol object.
