# 500 Page — Something Went Wrong

## Overview

Shown when the service itself fails (a server error). It apologises plainly,
tells the citizen it's not their fault, and offers a way forward — retry,
go home, or contact — without exposing technical detail.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia          [ Language ▾]│
├───────────────────────────────────────────────┤
│  Sorry, something went wrong                   │  ← h1
│  This is a problem on our side, not yours.     │
│  Please try again in a few minutes.            │
│                                                │
│  [   Try again   ]   Go to home (link)         │
│  If it keeps happening, contact us (link)      │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Title + apology | `Heading` + `Text` |
| Retry | `Button` |
| Home / contact | `Link` (→ [Contact](contact-page.md)) |
| Footer | `Footer` |

## Content & Behaviour

- Reassure the citizen it's **not their fault** and offer a **retry**.
- **Never expose stack traces or technical detail** — a
  [security](../../../docs/design-principles/08-security-and-privacy-by-design.md)
  requirement; log the detail server-side instead.
- Provide a contact route for persistent failures.
- Return the correct **HTTP 500** status; keep the page lightweight (it may
  render when systems are degraded).

## Accessibility & Localization

- One `<h1>`; standard chrome; a real retry button and clear links.
- The error is conveyed by text, not colour/icon alone.
- All text translatable; renders in the citizen's language.

## React Source

```tsx
import { Header, Footer, Heading, Text, Button, Link } from '@ethds/react';

export function ServerErrorPage({ locale, onLocale, onRetry }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Heading level={1}>Sorry, something went wrong</Heading>
        <Text>This is a problem on our side, not yours. Please try again in a few minutes.</Text>
        <Button variant="primary" onClick={onRetry}>Try again</Button>
        <p>
          <Link href="/">Go to home</Link> · If it keeps happening,{' '}
          <Link href="/contact">contact us</Link>.
        </p>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/500', layout: 'fullscreen'
```
