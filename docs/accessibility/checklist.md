# Accessibility Checklist

Apply this checklist to every change that adds or alters UI. It is the
practical expression of the [accessibility policy](accessibility-policy.md)
and is a **merge requirement**, not optional review feedback
([CONTRIBUTING.md](../../CONTRIBUTING.md#accessibility-and-localization)).
A PR touching UI states how these were met.

## Keyboard

- [ ] Every interactive control is reachable and operable by keyboard
      (<kbd>Tab</kbd>, <kbd>Enter</kbd>/<kbd>Space</kbd>, arrows where
      appropriate).
- [ ] Tab order matches reading order; no positive `tabindex`.
- [ ] No keyboard trap (except an intentional, escapable modal).
- [ ] Interactive targets are ≥ 24×24 CSS px (WCAG 2.2 SC 2.5.8).
- [ ] No action depends on hover, drag, or multi-point gesture without an
      alternative.

## Focus

- [ ] Visible focus indicator on every focusable element (`--ethds-color-focus`).
- [ ] Dialogs: focus moves in, is trapped, <kbd>Esc</kbd> closes, focus
      returns to the trigger on close.
- [ ] Focused element is never fully obscured by sticky/overlay UI (WCAG 2.2 SC 2.4.11).
- [ ] On submit-with-errors, focus moves to the error summary / first
      invalid field.

## Screen reader / semantics

- [ ] Semantic HTML used before ARIA; no broken/redundant ARIA.
- [ ] Every interactive control has an accessible name (in the active
      language).
- [ ] Correct role + states (`aria-expanded`, `aria-checked`,
      `aria-selected`, `aria-invalid`, …).
- [ ] One `<h1>`; logical heading order; landmarks present.
- [ ] Inputs have associated `<label>`; help/error text associated via
      `aria-describedby`.
- [ ] Decorative icons hidden (`aria-hidden`); meaningful icons named.
- [ ] Status/async updates announced via a live region (WCAG 4.1.3).

## Colour & contrast

- [ ] Text meets 4.5:1 (or 3:1 large); non-text/UI meets 3:1.
- [ ] Colour is never the only way information is conveyed.
- [ ] Functional borders use `gray-500`+; warning fills use dark text.

## Motion

- [ ] `prefers-reduced-motion` honoured for non-essential motion.
- [ ] No autoplaying looping motion; nothing flashes > 3×/s.

## Responsive / zoom

- [ ] Usable at 320px width with no 2-D scrolling (reflow).
- [ ] Usable at 200% text zoom without loss of content/function.
- [ ] Built mobile-first.

## Localization (interdependent)

- [ ] Accessible names, labels, and error messages exist in all six
      supported languages.
- [ ] Correct `lang` set so screen readers pronounce content properly.
- [ ] Layout holds with the longest translation and in Ge'ez script.

## Forms & flows (WCAG 2.2 additions)

- [ ] Don't re-ask for information already provided in the flow (SC 3.3.7
      Redundant Entry).
- [ ] Authentication needs no cognitive puzzle; paste and password
      managers work; OTP entry is paste-friendly (SC 3.3.8).
- [ ] Help/contact is in a consistent place (SC 3.2.6).

## Verification

- [ ] Automated checks pass (lint, axe component tests, Playwright +
      axe E2E) — see [testing framework](testing-framework.md).
- [ ] Manual pass done for new/changed UI: keyboard-only, a screen
      reader, 200% zoom, reduced-motion, and a Ge'ez-language check.

> If any non-negotiable in the [policy](accessibility-policy.md#non-negotiables)
> is unmet, the change does not ship.
