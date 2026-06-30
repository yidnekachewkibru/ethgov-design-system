# ethds-docs

The public ETHDS documentation site, built with
[Docusaurus](https://docusaurus.io/). It publishes the design principles,
brand system, and accessibility/contribution guidance, and it visibly uses
the ETHDS design system it documents (the site theme is driven by
`@ethds/tokens`).

## Local development

From the repository root:

```bash
npm install
npm run start -w ethds-docs   # builds @ethds/tokens, then starts the dev server
```

`start` and `build` first run the `@ethds/tokens` build so the site's
imported token CSS (`@ethds/tokens/css`) is up to date.

```bash
npm run build -w ethds-docs   # production build, all six locales
npm run serve -w ethds-docs   # serve the production build locally
```

## Structure

```
docs/            # MDX content (intro, principles, brand, accessibility, contributing)
src/
  css/custom.css # binds Docusaurus (Infima) to @ethds/tokens
  pages/         # landing page
static/          # favicon, logo, .nojekyll
i18n/            # translation scaffolding (see i18n/README.md)
docusaurus.config.ts
sidebars.ts
```

## Multilingual

Configured for all six ETHDS languages (English authored; the rest
selectable and falling back to English until translated). See
[`i18n/README.md`](i18n/README.md) for how to add a translation.

## Search

Offline/local full-text search via
[`@easyops-cn/docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local)
— no external search service, which keeps the site self-contained and
low-bandwidth friendly.

## Accessibility

The site targets WCAG 2.2 AA; see the published
[Accessibility](docs/accessibility/index.md) page for the statement.

## Deployment

Built and deployed to GitHub Pages by
[`.github/workflows/docs-deploy.yml`](../../.github/workflows/docs-deploy.yml)
on push to `main`. `docusaurus.config.ts` is configured for the project
path `https://yidnekachewkibru.github.io/ethgov-design-system/`. To enable
it, set the repository's **Settings → Pages → Source** to **GitHub
Actions**.
