# Annotations Conformance Suite

Tests annotation fidelity from [spec/annotations.md](../spec/annotations.md).
Requires the **collaboration** capability.

---

## A1. Annotation array round-trips

**Given:** a record with an `annotations` array of `{kind, value}` objects
**When:** stored then retrieved
**Then:** the array is returned with identical kinds and values.

## A2. Unknown annotation kind preserved

**Given:** an annotation with `kind:"confidence"` (or any non-standard kind)
**When:** stored then retrieved
**Then:** it is preserved, not dropped or coerced.

## A3. Annotation value types preserved

**Given:** annotations whose `value` is a string, a number, a boolean, an
object, and an array
**When:** stored then retrieved
**Then:** each value returns with its original JSON type.

## A4. Decision type retrievable

**Given:** a `type:"decision"` record with a `rationale` and `status` annotation
**When:** retrieved by type filter `types:["decision"]`
**Then:** it is returned with its annotations intact.

## A5. Rule type retrievable

**Given:** a `type:"rule"` record
**When:** retrieved
**Then:** it returns with `type:"rule"` unchanged.

## A6. Status carries as_of

**Given:** a `type:"status"` record with an `as_of` annotation
**When:** retrieved
**Then:** the `as_of` annotation is present so the consumer can judge staleness.

## A7. Task state preserved

**Given:** a `type:"task"` record with a `state` annotation
**When:** stored then retrieved
**Then:** the `state` annotation value is unchanged.
