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

## HTML Example

Templates are mostly composition — [Header](../../ethds-react/) with
nav, [Search](../../ethds-react/), and [Footer](../../ethds-react/)
chrome around a hero heading and a couple of link sections.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Government services, in one place — Government of Ethiopia</title>
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
        <!-- LanguageSwitcher — see its own docs page -->
      </div>
    </div>
    <nav aria-label="Primary" class="ethds-header__nav">
      <ul class="ethds-header__nav-list">
        <li><a href="/" class="ethds-header__nav-link ethds-header__nav-link--current" aria-current="page">Home</a></li>
        <li><a href="/services" class="ethds-header__nav-link">Services</a></li>
        <li><a href="/news" class="ethds-header__nav-link">News</a></li>
        <li><a href="/contact" class="ethds-header__nav-link">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" class="ethds-container">
    <h1>Government services, in one place</h1>

    <form role="search" class="ethds-search">
      <label for="q" class="ethds-visually-hidden">Search government services</label>
      <input id="q" name="q" type="search" inputmode="search" class="ethds-search__input" />
      <button type="submit" class="ethds-search__submit">Search</button>
    </form>

    <div class="ethds-grid">
      <div class="ethds-col-half">
        <h2>Popular services</h2>
        <ul class="ethds-card-grid">
          <li><a href="/renew-id" class="ethds-card">Renew ID</a></li>
          <li><a href="/pay-tax" class="ethds-card">Pay tax</a></li>
          <li><a href="/passport" class="ethds-card">Passport</a></li>
          <li><a href="/business" class="ethds-card">Business licence</a></li>
        </ul>
      </div>
      <div class="ethds-col-half">
        <h2>Browse by category</h2>
        <ul class="ethds-link-list">
          <li><a href="/category/identity" class="ethds-link">Identity & civil</a></li>
          <li><a href="/category/business" class="ethds-link">Business & trade</a></li>
          <li><a href="/category/health" class="ethds-link">Health & education</a></li>
        </ul>
      </div>
      <div class="ethds-col-half">
        <h2>Latest news</h2>
        <ul class="ethds-link-list">
          <li><a href="/news/1" class="ethds-link">New office hours starting Meskerem</a></li>
          <li><a href="/news/2" class="ethds-link">Online passport renewal now available</a></li>
        </ul>
      </div>
    </div>
  </main>

  <footer class="ethds-footer" aria-label="Footer">
    <p>© 2026 Government of Ethiopia.</p>
  </footer>
</body>
</html>
```

```css
.ethds-container { width: 100%; margin-inline: auto; padding-inline: var(--ethds-space-4); }
@media (min-width: 1024px) { .ethds-container { max-width: 960px; padding-inline: var(--ethds-space-8); } }
.ethds-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--ethds-space-4); }
.ethds-col-half { grid-column: span 12; }
@media (min-width: 768px) { .ethds-col-half { grid-column: span 6; } }
.ethds-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--ethds-space-4); list-style: none; margin: 0; padding: 0; }
.ethds-card { display: flex; padding: var(--ethds-space-4); border: 1px solid var(--ethds-color-border); border-radius: var(--ethds-radius-md); text-decoration: none; }
.ethds-link-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ethds-space-2); }
```

Reuses [Header](/docs/components/header#plain-html),
[Search](/docs/components/search#plain-html), and
[Footer](/docs/components/footer#plain-html)'s markup exactly; the only
addition is the 12-column grid utility (documented in full in
[docs/brand/grid.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/brand/grid.md))
that lays the three link sections side by side on wider screens.

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
