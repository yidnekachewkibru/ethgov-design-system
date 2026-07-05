# ETHDS Accessibility Framework

Accessible government is not optional. This framework turns the
[Accessibility by Default](../design-principles/04-accessibility-by-default.md)
principle into enforceable standards and a testing process: **WCAG 2.2 AA
is the minimum every ETHDS token, component, pattern, and template must
meet** — a floor, not a target.

This is the standard that ETHDS itself is held to, and the standard that
government teams building on ETHDS inherit by default.

## Contents

| Document | Purpose |
|---|---|
| [Accessibility Policy](accessibility-policy.md) | The commitment, scope, and conformance target |
| [WCAG 2.2 Mapping](wcag-2.2-mapping.md) | Which success criteria apply, and where they are met |
| [Keyboard Navigation](keyboard-navigation.md) | Keyboard operability standards |
| [Screen Readers](screen-readers.md) | Semantics, names, roles, announcements |
| [Focus Management](focus-management.md) | Focus order, visibility, trapping, restoration |
| [Contrast Requirements](contrast-requirements.md) | Colour and non-text contrast rules |
| [Motion](motion.md) | Reduced motion and animation safety |
| [Testing Framework](testing-framework.md) | Automated + manual testing and CI gates |
| [Accessibility Checklist](checklist.md) | The per-change review checklist |
| [Manual Audit — 2026](manual-audit-2026.md) | The current automated/inspected coverage and what a human tester still needs to check |

## How this framework is used

- **Building ETHDS:** every component
  ([`@ethds/react`](../../packages/ethds-react/)), pattern
  ([`@ethds/patterns`](../../packages/ethds-patterns/)), and
  template ([`@ethds/templates`](../../packages/ethds-templates/)) is built to
  these standards and tested against them before merge.
- **Reviewing contributions:** the [checklist](checklist.md) is applied to
  every PR that adds or changes UI — accessibility is a **merge
  requirement**, not optional review feedback
  ([CONTRIBUTING.md](../../CONTRIBUTING.md#accessibility-and-localization)).
- **Building services on ETHDS:** government teams follow these standards
  for anything they build beyond the provided components.

## Relationship to the rest of ETHDS

- The colour rules here are backed by the **measured** contrast analysis
  in [`docs/brand/accessibility-analysis.md`](../brand/accessibility-analysis.md),
  and enforced by the contrast tests in
  [`@ethds/tokens`](../../packages/ethds-tokens/).
- Accessibility and [localization](../localization/)
  are interdependent: accessible names, error messages, and language
  metadata must be correct in all six supported languages.
