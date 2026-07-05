# Focus Management Standards

Focus is how a keyboard or screen reader user knows where they are and
what will respond. ETHDS manages focus deliberately so it is always
visible, logically ordered, and never lost. (WCAG 2.4.3, 2.4.7, 2.4.11,
2.1.2.)

## Requirements

1. **Focus is always visible.** Every focusable element shows a clear
   indicator using `--ethds-color-focus` (`blue-600`, 8.31:1 on white,
   meeting the 3:1 non-text minimum). The indicator is at least 2px and
   has sufficient offset to be seen against the control.
2. **Logical focus order** follows reading order (WCAG 2.4.3); no positive
   `tabindex`.
3. **Focus is not obscured** (WCAG 2.2 SC 2.4.11). Sticky headers, cookie
   bars, and other overlays must not fully cover the focused element —
   scroll padding or offsets keep the focused control visible.
4. **Moving focus on interaction is purposeful:**
   - Opening a **dialog/modal**: focus moves into the dialog (to the first
     control or the dialog itself); focus is **trapped** within while open;
     <kbd>Esc</kbd> and a visible close control dismiss it; on close, focus
     **returns** to the element that opened it.
   - Opening a **menu/disclosure**: focus moves as per the
     [ARIA APG](https://www.w3.org/WAI/ARIA/apg/); <kbd>Esc</kbd> closes
     and returns focus to the trigger.
   - **Removing** the focused element (e.g. deleting a row): focus moves to
     a sensible neighbour, never to nowhere (which sends focus to
     `<body>`).
5. **Route changes** (single-page navigation) move focus to the new page's
   main heading or main landmark and update the page title, so screen
   reader users are told the page changed.
6. **No keyboard traps** except intentional, escapable modal traps (WCAG
   2.1.2).
7. **Error focus.** On submit with errors, move focus to the error summary
   (or the first invalid field) so the user is taken straight to the
   problem.

## Skip link

The first focusable element on a page is a "skip to main content" link so
keyboard users can bypass repeated navigation and land on `<main>`.

## Anti-patterns

- Auto-focusing arbitrary elements on page load (disorienting; can also
  trigger unexpected screen-reader announcements).
- Opening a dialog without moving focus into it, or not restoring focus on
  close.
- Focus landing on `<body>` after an element is removed.
- Focus indicators removed or too low-contrast to see.
- A sticky header that scrolls a newly focused field out of view.

## How it's verified

Focus order, visibility, trapping, and restoration are checked in
Playwright E2E tests and confirmed in manual keyboard testing — see the
[testing framework](testing-framework.md). Components document their focus
behaviour in Storybook ([`@ethds/react`](../../packages/ethds-react/)).
