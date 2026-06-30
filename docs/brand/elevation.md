# Elevation

Elevation expresses layering — what sits above what — using a small set
of shadow tokens. ETHDS uses elevation sparingly: most government content
is flat and calm, and shadow is reserved for elements that genuinely float
above the page (menus, dialogs, key cards).

## Scale

| Token | Shadow | Use |
|---|---|---|
| `elevation-0` | `none` | Flush with the page (default) |
| `elevation-1` | `0 1px 2px rgba(10,12,14,0.08), 0 1px 1px rgba(10,12,14,0.04)` | Resting cards, subtle separation |
| `elevation-2` | `0 2px 4px rgba(10,12,14,0.10), 0 1px 2px rgba(10,12,14,0.06)` | Raised cards, hovered surfaces |
| `elevation-3` | `0 6px 12px rgba(10,12,14,0.12), 0 2px 4px rgba(10,12,14,0.08)` | Dropdowns, popovers, menus |
| `elevation-4` | `0 12px 24px rgba(10,12,14,0.16), 0 4px 8px rgba(10,12,14,0.10)` | Dialogs, modals, sheets |

Shadows are built on the near-black `black` (`#0A0C0E`) at low opacity, so
they read as soft neutral shadow rather than tinted.

## Usage

- **Default to `elevation-0`.** Add elevation only when an element truly
  overlaps content beneath it.
- Higher elevation = closer to the user / more transient. A modal
  (`elevation-4`) sits above a menu (`elevation-3`), which sits above a
  card (`elevation-1`).
- Elevation is decorative reinforcement, not the only cue: a dialog is
  also marked by a backdrop and correct focus management (see
  [Accessibility by Default](../design-principles/04-accessibility-by-default.md)),
  not by shadow alone.
- Avoid stacking many elevated layers; it creates visual noise and, on
  [low-end devices](../design-principles/03-mobile-first.md), repaint cost.

Values are encoded in [`assets/ethds-brand.css`](assets/ethds-brand.css)
and [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs).
