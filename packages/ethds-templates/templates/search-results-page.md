# Search Results Page

## Overview

Shows results for a citizen's query, keeps the search box available to
refine, and paginates long result sets. Built to be fast and clear on a
slow connection.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia          [ Language ▾]│
├───────────────────────────────────────────────┤
│ [ passport                    ] [ Search ]     │  ← Search (retains query)
│  12 results for "passport"                     │  ← result count (announced)
│                                                │
│  Apply for a passport                          │  ← result (Link + snippet)
│  Immigration Service — start your application  │
│                                                │
│  Renew a passport                              │
│  Immigration Service — for existing holders    │
│  …                                             │
│                                                │
│  ‹ Prev   1 2 3 … 4   Next ›                    │  ← Pagination
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Search + refine | `Search` (pre-filled with the query) |
| Result count | `Text` (announced) |
| Each result | `Heading`/`Link` + `Text` snippet |
| Pagination | `Pagination` |
| No results | `Alert` (info) + suggestions |
| Footer | `Footer` |

## Content & Behaviour

- The query stays in the search box so it can be refined.
- The **result count is announced** to assistive tech when results update
  (a live region).
- Each result is a real link with a clear name and a short snippet.
- Long lists use [Pagination](../../ethds-react/) with translatable labels.

## Accessibility & Localization

- One `<h1>` (e.g. the results heading); result count in a polite live
  region; each result link independently meaningful.
- Empty state: a helpful `Alert` with alternative suggestions, not a bare
  "no results".
- Query, counts, and pagination labels translatable; numerals per locale.

## React Source

```tsx
import { Header, Footer, Search, Heading, Text, Link, Pagination, Alert } from '@ethds/react';

export function SearchResults({ query, results, page, totalPages, onPage, locale, onLocale }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Search label="Search government services" submitLabel="Search" defaultValue={query} />
        <p role="status">{results.length} results for “{query}”</p>
        {results.length === 0 ? (
          <Alert variant="info" iconLabel="Information">No results. Try different words or browse services.</Alert>
        ) : (
          <ul>
            {results.map((r) => (
              <li key={r.href}>
                <Heading level={2} visualLevel={4}><Link href={r.href}>{r.title}</Link></Heading>
                <Text>{r.snippet}</Text>
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPage} labels={PAGE_LABELS} />
        )}
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const WithResults = { args: { query: 'passport', results: SAMPLE, page: 1, totalPages: 4 } };
export const NoResults = { args: { query: 'zzz', results: [], page: 1, totalPages: 1 } };
// title: 'Templates/Search Results Page', layout: 'fullscreen'
```
