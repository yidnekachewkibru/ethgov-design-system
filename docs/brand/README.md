# ETHDS Brand System

The brand system defines the shared visual identity of Ethiopian
government digital services — colour, typography, iconography, logo usage,
spacing, elevation, radius, and motion. These are concrete, decided values,
not proposals: they are the single source of truth that the
[design tokens package](../phases/phase-3-design-tokens.md) (`@ethds/tokens`,
Phase 3) encodes and ships, and that every [component](../phases/phase-7-core-components.md)
and [template](../phases/phase-9-website-templates.md) consumes.

A consistent visual identity is what lets a citizen recognise an official
government service and trust it — see
[Consistent Government Experience](../design-principles/09-consistent-government-experience.md).

## Contents

| Area | Document |
|---|---|
| Colour palette & semantic roles | [color.md](color.md) |
| Typography (incl. Ge'ez script) | [typography.md](typography.md) |
| Iconography guidelines | [iconography.md](iconography.md) |
| Logo & emblem usage | [logo-usage.md](logo-usage.md) |
| Spacing scale | [spacing.md](spacing.md) |
| Grid (breakpoints, container, columns) | [grid.md](grid.md) |
| Elevation (shadows) | [elevation.md](elevation.md) |
| Radius (corners) | [radius.md](radius.md) |
| Motion | [motion.md](motion.md) |
| Accessibility analysis (contrast) | [accessibility-analysis.md](accessibility-analysis.md) |
| Government branding standards | [government-branding-standards.md](government-branding-standards.md) |

## Implementable Artifacts

The brand values are provided ready to use:

- **CSS custom properties** — [`assets/ethds-brand.css`](assets/ethds-brand.css)
- **Tailwind theme** — [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs)

These are the canonical reference implementation. In
[Phase 3](../phases/phase-3-design-tokens.md) the same values are
restructured into a JSON-source token build pipeline (`@ethds/tokens`)
that generates these and other formats automatically; until then, these
files are directly usable.

## Principles This Embodies

- **[Accessibility by Default](../design-principles/04-accessibility-by-default.md)**
  — every colour pairing used for text or UI is verified against WCAG 2.2
  AA in [accessibility-analysis.md](accessibility-analysis.md).
- **[Multilingual by Default](../design-principles/02-multilingual-by-default.md)**
  — typography explicitly supports both Ge'ez script (Amharic, Tigrinya)
  and Latin script (English, Afaan Oromo, Somali, Afar).
- **[Design for Low Bandwidth](../design-principles/06-design-for-low-bandwidth.md)**
  — font and asset choices are made with page weight in mind.
- **[Consistent Government Experience](../design-principles/09-consistent-government-experience.md)**
  — one shared identity across ministries, agencies, regions, and
  municipalities.
