---
id: accessibility-review-process
title: Accessibility Review Process
sidebar_position: 9
---

# Accessibility Review Process

How accessibility sign-off works in practice. This operationalizes the
[Accessibility Framework](/docs/accessibility) as a repeatable review
step, so **WCAG 2.2 AA is enforced, not just declared**.

## When an accessibility review is required

- Any change that adds or alters UI in `@ethds/react`,
  `@ethds/patterns`, `@ethds/templates`, or `ethds-examples`.
- Any [RFC](rfc-process.md) that affects user-facing behaviour.
- Any change to the accessibility **standards** themselves (these
  additionally need maintainer consensus).

## Who reviews

An **accessibility reviewer** — a contributor with demonstrated a11y
expertise, granted sign-off authority per the
[contributor ladder](contributor-ladder.md). Their sign-off is
**required** for the change to merge; it is not optional feedback.

## What the review covers

Against the
[accessibility checklist](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/accessibility/checklist.md):

- **Automated:** `eslint-plugin-jsx-a11y` clean; `vitest-axe` tests pass
  for the changed component/pattern in its key states.
- **Manual (for new/changed UI):**
  - Keyboard-only walkthrough (reachable, operable, logical order, no
    traps, visible focus).
  - Screen-reader pass (name/role/state correct, announcements sensible,
    reading order) with at least one of NVDA / VoiceOver / TalkBack.
  - 200% zoom / 320px reflow; reduced-motion; forced-colors.
  - A pass in a **Ge'ez-script language** (screen-reader pronunciation,
    layout).

## Outcome

- **Approved** — the reviewer records that the checklist is met.
- **Changes requested** — specific, actionable items tied to WCAG success
  criteria; the change does not merge until resolved.
- A change that violates a
  [policy non-negotiable](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/accessibility/accessibility-policy.md#non-negotiables)
  is **blocked**, not merged with a "known issue".

## Continuous enforcement

Automated a11y checks run in CI on every PR touching UI packages. Reported
accessibility defects are treated as bugs and prioritized. The
[testing framework](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/accessibility/testing-framework.md)
describes the tooling — the live component, pattern, and template test
suites referenced there are what this review checks against, not a
separate paper process.
