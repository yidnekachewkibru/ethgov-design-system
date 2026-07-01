# Phase 6 — Localization Framework

**Status:** ✅ Complete

## Goal

Define how multilingual support is actually implemented across ETHDS, so
"multilingual by default" (see
[`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md))
is a concrete, reusable system rather than a per-component afterthought.

## Deliverables

All delivered under [`docs/localization/`](../localization/), with real
`Intl`/i18n implementation examples:

- Localization Strategy — [localization-strategy.md](../localization/localization-strategy.md)
- Language Architecture — [language-architecture.md](../localization/language-architecture.md)
  (six locales, Ge'ez/Latin scripts, `lang`/`dir`, fonts, resolution order)
- Translation Structure — [translation-structure.md](../localization/translation-structure.md)
  (ICU MessageFormat JSON catalogues, key naming, `react-intl` examples)
- Date & Time Formatting — [date-formatting.md](../localization/date-formatting.md)
  (Ethiopian + Gregorian calendars via `Intl` Ethiopic, EAT/Ethiopian time)
- Number Formatting — [number-formatting.md](../localization/number-formatting.md)
  (digits, separators, +251 phone/E.164, IDs)
- Currency Formatting — [currency-formatting.md](../localization/currency-formatting.md)
  (Ethiopian Birr / ETB, santim, minor-unit storage)
- Address Standards — [address-standards.md](../localization/address-standards.md)
  (Region→Zone/Sub-city→Woreda→Kebele; the given-name/father's-name convention)
- Language Switcher Standard — [language-switcher.md](../localization/language-switcher.md)
- Translation Workflow — [translation-workflow.md](../localization/translation-workflow.md)
- Contributor Localization Guide — [contributor-guide.md](../localization/contributor-guide.md)

## Output Location

[`docs/localization/`](../localization/). The i18n runtime, formatting
utilities, and `LanguageSwitcher` component land in
`packages/ethds-react/` ([Phase 7](phase-7-core-components.md)), built
against these standards.

## Dependencies

- [Phase 1 — Design Principles](phase-1-design-principles.md)
  (Multilingual Design principle).

## Consumed By

- [Phase 7 — Core Components](phase-7-core-components.md) onward — every
  component, pattern, and template must be built against this framework,
  not retrofit to it.
