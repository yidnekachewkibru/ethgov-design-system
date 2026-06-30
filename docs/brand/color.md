# Colour

The ETHDS colour system is built around **Ethiopian Star Blue** as the
primary interaction colour, with **Green**, **Yellow**, and **Red** as
supporting and semantic colours, on a neutral gray scale. The palette
draws on the colours of the Ethiopian flag and national emblem while
being tuned for screen legibility and WCAG 2.2 AA contrast.

Every text and UI colour pairing in this page is verified in
[accessibility-analysis.md](accessibility-analysis.md). All contrast
ratios quoted below are measured, not estimated.

## Primary — Ethiopian Star Blue

Blue is the primary brand and interaction colour: primary buttons, links,
selected states, focus indicators, and key emphasis.

| Token | Hex | Typical use |
|---|---|---|
| `blue-50`  | `#EAF1FB` | Tinted backgrounds, info surfaces |
| `blue-100` | `#CFE0F6` | Subtle fills, hover backgrounds |
| `blue-200` | `#A6C6EE` | Borders on tinted surfaces |
| `blue-300` | `#6F9FE0` | Disabled-on-colour, decorative |
| `blue-400` | `#3E78CF` | Large-text/UI only (4.38:1 on white) |
| `blue-500` | `#1F5CB8` | Interactive base — links, default actions (6.40:1) |
| **`blue-600`** | **`#194B9C`** | **Primary / Star Blue — primary buttons, brand (8.31:1)** |
| `blue-700` | `#153D80` | Hover/active, emphasis text on light (10.44:1) |
| `blue-800` | `#102E60` | High-emphasis surfaces |
| `blue-900` | `#0B1F40` | Darkest brand shade |

`blue-600` is the canonical "Ethiopian Star Blue". `blue-500` is the
interactive base used for links and default controls; `blue-700` is its
hover/active and the safe colour for blue text on light tints.

## Supporting & Semantic Colours

Green, Yellow, and Red are accent colours and carry semantic meaning.
**Colour is never the only signal** — semantic state is always paired
with text and/or an icon (see
[Accessibility by Default](../design-principles/04-accessibility-by-default.md)).

### Green — Success

| Token | Hex | Use |
|---|---|---|
| `green-50`  | `#E9F5EC` | Success surface background |
| `green-500` | `#1E8E3E` | Large-text/UI accents |
| `green-600` | `#177D34` | Success — white text on it (5.22:1) |
| `green-700` | `#0F5F27` | Success text on light surfaces (7.82:1) |

### Yellow — Warning

Yellow is a **dark-text-only fill**: it does not provide enough contrast
for white text. Use `ink` (near-black) on yellow fills, or `yellow-700`
for warning text on white.

| Token | Hex | Use |
|---|---|---|
| `yellow-50`  | `#FEF7E0` | Warning surface background |
| `yellow-400` | `#F2C200` | Warning fill — `ink` text only (10.06:1 with ink) |
| `yellow-500` | `#D9A400` | Darker warning accent |
| `yellow-700` | `#8A6500` | Warning text on white (5.33:1) |

### Red — Error / Danger

| Token | Hex | Use |
|---|---|---|
| `red-50`  | `#FDECEC` | Error surface background |
| `red-500` | `#D32F2F` | Large-text/UI accents (4.98:1) |
| `red-600` | `#C1121F` | Error — white text on it (6.22:1) |
| `red-700` | `#9B0F18` | Error text on light surfaces (8.48:1) |

## Neutrals

White, near-black ink, and a ten-step gray scale.

| Token | Hex | Use |
|---|---|---|
| `white` | `#FFFFFF` | Page and surface background |
| `gray-50`  | `#F6F7F8` | App background, zebra striping |
| `gray-100` | `#ECEEF1` | Subtle surface, hover |
| `gray-200` | `#D9DDE2` | Dividers, card borders |
| `gray-300` | `#BEC4CC` | Decorative dividers only (1.76:1 — not for functional borders) |
| `gray-400` | `#98A0AB` | Disabled text/icons, placeholder |
| `gray-500` | `#6B7280` | **Minimum for functional borders & secondary text (4.83:1)** |
| `gray-600` | `#4B515A` | Secondary text (8.00:1) |
| `gray-700` | `#363B42` | Strong secondary text |
| `gray-800` | `#23272C` | Headings on light |
| `gray-900` | `#15181C` | Darkest surface |
| `ink`   | `#1A1D21` | **Default body text colour (16.91:1 on white)** |
| `black` | `#0A0C0E` | True near-black, reserved |

> **Functional borders need ≥3:1.** A border that is the *only* visual
> boundary of a control (e.g. a text input outline) must meet WCAG 2.2 AA
> non-text contrast (3:1). `gray-300` and `gray-400` do **not** meet this
> against white — use `gray-500` or darker for functional borders.
> `gray-200`/`gray-300` are fine for purely decorative dividers.

## Semantic Roles

Components reference these semantic roles, not raw colours, so the
mapping can evolve centrally:

| Role | Value | Notes |
|---|---|---|
| `color-text` | `ink` | Body text |
| `color-text-secondary` | `gray-600` | De-emphasised text |
| `color-text-disabled` | `gray-400` | Disabled text |
| `color-interactive` | `blue-500` | Links, default controls |
| `color-interactive-hover` | `blue-700` | Hover/active |
| `color-primary` | `blue-600` | Primary actions, brand |
| `color-focus` | `blue-600` | Focus indicator (8.31:1 on white) |
| `color-border` | `gray-500` | Functional control borders |
| `color-divider` | `gray-200` | Decorative dividers |
| `color-success` | `green-600` | + `green-50` surface, `green-700` text |
| `color-warning` | `yellow-400` | + `yellow-50` surface, `yellow-700` text, `ink` on fill |
| `color-error` | `red-600` | + `red-50` surface, `red-700` text |
| `color-info` | `blue-600` | + `blue-50` surface, `blue-700` text |

The concrete values are provided as
[CSS custom properties](assets/ethds-brand.css) and a
[Tailwind theme](assets/tailwind.brand.cjs), and become the
[`@ethds/tokens`](../phases/phase-3-design-tokens.md) source in Phase 3.
