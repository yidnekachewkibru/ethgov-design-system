# Iconography

Icons in ETHDS support comprehension — they help citizens recognise
actions and categories quickly, across languages and literacy levels.
They are never the sole carrier of meaning. These guidelines define how
ETHDS icons look and behave; the icon set itself is built as
[`@ethds/icons`](../phases/phase-7-core-components.md) (alongside Phase 7).

## Style

- **Outline, single-weight.** Icons use a consistent stroke style, not
  filled or multi-weight, for a calm, official tone.
- **Grid:** designed on a **24×24** base grid with a **2px** stroke and
  ~2px padding (a 20px live area), so icons align optically at a common
  size.
- **Corners & joins:** rounded caps/joins matching the modest
  [radius](radius.md) language; no sharp decorative flourishes.
- **Geometry over realism:** simple, geometric forms that read at small
  sizes, not detailed illustrations.

## Sizing

Icons render at sizes from the [spacing](spacing.md)/type rhythm:

| Token | Size | Use |
|---|---|---|
| `icon-sm` | 16px | Inline with `text-sm`, dense UI |
| `icon-md` | 20px | **Default — inline with body text, buttons** |
| `icon-lg` | 24px | Standalone actions, list leading icons |
| `icon-xl` | 32px | Feature/section icons |

Scale icons in steps that keep the 2px stroke visually consistent; avoid
arbitrary sizes that make strokes look heavier or lighter than
neighbouring icons.

## Colour

- Icons inherit text colour (`currentColor`) by default, so they meet the
  same contrast as the text beside them.
- A standalone icon that conveys meaning (e.g. a status icon) must meet
  **3:1** non-text contrast against its background — see
  [accessibility-analysis.md](accessibility-analysis.md).
- Semantic icons use the semantic colours from [color.md](color.md)
  (success/warning/error/info) **paired with text**, never colour alone.

## Accessibility

- **Decorative icons** (next to a text label that already conveys meaning)
  are hidden from assistive tech (`aria-hidden="true"`) so they aren't
  announced redundantly.
- **Meaningful icons** (icon-only buttons, status indicators) have an
  accessible name (e.g. `aria-label`) in the citizen's
  [active language](../design-principles/02-multilingual-by-default.md).
- Icon-only controls still meet the minimum touch-target size from the
  [Accessibility Framework](../phases/phase-5-accessibility-framework.md);
  the visual icon may be `icon-md` while the tappable target is larger.
- Never use an icon as the only indicator of state — pair with text, per
  [Accessibility by Default](../design-principles/04-accessibility-by-default.md).

## Format & Performance

- Icons ship as **optimised inline SVG** (e.g. via the React `Icon`
  component), so they inherit colour, scale crisply, and add minimal
  weight — supporting
  [Design for Low Bandwidth](../design-principles/06-design-for-low-bandwidth.md).
- Strip metadata and editor cruft from SVGs; no raster icons for UI.

The `Icon` component contract is defined with the
[core components](../phases/phase-7-core-components.md); this page governs
the visual and accessibility rules the icon set follows.
