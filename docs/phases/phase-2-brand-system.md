# Phase 2 — Brand System

**Status:** 📋 Planned

## Goal

Define the complete ETHDS visual identity and government branding
standards, as both documentation and implementable design decisions.

## Deliverables

- Color Palette — primary (Ethiopian Star Blue), supporting (Green,
  Yellow, Red), and neutrals (White, Black, Gray Scale). Blue is the
  primary interaction color; Green/Yellow/Red are accent and semantic
  colors.
- Typography System
- Iconography Guidelines
- Logo Usage
- Spacing System
- Elevation System
- Radius System
- Motion Guidelines
- Accessibility Analysis (contrast ratios for every color pairing,
  verified against WCAG 2.2 AA)
- Government Branding Standards

Produced as:

- Documentation
- Design Tokens (source values — structured/built out in
  [Phase 3](phase-3-design-tokens.md))
- CSS Variables
- Tailwind Theme

## Output Location

Documentation under `docs/`; source values feed directly into
`packages/ethds-tokens/` ([Phase 3](phase-3-design-tokens.md)).

## Dependencies

- [Phase 0 — Foundation](phase-0-foundation.md) for governance and
  branding intent.
- [Phase 1 — Design Principles](phase-1-design-principles.md), especially
  Accessibility and Multilingual Design, which constrain color contrast
  and typography choices (e.g. font support for Ge'ez script used by
  Amharic and Tigrinya).
