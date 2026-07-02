# Agency Homepage

## Overview

An agency's home page. Structurally the same as the
[Ministry Homepage](ministry-homepage.md) — shared government identity with
the agency named as the delivering body — tuned for an agency's typically
narrower, more task-focused set of services.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Immigration Service            [ Language ▾]│  ← Header
│ Home  Services  News  Contact                  │
├───────────────────────────────────────────────┤
│ Home ▸ Immigration Service                     │  ← Breadcrumb
│  Immigration Service                           │  ← h1
│  Apply for and manage passports and visas.     │
│                                                │
│  ┌──────────────┐ ┌──────────────┐             │
│  │ Apply for a  │ │ Check your   │             │  ← primary task cards
│  │ passport     │ │ application  │             │
│  └──────────────┘ └──────────────┘             │
│                                                │
│  All services            Notices               │
│  • …                     • …                   │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` (agency name) + `LanguageSwitcher` |
| Location | `Breadcrumb` |
| Title + intro | `Heading` + `Text` |
| Primary task cards | `Link` (card) + `Icon` |
| All services / notices | `Link` lists |
| Footer | `Footer` |

## Content & Behaviour

- Foregrounds the agency's **primary tasks** as prominent cards (e.g.
  "Apply for a passport", "Check your application" →
  [Status Tracking](../../ethds-patterns/patterns/status-tracking.md)).
- Shared identity first, agency second
  ([branding standards](../../../docs/brand/government-branding-standards.md)).

## Accessibility & Localization

- One `<h1>`; landmarks + skip link; breadcrumb labelled.
- Task cards are real links with descriptive names.
- Agency + service names translatable.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Heading, Text, Link, Icon, LanguageSwitcher } from '@ethds/react';

export function AgencyHome({ locale, onLocale, primaryTasks, services }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Immigration Service" homeLabel="Immigration Service — home"
        nav={AGENCY_NAV}
        actions={<LanguageSwitcher label="Language" value={locale} onChange={onLocale} languages={LANGS} />} />
      <main id="main" className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Immigration Service' }]} />
        <Heading level={1}>Immigration Service</Heading>
        <Text>Apply for and manage passports and visas.</Text>
        <ul className="card-grid">
          {primaryTasks.map((t) => (
            <li key={t.href}><Link href={t.href} className="task-card"><Icon>{t.icon}</Icon> {t.label}</Link></li>
          ))}
        </ul>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const Default = { args: { /* agency tasks, locale */ } };
// title: 'Templates/Agency Homepage', layout: 'fullscreen'
```
