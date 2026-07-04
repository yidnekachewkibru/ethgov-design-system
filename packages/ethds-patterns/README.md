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

> **Status:** the auth flows — Login, Registration, OTP Verification —
> ship as a real, tested `@ethds/patterns` package (types, `vitest-axe`
> tests, Storybook stories, CI). The remaining 7 patterns are tracked as
> follow-up PRs; until built, they remain documentation + reference
> composition code below.

## Install

```bash
npm install @ethds/patterns @ethds/react @ethds/tokens react react-dom
```

```tsx
import '@ethds/tokens/css';
import '@ethds/react/styles.css';
import '@ethds/patterns/styles.css';

import { LoginForm } from '@ethds/patterns';

<LoginForm
  onSubmit={async (identifier, password) => { /* … */ }}
  forgotPasswordHref="/reset"
  registerHref="/register"
/>
```

## Patterns

| Pattern | Purpose | Status |
|---|---|---|
| [Login](patterns/login.md) | Authenticate a returning citizen | ✅ `LoginForm` |
| [Registration](patterns/registration.md) | Create an account / citizen profile | ✅ `RegisterForm` |
| [OTP Verification](patterns/otp-verification.md) | Verify a phone/email via one-time code | ✅ `OtpForm` |
| [Password Reset](patterns/password-reset.md) | Recover access to an account | 🔵 documented |
| [Application Submission](patterns/application-submission.md) | Multi-step service application | 🔵 documented |
| [Status Tracking](patterns/status-tracking.md) | Check the state of a request | 🔵 documented |
| [Appointment Booking](patterns/appointment-booking.md) | Book a slot at an office | 🔵 documented |
| [Complaint Submission](patterns/complaint-submission.md) | Report an issue / grievance | 🔵 documented |
| [Payment Flow](patterns/payment-flow.md) | Pay a government fee (Birr) | 🔵 documented |
| [Receipt Flow](patterns/receipt-flow.md) | Confirm and provide proof of payment | 🔵 documented |

The shared `useMultiStepForm` hook (step position + accumulated draft +
`onSaveDraft`/`onSubmit` callbacks, no persistence assumptions baked in)
powers the multi-step patterns (Application Submission, Password Reset)
as they land.

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

## Development

```bash
npm install
npm run build -w @ethds/tokens     # dependency
npm run build -w @ethds/react      # dependency
npm run test  -w @ethds/patterns   # Vitest + Testing Library + axe
npm run typecheck -w @ethds/patterns
npm run build -w @ethds/patterns   # Vite library build → dist/
npm run storybook -w @ethds/patterns
```

### Structure

```
src/
  patterns/<Name>/    Component.tsx + .module.css + .test.tsx + .stories.tsx + index.ts
  hooks/              useMultiStepForm — the multi-step flow engine
  styles/             grid.module.css (implements docs/brand/grid.md)
  test/               vitest setup + axe helper
  index.ts            public barrel export
```

Every pattern is localization-ready: all citizen-facing text is a prop
(a `labels` object with English defaults, overridable per locale) — no
strings baked into the component.
