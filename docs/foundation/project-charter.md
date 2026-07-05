# ETHDS Project Charter

## Purpose

This charter establishes what ETHDS is, who it serves, what it commits
to, and how it is governed — the foundation the rest of the project is
built on.

## Problem Statement

Ethiopian government digital services today are built independently by
different ministries, agencies, and regional bodies, with no shared
design language. This produces inconsistent citizen experiences,
duplicated effort, uneven accessibility, and services that frequently
fail to support Ethiopia's linguistic diversity.

## Scope

ETHDS delivers, as a single open-source ecosystem:

- Design principles and government branding standards
- Accessibility and localization standards
- Design tokens
- A React/TypeScript UI component library
- Reusable government service patterns
- Full-page website templates
- Reference implementations
- Documentation platform
- Governance framework

All of this scope is delivered — see the [repository README](../../README.md)
for the shipped packages and documentation.

## Out of Scope

- Hosting or operating government services themselves (ETHDS is a design
  system and component library, not a hosting platform)
- Backend/API standards for government systems (a related but separate
  concern from UI/UX consistency)
- Mandating adoption — ETHDS is built to be adopted voluntarily on its
  merits, not imposed by policy (though government bodies may choose to
  mandate it for their own services)

## Stakeholders

- **Citizens** — the ultimate beneficiaries; all design decisions start
  with citizen needs (see [Core Principles](design-philosophy.md))
- **Government digital teams** — the direct consumers of ETHDS packages
- **Contributors and maintainers** — the open-source community building
  and maintaining ETHDS
- **Accessibility and localization reviewers** — specialists ensuring
  every release meets WCAG 2.2 AA and multilingual requirements

## Commitments

1. ETHDS is open source (MIT licensed) and developed in the open.
2. Every component and pattern meets WCAG 2.2 AA at minimum.
3. Every component, pattern, and template supports all six languages in
   [`docs/foundation/vision-and-mission.md`](vision-and-mission.md) — never
   English-only with translation deferred.
4. Releases follow semantic versioning (see
   [`docs/governance/release-strategy.md`](../governance/release-strategy.md)).
5. Significant changes go through public RFC review (see
   [`docs/governance/governance-model.md`](../governance/governance-model.md)).

## Success

Defined in [`success-metrics.md`](success-metrics.md).
