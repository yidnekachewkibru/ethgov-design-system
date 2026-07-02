# Gap Analysis

Measured against the
[v1.0 success criteria](../foundation/success-metrics.md#v10-readiness).
Each criterion: **Met**, **Partial**, or **Open**, with the specific gap.

| # | v1.0 criterion | Status | Gap |
|---|---|---|---|
| 1 | Documentation platform complete | ✅ Met | Deployed Docusaurus site; content grows over time. |
| 2 | Accessibility framework complete | ✅ Met | Framework done; automation depth is a separate item (#11/#12). |
| 3 | Localization framework complete | ✅ Met | Framework done; **translations** are a separate item (#13). |
| 4 | Design tokens complete | ✅ Met | `@ethds/tokens` built, tested, CI. |
| 5 | Core components complete | ✅ Met | 18 components, tested + axe + CI. |
| 6 | Government patterns complete | 🟡 Partial | Documented specs + composition code; **not a compiled/tested `@ethds/patterns` package**. |
| 7 | Templates complete | 🟡 Partial | Documented specs + composition code; **not a compiled/tested `@ethds/templates` package**. |
| 8 | Example implementations complete | 🟡 Partial | Documented architecture + composition; **not runnable/deployed apps**. |
| 9 | Governance framework complete | ✅ Met | Full governance set + RFC archive + SECURITY.md. |
| 10 | CI/CD pipelines operational | 🟡 Partial | `tokens` + `react` CI and Pages deploy live; **no npm publish pipeline; no a11y/E2E gate across patterns/templates**. |
| 11 | Contribution process operational | ✅ Met | CONTRIBUTING, RFC process, review processes, ladder. |
| 12 | WCAG 2.2 AA verified | 🟡 Partial | Token contrast + component axe tests pass; **no full manual audit report; no E2E keyboard/SR gate**. |
| 13 | All supported languages functional | 🔴 Open | Only **English** authored; am/om/ti/so/aa fall back to English — **not yet functional in content**. |

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

5. **CI a11y/E2E (#10/#12)** — Playwright keyboard/SR flows and an axe gate
   across components/patterns/templates; coverage thresholds; a documented
   manual WCAG 2.2 AA audit.
6. **Release pipeline (#10)** — npm publish via Changesets; first tagged
   releases.

**Community:**

7. Establish the maintainer team + MAINTAINERS file and publish the
   conduct/security contact ([governance](../governance/)).

See [prioritized recommendations](improvement-recommendations.md) and the
[readiness report](readiness-report.md) for the verdict.
