# Accessibility Policy

## Commitment

Every Ethiopian citizen has an equal right to government services. ETHDS
is committed to ensuring that services built with it are usable by people
with disabilities — including people who are blind or have low vision, who
are Deaf or hard of hearing, who have motor or cognitive disabilities, and
people using assistive technology or constrained devices.

When a government service is inaccessible, it does not merely inconvenience
a citizen — it denies them a public service they are entitled to. ETHDS
treats accessibility as a non-negotiable requirement, not a feature.

## Conformance target

- **Minimum: WCAG 2.2 Level AA.** This is the floor for every released
  token, component, pattern, and template. ETHDS targets WCAG 2.2
  specifically (not 2.1), so the new 2.2 criteria — Focus Not Obscured,
  Dragging Movements, Target Size (Minimum), Consistent Help, Redundant
  Entry, and Accessible Authentication — are in scope. See the
  [WCAG 2.2 Mapping](wcag-2.2-mapping.md).
- **Level AAA** criteria are adopted where reasonable (e.g. higher
  contrast, no timing) but are not a blanket requirement.

## Scope

This policy applies to:

- The ETHDS packages themselves — `@ethds/tokens`, `@ethds/react`,
  `@ethds/icons`, `@ethds/patterns`, `@ethds/templates`.
- The ETHDS documentation site (`ethds-docs`).
- Reference implementations (`ethds-examples`).

Government teams building services on ETHDS are expected to uphold the
same standard for anything they build beyond the provided components.

## Responsibilities

- **Contributors** demonstrate, in every UI change, how the relevant
  standards were met (the [checklist](checklist.md)).
- **Accessibility reviewers** have required sign-off on changes affecting
  accessibility, per the
  [governance model](../governance/governance-model.md). The review
  process is formalised in
  [Phase 11](../phases/phase-11-open-source-governance.md).
- **Maintainers** do not merge UI changes that regress accessibility or
  ship without the required checks.

## Non-negotiables

A change must not ship if it:

- Cannot be operated by keyboard alone.
- Lacks an accessible name for an interactive control.
- Relies on colour as the only means of conveying information.
- Drops below the [contrast requirements](contrast-requirements.md).
- Ignores the user's reduced-motion preference for non-essential motion.
- Is inaccessible in any of the six supported languages.

## Feedback and redress

Accessibility issues are treated as defects. Anyone may report a barrier
by opening a GitHub issue; reported accessibility defects are
prioritised. Services built on ETHDS should publish their own
accessibility statement and contact route, as the
[documentation site does](../../packages/ethds-docs/docs/accessibility/index.md).
