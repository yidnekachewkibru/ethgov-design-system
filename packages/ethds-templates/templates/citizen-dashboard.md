# Citizen Dashboard

## Overview

A signed-in citizen's home: their applications, appointments, payments, and
notifications in one place, with quick access to start something new. It
answers "what's happening with my things?" at a glance.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia   Abebe K. [ Lang ▾ ]│  ← Header (signed in)
├───────────────────────────────────────────────┤
│  Welcome back, Abebe                           │  ← h1
│  [ notification: 1 action needed ]             │  ← Notification (live)
│                                                │
│  Your applications                             │
│  ┌──────────────────────────────────────────┐ │
│  │ Ref         Service        Status         │ │  ← Table
│  │ ETH-…0041   Passport       Approved       │ │
│  │ ETH-…0042   Business perm. Pending        │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  Upcoming appointments   Recent payments       │
│  • Bole office, Mes 5    • ETB 350.00 receipt  │
│                                                │
│  [ Start a new application ]                   │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + account + nav | `Header` (+ signed-in name, `LanguageSwitcher`) |
| Greeting | `Heading` |
| Action-needed banner | `Notification` (live region) |
| Applications | `Table` (links to [Status Tracking](../../ethds-patterns/patterns/status-tracking.md)) |
| Appointments | `Table` / `Link` list |
| Payments / receipts | `Link` list ([Receipt](../../ethds-patterns/patterns/receipt-flow.md)) |
| New application | `Button` / `Link` |
| Footer | `Footer` |

## Content & Behaviour

- Surfaces anything **needing the citizen's action** first (a
  `Notification`), then their records.
- Status shown in plain language (as in
  [Status Tracking](../../ethds-patterns/patterns/status-tracking.md)),
  by text + icon, never colour alone.
- Money and dates formatted per the Ethiopian conventions.

## Accessibility & Localization

- One `<h1>` (greeting); action-needed banner uses a live region.
- Applications table has a caption + `scope="col"` headers; each row links
  to its detail.
- All labels/statuses translatable; Birr + Ethiopian calendar formatting.

## React Source

```tsx
import { Header, Footer, Heading, Notification, Table, Button, Link } from '@ethds/react';

export function CitizenDashboard({ name, actionNeeded, applications, locale, onLocale }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Heading level={1}>Welcome back, {name}</Heading>
        {actionNeeded && (
          <Notification variant="warning" iconLabel="Action needed">
            You have 1 item that needs your attention.
          </Notification>
        )}
        <Heading level={2}>Your applications</Heading>
        <Table
          caption="Your applications"
          columns={[
            { header: 'Reference', cell: (a) => <Link href={`/apps/${a.id}`}>{a.id}</Link> },
            { header: 'Service', cell: (a) => a.service },
            { header: 'Status', cell: (a) => a.status },
          ]}
          rows={applications}
          rowKey={(a) => a.id}
          emptyMessage="You have no applications yet."
        />
        <Button variant="primary">Start a new application</Button>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const Default = { args: { name: 'Abebe', actionNeeded: true, applications: SAMPLE } };
// title: 'Templates/Citizen Dashboard', layout: 'fullscreen'
```
