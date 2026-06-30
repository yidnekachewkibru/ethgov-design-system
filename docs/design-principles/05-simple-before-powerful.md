# 5. Simple Before Powerful

> Favour the simplest solution that meets the need; add complexity only
> when a real requirement justifies it.

## Description

ETHDS prefers the plainest design and the smallest amount of
functionality that lets a citizen complete their task. Power, flexibility,
and configurability are added only when a concrete, demonstrated need
requires them — never speculatively. A simple service that does one thing
clearly is better than a powerful one that does many things confusingly.

## Rationale

Government services are used by the full population, including people with
low digital literacy, people under stress, and people using an unfamiliar
device. Every extra option, screen, or piece of cleverness is a chance to
confuse, to slow down, or to make someone abandon the task. Complexity
also has a hidden cost: it is harder to make accessible, harder to
translate into six languages, heavier to load on a slow connection, and
harder to maintain.

Simplicity is therefore not just an aesthetic preference — it compounds
with the other principles. The simplest version of a service is usually
also the most accessible, the most translatable, and the lightest. Adding
power "just in case" trades a certain, broad benefit (everyone can use
it) for an uncertain, narrow one (a few might need the extra capability).

## Examples

- An application form asks only for what is genuinely required to process
  the request, on as few screens as the task honestly needs — not every
  field the back office might one day find useful.
- A status page shows the one thing the citizen came for ("Approved —
  ready for pickup") prominently, with secondary detail available but not
  competing for attention.
- A new requirement is met by configuring or composing existing
  [components](../phases/phase-7-core-components.md) in the obvious way,
  rather than inventing a new bespoke widget with many options.

## Anti-patterns

- **Speculative flexibility:** building configurable options, modes, or
  fields for needs no one has actually demonstrated.
- **Feature creep:** adding capabilities because they are possible, until
  the core task is buried among secondary ones.
- **Over-collection:** asking for information that isn't required to
  complete the task — which also violates
  [Security and Privacy by Design](08-security-and-privacy-by-design.md).
- **Cleverness over clarity:** novel interactions or dense dashboards that
  impress reviewers but slow down the citizen.

## Implementation Guidance

- Start from the simplest design that completes the citizen's task, and
  add complexity only against a real, named requirement — document why
  when you do.
- Reduce required input to the minimum the task honestly needs; fewer
  fields is simpler *and* more private and faster.
- Prefer composing existing [components](../phases/phase-7-core-components.md)
  and [patterns](../phases/phase-8-government-service-patterns.md) in
  their default form over building configurable new ones, which connects
  to [Reuse Before Building](07-reuse-before-building.md).
- When a component genuinely needs new flexibility, raise it through an
  [RFC](../../CONTRIBUTING.md#proposing-significant-changes) so the
  complexity is justified and shared, not added ad hoc in one service.
- Measure success by whether the citizen completes the task, not by how
  much the interface can do.
