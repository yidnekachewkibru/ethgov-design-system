# Spacing

ETHDS uses a single spacing scale based on a **4px base unit**. All
margins, padding, and gaps come from this scale so that spacing is
consistent and rhythmic across every component and service. Values are
expressed in `rem` (relative to the 16px root) so they scale with the
user's font-size preference.

## Scale

| Token | rem | px @16 | Typical use |
|---|---|---|---|
| `space-0`  | `0`      | 0  | Reset |
| `space-1`  | `0.25rem`| 4  | Hairline gaps, icon/text spacing |
| `space-2`  | `0.5rem` | 8  | Tight padding, chip spacing |
| `space-3`  | `0.75rem`| 12 | Compact control padding |
| `space-4`  | `1rem`   | 16 | **Default gap / control padding** |
| `space-5`  | `1.25rem`| 20 | |
| `space-6`  | `1.5rem` | 24 | Section inner padding |
| `space-8`  | `2rem`   | 32 | Between related groups |
| `space-10` | `2.5rem` | 40 | |
| `space-12` | `3rem`   | 48 | Between sections |
| `space-16` | `4rem`   | 64 | Major section separation |
| `space-20` | `5rem`   | 80 | |
| `space-24` | `6rem`   | 96 | Page-level spacing |

## Usage

- **Use the scale, not arbitrary values.** A spacing value not on the
  scale is almost always a mistake; if a real need appears, raise it
  rather than hardcoding an off-scale value.
- **Touch targets:** interactive controls must be large enough to tap
  reliably on [mobile](../design-principles/03-mobile-first.md). Combine
  padding from this scale to reach the minimum target size defined in the
  [Accessibility Framework](../accessibility/)
  (WCAG 2.2 target-size guidance) — typically at least `space-3` vertical
  padding on a `text-base` control.
- **Layout gaps** between fields, cards, and sections should step up the
  scale to express hierarchy (e.g. `space-4` within a group, `space-8`
  between groups, `space-12` between sections).
- **Density:** prefer the more generous step when unsure — comfortable
  spacing aids readability and tap accuracy, especially on small or
  low-quality screens.

Values are encoded in [`assets/ethds-brand.css`](assets/ethds-brand.css)
and [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs), and are
part of [`@ethds/tokens`](../../packages/ethds-tokens/).
