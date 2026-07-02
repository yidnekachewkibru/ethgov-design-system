# Immigration Service Portal

## Overview

A citizen-facing portal to **apply for and manage passports and visas**.
It exercises the full ETHDS stack end to end: a landing page, a multi-step
application, payment, appointment booking for biometrics, and status
tracking — all accessible and available in six languages.

## Architecture

```
immigration-portal/
├── src/
│   ├── main.tsx                 # imports @ethds/tokens/css + @ethds/react/styles.css
│   ├── App.tsx                  # router + IntlProvider (locale) + theme
│   ├── i18n/                    # locale catalogues (en + am/om/ti/so/aa)
│   ├── routes/
│   │   ├── Home.tsx             # → Agency Homepage template
│   │   ├── ServiceLanding.tsx   # → Service Landing Page template
│   │   ├── Apply.tsx            # → Application Submission pattern (multi-step)
│   │   ├── Pay.tsx              # → Payment + Receipt patterns
│   │   ├── Appointment.tsx      # → Appointment Booking pattern
│   │   ├── Status.tsx          # → Status Tracking pattern
│   │   └── errors/             # 404/403/500 templates
│   └── lib/                     # api client, format helpers (date/currency)
└── index.html
```

- **Stack:** React + TypeScript + Vite; `react-router` for routes;
  `react-intl` for i18n (per the
  [translation structure](../../docs/localization/translation-structure.md)).
- **State:** application drafts persisted (local + server) so progress
  survives connection drops.
- **Auth:** citizen login/OTP for managing existing applications; the
  landing/apply flow is available without an account until submission.

## Key Screens

| Route | Template / Pattern |
|---|---|
| `/` | [Agency Homepage](../ethds-templates/templates/agency-homepage.md) |
| `/passport` | [Service Landing Page](../ethds-templates/templates/service-landing-page.md) |
| `/passport/apply` | [Service Application Page](../ethds-templates/templates/service-application-page.md) + [Application Submission](../ethds-patterns/patterns/application-submission.md) |
| `/passport/pay` | [Payment](../ethds-patterns/patterns/payment-flow.md) + [Receipt](../ethds-patterns/patterns/receipt-flow.md) |
| `/appointment` | [Appointment Booking](../ethds-patterns/patterns/appointment-booking.md) |
| `/status` | [Status Tracking](../ethds-patterns/patterns/status-tracking.md) |
| `/login`, `/verify` | [Login](../ethds-patterns/patterns/login.md) + [OTP](../ethds-patterns/patterns/otp-verification.md) |

## React Implementation

```tsx
// main.tsx — load the design system once.
import '@ethds/tokens/css';
import '@ethds/react/styles.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
createRoot(document.getElementById('root')!).render(<App />);
```

```tsx
// App.tsx — locale + routing; every screen composes ETHDS templates/patterns.
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { messagesFor } from './i18n';

export function App() {
  const [locale, setLocale] = useState(detectLocale()); // persisted choice → fallback en
  return (
    <IntlProvider locale={locale} messages={messagesFor(locale)} defaultLocale="en">
      <RouterProvider router={createBrowserRouter(routes(locale, setLocale))} />
    </IntlProvider>
  );
}
```

```tsx
// routes/Status.tsx — reuse the Status Tracking pattern, not a bespoke page.
import { StatusView } from '@ethds/patterns/status'; // (pattern composition)
export function Status({ application }: Props) {
  return <StatusView reference={application.ref} statusText={application.status} timeline={application.timeline} detail={application.detail} />;
}
```

## Accessibility Review

- Every route renders a full page with one `<h1>`, landmark regions, and a
  skip link (from the templates).
- Multi-step apply moves focus to each step heading; error summaries are
  focusable `Alert`s; OTP/login allow paste (Accessible Authentication).
- Status conveyed by text + icon, never colour alone; verified against the
  [accessibility checklist](../../docs/accessibility/checklist.md).
- Automated axe checks on each route + manual keyboard/screen-reader pass.

## Localization Review

- All UI strings come from `react-intl` catalogues; six locales, English
  authored, others fall back to English.
- Dates in the [Ethiopian calendar](../../docs/localization/date-formatting.md)
  (appointments), fees in [Birr](../../docs/localization/currency-formatting.md),
  names/addresses per [Ethiopian conventions](../../docs/localization/address-standards.md).
- [Language Switcher](../../docs/localization/language-switcher.md) in the
  header; `lang` set per locale; verified rendering in Ge'ez (Amharic).

## Deployment Guide

```bash
npm install
npm run build            # Vite production build → dist/
```

- Host `dist/` on any static host or behind the government CDN; serve
  `index.html` for client routes (SPA fallback), and return correct 404/403/500
  status codes at the edge while rendering the friendly error templates.
- Set `PLAYWRIGHT`/CI to run axe + keyboard E2E before release.
- Keep the bundle lean (code-split routes) for
  [low bandwidth](../../docs/design-principles/06-design-for-low-bandwidth.md).
