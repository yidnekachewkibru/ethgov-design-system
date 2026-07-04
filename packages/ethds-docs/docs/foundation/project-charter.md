---
id: project-charter
title: ETHDS Project Charter
sidebar_position: 2
---

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

See the
[phase-by-phase breakdown](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/phases)
of scope and deliverables, and the
[Roadmap](roadmap.md) for current status.

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
  with citizen needs (see [Design Philosophy](design-philosophy.md))
- **Government digital teams** — the direct consumers of ETHDS packages
- **Contributors and maintainers** — the open-source community building
  and maintaining ETHDS
- **Accessibility and localization reviewers** — specialists ensuring
  every release meets WCAG 2.2 AA and multilingual requirements

## Commitments

1. ETHDS is open source (MIT licensed) and developed in the open.
2. Every component and pattern meets WCAG 2.2 AA at minimum.
3. Every component, pattern, and template supports all six languages (see
   [Vision & Mission](vision-and-mission.md)) — never English-only with
   translation deferred.
4. Releases follow semantic versioning (see
   [release strategy](/docs/governance/release-strategy)).
5. Significant changes go through public RFC review (see the
   [governance model](/docs/governance/governance-model)).

## Success

Defined in [Success Metrics](success-metrics.md).
