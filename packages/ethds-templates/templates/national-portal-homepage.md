# National Portal Homepage

## Overview

The top-level entry point to Ethiopian government online — the front door
citizens land on to find and start services. It leads with **search and
the most-used services** (start with citizen needs), not an org chart.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia          [ Language ▾]│  ← Header + LanguageSwitcher
│ Home  Services  News  Contact                  │  ← primary nav
├───────────────────────────────────────────────┤
│  Government services, in one place             │  ← hero h1
│  [ Search services…              ] [ Search ]  │  ← Search
│                                                │
│  Popular services                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Renew ID│ │Pay tax │ │Passport│ │Business│   │  ← service cards
│  └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                │
│  Browse by category    Latest news             │
│  • Identity & civil    • Notice …              │
│  • Business & trade    • Notice …              │
│  • Health & education                          │
├───────────────────────────────────────────────┤
│ Footer: services · about · accessibility       │  ← Footer
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Banner + identity + nav | `Header` (+ `LanguageSwitcher` in `actions`) |
| Site search | `Search` |
| Section titles | `Heading` |
| Service cards | `Link` (card) + `Icon` + `Text` |
| Category list | `Link` list |
| Latest news | `Link` list (see [News](news-page.md)) |
| Footer | `Footer` |

## Content & Behaviour

- The hero centres **search** and a short, plain-language promise.
- "Popular services" are the genuinely most-used tasks, named by the
  citizen's words and linking to a [Service Landing Page](service-landing-page.md).
- Categories help browsing when a citizen doesn't know the exact name.
- Everything above the fold is usable on a small screen and a slow link.

## Accessibility & Localization

- One `<h1>` (the hero); landmarks (`header`/`nav`/`main`/`footer`); a skip
  link as the first focusable element.
- Search field labelled; service cards are real links with clear names.
- All labels/service names translatable; the
  [Language Switcher](../../../docs/localization/language-switcher.md) is in
  the header.

## React Source

```tsx
import { Header, Footer, Search, Heading, Text, Link, Icon, LanguageSwitcher } from '@ethds/react';

export function NationalPortalHome({ locale, onLocale, onSearch, services }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header
        serviceName="Government of Ethiopia"
        homeLabel="Government of Ethiopia — home"
        nav={[
          { label: 'Home', href: '/', current: true },
          { label: 'Services', href: '/services' },
          { label: 'News', href: '/news' },
          { label: 'Contact', href: '/contact' },
        ]}
        actions={<LanguageSwitcher label="Language" value={locale} onChange={onLocale} languages={LANGS} />}
      />
      <main id="main" className="container">
        <Heading level={1}>Government services, in one place</Heading>
        <Search label="Search government services" submitLabel="Search" onSearch={onSearch} />

        <Heading level={2}>Popular services</Heading>
        <ul className="card-grid">
          {services.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="service-card">
                <Icon>{s.icon}</Icon>
                <Text>{s.label}</Text>
              </Link>
            </li>
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
import type { Meta, StoryObj } from '@storybook/react';
import { NationalPortalHome } from './NationalPortalHome';

const meta: Meta<typeof NationalPortalHome> = {
  title: 'Templates/National Portal Homepage',
  component: NationalPortalHome,
  parameters: { layout: 'fullscreen' },
};
export default meta;
export const Default: StoryObj<typeof NationalPortalHome> = { args: { /* sample services, locale */ } };
```
