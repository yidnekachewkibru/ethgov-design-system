# 3. Mobile First

> Design and build for small, constrained devices first, then enhance for
> larger screens.

## Description

ETHDS services are designed for a small screen and a constrained device
as the baseline, and progressively enhanced for tablets and desktops.
Mobile is not a reduced version of a desktop site — it is the primary
design target. Layouts are single-column by default, touch targets are
generous, and the core task is completable on a low-end phone before any
large-screen refinement is considered.

## Rationale

For most Ethiopians, the phone is the internet. The majority of citizens
who reach a government service do so on a mobile device — often a low-end
Android phone with a small screen, limited memory, and a slow processor,
sometimes shared within a household. A desktop-first service that is later
"made responsive" inevitably carries desktop assumptions — dense layouts,
hover-dependent interactions, heavy pages — that fail exactly the device
most citizens are holding.

Starting from the constrained case forces the right discipline: if a task
works on a small, slow phone, it will work everywhere. The reverse is not
true. Mobile-first is therefore both an equity decision (serving the
majority device) and an engineering one (the constrained baseline keeps
everything lean).

## Examples

- A multi-step permit application is a clean single column on a phone:
  one clear primary action per screen, large tap targets, no horizontal
  scrolling, no pinch-zoom required to read or to hit a control.
- Navigation collapses to a simple, reachable menu on small screens and
  expands to a fuller layout on wide ones — the small-screen version is
  fully functional on its own, not a degraded fallback.
- Interactions work by tap, not hover: nothing essential is hidden behind
  a mouse-over, because there is no mouse.

## Anti-patterns

- **Desktop-first, squeezed later:** designing a dense desktop layout and
  treating mobile as an afterthought that crams the same content into a
  narrow column.
- **Hover-dependent UI:** menus, tooltips, or actions that only appear on
  mouse-over and are unreachable by touch.
- **Tiny or crowded touch targets:** controls too small or too close
  together to tap reliably, especially for users with larger fingers,
  motor impairments, or a cracked low-end screen.
- **Horizontal scrolling and forced zoom:** tables or layouts that don't
  reflow, forcing the citizen to pan and pinch to read.

## Implementation Guidance

- Design and build the small-screen layout first; add breakpoints to
  enhance upward, not to rescue a desktop layout downward.
- Default to single-column layouts and one primary action per screen.
  This pairs with [Simple Before Powerful](05-simple-before-powerful.md).
- Meet the touch-target sizing in the
  [Accessibility Framework](../phases/phase-5-accessibility-framework.md)
  (touch accessibility is an explicit WCAG 2.2 AA concern), so controls
  are reliably tappable.
- Make all interactions work by tap. Never hide an essential action
  behind hover.
- Build [ETHDS components](../phases/phase-7-core-components.md) and
  [templates](../phases/phase-9-website-templates.md) to be responsive by
  default; teams compose them rather than re-solving responsiveness per
  service.
- Keep the mobile baseline light — the constrained device is also the
  one on the slow connection, so mobile-first reinforces
  [Design for Low Bandwidth](06-design-for-low-bandwidth.md).
