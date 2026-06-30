# Phase 3 — Design Tokens

**Status:** ✅ Complete

## Goal

Build the `@ethds/tokens` package: the single source of truth for ETHDS
design decisions, structured, built, and published.

## Deliverables

All delivered in [`packages/ethds-tokens/`](../../packages/ethds-tokens/):

- Repository structure — `tokens/` (source), `scripts/` (build),
  `test/`, generated `dist/`
- Design Token Architecture — two-tier DTCG tokens (global palette/scales
  + semantic role tokens that reference them); documented in the
  [package README](../../packages/ethds-tokens/README.md)
- JSON Tokens — DTCG `$value`/`$type` sources in
  [`tokens/`](../../packages/ethds-tokens/tokens/) encoding the Phase 2
  brand decisions
- CSS Variable Exports — generated `dist/tokens.css` (`@ethds/tokens/css`)
- TypeScript Types — generated `dist/tokens.d.ts`, typed `tokens`/`cssVars`
- Tailwind Integration — generated preset (`@ethds/tokens/tailwind`)
- Build System — zero-dependency
  [`scripts/build.mjs`](../../packages/ethds-tokens/scripts/build.mjs)
- Package Configuration — `package.json` with `exports` map (`.`, `./css`,
  `./tailwind`, `./tokens.json`)
- CI/CD Pipeline — [`.github/workflows/tokens.yml`](../../.github/workflows/tokens.yml)
  builds and tests on push/PR (publish is a documented tagged step per
  [release-strategy.md](../governance/release-strategy.md))
- Documentation — [package README](../../packages/ethds-tokens/README.md)
- Tests — Vitest: reference resolution + WCAG 2.2 AA contrast invariants

## Output Location

[`packages/ethds-tokens/`](../../packages/ethds-tokens/) (replaced the
former README-only stub).

## Dependencies

- [Phase 2 — Brand System](phase-2-brand-system.md) for the source color,
  typography, spacing, elevation, radius, and motion decisions this
  phase encodes as build-able tokens.

## Consumed By

- [Phase 7 — Core Components](phase-7-core-components.md) (`@ethds/react`)
- [Phase 4 — Documentation Platform](phase-4-documentation-platform.md)
  (site theme)
