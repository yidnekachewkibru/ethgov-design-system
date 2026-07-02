# @ethds/templates

Full-page **templates** for government digital services — ready-made page
layouts composed from [`@ethds/react`](../ethds-react/) components and
[`@ethds/patterns`](../ethds-patterns/) flows, so a new government site
doesn't start its page structure from a blank canvas.

A template is a page-level composition: which components go where, what
content each region holds, and how the page behaves — accessible and
multilingual by default.

> **Status:** template documentation + reference composition code
> ([Phase 9](../../docs/phases/phase-9-website-templates.md)). Productionised,
> tested template components are a follow-up.

## Templates

| Template | Purpose |
|---|---|
| [National Portal Homepage](templates/national-portal-homepage.md) | The top-level entry point to government online |
| [Ministry Homepage](templates/ministry-homepage.md) | A ministry's home |
| [Agency Homepage](templates/agency-homepage.md) | An agency's home |
| [Service Landing Page](templates/service-landing-page.md) | Explains a service and starts it |
| [Service Application Page](templates/service-application-page.md) | The multi-step application itself |
| [Citizen Dashboard](templates/citizen-dashboard.md) | A signed-in citizen's home |
| [Search Results Page](templates/search-results-page.md) | Results for a query |
| [News Page](templates/news-page.md) | Announcements and news |
| [Contact Page](templates/contact-page.md) | How to reach the body |
| [404 Page](templates/404-page.md) | Page not found |
| [403 Page](templates/403-page.md) | Access denied |
| [500 Page](templates/500-page.md) | Something went wrong |

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
