# Release Management

How ETHDS ships versions. This builds on the Phase 0
[release strategy](release-strategy.md) (semantic versioning + Changesets
across the npm-workspaces monorepo) and adds the operational detail.

## Versioning recap

- Every publishable package (`@ethds/tokens`, `@ethds/react`,
  `@ethds/icons`, …) is versioned **independently** with
  [SemVer](https://semver.org/): major = breaking, minor = additive, patch
  = fix.
- Version bumps and changelogs are managed with
  [Changesets](https://github.com/changesets/changesets): a PR that changes
  a publishable package includes a changeset describing the change and its
  semver impact.

## Release flow

1. **Contributions** land on `main` via reviewed PRs, each with a
   changeset where it touches a publishable package.
2. Changesets accumulates a **"Version Packages"** PR that bumps versions
   and updates changelogs.
3. **Merging** that PR tags the release. Once CI is wired for publishing,
   it publishes the changed packages to npm; until then, publishing is a
   deliberate maintainer step (`npm publish -w <pkg>` after a green build).
4. The [documentation site](../../packages/ethds-docs/) redeploys from
   `main` (GitHub Pages) automatically.

## Cadence

- **No fixed calendar.** Releases go out when meaningful, reviewed change
  has accumulated — small, frequent releases are preferred over big-bang
  ones.
- **Pre-1.0:** packages may make breaking changes in minor versions while
  the API stabilizes; this is called out in changelogs. From **1.0**,
  SemVer is strict.

## Release channels

- **`latest`** — the current stable release.
- **`next`** — pre-releases for testing upcoming breaking changes, once a
  package has a stable `latest`.

## Security releases

- Security fixes ship as **patch versions out of band**, coordinated per
  [SECURITY.md](../../SECURITY.md) — they do not wait for the normal
  cadence.
- Where several packages are affected, a coordinated advisory accompanies
  the releases.

## Release sign-off

- A **package maintainer** approves each release of their package; the
  **lead maintainer** signs off on cross-cutting or 1.0-track releases.
- A release is not cut with failing CI, a known accessibility
  non-negotiable unmet, or an incomplete "Version Packages" PR.

## Deprecations

- Breaking changes provide a migration note in the changelog and, where
  feasible, a deprecation period with warnings before removal.
