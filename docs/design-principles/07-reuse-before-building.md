# 7. Reuse Before Building

> Check ETHDS for an existing component or pattern before creating
> something new.

## Description

Before building something new, teams check whether ETHDS already provides
it — a component, a pattern, a template, a token. The default is to reuse
and, where needed, improve the shared building block rather than create a
one-off. New shared elements are added deliberately, through review, so
that what is built once benefits everyone and the system stays coherent
rather than fragmenting into near-duplicates.

## Rationale

The entire purpose of a design system is to solve common problems once,
well, and openly, so that every government team benefits. Every time a
team rebuilds a button, a form pattern, or a payment flow from scratch,
they re-incur the full cost of getting accessibility, localization, and
low-bandwidth performance right — and they usually get some of it wrong.
Reuse is what turns ETHDS from a library into a multiplier: improvements
to a shared component propagate to every service that uses it.

Reuse also protects consistency
([Consistent Government Experience](09-consistent-government-experience.md)).
Fifty services each inventing their own slightly different date picker
produces fifty slightly different, separately-maintained, separately-buggy
date pickers. One shared, well-tested component produces one good
experience everywhere.

## Examples

- A team needs a phone-number field with validation; they use the
  existing ETHDS [text input](../phases/phase-7-core-components.md) with
  the standard validation rather than writing a bespoke one.
- A ministry building an application flow composes the existing
  [Application Submission pattern](../phases/phase-8-government-service-patterns.md)
  instead of designing a new multi-step form from scratch.
- A team finds the shared component *almost* fits, so they propose an
  improvement to it via [RFC](../../CONTRIBUTING.md#proposing-significant-changes)
  — improving the shared block for everyone — rather than forking a
  private copy.

## Anti-patterns

- **Reinventing the wheel:** rebuilding a button, input, table, or flow
  that ETHDS already provides, re-incurring all the accessibility and
  localization work.
- **Copy-paste forking:** duplicating a component into one service and
  modifying the copy, so it never receives upstream fixes and drifts out
  of sync.
- **Not looking first:** building new because checking the system felt
  slower than just writing it — creating long-term cost to save minutes.
- **One-off variants:** introducing a slightly different version of an
  existing element for no substantive reason, fragmenting the system.

## Implementation Guidance

- Search the existing [components](../phases/phase-7-core-components.md),
  [patterns](../phases/phase-8-government-service-patterns.md),
  [templates](../phases/phase-9-website-templates.md), and
  [tokens](../phases/phase-3-design-tokens.md) before building anything
  new. Reuse is the default; building new is the exception that needs a
  reason.
- When an existing building block is close but not quite right, improve
  the shared block through an
  [RFC](../../CONTRIBUTING.md#proposing-significant-changes) rather than
  forking a private copy — fixes then reach every service.
- Use design [tokens](../phases/phase-3-design-tokens.md) instead of
  hardcoded values, so styling stays consistent and centrally
  updatable.
- Genuinely new shared components and patterns enter ETHDS through review
  ([governance model](../governance/governance-model.md)), keeping the
  system coherent instead of accumulating duplicates.
- Favour composing simple existing parts over inventing complex new ones,
  which reinforces [Simple Before Powerful](05-simple-before-powerful.md).
