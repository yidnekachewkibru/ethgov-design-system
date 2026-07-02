# Phase 10 — Reference Implementations

**Status:** ✅ Complete — all 4 reference portals documented

## Goal

Prove ETHDS works end-to-end by building real, full reference
applications with it — not just isolated components in Storybook.

## Delivered

Four reference implementations in
[`packages/ethds-examples/`](../../packages/ethds-examples/), each with
Architecture, Key Screens (mapped to templates/patterns), a React
Implementation composition, an Accessibility Review, a Localization
Review, and a Deployment Guide:

- [Immigration Service Portal](../../packages/ethds-examples/immigration-service-portal.md)
  — passports/visas: apply, pay, appointment, status
- [Revenue Service Portal](../../packages/ethds-examples/revenue-service-portal.md)
  — authenticated dashboard, filing, payment, receipts (Birr/santim)
- [Education Verification Portal](../../packages/ethds-examples/education-verification-portal.md)
  — public credential lookup + institution back-office
- [Municipal Permit Portal](../../packages/ethds-examples/municipal-permit-portal.md)
  — permits, region→woreda→kebele address cascade, appointments, complaints

Each composes the shipped [tokens](../../packages/ethds-tokens/),
[components](../../packages/ethds-react/),
[patterns](../../packages/ethds-patterns/), and
[templates](../../packages/ethds-templates/), and applies the
accessibility and localization frameworks end-to-end.

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
