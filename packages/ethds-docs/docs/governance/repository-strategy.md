---
id: repository-strategy
title: Repository Strategy
sidebar_position: 13
---

# Repository Strategy

## Decision: Monorepo

ETHDS is built as a single repository (`ethgov-design-system`) using npm
workspaces, rather than the eight separate repositories
(`ethds-docs`, `ethds-tokens`, `ethds-react`, `ethds-icons`,
`ethds-patterns`, `ethds-templates`, `ethds-examples`, `ethds-rfcs`)
originally envisioned. Each of those becomes a `packages/*` workspace
instead.

## Why

- **Atomic cross-package changes.** Tokens, components, patterns, and
  templates change together constantly. A monorepo lets a single PR update
  `@ethds/tokens` and the `@ethds/react` components that consume it in one
  atomic, reviewable change — no publish-then-bump cycle between repos.
- **One governance/tooling surface.** CONTRIBUTING, CODE_OF_CONDUCT, CI
  config, linting, and issue/PR templates live once, not duplicated
  across eight repos.
- **Lower contribution friction.** Contributors clone one repo and run
  one `npm install` to work across the whole system.
- **Workspace package boundaries are already real.** Each `packages/*`
  workspace has its own `package.json`, versioning, and (eventually)
  publish target — the monorepo doesn't blur the boundaries that matter,
  it just avoids the overhead of enforcing them across repo boundaries
  too early.

## Package Map

| Workspace | Replaces planned repo | Publishes as |
|---|---|---|
| `packages/ethds-tokens` | `ethds-tokens` | `@ethds/tokens` |
| `packages/ethds-react` | `ethds-react` | `@ethds/react` |
| `packages/ethds-icons` | `ethds-icons` | `@ethds/icons` |
| `packages/ethds-patterns` | `ethds-patterns` | `@ethds/patterns` |
| `packages/ethds-templates` | `ethds-templates` | `@ethds/templates` |
| `packages/ethds-examples` | `ethds-examples` | not published (reference apps) |
| `packages/ethds-docs` | `ethds-docs` | not published (deployed site) |
| `packages/ethds-rfcs` | `ethds-rfcs` | not published (process archive) |

## Versioning

Each publishable workspace is versioned independently using Changesets —
see [release strategy](release-strategy.md).

## When to Split a Package Into Its Own Repo

A workspace is a candidate to become a standalone repository once **any**
of the following is true:

1. It has external contributors or consumers whose workflow is
   meaningfully slowed by the monorepo's shared CI/tooling.
2. Its release cadence has diverged significantly from the rest of the
   system (e.g. `@ethds/tokens` stabilizes and releases quarterly while
   `@ethds/react` is still iterating weekly).
3. Repository size or CI time for the monorepo becomes a genuine
   bottleneck.

If split, history is preserved via `git subtree split` or
`git filter-repo` rather than starting the package's git history over.
This is a reversible, low-risk operation — it is not a decision that
needs to be made now.
