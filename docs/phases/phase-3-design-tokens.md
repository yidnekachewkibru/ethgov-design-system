# Phase 3 — Design Tokens

**Status:** 📋 Planned

## Goal

Build the `@ethds/tokens` package: the single source of truth for ETHDS
design decisions, structured, built, and published.

## Deliverables

- Repository structure for `packages/ethds-tokens/`
- Design Token Architecture (naming, tiering — e.g. global vs. semantic
  vs. component tokens)
- JSON Tokens (source of truth, encoding the Phase 2 brand decisions)
- CSS Variable Exports
- TypeScript Types
- Tailwind Integration (theme generation)
- Build System
- Package Configuration (`package.json`, exports map)
- CI/CD Pipeline (build, test, and — once stable — publish to npm)
- Documentation

## Output Location

`packages/ethds-tokens/` (replaces the currently README-only stub at
[`packages/ethds-tokens/README.md`](../../packages/ethds-tokens/README.md)).

## Dependencies

- [Phase 2 — Brand System](phase-2-brand-system.md) for the source color,
  typography, spacing, elevation, radius, and motion decisions this
  phase encodes as build-able tokens.

## Consumed By

- [Phase 7 — Core Components](phase-7-core-components.md) (`@ethds/react`)
- [Phase 4 — Documentation Platform](phase-4-documentation-platform.md)
  (site theme)
