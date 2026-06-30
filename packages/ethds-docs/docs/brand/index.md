---
id: index
title: Brand System
slug: /brand
---

# Brand System

The ETHDS brand system defines the shared visual identity of Ethiopian
government digital services. These are decided, verified values, shipped
as the [`@ethds/tokens`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-tokens)
package and consumed by this very site.

## Primary colour — Ethiopian Star Blue

<span className="ethds-swatch" style={{ background: 'var(--ethds-blue-600)' }} /> `blue-600` · `#194B9C`

Blue is the primary brand and interaction colour. Green, yellow, and red
are supporting and semantic colours; a ten-step gray scale and near-black
ink complete the palette.

<span className="ethds-swatch" style={{ background: 'var(--ethds-green-600)' }} /> success ·
<span className="ethds-swatch" style={{ background: 'var(--ethds-yellow-400)' }} /> warning ·
<span className="ethds-swatch" style={{ background: 'var(--ethds-red-600)' }} /> error ·
<span className="ethds-swatch" style={{ background: 'var(--ethds-blue-600)' }} /> info

## What the brand system covers

| Area | Canonical source |
|---|---|
| Colour palette & semantic roles | [color.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/color.md) |
| Typography (incl. Ge'ez script) | [typography.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/typography.md) |
| Spacing, radius, elevation, motion | [docs/brand](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/brand) |
| Iconography & logo usage | [iconography.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/iconography.md) |
| Government branding standards | [government-branding-standards.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/government-branding-standards.md) |
| Contrast (verified WCAG 2.2 AA) | [accessibility-analysis.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/accessibility-analysis.md) |

## Using the tokens

```css
@import "@ethds/tokens/css";

.primary-button {
  background: var(--ethds-color-primary);
  color: var(--ethds-white);
  padding: var(--ethds-space-3) var(--ethds-space-4);
  border-radius: var(--ethds-radius-md);
}
```

See the [`@ethds/tokens` README](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-tokens)
for TypeScript and Tailwind usage. Every colour pairing used for text or
UI in this system is verified against WCAG 2.2 AA, and the token build
re-checks those ratios on every change.
