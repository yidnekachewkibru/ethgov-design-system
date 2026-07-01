# Phase 7 — Core Components

**Status:** 🚧 In Progress — foundation batch shipped (8 of 18 components)

## Goal

Build the `@ethds/react` component library — the foundational building
blocks every government service pattern and template is composed from.

## Progress

The `@ethds/react` package is live in
[`packages/ethds-react/`](../../packages/ethds-react/) with a full tooling
setup (Vite library build, Vitest + Testing Library + `vitest-axe`,
Storybook, `eslint-plugin-jsx-a11y`) consuming `@ethds/tokens`. CI:
[`.github/workflows/react.yml`](../../.github/workflows/react.yml).

**Shipped (8):** Button, Link, Typography (Heading/Text), Icon, TextInput,
TextArea, Alert, Breadcrumb — each with TypeScript types, CSS-module
styling from tokens, tests (render + interaction + axe), and a Storybook
story. 36 tests passing.

**Remaining (10, tracked):** Header, Footer, Language Switcher, Search,
Select, Checkbox, Radio, Notification, Table, Pagination — see
[`_scaffold`](../../packages/ethds-react/src/components/_scaffold/README.md).

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
