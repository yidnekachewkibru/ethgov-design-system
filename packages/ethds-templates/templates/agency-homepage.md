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

## HTML Example

Structurally identical to the
[Ministry Homepage's HTML Example](ministry-homepage.md#html-example) —
same [Header](/docs/components/header#plain-html)/[Breadcrumb](/docs/components/breadcrumb#plain-html)/[Footer](/docs/components/footer#plain-html)
chrome — with primary tasks rendered as cards instead of a plain list.

```html
<main id="main" class="ethds-container">
  <nav aria-label="Breadcrumb" class="ethds-breadcrumb">
    <ol class="ethds-breadcrumb__list">
      <li class="ethds-breadcrumb__item">
        <a href="/" class="ethds-breadcrumb__link">Home</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <span aria-current="page" class="ethds-breadcrumb__current">Immigration and Citizenship Service</span>
      </li>
    </ol>
  </nav>

  <h1>Immigration and Citizenship Service</h1>
  <p>Issues passports and manages immigration and citizenship matters.</p>

  <ul class="ethds-card-grid">
    <li><a href="/passport/new" class="ethds-card">Apply for a passport</a></li>
    <li><a href="/passport/renew" class="ethds-card">Renew a passport</a></li>
  </ul>

  <div class="ethds-grid">
    <div class="ethds-col-half">
      <h2>All services</h2>
      <ul class="ethds-link-list">
        <li><a href="/visa" class="ethds-link">Visa services</a></li>
      </ul>
    </div>
    <div class="ethds-col-half">
      <h2>Notices</h2>
      <ul class="ethds-link-list">
        <li><a href="/notices/1" class="ethds-link">Office closed on public holidays</a></li>
      </ul>
    </div>
  </div>
</main>
```

`.ethds-card-grid`/`.ethds-card` are the same classes shown in the
[National Portal Homepage's HTML Example](national-portal-homepage.md#html-example)
— an agency's narrower, more task-focused service set is exactly what
the card treatment (over a plain list) is for.

## Storybook Story

```tsx
export const Default = { args: { /* agency tasks, locale */ } };
// title: 'Templates/Agency Homepage', layout: 'fullscreen'
```
