# Ministry Homepage

## Overview

A ministry's home page. It identifies the ministry **within** the shared
government identity, leads with the ministry's services and news, and links
back to the national portal — so a citizen always knows they're on an
official government site.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Ministry of Revenue            [ Language ▾]│  ← Header (shared identity + ministry name)
│ Home  Services  News  About  Contact           │
├───────────────────────────────────────────────┤
│ Home ▸ Ministry of Revenue                     │  ← Breadcrumb
│  Ministry of Revenue                           │  ← h1
│  Short description of what the ministry does.  │
│  [ Search this ministry…        ] [ Search ]   │
│                                                │
│  Our services            Latest from us        │
│  • File a tax return     • Notice …            │
│  • Pay a fee             • Notice …            │
│  • Register a business                         │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` (ministry name) + `LanguageSwitcher` |
| Location | `Breadcrumb` (Home ▸ Ministry) |
| Title + intro | `Heading` + `Text` |
| Scoped search | `Search` |
| Services list | `Link` list |
| News teasers | `Link` list ([News](news-page.md)) |
| Footer | `Footer` |

## Content & Behaviour

- The header uses the **shared government identity** with the ministry
  named as the delivering body — never a separate brand
  ([government branding standards](../../../docs/brand/government-branding-standards.md)).
- Leads with the ministry's most-used services, linking to
  [Service Landing Pages](service-landing-page.md).
- A short "About" summary; full detail on an About page.

## Accessibility & Localization

- Breadcrumb is a labelled `nav` with `aria-current` on the current page.
- One `<h1>` (ministry name); landmarks + skip link.
- Ministry name and service names translatable, in Ge'ez and Latin scripts.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Search, Heading, Text, Link, LanguageSwitcher } from '@ethds/react';

export function MinistryHome({ locale, onLocale, services }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header
        serviceName="Ministry of Revenue"
        homeLabel="Ministry of Revenue — home"
        nav={MINISTRY_NAV}
        actions={<LanguageSwitcher label="Language" value={locale} onChange={onLocale} languages={LANGS} />}
      />
      <main id="main" className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ministry of Revenue' }]} />
        <Heading level={1}>Ministry of Revenue</Heading>
        <Text>What this ministry does, in one or two plain sentences.</Text>
        <Search label="Search this ministry" submitLabel="Search" />
        <Heading level={2}>Our services</Heading>
        <ul>
          {services.map((s) => (
            <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
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
export const Default = { args: { /* ministry services, locale */ } };
// title: 'Templates/Ministry Homepage', layout: 'fullscreen'
```
