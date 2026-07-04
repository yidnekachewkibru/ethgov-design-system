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

## HTML Example

Templates are mostly composition — chrome plus a couple of the
components/patterns documented on their own pages. There's no new markup
here beyond assembling [Header](../../ethds-react/), Search, and Footer,
each already shown with its own Plain HTML section on the docs site.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Page not found — Government of Ethiopia</title>
  <link rel="stylesheet" href="path/to/@ethds/tokens/dist/tokens.css" />
  <link rel="stylesheet" href="path/to/your/ethds-starter.css" />
</head>
<body>
  <a href="#main" class="ethds-skip-link">Skip to main content</a>

  <header class="ethds-header">
    <div class="ethds-header__bar">
      <a href="/" class="ethds-header__identity" aria-label="Government of Ethiopia — home">
        <span class="ethds-header__service-name">Government of Ethiopia</span>
      </a>
      <div class="ethds-header__actions">
        <!-- LanguageSwitcher is a native <select onchange> — see its own docs page -->
      </div>
    </div>
  </header>

  <main id="main" class="ethds-container">
    <h1>Page not found</h1>
    <p>We couldn't find that page. It may have moved, or the address may be wrong.</p>

    <form role="search" class="ethds-search">
      <label for="q" class="ethds-visually-hidden">Search government services</label>
      <input id="q" name="q" type="search" inputmode="search" class="ethds-search__input" />
      <button type="submit" class="ethds-search__submit">Search</button>
    </form>

    <h2>Try instead:</h2>
    <ul>
      <li><a href="/" class="ethds-link">Government home</a></li>
      <li><a href="/services" class="ethds-link">All services</a></li>
    </ul>
  </main>

  <footer class="ethds-footer" aria-label="Footer">
    <p>© 2026 Government of Ethiopia.</p>
  </footer>
</body>
</html>
```

The host application (whatever's serving this page — Django, Flask, PHP,
a static site generator) is responsible for returning the actual HTTP
`404` status alongside this markup, exactly as the React version's own
doc note already says — that responsibility doesn't change with the
framework.

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/404', layout: 'fullscreen'
```
