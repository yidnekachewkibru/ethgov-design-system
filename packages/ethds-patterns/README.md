# @ethds/patterns

Reusable **government service patterns** — the end-to-end citizen flows
that recur across services (log in, register, verify, apply, pay, track).
Each pattern documents the user journey, UX flow, validation, error
handling, accessibility, and localization, with **React examples that
compose the real [`@ethds/react`](../ethds-react/) components**.

Patterns exist so teams don't redesign the same interaction for every
service — [Reuse Before Building](../../docs/design-principles/07-reuse-before-building.md).
A pattern is a composition of components plus the rules (validation,
messaging, sequencing) that make the flow work for citizens.

> **Status:** pattern documentation + reference composition code
> ([Phase 8](../../docs/phases/phase-8-government-service-patterns.md)).
> Productionised, tested pattern components are a follow-up.

## Patterns

| Pattern | Purpose |
|---|---|
| [Login](patterns/login.md) | Authenticate a returning citizen |
| [Registration](patterns/registration.md) | Create an account / citizen profile |
| [OTP Verification](patterns/otp-verification.md) | Verify a phone/email via one-time code |
| [Password Reset](patterns/password-reset.md) | Recover access to an account |
| [Application Submission](patterns/application-submission.md) | Multi-step service application |
| [Status Tracking](patterns/status-tracking.md) | Check the state of a request |
| [Appointment Booking](patterns/appointment-booking.md) | Book a slot at an office |
| [Complaint Submission](patterns/complaint-submission.md) | Report an issue / grievance |
| [Payment Flow](patterns/payment-flow.md) | Pay a government fee (Birr) |
| [Receipt Flow](patterns/receipt-flow.md) | Confirm and provide proof of payment |

## How every pattern is documented

Each page follows the same structure:

1. **Overview** — what the pattern is for
2. **User Journey** — the citizen's steps, start to finish
3. **UX Flow** — screens and states
4. **Wireframe** — a text sketch of the key screen
5. **Validation Rules** — what's checked and how
6. **Error Handling** — what happens when things go wrong
7. **Accessibility Guidance** — WCAG 2.2 AA specifics for the flow
8. **Localization** — language, formatting, and Ethiopian-context notes
9. **React Example** — composition using `@ethds/react`

## Built on the frameworks

- **Accessibility:** every pattern meets the
  [Accessibility Framework](../../docs/accessibility/), including the
  new-in-2.2 criteria that most affect flows — Accessible Authentication
  (login/OTP), Redundant Entry (multi-step forms), and Consistent Help.
- **Localization:** all citizen-facing text is translatable; dates use the
  [Ethiopian calendar](../../docs/localization/date-formatting.md), money
  uses [Birr](../../docs/localization/currency-formatting.md), and
  names/addresses follow
  [Ethiopian conventions](../../docs/localization/address-standards.md).
- **Security & privacy:** flows collect only what's needed and never leak
  account existence — see
  [Security and Privacy by Design](../../docs/design-principles/08-security-and-privacy-by-design.md).
