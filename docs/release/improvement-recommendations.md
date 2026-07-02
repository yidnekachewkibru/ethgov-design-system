# Improvement Recommendations

Prioritized next steps to move ETHDS from a strong release candidate to a
true, launched v1.0. Ordered by impact-to-effort for citizens.

## P0 — required for a credible v1.0

1. **Author the five non-English translations.**
   The single biggest gap for a system whose first principle is
   multilingual service. Start with the docs site and any shipped strings;
   use the [translation workflow](../localization/translation-workflow.md)
   and per-language [review](../governance/localization-review-process.md).
   *Needs: translators/reviewers per language.*

2. **Wire the accessibility CI gate.**
   Add Playwright keyboard/screen-reader-oriented E2E for `@ethds/react`
   and an axe gate; run in CI on every UI PR. Produce one **manual WCAG
   2.2 AA audit report** to back the "verified" claim.
   *Needs: Playwright setup (Chromium is already available in CI images).*

3. **Cut the first releases.**
   Stand up the Changesets → npm publish pipeline and tag `@ethds/tokens`
   and `@ethds/react` `1.0.0` once the above gates are green
   ([release management](../governance/release-management.md)).

## P1 — turn documented specs into shipped code

4. **Build `@ethds/patterns`** — implement the 10 documented patterns as
   tested React compositions (same bar as `@ethds/react`).

5. **Build `@ethds/templates`** — implement the 12 documented templates.

6. **Build one `ethds-examples` app end-to-end** (e.g. the Immigration
   portal) as a runnable, deployed reference — it will surface real
   integration gaps that feed fixes back into the packages.

## P2 — sustainability & polish

7. **Establish the maintainer team** and publish `MAINTAINERS.md` + the
   conduct/security contact; recruit reviewers across organisations
   ([sustainability plan](../governance/sustainability-plan.md)).

8. **Grow `@ethds/icons`** into a real icon set (today a small starter set
   lives inside `@ethds/react`).

9. **Add coverage thresholds** and a bundle-size budget check to CI to hold
   the [low-bandwidth](../design-principles/06-design-for-low-bandwidth.md)
   line.

10. **Publish the accessibility audit and a public roadmap** so adopters can
    plan.

## Sequencing

P0 items are independent and can run in parallel (translations need people,
not code). P1 is the bulk of remaining engineering and can follow the
component pattern already proven in `@ethds/react`. P2 is ongoing.
