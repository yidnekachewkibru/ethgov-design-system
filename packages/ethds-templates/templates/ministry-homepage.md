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

## HTML Example

Same [Header](/docs/components/header#plain-html)/[Footer](/docs/components/footer#plain-html)
chrome as the National Portal, plus a
[Breadcrumb](/docs/components/breadcrumb#plain-html) back to it and a
scoped [Search](/docs/components/search#plain-html).

```html
<header class="ethds-header">
  <div class="ethds-header__bar">
    <a href="/" class="ethds-header__identity" aria-label="Ministry of Revenue — home">
      <span class="ethds-header__service-name">Ministry of Revenue</span>
    </a>
    <div class="ethds-header__actions"><!-- LanguageSwitcher --></div>
  </div>
  <nav aria-label="Primary" class="ethds-header__nav">
    <ul class="ethds-header__nav-list">
      <li><a href="/" class="ethds-header__nav-link ethds-header__nav-link--current" aria-current="page">Home</a></li>
      <li><a href="/services" class="ethds-header__nav-link">Services</a></li>
      <li><a href="/news" class="ethds-header__nav-link">News</a></li>
      <li><a href="/about" class="ethds-header__nav-link">About</a></li>
      <li><a href="/contact" class="ethds-header__nav-link">Contact</a></li>
    </ul>
  </nav>
</header>

<main id="main" class="ethds-container">
  <nav aria-label="Breadcrumb" class="ethds-breadcrumb">
    <ol class="ethds-breadcrumb__list">
      <li class="ethds-breadcrumb__item">
        <a href="/" class="ethds-breadcrumb__link">Home</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <span aria-current="page" class="ethds-breadcrumb__current">Ministry of Revenue</span>
      </li>
    </ol>
  </nav>

  <h1>Ministry of Revenue</h1>
  <p>Collects taxes and administers revenue policy for Ethiopia.</p>

  <form role="search" class="ethds-search" aria-label="Search this ministry">
    <label for="q" class="ethds-visually-hidden">Search this ministry</label>
    <input id="q" name="q" type="search" inputmode="search" class="ethds-search__input" />
    <button type="submit" class="ethds-search__submit">Search</button>
  </form>

  <div class="ethds-grid">
    <div class="ethds-col-half">
      <h2>Our services</h2>
      <ul class="ethds-link-list">
        <li><a href="/file-return" class="ethds-link">File a tax return</a></li>
        <li><a href="/pay-fee" class="ethds-link">Pay a fee</a></li>
        <li><a href="/register-business" class="ethds-link">Register a business</a></li>
      </ul>
    </div>
    <div class="ethds-col-half">
      <h2>Latest from us</h2>
      <ul class="ethds-link-list">
        <li><a href="/news/1" class="ethds-link">New filing deadline announced</a></li>
        <li><a href="/news/2" class="ethds-link">Office hours extended for tax season</a></li>
      </ul>
    </div>
  </div>
</main>

<footer class="ethds-footer" aria-label="Footer">
  <p>© 2026 Government of Ethiopia.</p>
</footer>
```

The `.ethds-grid`/`.ethds-col-half` utility is the same one shown in the
[National Portal Homepage's HTML Example](national-portal-homepage.md#html-example).
The ministry's own `aria-label="Search this ministry"` on the search
form distinguishes it from the national portal's own site-wide search
when both exist in the same navigation history.

## Storybook Story

```tsx
export const Default = { args: { /* ministry services, locale */ } };
// title: 'Templates/Ministry Homepage', layout: 'fullscreen'
```
