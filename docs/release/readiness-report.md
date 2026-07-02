# Version 1.0 Readiness Report

## Verdict

**ETHDS is a strong release candidate with a complete foundation, but not
yet a finished v1.0.** The design language, the tested token and component
libraries, the documentation platform, and the accessibility/localization/
governance frameworks are real and solid. What remains before declaring
v1.0 is well-defined and tracked: authored translations, the
pattern/template/example **code** packages, and the CI accessibility/E2E
and release gates.

Recommended label today: **v1.0 Release Candidate** (or `0.x` published
packages), progressing to `1.0.0` as the [P0 items](improvement-recommendations.md)
close.

## Per-criterion status

Against the [v1.0 success criteria](../foundation/success-metrics.md#v10-readiness)
(detail in the [gap analysis](gap-analysis.md)):

| Criterion | Status |
|---|---|
| Documentation platform | ✅ Met |
| Accessibility framework | ✅ Met |
| Localization framework | ✅ Met |
| Design tokens | ✅ Met |
| Core components | ✅ Met |
| Government patterns | 🟡 Documented (code package pending) |
| Templates | 🟡 Documented (code package pending) |
| Example implementations | 🟡 Documented (runnable apps pending) |
| Governance framework | ✅ Met |
| CI/CD operational | 🟡 Partial (build/test/deploy yes; publish + a11y gate pending) |
| Contribution process | ✅ Met |
| WCAG 2.2 AA verified | 🟡 Automated pass; manual audit pending |
| All languages functional | 🔴 English only; translations pending |

**Score: 8 Met · 4 Partial · 1 Open (of 13).**

## What "done" looks like

v1.0 is reached when the [P0 recommendations](improvement-recommendations.md)
are complete — translations authored and reviewed, the accessibility CI
gate and a manual audit in place, and the first `1.0.0` packages published
— and the partials above flip to Met. The
[launch checklist](launch-checklist.md) tracks the concrete tasks.

## Why this honest posture matters

ETHDS exists to serve citizens, and its own first principles are
accessibility and multilingual service. Declaring v1.0 before the
translations exist or the accessibility gate is enforced would violate the
very standards the system asks others to meet. Shipping a credible
foundation now, and closing the punch-list transparently, is the right way
to reach a v1.0 that lives up to the name.
