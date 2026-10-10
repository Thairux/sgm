# Contributing to SGM

SGM is a protocol first. Contributions that improve interoperability are
welcome; contributions that bloat the core are not.

## The one rule that governs everything

> **Is this necessary for interoperability?**

For every proposed change, ask: *would two completely independent
implementations need to agree on this to interoperate?*

- **Yes** → it may belong in the protocol. Open a spec PR.
- **No** → it belongs in an implementation, not the core.

SGM defines the **smallest strong standard** capable of meaningful
interoperability (see
[spec/architecture.md](spec/architecture.md#over-standardization-guard)). The
reference implementation may be far more sophisticated than the protocol.

## How to contribute

### Spec changes

1. Open an issue describing the interoperability gap.
2. Reference the exact spec section.
3. Show two hypothetical independent implementations that would need to agree.
4. Submit a PR against `spec/` with the RFC 2119 keyword you intend.

### Schemas

- Every structured protocol object needs a machine-readable JSON Schema.
- Schemas describe the **logical object**, never a physical storage table.
- A schema change that breaks validation is a **major** version bump
  (see [spec/versioning.md](spec/versioning.md)).

### Conformance tests

- Tests MUST be transport-independent and test observable behavior only.
- A test that only passes for one storage engine or ranking algorithm does not
  belong in the suite.
- Use the Given/When/Then form (see [conformance/README.md](conformance/README.md)).

### Reference implementation

- Keep it minimal and readable — it's executable documentation.
- It MUST conform to the spec, never define it.

## Versioning discipline

- Required fields are never removed in a minor/patch bump.
- Enum values keep their meaning forever; new values may be added in a minor
  bump.
- Every change documents its compatibility impact in
  [CHANGELOG.md](CHANGELOG.md).

## Code of conduct

Be direct, be honest, assume good faith. Disagreement about scope is normal and
healthy — argue it in issues, not in PR review tone.

## License

By contributing, you agree your contributions are licensed under
[AGPL-3.0](LICENSE).
