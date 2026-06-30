# Phase 5 — Accessibility Framework

**Status:** 📋 Planned

## Goal

Turn "WCAG 2.2 AA minimum" from a stated requirement
(see [`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md))
into an enforceable framework with concrete standards and a testing
process.

## Deliverables

- Accessibility Policy
- WCAG Mapping (which WCAG 2.2 success criteria apply to which ETHDS
  component/pattern categories)
- Keyboard Navigation Standards
- Screen Reader Standards
- Focus Management Standards
- Contrast Requirements
- Motion Standards (including reduced-motion support)
- Testing Framework (automated + manual testing process, tooling choice)
- Accessibility Checklist (used in PR review, per
  [`CONTRIBUTING.md`](../../CONTRIBUTING.md#accessibility-and-localization))

## Output Location

Documentation under `docs/accessibility/` (published via
[Phase 4](phase-4-documentation-platform.md)); testing tooling integrated
into CI for `packages/ethds-react` once it exists
([Phase 7](phase-7-core-components.md)).

## Dependencies

- [Phase 1 — Design Principles](phase-1-design-principles.md)
  (Accessibility principle) for the underlying commitment this phase
  operationalizes.

## Consumed By

- [Phase 7 — Core Components](phase-7-core-components.md) and every
  phase after it — this framework is the bar every component, pattern,
  and template is built and tested against.
