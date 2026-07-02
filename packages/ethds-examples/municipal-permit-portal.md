# Municipal Permit Portal

## Overview

A city/woreda portal to **apply for local permits** (building, trade,
signage), book office visits, pay fees, and raise complaints. It is the
most locally-flavoured example: the address model
(region→sub-city/zone→woreda→kebele) and municipal identity are front and
centre, showing ETHDS at the municipal tier.

## Architecture

```
municipal-portal/
├── src/
│   ├── main.tsx                 # @ethds/tokens/css + @ethds/react/styles.css
│   ├── App.tsx                  # router + IntlProvider
│   ├── i18n/
│   ├── routes/
│   │   ├── Home.tsx             # → Agency Homepage template (municipality named)
│   │   ├── PermitLanding.tsx    # → Service Landing Page template
│   │   ├── Apply.tsx           # → Application Submission (address cascades)
│   │   ├── Appointment.tsx     # → Appointment Booking pattern
│   │   ├── Pay.tsx             # → Payment + Receipt patterns
│   │   ├── Complaint.tsx       # → Complaint Submission pattern
│   │   ├── Status.tsx         # → Status Tracking pattern
│   │   └── errors/
│   └── lib/                     # api, admin-area lookups (region/woreda/kebele)
└── index.html
```

- **Stack:** React + TypeScript + Vite; `react-router`; `react-intl`.
- **Identity:** shared government identity with the **municipality** named
  as the delivering body
  ([branding standards](../../docs/brand/government-branding-standards.md)).
- **Address:** cascading Region → Sub-city/Zone → Woreda → Kebele selects
  from official administrative lists.

## Key Screens

| Route | Template / Pattern |
|---|---|
| `/` | [Agency Homepage](../ethds-templates/templates/agency-homepage.md) |
| `/permits/:type` | [Service Landing Page](../ethds-templates/templates/service-landing-page.md) |
| `/permits/:type/apply` | [Service Application Page](../ethds-templates/templates/service-application-page.md) + [Application Submission](../ethds-patterns/patterns/application-submission.md) |
| `/appointment` | [Appointment Booking](../ethds-patterns/patterns/appointment-booking.md) |
| `/pay`, `/receipt/:id` | [Payment](../ethds-patterns/patterns/payment-flow.md) + [Receipt](../ethds-patterns/patterns/receipt-flow.md) |
| `/complaint` | [Complaint Submission](../ethds-patterns/patterns/complaint-submission.md) |
| `/status` | [Status Tracking](../ethds-patterns/patterns/status-tracking.md) |

## React Implementation

```tsx
// routes/Apply.tsx — address cascade inside the application pattern.
import { useState } from 'react';
import { Select } from '@ethds/react';

export function AddressStep({ lookup }: { lookup: AdminLookup }) {
  const [region, setRegion] = useState('');
  const [subcity, setSubcity] = useState('');
  return (
    <>
      <Select label="Region" name="region" options={lookup.regions} placeholder="Select region"
        onChange={(e) => { setRegion(e.target.value); setSubcity(''); }} required />
      <Select label="Sub-city / Zone" name="subcity" options={lookup.subcities(region)} placeholder="Select"
        onChange={(e) => setSubcity(e.target.value)} required disabled={!region} />
      <Select label="Woreda" name="woreda" options={lookup.woredas(subcity)} placeholder="Select" required disabled={!subcity} />
      {/* Kebele + optional landmark free text; no mandatory street/postcode. */}
    </>
  );
}
```

## Accessibility Review

- Cascading selects are labelled; a dependent select is disabled (and
  announced) until its parent is chosen.
- Application/appointment/complaint flows inherit their patterns' a11y
  (focus management, error summaries, live regions).
- Complaint allows optional anonymity (toggles the contact field's
  required state, announced). Verified against the
  [accessibility checklist](../../docs/accessibility/checklist.md).

## Localization Review

- Six locales; **region/sub-city/woreda/kebele names localised** and shown
  in the citizen's language (Ge'ez + Latin).
- Fees in [Birr](../../docs/localization/currency-formatting.md);
  appointment dates in the
  [Ethiopian calendar](../../docs/localization/date-formatting.md) + EAT;
  names per [Ethiopian conventions](../../docs/localization/address-standards.md).
- Language Switcher in the header; `lang` per locale.

## Deployment Guide

```bash
npm install
npm run build
```

- Static `dist/`; admin-area lookups (region/woreda/kebele) served from a
  cached endpoint to keep the address cascade fast on
  [low bandwidth](../../docs/design-principles/06-design-for-low-bandwidth.md).
- Correct 404/403/500 status at the edge with the friendly error templates.
- axe + keyboard E2E in CI; bundle-size budget enforced; per-municipality
  config (name, logo) without forking the shared identity.
