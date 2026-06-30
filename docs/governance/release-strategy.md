# Release Strategy

## Versioning

Every publishable `packages/*` workspace follows
[Semantic Versioning](https://semver.org/) independently:

- **Major** — breaking change to a public API, token, or component
  contract
- **Minor** — backward-compatible new functionality (new component, new
  token, new pattern)
- **Patch** — backward-compatible bug fix

Packages do **not** share a version number — `@ethds/tokens` at `2.1.0`
and `@ethds/react` at `1.4.0` is expected and normal.

## Tooling: Changesets

ETHDS uses [Changesets](https://github.com/changesets/changesets) to
manage versioning and changelogs across the npm workspaces monorepo:

1. A PR that changes a publishable package includes a changeset file
   describing the change and its semver impact.
2. Changesets accumulates these into a "Version Packages" PR.
3. Merging that PR bumps versions, updates changelogs, and (once CI/CD is
   wired up in [Phase 3](../phases/phase-3-design-tokens.md) and
   [Phase 7](../phases/phase-7-core-components.md)) publishes to npm.

This is selected over manual version bumps or a single repo-wide version
because it scales cleanly to multiple independently-versioned packages
without requiring a release manager to track every package's state by
hand.

## Pre-1.0 Releases

Packages without production-ready code yet (everything before its
owning phase is complete) stay at `0.0.0` and are marked private in
their `package.json`, as set up in
[Phase 0](../phases/phase-0-foundation.md). A package is only published
to npm once its owning phase delivers real, tested code.

## Release Channels

- **`latest`** — the current stable release of each package
- **`next`** — pre-release versions for testing upcoming breaking changes
  (introduced once a package has a stable `latest` to diverge from)

## Security Releases

Security fixes are released as patch versions outside the normal release
cadence. The disclosure and response process is formalized in
[Phase 11 — Open Source Governance](../phases/phase-11-open-source-governance.md).
