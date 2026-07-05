# Contributing to ETHDS

Thank you for your interest in contributing to the Ethiopian Government
Design System. ETHDS is a public good — it exists to make government
digital services in Ethiopia more usable, accessible, and consistent for
every citizen, in every supported language. Contributions from designers,
developers, accessibility specialists, translators, and government service
teams are all welcome.

This document covers how to contribute. For the project's governing rules
(how decisions get made, who has merge rights), see
[`docs/governance/governance-model.md`](docs/governance/governance-model.md).

## Before You Start

- Read the [Code of Conduct](CODE_OF_CONDUCT.md) — participation in this
  project requires following it.
- Browse [`docs/foundation/`](docs/foundation/) for what ETHDS is and
  [`docs/governance/`](docs/governance/) for how it is run, so your
  contribution lands where it's useful.
- For anything beyond a small fix (a new component, a new pattern, a
  breaking change to tokens), open an RFC first — see
  [Proposing Significant Changes](#proposing-significant-changes) below.

## Project Structure

ETHDS is an npm-workspaces monorepo. Each top-level package under
`packages/` corresponds to one area of the design system (tokens, React
components, icons, patterns, templates, examples, docs site, RFCs). See
[`docs/governance/repository-strategy.md`](docs/governance/repository-strategy.md)
for the full rationale and package map.

```
ethgov-design-system/
├── packages/        # workspace packages (tokens, react, icons, ...)
└── docs/            # foundation, principles, brand, accessibility, localization, governance
```

## Development Setup

```bash
git clone https://github.com/yidnekachewkibru/ethgov-design-system.git
cd ethgov-design-system
npm install
```

`npm install` resolves all `packages/*` workspaces from the repo root —
there is no per-package install step. Per-package scripts are runnable
via `npm run <script> -w <package-name>`.

## Making a Change

1. Fork the repository and create a branch off `main`.
2. Make your change within the relevant package or doc.
3. Follow the coding standards and accessibility requirements documented
   for the area you're touching (see [`docs/accessibility/`](docs/accessibility/)
   and the package's own README).
4. Write or update tests where the package has a test setup.
5. Open a pull request using the provided
   [PR template](.github/PULL_REQUEST_TEMPLATE.md), describing what
   changed and why.

## Proposing Significant Changes

New components, new patterns, breaking token changes, or anything that
affects how other contributors or downstream government teams use ETHDS
should go through an RFC before implementation:

1. Copy the RFC template from `packages/ethds-rfcs/`.
2. Open a pull request adding your RFC as a new file in
   `packages/ethds-rfcs/proposals/`.
3. Allow time for community and maintainer review/comment.
4. Once accepted, the RFC is merged and implementation can begin (by you
   or another contributor).

The full process is documented in
[`docs/governance/governance-model.md`](docs/governance/governance-model.md)
and [`docs/governance/rfc-process.md`](docs/governance/rfc-process.md).

## Accessibility and Localization

ETHDS targets **WCAG 2.2 AA** at minimum, and every component, pattern, and
template must work across all supported languages (English, Amharic, Afaan
Oromo, Tigrinya, Somali, Afar). PRs that add or change UI must call out
how accessibility and localization were considered — this isn't optional
review feedback, it's a merge requirement.

## Commit and PR Conventions

- Write clear, descriptive commit messages explaining *why*, not just *what*.
- Keep pull requests focused — one logical change per PR.
- Link related issues or RFCs in the PR description.

## Release Process

See [`docs/governance/release-strategy.md`](docs/governance/release-strategy.md)
for how versioning and publishing works across packages.

## Questions

Open a GitHub Discussion or issue if anything here is unclear. Improving
this document via PR is itself a welcome contribution.
