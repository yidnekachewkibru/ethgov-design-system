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

## Storybook Story

```tsx
export const Listing = { args: { items: SAMPLE, page: 1, totalPages: 3 } };
export const Article = { args: { /* single item */ } };
// title: 'Templates/News Page', layout: 'fullscreen'
```
