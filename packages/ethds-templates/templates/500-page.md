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

## HTML Example

Same chrome as the [404 page](404-page.md#html-example); only the `main`
content changes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Something went wrong — Government of Ethiopia</title>
  <link rel="stylesheet" href="path/to/@ethds/tokens/dist/tokens.css" />
  <link rel="stylesheet" href="path/to/your/ethds-starter.css" />
</head>
<body>
  <a href="#main" class="ethds-skip-link">Skip to main content</a>

  <header class="ethds-header">
    <div class="ethds-header__bar">
      <a href="/" class="ethds-header__identity" aria-label="Government of Ethiopia — home">
        <span class="ethds-header__service-name">Government of Ethiopia</span>
      </a>
      <div class="ethds-header__actions">
        <!-- LanguageSwitcher is a native <select onchange> — see its own docs page -->
      </div>
    </div>
  </header>

  <main id="main" class="ethds-container">
    <h1>Sorry, something went wrong</h1>
    <p>This is a problem on our side, not yours. Please try again in a few minutes.</p>

    <a href="/retry" class="ethds-button ethds-button--primary">Try again</a>
    <p>
      <a href="/" class="ethds-link">Go to home</a> · If it keeps happening,
      <a href="/contact" class="ethds-link">contact us</a>.
    </p>
  </main>

  <footer class="ethds-footer" aria-label="Footer">
    <p>© 2026 Government of Ethiopia.</p>
  </footer>
</body>
</html>
```

The host application is responsible for returning the actual HTTP `500`
status alongside this markup, and for keeping this page itself
lightweight and dependency-free — it may need to render while other
parts of the system are degraded. "Try again" is a plain link back to
the page that failed (or a `/retry` redirect) rather than a JavaScript
retry handler; never render a stack trace or other technical detail
here, log it server-side instead.

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/500', layout: 'fullscreen'
```
