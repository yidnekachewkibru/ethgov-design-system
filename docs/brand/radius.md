# Radius

Corner radius tokens give ETHDS surfaces a consistent, calm shape.
Government interfaces favour restraint — radii are modest, never playful.

## Scale

| Token | Value | Typical use |
|---|---|---|
| `radius-none` | `0`       | Tables, full-bleed surfaces |
| `radius-sm`   | `0.125rem` (2px) | Subtle softening, tags |
| `radius-md`   | `0.25rem` (4px)  | **Default — inputs, buttons, cards** |
| `radius-lg`   | `0.5rem` (8px)   | Larger cards, dialogs, surfaces |
| `radius-xl`   | `0.75rem` (12px) | Prominent containers, hero panels |
| `radius-full` | `9999px`         | Pills, avatars, circular controls |

## Usage

- `radius-md` is the default for interactive controls (buttons, inputs,
  selects) and small cards — use it unless there is a reason not to.
- Use `radius-full` only for genuinely pill- or circle-shaped elements
  (status chips, avatars, icon-only round buttons).
- Keep radius consistent within a composition — don't mix several radii
  on sibling elements.
- Radius is purely visual and carries no meaning; never rely on shape
  alone to communicate state (pair with colour, text, or icon, per
  [Accessibility by Default](../design-principles/04-accessibility-by-default.md)).

Values are encoded in [`assets/ethds-brand.css`](assets/ethds-brand.css)
and [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs).
