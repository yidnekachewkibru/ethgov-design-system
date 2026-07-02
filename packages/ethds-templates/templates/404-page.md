# 404 Page — Not Found

## Overview

Shown when a page doesn't exist (bad link, mistyped URL, moved content).
It reassures the citizen they're still on an official government site and
helps them get back on track — search and links, not a dead end.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia          [ Language ▾]│
├───────────────────────────────────────────────┤
│  Page not found                                │  ← h1
│  We couldn't find that page. It may have moved │
│  or the address may be wrong.                  │
│                                                │
│  [ Search services…            ] [ Search ]    │
│                                                │
│  Try instead:                                  │
│  • Government home                             │
│  • All services                               │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Title + explanation | `Heading` + `Text` |
| Recover: search | `Search` |
| Recover: links | `Link` list |
| Footer | `Footer` |

## Content & Behaviour

- Plain-language explanation; no jargon or raw "404".
- Offer **search** and a few useful links (home, all services) so the
  citizen can continue.
- Return the correct **HTTP 404** status (SEO + correctness), even though
  the page renders the friendly UI.

## Accessibility & Localization

- One `<h1>` ("Page not found"); full standard chrome (header/footer/skip
  link) so the citizen stays oriented.
- Everything translatable; the page renders in the citizen's language.

## React Source

```tsx
import { Header, Footer, Heading, Text, Search, Link } from '@ethds/react';

export function NotFoundPage({ locale, onLocale }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Heading level={1}>Page not found</Heading>
        <Text>We couldn't find that page. It may have moved, or the address may be wrong.</Text>
        <Search label="Search government services" submitLabel="Search" />
        <ul>
          <li><Link href="/">Government home</Link></li>
          <li><Link href="/services">All services</Link></li>
        </ul>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/404', layout: 'fullscreen'
```
