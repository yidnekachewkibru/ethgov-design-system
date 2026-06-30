# Phase 5 — Accessibility Framework

**Status:** ✅ Complete

## Goal

Turn "WCAG 2.2 AA minimum" from a stated requirement
(see [`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md))
into an enforceable framework with concrete standards and a testing
process.

## Deliverables

All delivered under [`docs/accessibility/`](../accessibility/):

- Accessibility Policy — [accessibility-policy.md](../accessibility/accessibility-policy.md)
- WCAG 2.2 Mapping — [wcag-2.2-mapping.md](../accessibility/wcag-2.2-mapping.md)
  (incl. the six new-in-2.2 criteria and which package owns each)
- Keyboard Navigation Standards — [keyboard-navigation.md](../accessibility/keyboard-navigation.md)
- Screen Reader Standards — [screen-readers.md](../accessibility/screen-readers.md)
- Focus Management Standards — [focus-management.md](../accessibility/focus-management.md)
- Contrast Requirements — [contrast-requirements.md](../accessibility/contrast-requirements.md)
  (backed by the measured [brand analysis](../brand/accessibility-analysis.md)
  and the `@ethds/tokens` contrast tests)
- Motion Standards — [motion.md](../accessibility/motion.md)
- Testing Framework — [testing-framework.md](../accessibility/testing-framework.md)
  (eslint-jsx-a11y, axe-core/vitest-axe, Playwright + @axe-core/playwright,
  Storybook a11y, manual screen-reader passes)
- Accessibility Checklist — [checklist.md](../accessibility/checklist.md)
  (the PR/review merge gate)

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
