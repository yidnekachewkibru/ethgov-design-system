---
id: index
title: Accessibility
slug: /accessibility
---

# Accessibility

Accessible government is not optional. ETHDS targets **WCAG 2.2 AA** as a
minimum across every token, component, pattern, and template — and this
documentation site is held to the same standard.

## Accessibility statement for this site

This site aims to conform to WCAG 2.2 AA. In particular:

- **Keyboard:** all navigation, search, and the language menu are operable
  by keyboard, with a visible focus indicator (ETHDS focus blue, ≥ 3:1).
- **Contrast:** text and UI colours come from `@ethds/tokens`, whose
  pairings are verified against WCAG 2.2 AA.
- **Reduced motion:** the design tokens include a
  `prefers-reduced-motion` block that removes non-essential animation.
- **Structure:** pages use sequential headings and semantic landmarks.
- **Languages:** each locale sets the correct document language so
  assistive technology pronounces content appropriately.

If you find an accessibility barrier on this site, please
[open an issue](https://github.com/yidnekachewkibru/ethgov-design-system/issues).

## The ETHDS accessibility commitment

Accessibility is built into the building blocks, so teams that compose
ETHDS correctly inherit an accessible service by default. The standards
that components are built and tested against — keyboard, screen reader,
focus management, contrast, and motion — are defined by the
[Accessibility Framework](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/phases/phase-5-accessibility-framework.md)
(Phase 5).

## Verified contrast

The brand palette's contrast ratios are measured, not assumed — see the
[colour accessibility analysis](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/accessibility-analysis.md).
The `@ethds/tokens` test suite re-checks these invariants on every build,
so the palette cannot silently regress below AA.
