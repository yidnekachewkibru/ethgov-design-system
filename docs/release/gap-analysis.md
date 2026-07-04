# Gap Analysis

Measured against the
[v1.0 success criteria](../foundation/success-metrics.md#v10-readiness).
Each criterion: **Met**, **Partial**, or **Open**, with the specific gap.

> Re-run after the patterns/templates/E2E/release gap-closing tracks
> (`@ethds/patterns`, `@ethds/templates`, Playwright E2E, manual audit doc,
> Changesets scaffold). Four rows moved since the previous audit — see the
> row notes.

| # | v1.0 criterion | Status | Gap |
|---|---|---|---|
| 1 | Documentation platform complete | ✅ Met | Deployed Docusaurus site, now with a full live-rendered [Components section](../../packages/ethds-docs/docs/components/) (33 pages); content grows over time. |
| 2 | Accessibility framework complete | ✅ Met | Framework done; axe CI gate live; **Playwright E2E now live** (component-level flows + the Login pattern) and a [manual audit doc](../accessibility/manual-audit-2026.md) exists — see #12 for what's still open within it. |
| 3 | Localization framework complete | ✅ Met | Framework done; **translations** are a separate item (#13) — unchanged. |
| 4 | Design tokens complete | ✅ Met | `@ethds/tokens` built, tested, CI. |
| 5 | Core components complete | ✅ Met | **32 components** (was 18), tested + axe + CI, incl. `DateInput` (Ethiopian calendar), `FileUpload`, `CharacterCount`, `Details`, `BackLink`, `CookieBanner`/`PhaseBanner`, `ErrorSummary`, `SummaryList`, and tile variants. |
| 6 | Government patterns complete | ✅ Met | `@ethds/patterns` (`v0.1.0`, publishable) ships all 10 documented patterns as tested, `vitest-axe`-clean React compositions, plus the shared `useMultiStepForm` hook. |
| 7 | Templates complete | ✅ Met | `@ethds/templates` (`v0.1.0`, publishable) ships all 12 documented templates as tested compositions, including the Service Application Page hosting `@ethds/patterns`' Application Submission flow. |
| 8 | Example implementations complete | 🟡 Partial | Documented architecture + composition; **not runnable/deployed apps** — unchanged. |
| 9 | Governance framework complete | ✅ Met | Full governance set + RFC archive + SECURITY.md. |
| 10 | CI/CD pipelines operational | 🟡 Partial | `tokens` + `react` + `docs` + **`patterns`** + **`templates`** + **`e2e`** CI all live; **Changesets version-PR automation is wired** (`.github/workflows/release.yml`) but **no npm publish pipeline** — publishing stays a deliberate manual step. |
| 11 | Contribution process operational | ✅ Met | CONTRIBUTING, RFC process, review processes, ladder. |
| 12 | WCAG 2.2 AA verified | 🟡 Partial | Token contrast tests, a live axe CI gate (component + pattern + template suites), and Playwright E2E (keyboard-only flows, focus-on-mount, `aria-current`, reduced-motion, 320px reflow, axe-in-browser smoke) all pass. The [manual audit doc](../accessibility/manual-audit-2026.md) is honest that it's authored without real assistive-technology hardware: every NVDA/VoiceOver/TalkBack item, and subjective zoom/forced-colors judgment, is tagged **Open — requires a human tester**. |
| 13 | All supported languages functional | 🔴 Open | Only **English** authored; am/om/ti/so/aa fall back to English — **not yet functional in content**. Verified: `packages/ethds-docs/i18n/` has no locale subdirectories yet. |

## The punch-list (what stands between here and a true v1.0)

**Largest:**

1. **Translations (#13).** Author (and review) am/om/ti/so/aa for the docs
   site and any shipped component strings. Needs translators — the
   [translation workflow](../localization/translation-workflow.md) and
   [review process](../governance/localization-review-process.md) are ready.

**Engineering:**

2. **`ethds-examples` apps (#8)** — turn the 4 reference designs into
   runnable, deployed apps.

**Quality gates:**

3. **Real assistive-technology testing (#12)** — the [manual audit
   doc](../accessibility/manual-audit-2026.md) covers what's automatable
   (axe, Playwright) and what's verifiable by code inspection; every
   NVDA/VoiceOver/TalkBack pass, and subjective zoom/forced-colors
   judgment, still needs a human tester with real AT hardware.
4. **npm publish (#10)** — Changesets is wired for version-PR automation
   (`@ethds/patterns` and `@ethds/templates` are both publishable,
   `0.1.0`); actually running `npm publish` and cutting first tagged
   releases is a deliberate manual step, not yet taken.

**Community:**

5. Establish the maintainer team + MAINTAINERS file and publish the
   conduct/security contact ([governance](../governance/)).

See [prioritized recommendations](improvement-recommendations.md) and the
[readiness report](readiness-report.md) for the verdict.
