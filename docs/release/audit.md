# ETHDS Audit

A review of ETHDS across the nine areas from the master guide. Each area
gets an honest rating: ✅ solid, 🟡 partial, 🔵 documented-not-yet-built.

> Updated after the component-documentation, missing-components, and
> additional-components PRs (#14–#16), which grew `@ethds/react` from 18
> to **32** components, added a full live-rendered Components section to
> the docs site, and documented the grid system. See the
> [gap analysis](gap-analysis.md) for what these did and didn't close.

## 1. Architecture — ✅

- npm-workspaces monorepo with 8 `packages/*` and a clear
  [repository strategy](../governance/repository-strategy.md).
- Clean dependency direction: tokens → components → patterns → templates →
  examples. `@ethds/tokens` is dependency-free; `@ethds/react` avoids a
  Tailwind runtime dependency.
- Two-tier design-token architecture (global + semantic) with a
  zero-dependency build.

## 2. Accessibility — ✅ (framework + components + CI gate) / 🟡 (E2E, manual audit)

- A full [Accessibility Framework](../accessibility/): policy, WCAG 2.2
  mapping (incl. the new-in-2.2 criteria), keyboard/screen-reader/focus/
  contrast/motion standards, testing framework, and a review checklist.
- `@ethds/react` components are built to it and covered by `vitest-axe`
  tests (137 passing cases across 32 components) — and this **is** a live
  CI gate: `.github/workflows/react.yml` runs the full axe suite on every
  push/PR touching the package, so a violation blocks merge today, not
  just locally.
- **Gap:** no Playwright keyboard/screen-reader E2E yet; the axe gate
  covers `@ethds/react` only (patterns/templates have no compiled code to
  gate yet — see #6); no documented manual WCAG 2.2 AA audit report.

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
- Shared [brand system](../brand/) and government branding standards,
  including a formal [12-column grid](../brand/grid.md) (breakpoints,
  container widths, gutters) built on the same spacing scale; templates
  all use the shared Header/Footer identity.

## 5. Documentation — ✅

- Deployed [Docusaurus site](../../packages/ethds-docs/) (GitHub Pages),
  plus comprehensive in-repo docs: principles, brand, accessibility,
  localization, governance, and per-phase scope files.
- A full [Components section](../../packages/ethds-docs/docs/components/)
  — 33 pages, one per `@ethds/react` component, each with a **live-rendered
  example** (the real published component, not a screenshot), the code,
  When to use / When not to use, variants, an Accessibility section, and a
  Props table — the GOV.UK/USWDS-style depth the project didn't have at
  the time of the original v1.0 audit.
- Patterns, templates, and reference implementations are documented with
  wireframes, component mapping, and composition code (not live-rendered —
  see #6).

## 6. Component Quality — ✅ (react) / 🔵 (patterns/templates)

- `@ethds/react`: **32 components**, TypeScript types, token-only styling,
  tests + axe, Storybook stories, CI. Includes the full GOV.UK/USWDS-style
  form/feedback/navigation set: `DateInput` (Ethiopian calendar by
  default, per [RFC 0000](../../packages/ethds-rfcs/proposals/0000-example.md)),
  `FileUpload`, `CharacterCount`, `Details`, `BackLink`, `ErrorSummary`,
  `SummaryList`, `Panel`, `Tag`, `SkipLink`, `StepIndicator`,
  `PhaseBanner`, `CookieBanner`, and tile variants on `RadioGroup` /
  `CheckboxGroup`.
- **Gap:** `@ethds/patterns`, `@ethds/templates`, `ethds-examples` are
  documented specs + composition code, **not compiled/tested packages** yet.
  `@ethds/icons` is still a stub — the icon set lives inside `@ethds/react`
  in small numbers.

## 7. Test Coverage — 🟡

- `@ethds/tokens`: 19 tests — reference-resolution + WCAG contrast
  invariant tests.
- `@ethds/react`: **137** unit/interaction/axe tests across all 32
  components (33 test files); typecheck + build in CI on every push/PR.
- **156 tests total**, all green on `main` as of this audit.
- **Gap:** no coverage thresholds enforced; no E2E; patterns/templates have
  no automated tests (they're docs).

## 8. Repository Structure — ✅

- Consistent package layout, gitignored build artifacts, clear docs tree,
  and a roadmap that tracks every phase's status.
- CI workflows for `tokens`, `react` (build + test + typecheck on every
  push/PR), and now `docs` (a full 6-locale build on every push/PR
  touching the docs, tokens, or react packages — added in this audit
  cycle, closing the "docs build only checked on deploy" gap); a Pages
  deploy workflow (push to `main` only, unchanged).
- Zero broken internal links repo-wide, verified: 975 relative markdown
  links across 125 non-Docusaurus files plus 65 within the Docusaurus
  docs tree, all resolving; the Docusaurus build additionally fails on any
  broken link within its own site (`onBrokenLinks: 'throw'`), and does so
  cleanly across all 6 locales.

## 9. Governance — ✅

- Full [governance set](../governance/): RFC process + archive, component/
  accessibility/localization review processes, `SECURITY.md`, release
  management, maintainer responsibilities, contributor ladder, community
  guidelines, and a sustainability plan.
- **Gap:** a real maintainer team / MAINTAINERS file and a published
  conduct/security contact are still to be established as the project grows.

## Summary

Seven of nine areas are solid (✅), including accessibility's automated
axe CI gate, which is live today (not a future item). The remaining
partials (🟡) are about **automation depth beyond the axe gate** —
Playwright E2E, a manual audit, coverage thresholds, and a docs-build PR
check. The documented-not-built items (🔵) are unchanged from the
original audit: the **pattern/template/example code packages**,
`@ethds/icons`, and the **non-English translations** — see the
[gap analysis](gap-analysis.md).
