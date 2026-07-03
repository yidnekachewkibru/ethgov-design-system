# Gap Analysis

Measured against the
[v1.0 success criteria](../foundation/success-metrics.md#v10-readiness).
Each criterion: **Met**, **Partial**, or **Open**, with the specific gap.

> Re-run after PRs #14–#16 (component docs, missing components, and the
> Ethiopian-calendar `DateInput` + remaining GOV.UK/USWDS gap items).
> Three rows moved since the original audit — see the row notes.

| # | v1.0 criterion | Status | Gap |
|---|---|---|---|
| 1 | Documentation platform complete | ✅ Met | Deployed Docusaurus site, now with a full live-rendered [Components section](../../packages/ethds-docs/docs/components/) (33 pages); content grows over time. |
| 2 | Accessibility framework complete | ✅ Met | Framework done; the axe **CI gate is now live** (was a gap item — see #12); E2E/manual-audit depth is a separate item. |
| 3 | Localization framework complete | ✅ Met | Framework done; **translations** are a separate item (#13) — unchanged. |
| 4 | Design tokens complete | ✅ Met | `@ethds/tokens` built, tested, CI. |
| 5 | Core components complete | ✅ Met | **32 components** (was 18), tested + axe + CI, incl. `DateInput` (Ethiopian calendar), `FileUpload`, `CharacterCount`, `Details`, `BackLink`, `CookieBanner`/`PhaseBanner`, `ErrorSummary`, `SummaryList`, and tile variants. |
| 6 | Government patterns complete | 🟡 Partial | Documented specs + composition code; **not a compiled/tested `@ethds/patterns` package** — unchanged. |
| 7 | Templates complete | 🟡 Partial | Documented specs + composition code; **not a compiled/tested `@ethds/templates` package** — unchanged. |
| 8 | Example implementations complete | 🟡 Partial | Documented architecture + composition; **not runnable/deployed apps** — unchanged. |
| 9 | Governance framework complete | ✅ Met | Full governance set + RFC archive + SECURITY.md. |
| 10 | CI/CD pipelines operational | 🟡 Partial | `tokens` + `react` + **`docs`** CI (incl. the axe gate and a docs-build check on every PR, not just deploy-on-push) and Pages deploy all live; **no npm publish pipeline; no E2E gate; no gate for patterns/templates (no code to gate yet)**. |
| 11 | Contribution process operational | ✅ Met | CONTRIBUTING, RFC process, review processes, ladder. |
| 12 | WCAG 2.2 AA verified | 🟡 Partial | Token contrast tests **and a live axe CI gate** (137 cases, blocks merge on violation) both pass — this is stronger than the original audit recorded. **Still missing:** a documented manual audit (NVDA/VoiceOver/TalkBack, zoom, reduced-motion, forced-colors) and Playwright keyboard/SR E2E. |
| 13 | All supported languages functional | 🔴 Open | Only **English** authored; am/om/ti/so/aa fall back to English — **not yet functional in content**. Verified: `packages/ethds-docs/i18n/` has no locale subdirectories yet. |

## The punch-list (what stands between here and a true v1.0)

**Largest:**

1. **Translations (#13).** Author (and review) am/om/ti/so/aa for the docs
   site and any shipped component strings. Needs translators — the
   [translation workflow](../localization/translation-workflow.md) and
   [review process](../governance/localization-review-process.md) are ready.

**Engineering (turn docs into shipped code):**

2. **`@ethds/patterns` package (#6)** — build the 10 documented patterns as
   tested React compositions.
3. **`@ethds/templates` package (#7)** — build the 12 documented templates
   as tested compositions.
4. **`ethds-examples` apps (#8)** — turn the 4 reference designs into
   runnable, deployed apps.

**Quality gates:**

5. **Playwright E2E + manual audit (#12)** — the axe unit-test gate and the
   docs-build PR gate are both already live in CI; what's left is
   keyboard/screen-reader E2E flows and one documented manual WCAG 2.2 AA
   audit.
6. **Release pipeline (#10)** — npm publish via Changesets; first tagged
   releases.

**Community:**

7. Establish the maintainer team + MAINTAINERS file and publish the
   conduct/security contact ([governance](../governance/)).

See [prioritized recommendations](improvement-recommendations.md) and the
[readiness report](readiness-report.md) for the verdict.
