# Phase 10 — Reference Implementations

**Status:** 📋 Planned

## Goal

Prove ETHDS works end-to-end by building real, full reference
applications with it — not just isolated components in Storybook.

## Projects

Immigration Service Portal, Revenue Service Portal, Education
Verification Portal, Municipal Permit Portal.

## Deliverables (per project)

- Architecture
- Wireframes
- React Implementation
- Accessibility Review
- Localization Review
- Deployment Guide

Complete, working source code.

## Output Location

`packages/ethds-examples/` (replaces the README-only stub).

## Dependencies

Everything built so far: `@ethds/tokens` ([Phase 3](phase-3-design-tokens.md)),
`@ethds/react` ([Phase 7](phase-7-core-components.md)), `@ethds/icons`,
`@ethds/patterns` ([Phase 8](phase-8-government-service-patterns.md)),
`@ethds/templates` ([Phase 9](phase-9-website-templates.md)).

## Why This Matters

Reference implementations are where gaps in the rest of the system get
found — a pattern that works in isolation but breaks when composed into
a real multi-step government flow, or a template that doesn't actually
fit a real service's content. Findings here feed back as fixes into
earlier phases.
