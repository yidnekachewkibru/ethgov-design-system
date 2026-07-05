# Accessibility Analysis — Colour Contrast

This page records the **measured** WCAG 2.2 contrast ratios for the ETHDS
palette. Every value below is computed from the hex values in
[color.md](color.md) using the WCAG relative-luminance formula, not
estimated. This is the evidence behind
[Accessibility by Default](../design-principles/04-accessibility-by-default.md):
the brand palette is verified before any component uses it.

## Thresholds (WCAG 2.2 AA)

| Requirement | Ratio | Applies to |
|---|---|---|
| Normal text | **4.5:1** | Body text < 18.66px bold / < 24px |
| Large text | **3:1** | ≥ 24px, or ≥ 18.66px bold |
| Non-text (UI) | **3:1** | Control boundaries, focus indicators, meaningful icons/graphics |

## Text Colours on White (`#FFFFFF`)

| Foreground | Ratio | Normal text | Large/UI |
|---|---|---|---|
| `ink` `#1A1D21` | **16.91:1** | ✅ | ✅ |
| `gray-900` | 17.81:1 | ✅ | ✅ |
| `gray-600` | 8.00:1 | ✅ | ✅ |
| `gray-500` | 4.83:1 | ✅ | ✅ |
| `gray-400` | 2.64:1 | ❌ | ❌ (disabled/placeholder only) |
| `blue-700` | 10.44:1 | ✅ | ✅ |
| `blue-600` | 8.31:1 | ✅ | ✅ |
| `blue-500` | 6.40:1 | ✅ | ✅ |
| `blue-400` | 4.38:1 | ❌ | ✅ |
| `green-700` | 7.82:1 | ✅ | ✅ |
| `green-600` | 5.22:1 | ✅ | ✅ |
| `red-700` | 8.48:1 | ✅ | ✅ |
| `red-600` | 6.22:1 | ✅ | ✅ |
| `yellow-700` | 5.33:1 | ✅ | ✅ |
| `yellow-400` | 1.68:1 | ❌ | ❌ (fill only, not text) |

## White Text on Colour Fills

Used for primary buttons, semantic badges, etc.

| Background | Ratio (white text) | Normal text |
|---|---|---|
| `blue-700` `#153D80` | 10.44:1 | ✅ |
| `blue-600` `#194B9C` | 8.31:1 | ✅ |
| `blue-500` `#1F5CB8` | 6.40:1 | ✅ |
| `green-700` `#0F5F27` | 7.82:1 | ✅ |
| `green-600` `#177D34` | 5.22:1 | ✅ |
| `red-700` `#9B0F18` | 8.48:1 | ✅ |
| `red-600` `#C1121F` | 6.22:1 | ✅ |
| `gray-900` `#15181C` | 17.81:1 | ✅ |

> **Yellow takes dark text, not white.** `ink` on `yellow-400` is
> **10.06:1** ✅. White on `yellow-400` is only 1.68:1 ❌. Warning fills
> always use `ink`.

## Semantic Surfaces (tint background + emphasis text)

Used by [Alert / Notification](../../packages/ethds-react/)
patterns.

| Combination | Ratio | Normal text |
|---|---|---|
| `green-700` on `green-50` | 6.97:1 | ✅ |
| `red-700` on `red-50` | 7.43:1 | ✅ |
| `blue-700` on `blue-50` | 9.19:1 | ✅ |
| `yellow-700` on `yellow-50` | 4.97:1 | ✅ |
| `ink` on `yellow-50` | 15.78:1 | ✅ |
| `ink` on `green-50` / `red-50` / `blue-50` | ≥ 14.8:1 | ✅ |

## Non-Text Contrast (≥ 3:1)

| Element | Colour | Against | Ratio | Meets 3:1 |
|---|---|---|---|---|
| Focus indicator | `blue-600` | white | 8.31:1 | ✅ |
| Functional border (input) | `gray-500` | white | 4.83:1 | ✅ |
| Functional border | `gray-400` | white | 2.64:1 | ❌ |
| Decorative divider | `gray-300` | white | 1.76:1 | ❌ (decorative only — exempt) |

**Consequence (already reflected in [color.md](color.md)):** borders that
are the only boundary of an active control use **`gray-500` or darker**.
`gray-300`/`gray-400` are for disabled states and purely decorative
dividers, which are exempt from the 3:1 requirement.

## Rules That Follow From This Analysis

1. **Body text** is `ink` on white/light surfaces by default.
2. **Disabled text** (`gray-400`) is intentionally below 4.5:1; disabled
   controls are exempt from contrast minimums, but never use `gray-400`
   for active, readable content.
3. **`blue-400`, `green-500`, `red-500`** are large-text/UI-accent only —
   not for normal-size body text on white.
4. **Yellow** is a dark-text fill; warning *text* on white uses
   `yellow-700`.
5. **Colour is never the sole signal** — semantic state always pairs
   colour with text and/or an icon
   ([Accessibility by Default](../design-principles/04-accessibility-by-default.md)).

## How These Were Computed

Ratios use the WCAG 2.2 definition: `(L1 + 0.05) / (L2 + 0.05)`, where `L`
is relative luminance with the standard sRGB linearisation. The same
values feed the automated contrast checks that the
[Accessibility Framework](../accessibility/)
runs in CI against components, so the palette and the components
built on it stay verifiably AA.
