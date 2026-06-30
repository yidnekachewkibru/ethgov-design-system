# Phase 2 — Brand System

**Status:** ✅ Complete

## Goal

Define the complete ETHDS visual identity and government branding
standards, as both documentation and implementable design decisions.

## Deliverables

All delivered under [`docs/brand/`](../brand/):

- Color Palette — primary (Ethiopian Star Blue), supporting (Green,
  Yellow, Red), and neutrals (White, Black, Gray Scale) — with concrete
  hex values and semantic roles — [color.md](../brand/color.md)
- Typography System (incl. Ge'ez + Latin script support) — [typography.md](../brand/typography.md)
- Iconography Guidelines — [iconography.md](../brand/iconography.md)
- Logo Usage — [logo-usage.md](../brand/logo-usage.md)
- Spacing System — [spacing.md](../brand/spacing.md)
- Elevation System — [elevation.md](../brand/elevation.md)
- Radius System — [radius.md](../brand/radius.md)
- Motion Guidelines — [motion.md](../brand/motion.md)
- Accessibility Analysis — **measured** contrast ratios for every text/UI
  pairing, verified against WCAG 2.2 AA — [accessibility-analysis.md](../brand/accessibility-analysis.md)
- Government Branding Standards — [government-branding-standards.md](../brand/government-branding-standards.md)

Produced as:

- Documentation — [`docs/brand/`](../brand/)
- Design token source values (structured into a build pipeline in
  [Phase 3](phase-3-design-tokens.md))
- CSS Variables — [`docs/brand/assets/ethds-brand.css`](../brand/assets/ethds-brand.css)
- Tailwind Theme — [`docs/brand/assets/tailwind.brand.cjs`](../brand/assets/tailwind.brand.cjs)

## Output Location

[`docs/brand/`](../brand/) (documentation + reference CSS/Tailwind
artifacts). These values become the JSON-source token build in
`packages/ethds-tokens/` ([Phase 3](phase-3-design-tokens.md)).

## Dependencies

- [Phase 0 — Foundation](phase-0-foundation.md) for governance and
  branding intent.
- [Phase 1 — Design Principles](phase-1-design-principles.md), especially
  Accessibility and Multilingual Design, which constrain color contrast
  and typography choices (e.g. font support for Ge'ez script used by
  Amharic and Tigrinya).
