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
- [Radios](radios.mdx) — one choice from a list
- [Select](select.mdx) — one choice from a long list
- [Search](search.mdx) — a labelled search form

## Feedback

- [Alert](alert.mdx) — a prominent inline message
- [Notification](notification.mdx) — a dismissible live message

## Navigation & structure

- [Breadcrumb](breadcrumb.mdx) — where the citizen is in the hierarchy
- [Pagination](pagination.mdx) — navigate pages of results
- [Table](table.mdx) — semantic data tables
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
