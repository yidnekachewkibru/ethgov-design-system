# Typography

Typography in ETHDS must serve six languages across two scripts:
**Ge'ez/Ethiopic script** (Amharic, Tigrinya) and **Latin script**
(English, Afaan Oromo, Somali, Afar). Type choices are made so that every
language renders correctly and legibly, and so that font loading stays
light on slow connections — directly serving
[Multilingual by Default](../design-principles/02-multilingual-by-default.md)
and [Design for Low Bandwidth](../design-principles/06-design-for-low-bandwidth.md).

## Font Families

ETHDS uses open-source fonts with full coverage of both scripts, and a
system-font fallback stack so text is readable even before (or without)
web fonts loading.

| Role | Stack |
|---|---|
| **Sans (UI & body)** | `"Noto Sans", "Noto Sans Ethiopic", system-ui, "Segoe UI", Roboto, Arial, sans-serif` |
| **Ethiopic-first** | `"Noto Sans Ethiopic", "Abyssinica SIL", "Noto Sans", system-ui, sans-serif` |
| **Monospace** | `ui-monospace, "Cascadia Code", "Roboto Mono", Menlo, Consolas, monospace` |

Rationale:

- **Noto Sans** + **Noto Sans Ethiopic** are open-licensed (SIL OFL), free
  to self-host and redistribute, and together cover all six languages.
  Ethiopic is a separate Noto family, so it is declared explicitly in the
  stack rather than assumed.
- **`system-ui` early in the fallback** means that on a slow or failed
  font load, the citizen still sees fully legible native text rather than
  a blank or broken page — a [low-bandwidth](../design-principles/06-design-for-low-bandwidth.md)
  safeguard.
- Self-host **subsetted** web fonts (Latin subset and Ethiopic subset
  loaded per the active language) rather than pulling full font files, to
  keep page weight down. Use `font-display: swap`.

## Type Scale

A modular scale on a `16px` (`1rem`) base. Sizes are in `rem` so they
respect the user's browser font-size preference (an accessibility
requirement — never lock font size in `px`).

| Token | Size | px @16 | Line height | Typical use |
|---|---|---|---|---|
| `text-xs`   | `0.75rem`  | 12 | 1.5  | Fine print, captions |
| `text-sm`   | `0.875rem` | 14 | 1.5  | Secondary text, labels |
| `text-base` | `1rem`     | 16 | 1.6  | **Body text (default)** |
| `text-lg`   | `1.125rem` | 18 | 1.6  | Lead paragraph |
| `text-xl`   | `1.375rem` | 22 | 1.4  | H4 / small headings |
| `text-2xl`  | `1.75rem`  | 28 | 1.3  | H3 |
| `text-3xl`  | `2.25rem`  | 36 | 1.25 | H2 |
| `text-4xl`  | `3rem`     | 48 | 1.2  | H1 / page title |

Body text is `text-base` minimum — never smaller than `16px` equivalent
for primary reading content, which keeps text legible on small
[mobile](../design-principles/03-mobile-first.md) screens.

## Weights

Keep weights minimal to limit font payload:

| Token | Value | Use |
|---|---|---|
| `font-regular` | 400 | Body text |
| `font-medium`  | 500 | Emphasis, labels, buttons |
| `font-bold`    | 700 | Headings, strong emphasis |

Note: Ge'ez script typically renders with fewer weight variations than
Latin; do not rely on a weight for meaning that isn't available in the
Ethiopic font — pair weight with size or colour for emphasis.

## Line Length & Spacing

- Target a measure of **60–75 characters** per line for body text for
  readability; constrain content column width accordingly.
- Default body line-height is `1.6`; headings tighten toward `1.2`.
- Ge'ez script benefits from slightly more generous line-height than
  Latin — do not set line-height below `1.5` for Ethiopic body text.

## Implementation Guidance

- Reference the type scale tokens, never hardcoded `px` font sizes.
- Set the document language (`lang` attribute) so the browser selects the
  correct font and rendering for the active language — this is part of the
  [Localization Framework](../phases/phase-6-localization-framework.md).
- Headings follow a logical, sequential structure (`h1` → `h2` → `h3`)
  for screen readers, per
  [Accessibility by Default](../design-principles/04-accessibility-by-default.md).
- Values are encoded in [`assets/ethds-brand.css`](assets/ethds-brand.css)
  and [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs).
