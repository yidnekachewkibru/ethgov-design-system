# ETHDS Audit

A review of ETHDS across the nine areas from the master guide. Each area
gets an honest rating: ✅ solid, 🟡 partial, 🔵 documented-not-yet-built.

## 1. Architecture — ✅

- npm-workspaces monorepo with 8 `packages/*` and a clear
  [repository strategy](../governance/repository-strategy.md).
- Clean dependency direction: tokens → components → patterns → templates →
  examples. `@ethds/tokens` is dependency-free; `@ethds/react` avoids a
  Tailwind runtime dependency.
- Two-tier design-token architecture (global + semantic) with a
  zero-dependency build.

## 2. Accessibility — ✅ (framework + components) / 🟡 (automation)

- A full [Accessibility Framework](../accessibility/): policy, WCAG 2.2
  mapping (incl. the new-in-2.2 criteria), keyboard/screen-reader/focus/
  contrast/motion standards, testing framework, and a review checklist.
- `@ethds/react` components are built to it and covered by `vitest-axe`
  tests (80 passing cases).
- **Gap:** Playwright keyboard/E2E and a live axe CI gate across
  patterns/templates are not yet wired; no manual audit report yet.

## 3. Localization — ✅ (framework) / 🔵 (translations)

- A full [Localization Framework](../localization/): six-locale
  architecture, ICU translation structure, and Ethiopian formatting
  (Ethiopian calendar, Birr, phone, names, address).
- Components are localization-ready (all text via props); the docs site is
  i18n-configured for all six locales.
- **Gap:** the five non-English translations are **not authored** — locales
  fall back to English. This is the largest content gap for a true "all
  languages functional" v1.0.

## 4. Design Consistency — ✅

- One source of truth (`@ethds/tokens`) drives components, the docs site
  theme, and the reference brand assets — verified identical variable
  names.
- Shared [brand system](../brand/) and government branding standards;
  templates all use the shared Header/Footer identity.

## 5. Documentation — ✅

- Deployed [Docusaurus site](../../packages/ethds-docs/) (GitHub Pages),
  plus comprehensive in-repo docs: principles, brand, accessibility,
  localization, governance, and per-phase scope files.
- Patterns, templates, and reference implementations are documented with
  wireframes, component mapping, and composition code.

## 6. Component Quality — ✅ (react) / 🔵 (patterns/templates)

- `@ethds/react`: 18 components, TypeScript types, token-only styling,
  tests + axe, Storybook stories, CI.
- **Gap:** `@ethds/patterns`, `@ethds/templates`, `ethds-examples` are
  documented specs + composition code, **not compiled/tested packages** yet.

## 7. Test Coverage — 🟡

- `@ethds/tokens`: reference-resolution + WCAG contrast invariant tests.
- `@ethds/react`: 80 unit/interaction/axe tests across all 18 components;
  typecheck + build in CI.
- **Gap:** no coverage thresholds enforced; no E2E; patterns/templates have
  no automated tests (they're docs).

## 8. Repository Structure — ✅

- Consistent package layout, gitignored build artifacts, clear docs tree,
  and a roadmap that tracks every phase's status.
- CI workflows for `tokens` and `react`; a Pages deploy workflow.

## 9. Governance — ✅

- Full [governance set](../governance/): RFC process + archive, component/
  accessibility/localization review processes, `SECURITY.md`, release
  management, maintainer responsibilities, contributor ladder, community
  guidelines, and a sustainability plan.
- **Gap:** a real maintainer team / MAINTAINERS file and a published
  conduct/security contact are still to be established as the project grows.

## Summary

Six areas are solid (✅). The partials (🟡) are about **automation depth**
(E2E, coverage gates). The documented-not-built items (🔵) are the
**pattern/template/example code packages** and the **non-English
translations** — see the [gap analysis](gap-analysis.md).
