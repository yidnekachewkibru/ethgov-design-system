# Grid

A shared 12-column, mobile-first layout grid, built entirely from the
[spacing scale](spacing.md) — no separate set of layout numbers to keep in
sync. Every [template](../phases/phase-9-website-templates.md) and
[pattern](../phases/phase-8-government-service-patterns.md) lays out on
this grid, so a citizen's eye doesn't have to re-learn the page rhythm
moving between a ministry site and an agency site — see
[Consistent Government Experience](../design-principles/09-consistent-government-experience.md).

## Breakpoints

Five breakpoints, [mobile-first](../design-principles/03-mobile-first.md):
the base (no media query) styles target the smallest, most constrained
screen, and each breakpoint below only *adds* layout as room allows.

| Name | Min width | Typical device |
|---|---|---|
| Base | `0` | Low-end Android phones, 2G/3G connections |
| `sm` | `640px` | Large phones, small tablets (portrait) |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops, small desktops |
| `xl` | `1280px` | Desktops |

```css
/* Base: no media query — this is the default, not an edge case. */
.service-nav { flex-direction: column; }

@media (min-width: 768px) {
  .service-nav { flex-direction: row; }
}
```

## Container

The content container centres the page and caps line length for
readability at wide viewports. Its side padding is the grid **margin**,
drawn from the [spacing scale](spacing.md):

| Breakpoint | Max width | Side padding (margin) |
|---|---|---|
| Base | `100%` | `space-4` (16px) |
| `sm` | `100%` | `space-6` (24px) |
| `md` | `720px` | `space-6` (24px) |
| `lg` | `960px` | `space-8` (32px) |
| `xl` | `1200px` | `space-8` (32px) |

```css
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--ethds-space-4);
}
@media (min-width: 640px) {
  .container { padding-inline: var(--ethds-space-6); }
}
@media (min-width: 768px) {
  .container { max-width: 720px; padding-inline: var(--ethds-space-6); }
}
@media (min-width: 1024px) {
  .container { max-width: 960px; padding-inline: var(--ethds-space-8); }
}
@media (min-width: 1280px) {
  .container { max-width: 1200px; padding-inline: var(--ethds-space-8); }
}
```

## Columns

**12 columns**, with a **gutter** (the gap between columns) of `space-4`
(16px) below `md` and `space-6` (24px) from `md` up — wide enough to be a
clear visual break on a small screen without wasting scarce width.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--ethds-space-4);
}
@media (min-width: 768px) {
  .grid { gap: var(--ethds-space-6); }
}

/* Span utilities, e.g. a two-thirds / one-third split above `md` */
.col-8 { grid-column: span 12; }
.col-4 { grid-column: span 12; }
@media (min-width: 768px) {
  .col-8 { grid-column: span 8; }
  .col-4 { grid-column: span 4; }
}
```

Native CSS Grid (as above) is the reference implementation — no grid
library dependency, keeping bundles small per
[Design for Low Bandwidth](../design-principles/06-design-for-low-bandwidth.md).
Flexbox with `flex-basis` percentages is an equally valid implementation
of the same 12-column/gutter/breakpoint numbers where Grid isn't
available.

## Common layouts

- **Full width:** single `col-12` — forms, most content pages. Government
  services are read top-to-bottom on a phone; don't force multi-column
  layout where one column reads better.
- **Content + related links:** `col-8` main content, `col-4` sidebar
  (related links, contact details) from `md` up; stacked (content first)
  below `md`.
- **Card grid:** search results, news listings — `col-12` at base (one
  card per row), `col-6` at `sm` (two per row), `col-4` at `lg` (three per
  row).

## Usage

- **Never** hardcode a pixel width or gutter outside this scale — a
  layout value not on the grid or the [spacing scale](spacing.md) is
  almost always a mistake.
- Stack to a single column well before content is forced to wrap or
  overflow; prefer an earlier breakpoint change to a cramped multi-column
  layout.
- The grid governs layout only — component-internal spacing (padding
  inside a card, gaps inside a form) still comes from the
  [spacing scale](spacing.md) directly, not from grid columns.

Grid CSS variables (breakpoints and gutters) are shipped alongside the
rest of [`@ethds/tokens`](../phases/phase-3-design-tokens.md) so services
consume one source of truth for layout and spacing together.
