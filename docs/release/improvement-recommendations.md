# Improvement Recommendations

Prioritized next steps to move ETHDS from a strong release candidate to a
true, launched v1.0. Ordered by impact-to-effort for citizens.

> Revised after PRs #14–#16. Recommendation #2 below is **narrower** than
> in the original audit: the axe unit-test gate is already live in CI
> (`.github/workflows/react.yml` runs the full `vitest-axe` suite — 137
> cases — on every push/PR touching `@ethds/react`, and a violation blocks
> merge). What remains is E2E and the manual audit, not the gate itself.

## P0 — required for a credible v1.0

1. **Author the five non-English translations.**
   The single biggest gap for a system whose first principle is
   multilingual service. Start with the docs site and any shipped strings;
   use the [translation workflow](../localization/translation-workflow.md)
   and per-language [review](../governance/localization-review-process.md).
   *Needs: translators/reviewers per language.*

2. **Add Playwright E2E and a manual WCAG 2.2 AA audit.**
   The axe unit-test gate is done; add Playwright keyboard/screen-reader
   flows for `@ethds/react` in CI, and produce one **documented manual
   audit** (NVDA/VoiceOver/TalkBack, zoom, reduced-motion, forced-colors)
   to back the "verified" claim beyond automated testing.
   *Needs: Playwright setup (Chromium is already available in CI images).*

3. ~~Add a docs-build check on pull requests.~~ **Done in this audit
   cycle** — `.github/workflows/docs.yml` now runs the full docs build
   (all 6 locales) on every push/PR touching the docs, tokens, or react
   packages, so a broken internal link or locale regression is caught in
   CI before merge, mirroring `react.yml`'s pattern.

4. **Cut the first releases.**
   Stand up the Changesets → npm publish pipeline and tag `@ethds/tokens`
   and `@ethds/react` `1.0.0` once the above gates are green
   ([release management](../governance/release-management.md)).

## P1 — turn documented specs into shipped code

5. **Build `@ethds/patterns`** — implement the 10 documented patterns as
   tested React compositions (same bar as `@ethds/react`).

6. **Build `@ethds/templates`** — implement the 12 documented templates.

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

P0 items are independent and can run in parallel (translations need people,
not code; the docs-build check and Playwright/audit are also independent
of each other). P1 is the bulk of remaining engineering and can follow the
component pattern already proven in `@ethds/react`. P2 is ongoing.
