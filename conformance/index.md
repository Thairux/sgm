---
layout: page
---

# Conformance Suite

The conformance suite answers one question for any implementation:

> **"Does my implementation actually implement SGM correctly?"**

Tests focus on **externally observable behavior** — what a client can see — not
internal functions or database structure.

## Run it

```bash
sgm conformance                # all suites
sgm conformance core           # core only
sgm conformance retrieval      # one capability profile
sgm conformance --endpoint URL # test a remote implementation
```

## Suites

| Suite | Capability | Tests |
|---|---|---|
| [Core](core/core) | store, retrieve, read, identity, scope, discovery | C1–C12 |
| [Retrieval](retrieval/retrieval) | pagination, context, round-trip | R1–R10 |
| [Handoff](handoff/handoff) | handoff fidelity | H1–H6 |
| [Annotations](annotations/annotations) | annotation fidelity | A1–A7 |
| [Security](security/security) | isolation, provenance integrity | S1–S9 |

An implementation is **conformant** for a capability if it passes every test in
that capability's suite. Passing `core` is mandatory; optional capabilities are
conformant independently.

See the [conformance README](https://github.com/Thairux/sgm/blob/main/conformance/README.md)
for the Given/When/Then form and how to add tests.
