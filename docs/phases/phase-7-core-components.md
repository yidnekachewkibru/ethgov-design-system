# Phase 7 — Core Components

**Status:** 📋 Planned

## Goal

Build the `@ethds/react` component library — the foundational building
blocks every government service pattern and template is composed from.

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
