---
id: success-metrics
title: Success Metrics
sidebar_position: 5
---

# Success Metrics

## Adoption

- Number of government ministries, agencies, regional governments, and
  municipalities using ETHDS in a production service.
- Number of independent services built with `@ethds/react` and
  `@ethds/patterns`.
- npm download counts for published `@ethds/*` packages.

## Quality

- WCAG 2.2 AA conformance rate across all released components and
  patterns (target: 100% before any v1.0 release).
- Percentage of components/patterns with complete documentation,
  Storybook stories, and automated tests.
- Open bug count and median time-to-resolution.

## Localization

- Percentage of components and patterns with verified, complete
  translations in all six supported languages (target: 100% — partial
  language support is treated as a defect, not a future task).
- Number of language-specific accessibility issues reported and resolved
  (e.g. screen reader behavior in Amharic or Tigrinya).

## Community Health

- Number of active contributors and maintainers.
- Median time from RFC submission to decision.
- Median time from PR open to first maintainer response.
- Diversity of contributing organizations (not concentrated in a single
  ministry or team).

## Performance

- Bundle size budgets met for `@ethds/react` and `@ethds/tokens` (low
  bandwidth is a core principle — see
  [Design Philosophy](design-philosophy.md)).
- Page weight and load-time benchmarks met for reference implementations
  under simulated low-bandwidth conditions.

## v1.0 Readiness

Tracked against the criteria originally scoped as the audit target of
[Phase 12 — Final Release](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/phases/phase-12-final-release.md),
and re-assessed on an ongoing basis in
[`docs/release/`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/release).
A release is not "done" because code exists — it's done when these
metrics are met and verified.
