# Phase 8 — Government Service Patterns

**Status:** ✅ Complete — all 10 patterns documented

## Goal

Build reusable, end-to-end government service flows so teams don't
redesign the same citizen interactions (login, payment, status tracking)
from scratch for every service.

## Delivered

All 10 patterns are documented in
[`packages/ethds-patterns/patterns/`](../../packages/ethds-patterns/patterns/),
each with the full deliverable set (User Journey, UX Flow, Wireframe,
Validation Rules, Error Handling, Accessibility Guidance, Localization,
and a **React Example** composing the real `@ethds/react` components):

- [Login](../../packages/ethds-patterns/patterns/login.md)
- [Registration](../../packages/ethds-patterns/patterns/registration.md)
- [OTP Verification](../../packages/ethds-patterns/patterns/otp-verification.md)
- [Password Reset](../../packages/ethds-patterns/patterns/password-reset.md)
- [Application Submission](../../packages/ethds-patterns/patterns/application-submission.md)
- [Status Tracking](../../packages/ethds-patterns/patterns/status-tracking.md)
- [Appointment Booking](../../packages/ethds-patterns/patterns/appointment-booking.md)
- [Complaint Submission](../../packages/ethds-patterns/patterns/complaint-submission.md)
- [Payment Flow](../../packages/ethds-patterns/patterns/payment-flow.md)
- [Receipt Flow](../../packages/ethds-patterns/patterns/receipt-flow.md)

Every pattern is grounded in Ethiopian context (Fayda ID, +251/SMS OTP,
Birr, kebele/woreda, Ethiopian calendar) and applies the
[accessibility](../accessibility/) (incl. WCAG 2.2 Accessible
Authentication, Redundant Entry, Consistent Help) and
[localization](../localization/) standards.

## Deliverables (per pattern)

- User Journey
- Accessibility Guidance
- Validation Rules
- Error Handling
- UX Flow
- Wireframes
- React Examples

Complete documentation for each, not just code.

## Output Location

`packages/ethds-patterns/` (replaces the README-only stub).

## Dependencies

- [Phase 7 — Core Components](phase-7-core-components.md) (`@ethds/react`)
  — patterns are compositions of core components, not new primitives.
- [Phase 5](phase-5-accessibility-framework.md) and
  [Phase 6](phase-6-localization-framework.md) frameworks, applied at the
  flow level (e.g. error messages and validation feedback must be
  translated and screen-reader announced, not just visually displayed).

## Consumed By

- [Phase 9 — Website Templates](phase-9-website-templates.md)
- [Phase 10 — Reference Implementations](phase-10-reference-implementations.md)
