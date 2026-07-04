# Launch Checklist

Concrete tasks to reach and announce ETHDS v1.0. Grouped by the
[readiness report](readiness-report.md) verdict; P0 items block v1.0.

> Re-checked after PRs #14–#16: the accessibility CI gate item is now
> checked off (it was open at the original audit); everything else below
> was re-verified against the current repo and is still open.

## Content & localization (P0)

- [ ] Author English strings for any remaining shipped component text.
- [ ] Translate the docs site + shipped strings into **am, om, ti, so, aa**.
- [ ] Per-language localization review sign-off
      ([process](../governance/localization-review-process.md)).
- [ ] Coverage check green (no missing keys vs English).
- [ ] Spot-check rendering in Ge'ez script (Amharic/Tigrinya) on a real
      device.

## Accessibility (P0)

- [x] axe gate on `@ethds/react` components in CI — live in
      `.github/workflows/react.yml`, runs on every push/PR, blocks merge
      on a violation (137 cases across 32 components).
- [ ] Extend the axe gate to patterns/templates once they're built as code
      (see "Code packages" below).
- [ ] Playwright keyboard/screen-reader E2E for `@ethds/react` in CI.
- [ ] One documented **manual WCAG 2.2 AA audit** (NVDA/VoiceOver/TalkBack,
      zoom, reduced-motion, forced-colors).
- [ ] Publish the audit result on the docs site's accessibility page.

## Release engineering (P0)

- [x] Add a docs-build CI check on pull requests — `.github/workflows/docs.yml`
      now runs `npm run build -w ethds-docs` (all 6 locales) on every
      push/PR touching the docs, tokens, or react packages, alongside the
      existing deploy-on-push-to-`main` job.
- [ ] Changesets → npm publish pipeline configured.
- [ ] Tag and publish `@ethds/tokens` and `@ethds/react` `1.0.0`.
- [ ] Verify installs from npm in a fresh project (tokens CSS + components).

## Code packages (P1 — for full-scope v1.0)

- [ ] `@ethds/patterns` built + tested (10 patterns).
- [ ] `@ethds/templates` built + tested (12 templates).
- [ ] At least one `ethds-examples` app runnable + deployed.
- [ ] `@ethds/icons` published as a real icon set.

## Governance & community (P1/P2)

- [ ] `MAINTAINERS.md` with the initial maintainer/reviewer team.
- [ ] Publish the conduct + security contact
      ([community model](../governance/community-model.md), [SECURITY.md](../../SECURITY.md)).
- [ ] Confirm the RFC process works end-to-end on one real RFC.

## Repo & ops

- [ ] Repo **Settings → Pages → GitHub Actions** enabled (docs deploy live).
- [ ] Branch protection on `main` (required CI checks).
- [ ] Bundle-size budget check in CI (low-bandwidth guardrail).
- [ ] Delete merged phase branches; keep `main` tidy.

## Announce

- [ ] v1.0 readiness report published and linked from the docs home.
- [ ] Public roadmap for post-1.0 work.
- [ ] Announcement to adopting government bodies with a "getting started"
      pointer.

---

When the **P0** groups are fully checked and the
[gap analysis](gap-analysis.md) partials flip to Met, ETHDS is v1.0.
