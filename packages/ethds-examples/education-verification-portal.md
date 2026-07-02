# Education Verification Portal

## Overview

A portal to **verify education credentials** — for a public/employer to
check a certificate's authenticity, and for institutions to issue and
manage verifiable records. It shows a mix of an **anonymous public lookup**
and an **authenticated institution back-office**.

## Architecture

```
education-portal/
├── src/
│   ├── main.tsx                 # @ethds/tokens/css + @ethds/react/styles.css
│   ├── App.tsx                  # router + IntlProvider + role-based routes
│   ├── i18n/
│   ├── routes/
│   │   ├── Home.tsx             # → Agency Homepage template
│   │   ├── Verify.tsx          # public: enter a credential ID → result
│   │   ├── Result.tsx          # verification outcome (valid / not found)
│   │   ├── institution/        # authed: issue, search, revoke (Table + forms)
│   │   └── errors/
│   └── lib/                     # api, credential-id validation
└── index.html
```

- **Stack:** React + TypeScript + Vite; `react-router`; `react-intl`.
- **Two audiences:** a public verifier (no account) and institution staff
  (authenticated back-office). Role-based routing separates them.
- **Privacy:** verification confirms authenticity and minimal facts
  (name, credential, institution, date) — **not** a full record dump — per
  [data minimisation](../../docs/design-principles/08-security-and-privacy-by-design.md).

## Key Screens

| Route | Template / Pattern |
|---|---|
| `/` | [Agency Homepage](../ethds-templates/templates/agency-homepage.md) |
| `/verify` | Public lookup — a [Search](../ethds-react/)-style form by credential ID |
| `/verify/result` | Result via [Status Tracking](../ethds-patterns/patterns/status-tracking.md)-style view (valid + minimal facts) |
| `/institution/login` | [Login](../ethds-patterns/patterns/login.md) + [OTP](../ethds-patterns/patterns/otp-verification.md) |
| `/institution` | [Citizen Dashboard](../ethds-templates/templates/citizen-dashboard.md)-style back-office (issued records `Table`) |
| `/institution/issue` | [Application Submission](../ethds-patterns/patterns/application-submission.md)-style issue form |
| `/*` | [404](../ethds-templates/templates/404-page.md) / [403](../ethds-templates/templates/403-page.md) / [500](../ethds-templates/templates/500-page.md) |

## React Implementation

```tsx
// routes/Verify.tsx — public verification lookup (no account).
import { useState } from 'react';
import { TextInput, Button, Alert } from '@ethds/react';

export function Verify({ onVerify }: { onVerify: (id: string) => Promise<Result> }) {
  const [result, setResult] = useState<Result | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = String(new FormData(e.currentTarget).get('id') ?? '').trim();
    const r = await onVerify(id);
    if (r) { setResult(r); setNotFound(false); } else { setNotFound(true); }
  }

  return (
    <main id="main" className="container">
      <h1>Verify a credential</h1>
      <form onSubmit={handle} noValidate>
        <TextInput label="Credential ID" name="id" required hint="Found on the certificate" />
        <Button type="submit" variant="primary">Verify</Button>
      </form>
      {notFound && <Alert variant="warning" iconLabel="Not found">No credential matches that ID. Check and try again.</Alert>}
      {result && (
        <Alert variant="success" iconLabel="Valid" title="Credential verified">
          {result.holder} — {result.credential}, {result.institution} ({result.date}).
        </Alert>
      )}
    </main>
  );
}
```

## Accessibility Review

- Public lookup is a simple labelled form; results announced (success/not
  found) via `Alert` live regions, text + icon (not colour alone).
- Institution back-office tables have captions + `scope="col"` headers;
  issue form follows the application pattern's a11y (error summary, focus).
- Login allows paste; verified against the
  [accessibility checklist](../../docs/accessibility/checklist.md).

## Localization Review

- Six locales; credential facts localised; institution and credential
  names shown in the citizen's language (Ge'ez + Latin).
- Dates in the [Ethiopian calendar](../../docs/localization/date-formatting.md)
  where issued in E.C.; credential IDs kept in their canonical grouping.
- Language Switcher in the header; `lang` per locale.

## Deployment Guide

```bash
npm install
npm run build
```

- Public verify page must be fast and cache-friendly (it's the most-hit
  route); institution area behind authentication.
- Rate-limit the public lookup to deter enumeration; never reveal
  valid-ID ranges. Correct 404/403/500 status at the edge.
- axe + keyboard E2E in CI; bundle-size budget enforced.
