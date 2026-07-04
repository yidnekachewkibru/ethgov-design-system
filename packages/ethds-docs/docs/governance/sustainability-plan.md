---
id: sustainability-plan
title: Long-Term Sustainability Plan
sidebar_position: 7
---

# Long-Term Sustainability Plan

A design system is only valuable if it is **maintained** for years. This
plan sets out how ETHDS stays healthy, funded, and resilient beyond any
individual contributor — so government teams can depend on it.

## Risks to sustainability

- **Bus factor** — too few people understand or can maintain the system.
- **Funding** — no resourcing for ongoing maintenance, accessibility
  audits, and translation.
- **Drift** — services fork/diverge instead of contributing back.
- **Staleness** — dependencies, WCAG versions, and platform norms move on.

## How ETHDS stays healthy

### Governance & people

- A documented [contributor ladder](contributor-ladder.md) and
  [maintainer responsibilities](maintainer-responsibilities.md) so
  stewardship can grow and hand over cleanly.
- Deliberately grow the maintainer/reviewer set **across organisations**
  (ministries, regional bodies, academia) so no single team is a single
  point of failure.
- Open decision-making ([RFCs](rfc-process.md)) so knowledge is written
  down, not held in one head.

### Institutional home & funding

- ETHDS is a **public good** and should have an accountable institutional
  owner within government to resource maintenance, accessibility audits,
  and professional translation over time.
- Options to pursue: a hosting government body's ongoing budget line,
  shared funding across adopting agencies, and grant/donor support for
  specific pushes (e.g. completing translations, a formal accessibility
  audit).

### Technical resilience

- **Minimal dependencies** (e.g. dependency-free `@ethds/tokens`, no
  Tailwind in `@ethds/react`) reduce supply-chain and maintenance burden
  ([Security](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/08-security-and-privacy-by-design.md),
  [Low Bandwidth](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/06-design-for-low-bandwidth.md)).
- **Automated gates** (CI: build, tests, axe, coverage checks) catch
  regressions so maintenance is cheaper and safer.
- **Semantic versioning + Changesets** keep upgrades predictable for
  downstream teams ([release management](release-management.md)).
- Keep pace with **WCAG** and platform changes as a standing task, not a
  one-off.

### Community & adoption flywheel

- Every adopting service that **contributes back** (fixes, components,
  translations) strengthens the system for all — actively encourage this
  ([Reuse Before Building](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/07-reuse-before-building.md),
  [Open by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/10-open-by-default.md)).
- Lower the barrier to contribution (good docs, mentoring, first-timer
  issues, non-code contributions counted) to widen the base.

## Review

This plan is revisited periodically by the maintainers (at minimum
annually), and whenever the project's institutional or funding situation
changes. Progress against sustainability is reflected in the project's
[success metrics](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/foundation/success-metrics.md)
(active contributors, diversity of contributing organisations,
time-to-response).
