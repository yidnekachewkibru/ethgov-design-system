# Phase 6 — Localization Framework

**Status:** 📋 Planned

## Goal

Define how multilingual support is actually implemented across ETHDS, so
"multilingual by default" (see
[`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md))
is a concrete, reusable system rather than a per-component afterthought.

## Deliverables

- Localization Strategy
- Language Architecture (covering English, Amharic, Afaan Oromo,
  Tigrinya, Somali, and Afar — including script/direction handling for
  Ge'ez-script languages)
- Translation Structure (file format, key structure, tooling)
- Date Formatting Standards
- Number Formatting Standards
- Currency Formatting Standards (Ethiopian Birr and any cross-border
  context)
- Address Standards (Ethiopian administrative regions/zones/woredas)
- Language Switcher Standard (the UX/behavior spec for the
  `LanguageSwitcher` component built in
  [Phase 7](phase-7-core-components.md))
- Translation Workflow
- Contributor Localization Guide

Generated with implementation examples (not just standards prose).

## Output Location

Documentation under `docs/localization/`; implementation lands in
`packages/ethds-react/` ([Phase 7](phase-7-core-components.md)) as the
i18n infrastructure components are built against.

## Dependencies

- [Phase 1 — Design Principles](phase-1-design-principles.md)
  (Multilingual Design principle).

## Consumed By

- [Phase 7 — Core Components](phase-7-core-components.md) onward — every
  component, pattern, and template must be built against this framework,
  not retrofit to it.
