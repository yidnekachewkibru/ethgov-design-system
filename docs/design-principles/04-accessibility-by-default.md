# 4. Accessibility by Default

> WCAG 2.2 AA is the floor every release meets, not a checklist applied at
> the end.

## Description

Accessibility is built into every ETHDS component, pattern, and template
from the start, and WCAG 2.2 AA is the minimum bar — not a target to aim
for, a floor to never drop below. Keyboard operability, screen reader
support, visible focus, sufficient contrast, reduced-motion support, and
touch accessibility are properties of the building blocks themselves, so
a team that composes ETHDS correctly inherits an accessible service by
default.

## Rationale

Accessible government is not optional. A public service must be usable by
citizens who are blind or have low vision, who are Deaf or hard of
hearing, who have motor or cognitive disabilities, or who are simply on a
small screen in bright sunlight on a slow connection. When a single
government service is inaccessible, it doesn't inconvenience a citizen —
it denies them a public service they are entitled to.

Accessibility added at the end never works: it becomes a rushed audit
that catches a fraction of the issues and a backlog that never clears.
Building it into the components means every service gets it for free, and
the cost is paid once, by ETHDS, rather than repeatedly and badly by each
service team. Many accessibility practices (clear structure, good
contrast, keyboard support) also make services better for *everyone*,
including the low-literacy and low-bandwidth users ETHDS prioritises.

## Examples

- A citizen completes an entire application using only the keyboard:
  every control is reachable in a logical order, focus is always visible,
  and focus moves sensibly as steps and dialogs open and close.
- A screen reader announces a form field's label, its required state, its
  help text, and — when submission fails — the specific error and how to
  fix it, in the citizen's [chosen language](02-multilingual-by-default.md).
- Text and interface colours meet WCAG 2.2 AA contrast against their
  backgrounds, verified for every colour pairing in the
  [brand system](../phases/phase-2-brand-system.md).
- Animations respect the operating system's reduced-motion setting and do
  not autoplay motion that could cause discomfort or distraction.

## Anti-patterns

- **Audit-at-the-end:** treating accessibility as a pre-launch checklist
  rather than a property of every component, then shipping with a long
  list of "known issues".
- **Mouse-only interactions:** controls that can't be reached or operated
  by keyboard, or custom widgets with no screen-reader semantics.
- **Invisible focus:** removing focus outlines for aesthetics, leaving
  keyboard users unable to tell where they are.
- **Colour as the only signal:** indicating errors or status with colour
  alone, unreadable to colour-blind users or in poor lighting.
- **Inaccessible content formats:** delivering essential information only
  as an image of text or an untagged PDF.
- **Motion with no escape:** autoplaying carousels or animations that
  ignore reduced-motion preferences.

## Implementation Guidance

- Build to **WCAG 2.2 AA as the minimum**. The
  [Accessibility Framework](../phases/phase-5-accessibility-framework.md)
  defines the concrete standards (keyboard, screen reader, focus
  management, contrast, motion) and the testing process, and provides the
  checklist used in review.
- Every interactive [component](../phases/phase-7-core-components.md) ships
  keyboard-operable, with correct roles/labels, a visible focus state, and
  documented accessibility behaviour — accessibility guidance is a
  required part of each component's spec.
- Never use colour as the sole means of conveying information; pair it
  with text, icons, or other cues.
- Announce errors and status changes to assistive technology, not just
  visually — see the
  [service patterns](../phases/phase-8-government-service-patterns.md) for
  error-handling expectations.
- Respect reduced-motion preferences per the motion standards in the
  [Accessibility Framework](../phases/phase-5-accessibility-framework.md).
- Meet touch-target and pointer requirements so the principle holds on
  [mobile](03-mobile-first.md), not just desktop.
- Accessibility is a merge requirement, not review feedback: PRs that add
  or change UI must show how it was met
  ([`CONTRIBUTING.md`](../../CONTRIBUTING.md#accessibility-and-localization)).
