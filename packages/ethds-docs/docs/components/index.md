---
id: index
title: Components
slug: /components
---

# Components

The building blocks of ETHDS services. Every component on these pages is
**rendered live** from the published
[`@ethds/react`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-react)
package — what you see is exactly what ships. Each page shows a working
example, the code, when to use (and not use) the component, and its
accessibility behaviour.

## Actions & text

- [Button](button.mdx) — the primary interactive control
- [Link](link.mdx) — navigational anchors
- [Typography](typography.mdx) — headings and body text
- [Icon](icon.mdx) — accessible SVG icons

## Forms

- [Text input](text-input.mdx) — single-line labelled field
- [Textarea](textarea.mdx) — multi-line labelled field
- [Checkbox](checkbox.mdx) — a single yes/no choice
- [Checkbox group](checkbox-group.mdx) — pick any number (with tile variant)
- [Radios](radios.mdx) — one choice from a list (with tile variant)
- [Select](select.mdx) — one choice from a long list
- [Search](search.mdx) — a labelled search form
- [Date input](date-input.mdx) — day/month/year, Ethiopian calendar by default
- [File upload](file-upload.mdx) — attach a scanned document or photo
- [Character count](character-count.mdx) — a textarea with a live remaining-character count
- [Error summary](error-summary.mdx) — focusable summary of form errors

## Feedback

- [Alert](alert.mdx) — a prominent inline message
- [Notification](notification.mdx) — a dismissible live message
- [Panel](panel.mdx) — the confirmation banner ("Application complete")
- [Tag](tag.mdx) — small status labels ("Approved", "Pending")
- [Phase banner](phase-banner.mdx) — flags a service still in alpha or beta
- [Cookie banner](cookie-banner.mdx) — explicit accept/reject cookie consent

## Navigation & structure

- [Skip link](skip-link.mdx) — bypass the header, first tab stop on every page
- [Back link](back-link.mdx) — return to the previous step in a flow
- [Breadcrumb](breadcrumb.mdx) — where the citizen is in the hierarchy
- [Step indicator](step-indicator.mdx) — progress through a multi-step flow
- [Pagination](pagination.mdx) — navigate pages of results
- [Table](table.mdx) — semantic data tables
- [Details](details.mdx) — expandable "show more" content
- [Summary list](summary-list.mdx) — check-your-answers rows with Change links
- [Header](header.mdx) — government identity and primary navigation
- [Footer](footer.mdx) — secondary identity and links
- [Language switcher](language-switcher.mdx) — choose among the six languages

## Using components

```bash
npm install @ethds/react @ethds/tokens react react-dom
```

```tsx
import '@ethds/tokens/css';
import '@ethds/react/styles.css';
import { Button } from '@ethds/react';
```

All visible text is passed in as props or children, so every component is
translatable — see the [localization framework](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/localization).
Every component targets **WCAG 2.2 AA** and is tested with axe.
