---
id: index
title: Templates
slug: /templates
---

# Templates

Full-page **templates** for government digital services — ready-made
page layouts composed from [`@ethds/react`](/docs/components) components and
[`@ethds/patterns`](/docs/patterns) flows, so a new government site doesn't
start its page structure from a blank canvas.

Every template on these pages is **rendered live** from the published
[`@ethds/templates`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-templates)
package — what you see is exactly what ships. Because a template renders
a full page (its own `Header`/`Footer`, not just a widget), each live
example sits inside a bounded, scrollable box rather than nesting a
second page chrome inside this site's own — resize it by dragging the
bottom-right corner if you want more room.

## Homepages

- [National Portal Homepage](national-portal-homepage.mdx) — the top-level entry point to government online
- [Ministry Homepage](ministry-homepage.mdx) — a ministry's home
- [Agency Homepage](agency-homepage.mdx) — an agency's home

## Service & account

- [Service Landing Page](service-landing-page.mdx) — explains a service and starts it
- [Service Application Page](service-application-page.mdx) — the multi-step application itself
- [Citizen Dashboard](citizen-dashboard.mdx) — a signed-in citizen's home

## Content

- [Search Results Page](search-results-page.mdx) — results for a query
- [News Page — Listing](news-listing-page.mdx) — announcements at a glance
- [News Page — Article](news-article-page.mdx) — a single announcement
- [Contact Page](contact-page.mdx) — how to reach the body

## Errors

- [404 Page](404-page.mdx) — page not found
- [403 Page](403-page.mdx) — access denied
- [500 Page](500-page.mdx) — something went wrong

## Using templates

```bash
npm install @ethds/templates @ethds/patterns @ethds/react @ethds/tokens react react-dom
```

```tsx
import '@ethds/tokens/css';
import '@ethds/react/styles.css';
import { NotFoundPage } from '@ethds/templates';

<NotFoundPage
  serviceName="Government of Ethiopia"
  languages={[{ code: 'en', label: 'English' }]}
  locale="en"
  onLocale={(code) => { /* … */ }}
/>
```

Every template's citizen-facing text is a `labels` prop with English
defaults, overridable per locale. Every template uses the shared
[Header](/docs/components/header) and [Footer](/docs/components/footer) so
a citizen recognises an official government service, has one `<h1>`,
landmark regions, and a skip link — see the
[accessibility framework](/docs/accessibility).
