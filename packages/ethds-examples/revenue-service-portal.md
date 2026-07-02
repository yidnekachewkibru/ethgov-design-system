# Revenue Service Portal

## Overview

A signed-in portal for citizens and businesses to **file returns, pay
taxes and fees, and keep receipts**. It centres on the authenticated
experience — a dashboard of obligations and history — and exercises login,
forms, payment, and receipts.

## Architecture

```
revenue-portal/
├── src/
│   ├── main.tsx                 # @ethds/tokens/css + @ethds/react/styles.css
│   ├── App.tsx                  # router + IntlProvider + auth guard
│   ├── i18n/
│   ├── routes/
│   │   ├── Home.tsx             # → Ministry Homepage template
│   │   ├── Login.tsx            # → Login + OTP patterns
│   │   ├── Dashboard.tsx        # → Citizen Dashboard template (obligations, history)
│   │   ├── File.tsx             # → Application Submission pattern (a return)
│   │   ├── Pay.tsx              # → Payment + Receipt patterns
│   │   └── errors/
│   └── lib/                     # api, money helpers (santim), tax calc display
└── index.html
```

- **Stack:** React + TypeScript + Vite; `react-router`; `react-intl`.
- **Auth:** required for the dashboard, filing, and payment; an auth guard
  redirects to [Login](../ethds-patterns/patterns/login.md), showing the
  [403 template](../ethds-templates/templates/403-page.md) where relevant.
- **Money:** amounts held as integer **santim**; displayed with
  `Intl.NumberFormat(..., { currency: 'ETB' })`.

## Key Screens

| Route | Template / Pattern |
|---|---|
| `/` | [Ministry Homepage](../ethds-templates/templates/ministry-homepage.md) |
| `/login`, `/verify` | [Login](../ethds-patterns/patterns/login.md) + [OTP](../ethds-patterns/patterns/otp-verification.md) |
| `/reset` | [Password Reset](../ethds-patterns/patterns/password-reset.md) |
| `/dashboard` | [Citizen Dashboard](../ethds-templates/templates/citizen-dashboard.md) |
| `/file/:type` | [Service Application Page](../ethds-templates/templates/service-application-page.md) + [Application Submission](../ethds-patterns/patterns/application-submission.md) |
| `/pay`, `/receipt/:id` | [Payment](../ethds-patterns/patterns/payment-flow.md) + [Receipt](../ethds-patterns/patterns/receipt-flow.md) |

## React Implementation

```tsx
// routes/Dashboard.tsx — compose the Citizen Dashboard template with real data.
import { CitizenDashboard } from '../templates/CitizenDashboard';

export function Dashboard({ user, obligations, filings }: Props) {
  return (
    <CitizenDashboard
      name={user.givenName}
      actionNeeded={obligations.some((o) => o.dueSoon)}
      applications={filings}       // Table rows link to status/receipt
      locale={user.locale}
      onLocale={user.setLocale}
    />
  );
}
```

```tsx
// lib/money.ts — one shared money formatter (santim → Birr).
export const fmtBirr = (santim: number, locale = 'en-ET') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'ETB' }).format(santim / 100);
```

```tsx
// App.tsx — protect the authenticated area.
function requireAuth(user: User | null) {
  if (!user) return redirect('/login');   // or render the 403 template
  return null;
}
```

## Accessibility Review

- Auth flows meet **Accessible Authentication** (paste + managers, no
  puzzles; paste-friendly OTP); generic, non-revealing login errors.
- Dashboard tables have captions + `scope="col"` headers; the
  action-needed banner is a live-region `Notification`.
- Payment: itemised `Table`, amount on the pay button, result announced;
  status/amounts never colour-only. Verified against the
  [accessibility checklist](../../docs/accessibility/checklist.md).

## Localization Review

- Six locales via `react-intl`; **Birr** formatting everywhere money
  appears; **Ethiopian calendar** for filing periods/deadlines (labelled
  E.C.), TINs displayed in their official grouping (not number-formatted).
- Name/address capture per
  [Ethiopian conventions](../../docs/localization/address-standards.md);
  Language Switcher in the header.

## Deployment Guide

```bash
npm install
npm run build
```

- Static `dist/` behind an authenticated gateway; APIs over HTTPS only.
- Never render server error detail — the
  [500 template](../ethds-templates/templates/500-page.md) shows a friendly
  message while detail is logged server-side.
- Run axe + keyboard E2E in CI; enforce a bundle-size budget for
  [low bandwidth](../../docs/design-principles/06-design-for-low-bandwidth.md).
