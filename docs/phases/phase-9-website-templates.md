# Phase 9 — Website Templates

**Status:** ✅ Complete — all 12 templates documented

## Goal

Build full-page templates so a new government website doesn't start its
page-level layout and structure from a blank canvas.

## Delivered

All 12 templates are documented in
[`packages/ethds-templates/templates/`](../../packages/ethds-templates/templates/),
each with Wireframe, Component Mapping (`@ethds/react` components +
`@ethds/patterns` flows), Content & Behaviour, Accessibility &
Localization, a **React Source** composition, and a Storybook story:

- [National Portal Homepage](../../packages/ethds-templates/templates/national-portal-homepage.md)
- [Ministry Homepage](../../packages/ethds-templates/templates/ministry-homepage.md)
- [Agency Homepage](../../packages/ethds-templates/templates/agency-homepage.md)
- [Service Landing Page](../../packages/ethds-templates/templates/service-landing-page.md)
- [Service Application Page](../../packages/ethds-templates/templates/service-application-page.md)
- [Citizen Dashboard](../../packages/ethds-templates/templates/citizen-dashboard.md)
- [Search Results Page](../../packages/ethds-templates/templates/search-results-page.md)
- [News Page](../../packages/ethds-templates/templates/news-page.md)
- [Contact Page](../../packages/ethds-templates/templates/contact-page.md)
- [404](../../packages/ethds-templates/templates/404-page.md) /
  [403](../../packages/ethds-templates/templates/403-page.md) /
  [500](../../packages/ethds-templates/templates/500-page.md) error pages

Every template uses the shared Header/Footer identity, a single `<h1>` +
landmarks + skip link, and is mobile-first, translatable, and grounded in
Ethiopian context.

## Templates

National Portal Homepage, Ministry Homepage, Agency Homepage, Service
Landing Page, Service Application Page, Citizen Dashboard, Search Results
Page, News Page, Contact Page, 404 Page, 403 Page, 500 Page.

## Deliverables (per template)

- Wireframes
- Component Mapping (which `@ethds/react` components and
  `@ethds/patterns` flows compose the template)
- React Source Code
- Storybook Stories
- Documentation

## Output Location

`packages/ethds-templates/` (replaces the README-only stub).

## Dependencies

- [Phase 7 — Core Components](phase-7-core-components.md)
- [Phase 8 — Government Service Patterns](phase-8-government-service-patterns.md)
  (e.g. Service Application Page composes the Application Submission
  pattern)

## Consumed By

- [Phase 10 — Reference Implementations](phase-10-reference-implementations.md)
