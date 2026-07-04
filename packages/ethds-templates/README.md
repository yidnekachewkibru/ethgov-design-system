# @ethds/templates

Full-page **templates** for government digital services — ready-made page
layouts composed from [`@ethds/react`](../ethds-react/) components and
[`@ethds/patterns`](../ethds-patterns/) flows, so a new government site
doesn't start its page structure from a blank canvas.

A template is a page-level composition: which components go where, what
content each region holds, and how the page behaves — accessible and
multilingual by default.

> **Status:** the three error pages — 404, 403, 500 — the three
> homepages — National Portal, Ministry, Agency — the four content
> pages — Service Landing, Search Results, News (listing + article),
> Contact — and the Citizen Dashboard ship as a real, tested
> `@ethds/templates` package (types, `vitest-axe` tests, Storybook
> stories, CI). The remaining template (Service Application Page) is
> tracked as a follow-up PR; until built, it remains documentation +
> reference composition code below.

## Install

```bash
npm install @ethds/templates @ethds/react @ethds/tokens react react-dom
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

## Templates

| Template | Purpose | Status |
|---|---|---|
| [National Portal Homepage](templates/national-portal-homepage.md) | The top-level entry point to government online | ✅ `NationalPortalHomepage` |
| [Ministry Homepage](templates/ministry-homepage.md) | A ministry's home | ✅ `MinistryHomepage` |
| [Agency Homepage](templates/agency-homepage.md) | An agency's home | ✅ `AgencyHomepage` |
| [Service Landing Page](templates/service-landing-page.md) | Explains a service and starts it | ✅ `ServiceLandingPage` |
| [Service Application Page](templates/service-application-page.md) | The multi-step application itself | 🔵 documented |
| [Citizen Dashboard](templates/citizen-dashboard.md) | A signed-in citizen's home | ✅ `CitizenDashboard` |
| [Search Results Page](templates/search-results-page.md) | Results for a query | ✅ `SearchResultsPage` |
| [News Page](templates/news-page.md) | Announcements and news | ✅ `NewsListingPage` / `NewsArticlePage` |
| [Contact Page](templates/contact-page.md) | How to reach the body | ✅ `ContactPage` |
| [404 Page](templates/404-page.md) | Page not found | ✅ `NotFoundPage` |
| [403 Page](templates/403-page.md) | Access denied | ✅ `ForbiddenPage` |
| [500 Page](templates/500-page.md) | Something went wrong | ✅ `ServerErrorPage` |

## How every template is documented

Each page follows the same structure:

1. **Overview** — what the page is for
2. **Wireframe** — a text sketch of the layout
3. **Component Mapping** — which `@ethds/react` components and
   `@ethds/patterns` flows fill each region
4. **Content & Behaviour** — what goes in each region and how it behaves
5. **Accessibility & Localization** — page-level specifics
6. **React Source** — a composition using the design system
7. **Storybook Story** — how the template is previewed

## Built on the system

- Every template uses the shared [Header](../ethds-react/) and
  [Footer](../ethds-react/) so a citizen recognises an official government
  service ([Consistent Government Experience](../../docs/design-principles/09-consistent-government-experience.md)).
- One `<h1>` per page, landmark regions (`header`/`nav`/`main`/`footer`),
  and a skip link — per the
  [Accessibility Framework](../../docs/accessibility/).
- All text is translatable and formatting follows the
  [Localization Framework](../../docs/localization/).
- Mobile-first and [low-bandwidth](../../docs/design-principles/06-design-for-low-bandwidth.md)
  by default.

## Development

```bash
npm install
npm run build -w @ethds/tokens     # dependency
npm run build -w @ethds/react      # dependency
npm run test  -w @ethds/templates  # Vitest + Testing Library + axe
npm run typecheck -w @ethds/templates
npm run build -w @ethds/templates  # Vite library build → dist/
npm run storybook -w @ethds/templates
```

### Structure

```
src/
  templates/_internal/  PageChrome (shared SkipLink/Header/main/Footer shell) +
                        HomepageLayout (shared breadcrumb/hero/search/sections shape)
  templates/<Name>/     Component.tsx + .module.css + .test.tsx + .stories.tsx + index.ts
  styles/               grid.module.css (implements docs/brand/grid.md)
  test/                 vitest setup + axe helper
  index.ts              public barrel export
```

Every template is localization-ready: all citizen-facing text is a prop
(a `labels` object with English defaults, overridable per locale) — no
strings baked into the component. `PageChrome` renders one `<h1>` per
page's own content, a `SkipLink`, and the shared `Header`/`Footer` identity
per [Consistent Government Experience](../../docs/design-principles/09-consistent-government-experience.md).
