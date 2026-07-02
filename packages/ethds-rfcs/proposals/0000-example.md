# RFC 0000 — Add a DatePicker component (Ethiopian calendar)

- **Status:** Accepted <!-- worked example -->
- **Author(s):** ETHDS maintainers
- **Created:** 2026-07-01
- **Affects:** @ethds/react, @ethds/patterns
- **Tracking:** (example — no real PR)

> This is a **worked example** showing the shape of an RFC. It is not a
> live proposal.

## Summary

Add an accessible `DatePicker` component to `@ethds/react` that supports
both the **Ethiopian calendar** (default in `am`/`ti` contexts) and the
Gregorian calendar, so services like Appointment Booking stop hand-rolling
date entry.

## Motivation

Multiple flows (appointment booking, application deadlines) need date
entry. Today teams build ad-hoc pickers that mishandle the Ethiopian
calendar and are often inaccessible. A shared, correct, accessible picker
solves this once for every service — [Reuse Before Building](../../../docs/design-principles/07-reuse-before-building.md).

## Proposal

A `DatePicker` that:

- Accepts and emits an ISO 8601 (Gregorian) value; displays in the active
  calendar via `Intl.DateTimeFormat(..., { calendar })`.
- Offers text entry **and** a calendar grid; text entry is primary (works
  best on low-end devices and with assistive tech).
- Labels, hints, and errors wired like other form fields
  (`aria-describedby`/`aria-invalid`).

## Accessibility impact

Keyboard-navigable grid (arrow keys, Home/End, PageUp/Down), `role="grid"`
semantics, visible focus, ≥24px targets, and a plain text-entry fallback.
Announces the selected date. Meets WCAG 2.2 AA per
[docs/accessibility](../../../docs/accessibility/).

## Localization impact

Renders in the Ethiopian or Gregorian calendar per locale, labelled
(E.C./G.C.); month/day names localized; parses the citizen's input
leniently. Follows
[date formatting](../../../docs/localization/date-formatting.md).

## Alternatives considered

- **Native `<input type="date">`** — no Ethiopian-calendar support, and
  inconsistent UI across browsers. Rejected as insufficient.
- **A third-party picker** — heavy, rarely accessible, and doesn't do the
  Ethiopian calendar. Rejected on bundle size and correctness.

## Migration & compatibility

Additive; no breaking change. Appointment Booking would adopt it in a
follow-up.

## Open questions

- Default to Ethiopian or Gregorian per service, or always show both?
