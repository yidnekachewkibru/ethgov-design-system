# Phase 8 — Government Service Patterns

**Status:** 📋 Planned

## Goal

Build reusable, end-to-end government service flows so teams don't
redesign the same citizen interactions (login, payment, status tracking)
from scratch for every service.

## Patterns

Login, Registration, OTP Verification, Password Reset, Application
Submission, Status Tracking, Appointment Booking, Complaint Submission,
Payment Flow, Receipt Flow.

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
