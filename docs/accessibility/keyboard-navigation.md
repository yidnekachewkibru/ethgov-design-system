# Keyboard Navigation Standards

Every ETHDS service must be fully operable with a keyboard alone — no
mouse, no touch. Many citizens rely on keyboards, switch devices, or
assistive technology that emulates a keyboard; a mouse-only interaction is
simply unavailable to them. (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.5.8.)

## Requirements

1. **Everything interactive is reachable and operable by keyboard.** Every
   control a citizen can click, they can also reach by <kbd>Tab</kbd> and
   operate by <kbd>Enter</kbd>/<kbd>Space</kbd> (and arrow keys where
   appropriate).
2. **Logical tab order.** Focus moves in the order the content is read —
   top to bottom, following the visual/reading order. Tab order is never
   re-sequenced with positive `tabindex`.
3. **No keyboard traps.** Focus can always move away from any element with
   the keyboard. The only intentional "trap" is a modal dialog, which
   confines focus *and* provides a documented way out (<kbd>Esc</kbd> and a
   close control) — see [focus management](focus-management.md).
4. **Visible focus.** The focused element always shows a visible focus
   indicator using `--ethds-color-focus` (`blue-600`, 8.31:1 on white).
   Focus styles are never removed without an equal-or-better replacement.
5. **Target size.** Interactive targets are at least **24×24 CSS px**
   (WCAG 2.2 SC 2.5.8), with adequate spacing; touch-friendly targets are
   larger still on [mobile](../design-principles/03-mobile-first.md). The
   visual control may be smaller than its hit area.
6. **No interaction requires a path device.** No essential action depends
   on hover, drag, or multi-point gestures. Every drag has a single-pointer
   / keyboard alternative (WCAG 2.2 SC 2.5.7).
7. **Skip link.** Pages provide a "skip to main content" link as the first
   focusable element, so keyboard users bypass repeated navigation.

## Standard key behaviours

ETHDS components follow the
[ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) keyboard
conventions:

| Component | Keys |
|---|---|
| Button / Link | <kbd>Enter</kbd> (and <kbd>Space</kbd> for button) |
| Checkbox | <kbd>Space</kbd> toggles |
| Radio group | Arrow keys move and select within the group; <kbd>Tab</kbd> enters/leaves |
| Select / Listbox | <kbd>Enter</kbd>/<kbd>Space</kbd>/arrows open and choose |
| Menu | Arrow keys navigate, <kbd>Esc</kbd> closes |
| Dialog | <kbd>Esc</kbd> closes; focus trapped within while open |
| Tabs | Arrow keys move between tabs |
| Pagination | Each control is a normal tab stop |

## Anti-patterns

- Custom controls (`<div onclick>`) that aren't focusable or operable by
  keyboard — use real buttons/links or add proper role + `tabindex` + key
  handlers.
- Removing focus outlines for aesthetics.
- Positive `tabindex` values that fight the natural order.
- Actions available only on hover or only by dragging.

## How it's verified

Keyboard operability is checked in automated E2E tests (Playwright tabbing
through flows) and in the manual checklist — see the
[testing framework](testing-framework.md). Components document their
keyboard behaviour in their Storybook stories
([Phase 7](../phases/phase-7-core-components.md)).
