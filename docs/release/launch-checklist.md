# Launch Checklist

Concrete tasks to reach and announce ETHDS v1.0. Grouped by the
[readiness report](readiness-report.md) verdict; P0 items block v1.0.

> Re-checked after the patterns/templates/E2E/release gap-closing tracks:
> the accessibility E2E and manual-audit-doc items, the Changesets
> version-PR wiring, and both code-package items are now checked off.
> Actually publishing to npm, real-AT manual testing, translations, and
> `ethds-examples` remain open.

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
- [x] Extend the axe gate to patterns/templates — `.github/workflows/patterns.yml`
      and `.github/workflows/templates.yml` run the same `vitest-axe` bar
      on every pattern and template.
- [x] Playwright keyboard/screen-reader E2E for `@ethds/react` in CI —
      `packages/ethds-e2e`, gated by `.github/workflows/e2e.yml` (component
      flows plus the `@ethds/patterns` Login flow).
- [x] One documented **manual WCAG 2.2 AA audit** —
      [`docs/accessibility/manual-audit-2026.md`](../accessibility/manual-audit-2026.md),
      structured per the [checklist](../accessibility/checklist.md) with every
      item tagged automated / code-inspected / open.
- [ ] Have a human tester with real AT (NVDA/VoiceOver/TalkBack) work
      through the items the manual audit doc tags "open" — it was authored
      without access to real AT hardware.
- [ ] Publish the audit result on the docs site's accessibility page (it
      currently lives only in `docs/accessibility/`, not mirrored into
      `packages/ethds-docs`).

## Release engineering (P0)

- [x] Add a docs-build CI check on pull requests — `.github/workflows/docs.yml`
      now runs `npm run build -w ethds-docs` (all 6 locales) on every
      push/PR touching the docs, tokens, or react packages, alongside the
      existing deploy-on-push-to-`main` job.
- [x] Changesets version-PR automation configured — `.changeset/config.json`
      (`access: "restricted"`) + `.github/workflows/release.yml`
      (`changesets/action` in version-PR mode only; no `publish` step, no
      npm token referenced anywhere) + `.github/workflows/changeset-check.yml`
      (PR gate: fails if a publishable package changed without a changeset).
- [ ] Actually run `npm publish` and tag the first releases (`@ethds/tokens`,
      `@ethds/react`, `@ethds/patterns`, `@ethds/templates` `1.0.0`) — a
      deliberate manual step, not yet taken.
- [ ] Verify installs from npm in a fresh project (tokens CSS + components).

## Code packages (P1 — for full-scope v1.0)

- [x] `@ethds/patterns` built + tested (10 patterns), publishable `v0.1.0`.
- [x] `@ethds/templates` built + tested (12 templates, incl. the Service
      Application Page hosting `@ethds/patterns`), publishable `v0.1.0`.
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
