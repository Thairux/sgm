# SGM Conformance Suite

The conformance suite answers one question for any implementation:

> **"Does my implementation actually implement SGM correctly?"**

Tests focus on **externally observable behavior** — what a client can see — not
internal functions or database structure. Any independent implementation, in any
language, can run these to determine which SGM capabilities it satisfies.

## How to run

The reference implementation ships a runner:

```bash
sgm conformance                # run all suites
sgm conformance core           # run the core suite only
sgm conformance retrieval      # run one capability profile
sgm conformance --endpoint URL # test a remote implementation (HTTP binding)
```

Output is a pass/fail report per capability:

```
SGM Conformance Report
──────────────────────
core          ✓ store ✓ retrieve ✓ read ✓ identity ✓ scope ✓ discovery
collaboration ✓ handoffs
history       — not advertised
PASS: core, collaboration
```

## Suites

| Directory | Capability | Requires |
|---|---|---|
| [`core/`](core/) | Store, Retrieve, Read, Identity, Scope, Discovery | always |
| [`retrieval/`](retrieval/) | Retrieval + context guarantees | core |
| [`handoff/`](handoff/) | Handoff round-trip | collaboration |
| [`annotations/`](annotations/) | Annotation fidelity | collaboration |
| [`security/`](security/) | Scope isolation, provenance integrity | core |

## The Given/When/Then form

Every test is written as observable behavior:

```
Given:    a valid SGM memory record
When:     an implementation stores the record
Then:     it must be retrievable according to the specified semantics
```

Tests MUST NOT depend on private database structures or implementation-specific
functions. They exercise only the public operations (store / retrieve / read /
discover).

## What "conformant" means

An implementation is conformant for a capability if it passes **every** test in
that capability's suite. Passing `core` is mandatory for calling oneself an SGM
implementation. Optional capabilities (collaboration, code-intelligence,
history, transport) are conformant independently.

## Adding tests

New tests MUST be transport-independent and MUST test behavior two independent
implementations need to agree on. If a test only passes for one storage engine
or one ranking algorithm, it does not belong in the suite (see
[spec/architecture.md](../spec/architecture.md#over-standardization-guard)).
