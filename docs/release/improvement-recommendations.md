# Improvement Recommendations

Prioritized next steps to move ETHDS from a strong release candidate to a
true, launched v1.0. Ordered by impact-to-effort for citizens.

> Revised after the patterns/templates/E2E/release gap-closing tracks.
> Recommendations #2, #5, and #6 below are **done**; #4's Changesets
> half is done, its npm-publish half is not.

## P0 — required for a credible v1.0

1. **Author the five non-English translations.**
   The single biggest gap for a system whose first principle is
   multilingual service. Start with the docs site and any shipped strings;
   use the [translation workflow](../localization/translation-workflow.md)
   and per-language [review](../governance/localization-review-process.md).
   *Needs: translators/reviewers per language.*

2. ~~Add Playwright E2E and a manual WCAG 2.2 AA audit.~~ **Done.**
   `packages/ethds-e2e` runs Playwright against `@ethds/react` (component
   flows, reduced-motion, 320px reflow, an axe-in-browser smoke test) and
   `@ethds/patterns` (a full keyboard-only Login flow), gated in CI
   (`.github/workflows/e2e.yml`). The
   [manual audit doc](../accessibility/manual-audit-2026.md) tags every
   item as automated, code-inspected, or **open — needs a human tester
   with real AT** (it was authored without access to real AT hardware,
   so it's honest about what it isn't).

3. ~~Add a docs-build check on pull requests.~~ **Done** —
   `.github/workflows/docs.yml` runs the full docs build (all 6 locales)
   on every push/PR touching the docs, tokens, or react packages.

4. **Cut the first releases.**
   The Changesets **version-PR** side is wired
   (`.github/workflows/release.yml`, `.changeset/config.json` with
   `access: "restricted"`) and `@ethds/patterns`/`@ethds/templates` are
   both publishable at `0.1.0` — but no workflow runs `npm publish` and no
   npm token is referenced anywhere. Actually publishing the first
   releases remains a deliberate manual step
   ([release management](../governance/release-management.md)).

## P1 — turn documented specs into shipped code

5. ~~Build `@ethds/patterns`~~ **Done** — all 10 documented patterns
   ship as tested, `vitest-axe`-clean React compositions (`v0.1.0`,
   publishable), plus the shared `useMultiStepForm` hook.

6. ~~Build `@ethds/templates`~~ **Done** — all 12 documented templates
   ship as tested compositions (`v0.1.0`, publishable), including the
   Service Application Page hosting `@ethds/patterns`' Application
   Submission flow.

7. **Build one `ethds-examples` app end-to-end** (e.g. the Immigration
   portal) as a runnable, deployed reference — it will surface real
   integration gaps that feed fixes back into the packages.

## P2 — sustainability & polish

8. **Establish the maintainer team** and publish `MAINTAINERS.md` + the
   conduct/security contact; recruit reviewers across organisations
   ([sustainability plan](../governance/sustainability-plan.md)).

9. **Grow `@ethds/icons`** into a real icon set (today a small starter set
   lives inside `@ethds/react`).

10. **Add coverage thresholds** and a bundle-size budget check to CI to
    hold the [low-bandwidth](../design-principles/06-design-for-low-bandwidth.md)
    line.

11. **Publish the accessibility audit and a public roadmap** so adopters
    can plan.

## Sequencing

P0's remaining items are independent (translations need people, not code;
npm publish is a deliberate go/no-go decision, not an engineering task).
P1's remaining item (`ethds-examples`) can follow the component pattern
already proven in `@ethds/react`, `@ethds/patterns`, and `@ethds/templates`.
P2 is ongoing.
