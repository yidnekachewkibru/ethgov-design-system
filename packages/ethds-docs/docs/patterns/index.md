---
id: index
title: Patterns
slug: /patterns
---

# Patterns

Government services keep re-solving the same interactions: log in,
register, verify, apply, pay, track. Patterns exist so teams don't
redesign these from scratch — see
[Reuse Before Building](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/07-reuse-before-building.md).

Every pattern on these pages is **rendered live** from the published
[`@ethds/patterns`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-patterns)
package, built on [`@ethds/react`](components) — what you see is exactly
what ships. Each page shows a working example, the code, validation and
error handling, and the accessibility guidance specific to the flow.

## Authentication

- [Login](login.mdx) — authenticate a returning citizen
- [Registration](registration.mdx) — create an account
- [OTP verification](otp-verification.mdx) — verify a phone/email via a one-time code
- [Password reset](password-reset.mdx) — recover access to an account

## Service flows

- [Application submission](application-submission.mdx) — a multi-step service application
- [Status tracking](status-tracking.mdx) — check the state of a request
- [Complaint submission](complaint-submission.mdx) — report an issue or grievance
- [Appointment booking](appointment-booking.mdx) — book a slot at an office

## Payment

- [Payment flow](payment-flow.mdx) — pay a government fee, in Birr
- [Receipt flow](receipt-flow.mdx) — confirm and provide proof of payment

## Using patterns

```bash
npm install @ethds/patterns @ethds/react @ethds/tokens react react-dom
```

```tsx
import '@ethds/tokens/css';
import '@ethds/react/styles.css';
import '@ethds/patterns/styles.css';
import { LoginForm } from '@ethds/patterns';
```

Every pattern's citizen-facing text is a `labels` prop with English
defaults, overridable per locale — see the
[localization framework](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/localization).
Patterns meet **WCAG 2.2 AA**, including the criteria that most affect
flows — Accessible Authentication (login/OTP), Redundant Entry
(multi-step forms), and Consistent Help — and are tested with axe.

Multi-step patterns (Application Submission, Password Reset) are built on
the shared `useMultiStepForm` hook — step position, accumulated draft, and
`onSaveDraft`/`onSubmit` callbacks, with no persistence assumptions baked
in.
