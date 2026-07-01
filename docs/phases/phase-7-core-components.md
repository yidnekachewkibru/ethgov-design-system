# Phase 7 — Core Components

**Status:** ✅ Complete — all 18 components shipped

## Goal

Build the `@ethds/react` component library — the foundational building
blocks every government service pattern and template is composed from.

## Delivered

The `@ethds/react` package is live in
[`packages/ethds-react/`](../../packages/ethds-react/) with a full tooling
setup (Vite library build, Vitest + Testing Library + `vitest-axe`,
Storybook, `eslint-plugin-jsx-a11y`) consuming `@ethds/tokens`. CI:
[`.github/workflows/react.yml`](../../.github/workflows/react.yml).

All **18 components** ship with TypeScript types, CSS-module styling from
tokens (no hardcoded design values), tests (render + interaction + axe),
and a Storybook story — **80 tests passing**:

- **Actions/text:** Button, Link, Typography (Heading/Text), Icon
- **Forms:** TextInput, TextArea, Checkbox, RadioGroup, Select, Search
- **Feedback:** Alert, Notification
- **Navigation/structure:** Breadcrumb, Pagination, Table, Header, Footer,
  LanguageSwitcher

Every component is built to the
[accessibility](../accessibility/) standards (semantic HTML, visible
focus, correct name/role/state, no colour-only signals) and is
localization-ready (all user-facing text passed in as props, per
[localization](../localization/); `LanguageSwitcher` implements the
[switcher spec](../localization/language-switcher.md)).

## Components

Button, Link, Typography, Icon, Header, Footer, Breadcrumb, Language
Switcher, Search, Text Input, Text Area, Select, Checkbox, Radio, Alert,
Notification, Table, Pagination.

## Deliverables (per component)

- Design Specification
- Accessibility Guidance
- React Component (TypeScript)
- TypeScript Types
- Tests
- Storybook Stories
- Documentation

Production-ready source code, not prototypes.

## Output Location

`packages/ethds-react/` (replaces the README-only stub) and
`packages/ethds-icons/` for the `Icon` component's underlying icon set.

## Dependencies

- [Phase 3 — Design Tokens](phase-3-design-tokens.md) (`@ethds/tokens`)
  for all visual values — no hardcoded colors/spacing in components.
- [Phase 5 — Accessibility Framework](phase-5-accessibility-framework.md)
  — every component must pass this phase's checklist before merge.
- [Phase 6 — Localization Framework](phase-6-localization-framework.md)
  — every component must support all six languages, and `Language
  Switcher` specifically implements that phase's UX spec.

## Consumed By

- [Phase 8 — Government Service Patterns](phase-8-government-service-patterns.md)
- [Phase 9 — Website Templates](phase-9-website-templates.md)
