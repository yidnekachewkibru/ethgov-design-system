# News Page

## Overview

Announcements and news from a government body — notices, updates, and
press releases. Two shapes: a **listing** (many items, paginated) and an
**article** (a single item). Content-first and light to load.

## Wireframe

```
Listing                            Article
┌───────────────────────────┐      ┌───────────────────────────┐
│ News                      │      │ Home ▸ News ▸ Title       │
│                           │      │ New tax filing deadline   │  ← h1
│ New tax filing deadline   │      │ Meskerem 9, 2019 EC       │  ← date
│ Meskerem 9, 2019 EC       │      │                           │
│ Short summary…            │      │ Body paragraphs of the    │
│ Read more →               │      │ announcement…             │
│                           │      │                           │
│ Office hours change       │      │ ‹ Back to news            │
│ …                         │      │                           │
│ ‹ Prev  1 2 3  Next ›     │      │                           │
└───────────────────────────┘      └───────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Location (article) | `Breadcrumb` |
| Titles | `Heading` |
| Dates | `Text` (Ethiopian calendar) |
| Summaries / body | `Text` |
| Read-more / back | `Link` |
| Pagination (listing) | `Pagination` |
| Footer | `Footer` |

## Content & Behaviour

- Listing items show title, **date (Ethiopian calendar)**, and a short
  summary linking to the article.
- Articles are plain, readable text (good line length), not heavy media —
  respecting [low bandwidth](../../../docs/design-principles/06-design-for-low-bandwidth.md).
- Each article has its own URL and one `<h1>`.

## Accessibility & Localization

- Listing uses a heading per item (sequential levels) and real links.
- Article: one `<h1>`; `<time>` for the date; logical reading order.
- Titles/summaries/body translatable; dates in the Ethiopian calendar,
  labelled.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Heading, Text, Link, Pagination } from '@ethds/react';

export function NewsListing({ items, page, totalPages, onPage, locale, onLocale }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" nav={NAV} actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Heading level={1}>News</Heading>
        <ul>
          {items.map((n) => (
            <li key={n.href}>
              <Heading level={2} visualLevel={3}><Link href={n.href}>{n.title}</Link></Heading>
              <Text secondary>{n.date}</Text>
              <Text>{n.summary}</Text>
            </li>
          ))}
        </ul>
        {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPage} labels={PAGE_LABELS} />}
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## HTML Example

**Listing:**

```html
<main id="main" class="ethds-container">
  <h1>News</h1>
  <ul>
    <li>
      <h2><a href="/news/1" class="ethds-link">New office hours starting Meskerem</a></h2>
      <p><time datetime="2026-09-11">Meskerem 1, 2019 EC</time></p>
      <p>Government offices will open earlier starting next month.</p>
    </li>
    <li>
      <h2><a href="/news/2" class="ethds-link">Online passport renewal now available</a></h2>
      <p><time datetime="2026-08-27">Nehase 20, 2018 EC</time></p>
      <p>Renew your passport online without visiting an office.</p>
    </li>
  </ul>
  <nav aria-label="Pagination" class="ethds-pagination">
    <!-- see Pagination's own Plain HTML section for the full markup -->
  </nav>
</main>
```

**Article:**

```html
<main id="main" class="ethds-container">
  <nav aria-label="Breadcrumb" class="ethds-breadcrumb">
    <ol class="ethds-breadcrumb__list">
      <li class="ethds-breadcrumb__item">
        <a href="/" class="ethds-breadcrumb__link">Home</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <a href="/news" class="ethds-breadcrumb__link">News</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <span aria-current="page" class="ethds-breadcrumb__current">New office hours starting Meskerem</span>
      </li>
    </ol>
  </nav>

  <h1>New office hours starting Meskerem</h1>
  <p><time datetime="2026-09-11">Meskerem 1, 2019 EC</time></p>

  <p>Government offices will open at 8:00 AM instead of 8:30 AM starting next month, to reduce queues.</p>

  <p><a href="/news" class="ethds-link">← Back to news</a></p>
</main>
```

Both pages use the `<time datetime="…">` element with the machine-
readable ISO date in `datetime` and the citizen-facing Ethiopian-calendar
date as the visible text — the same "store/exchange in one unambiguous
format, display per the citizen's convention" split [Date input](/docs/components/date-input#plain-html)
uses. The article's breadcrumb reuses
[Breadcrumb](/docs/components/breadcrumb#plain-html)'s markup exactly.

## Storybook Story

```tsx
export const Listing = { args: { items: SAMPLE, page: 1, totalPages: 3 } };
export const Article = { args: { /* single item */ } };
// title: 'Templates/News Page', layout: 'fullscreen'
```
