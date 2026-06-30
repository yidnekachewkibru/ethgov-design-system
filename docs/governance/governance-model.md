# Governance Model

## Decision-Making

ETHDS uses a lightweight, RFC-driven model:

- **Small changes** (bug fixes, doc clarifications, non-breaking
  additions within an existing pattern) go through normal pull request
  review — one maintainer approval is sufficient to merge.
- **Significant changes** (new components, new government service
  patterns, breaking changes to tokens or APIs, governance changes)
  require an RFC, as described in
  [CONTRIBUTING.md](../../CONTRIBUTING.md#proposing-significant-changes)
  and archived in [`packages/ethds-rfcs/`](../../packages/ethds-rfcs/).
  RFCs need consensus among maintainers and a public comment period
  before merging.
- **Accessibility and localization changes** additionally require
  sign-off from a designated accessibility or localization reviewer (see
  [Phase 5](../phases/phase-5-accessibility-framework.md) and
  [Phase 6](../phases/phase-6-localization-framework.md) for the review
  processes once formalized).

Disagreements that can't be resolved through discussion are decided by
maintainer vote, with ties broken by the project's lead maintainer.

## Maintainer Roles

- **Lead Maintainer** — overall project direction, final tie-breaking
  authority, release sign-off.
- **Package Maintainers** — merge rights scoped to one or more
  `packages/*` workspaces (e.g. a `@ethds/react` maintainer, a
  `@ethds/tokens` maintainer).
- **Reviewers** — accessibility, localization, or security specialists
  with required sign-off on relevant changes, without general merge
  rights.

The full contributor progression toward these roles is described in
[`community-model.md`](community-model.md).

## RFC Trigger Points

An RFC is required when a change:

- Adds a new component, pattern, or template
- Changes a public API or token in a breaking way
- Changes accessibility or localization standards themselves (not just
  applying them)
- Changes governance, licensing, or release process

## Scope of This Document

This is the Phase 0 governance baseline. The detailed RFC process,
component review process, accessibility review process, localization
review process, and security policy are formalized in
[Phase 11 — Open Source Governance](../phases/phase-11-open-source-governance.md).
