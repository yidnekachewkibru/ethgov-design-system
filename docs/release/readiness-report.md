# Version 1.0 Readiness Report

## Verdict

**ETHDS is a strong release candidate with a complete foundation, but not
yet a finished v1.0.** The design language, the tested token and component
libraries (now 32 components, 156 tests, a live CI axe gate), the
documentation platform (now with a full live-rendered Components section),
the accessibility/localization/governance frameworks, and now the
**`@ethds/patterns` and `@ethds/templates` code packages** (both `v0.1.0`,
publishable) plus **Playwright E2E** and a **manual accessibility audit
doc** are real and solid. What remains before declaring v1.0 is
well-defined and tracked: authored translations, the `ethds-examples`
runnable apps, real assistive-technology testing to close out the manual
audit, and actually cutting the first published releases.

Recommended label today: **v1.0 Release Candidate** (or `0.x` published
packages), progressing to `1.0.0` as the [P0 items](improvement-recommendations.md)
close.

## Per-criterion status

Against the [v1.0 success criteria](../foundation/success-metrics.md#v10-readiness)
(detail in the [gap analysis](gap-analysis.md)):

| Criterion | Status |
|---|---|
| Documentation platform | ✅ Met — now incl. live component docs |
| Accessibility framework | ✅ Met — axe CI gate live |
| Localization framework | ✅ Met |
| Design tokens | ✅ Met |
| Core components | ✅ Met — 32 components (was 18) |
| Government patterns | ✅ Met — `@ethds/patterns` `v0.1.0`, publishable |
| Templates | ✅ Met — `@ethds/templates` `v0.1.0`, publishable |
| Example implementations | 🟡 Documented (runnable apps pending) |
| Governance framework | ✅ Met |
| CI/CD operational | 🟡 Partial (build/test/deploy + axe gate + Changesets version-PR automation yes; npm publish pending) |
| Contribution process | ✅ Met |
| WCAG 2.2 AA verified | 🟡 Automated axe gate + Playwright E2E live; real-AT manual testing pending |
| All languages functional | 🔴 English only; translations pending |

**Score: 10 Met · 2 Partial · 1 Open (of 13).** Up from 8 Met in the
previous audit cycle — Government patterns and Templates both moved from
Partial to Met.

## What "done" looks like

v1.0 is reached when the [P0 recommendations](improvement-recommendations.md)
are complete — translations authored and reviewed, the manual audit closed
out with real assistive-technology testing on top of the now-live axe gate
and Playwright E2E, and the first `1.0.0` packages actually published —
and the partials above flip to Met. The [launch checklist](launch-checklist.md)
tracks the concrete tasks.

## Why this honest posture matters

ETHDS exists to serve citizens, and its own first principles are
accessibility and multilingual service. Declaring v1.0 before the
translations exist or the accessibility gate is enforced would violate the
very standards the system asks others to meet. Shipping a credible
foundation now, and closing the punch-list transparently, is the right way
to reach a v1.0 that lives up to the name.
