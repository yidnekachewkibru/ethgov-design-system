# Contrast Requirements

Sufficient contrast is what makes text and controls legible — in bright
sunlight, on a cheap screen, for low vision, and for everyone. ETHDS
colour is chosen and verified against these thresholds; this page states
the rules, and [`docs/brand/accessibility-analysis.md`](../brand/accessibility-analysis.md)
holds the **measured** ratios. (WCAG 1.4.1, 1.4.3, 1.4.11.)

## Thresholds (WCAG 2.2 AA)

| Requirement | Ratio | Applies to |
|---|---|---|
| Normal text | **4.5:1** | Text below 24px (or below 18.66px bold) |
| Large text | **3:1** | Text ≥ 24px, or ≥ 18.66px bold |
| Non-text | **3:1** | UI component boundaries, states, focus indicators, meaningful graphics/icons |

## Rules

1. **Body text** is `ink` on white/light surfaces (16.91:1). Secondary
   text uses `gray-600` (8.00:1); `gray-500` is the lightest grey allowed
   for text (4.83:1).
2. **Colour is never the only signal** (WCAG 1.4.1). Semantic state always
   pairs colour with text and/or an icon — an error is never "red border
   only", a required field never "red asterisk only" without text.
3. **Functional borders need ≥ 3:1.** A border that is the only boundary
   of a control (e.g. a text input outline) uses `gray-500` or darker.
   `gray-300`/`gray-400` are for **decorative** dividers only (exempt from
   3:1) and disabled states.
4. **Focus indicators need ≥ 3:1** against adjacent colours;
   `--ethds-color-focus` (`blue-600`) is 8.31:1 on white.
5. **Yellow is a dark-text fill.** `ink` on `yellow-400` is 10.06:1; white
   on `yellow-400` fails — warning fills always use dark text, warning
   *text* on white uses `yellow-700`.
6. **White text on colour fills** is only used on the verified
   combinations (e.g. white on `blue-600` 8.31:1, on `green-600` 5.22:1,
   on `red-600` 6.22:1).
7. **Disabled** controls are exempt from contrast minimums but must still
   be clearly distinguishable; never use the disabled grey for active
   text.
8. **Text over images** must meet the same ratios — use an overlay/scrim
   or a solid panel behind text rather than placing text on a variable
   photo.

## Enforcement

- The palette pairings are verified in
  [`docs/brand/accessibility-analysis.md`](../brand/accessibility-analysis.md).
- The [`@ethds/tokens`](../../packages/ethds-tokens/) test suite recomputes
  the key pairings on every build and fails if any drops below its
  threshold — so the palette cannot silently regress.
- Component-level contrast (text on its actual background, focus rings,
  borders) is checked by axe-core in component tests, per the
  [testing framework](testing-framework.md).

## Note on themes

If a service introduces a dark theme, its pairings must be verified to the
same thresholds — passing in light mode does not imply passing in dark
mode. The documentation site's dark theme remaps the primary to lighter
blues for exactly this reason.
