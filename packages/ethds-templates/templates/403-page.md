# 403 Page — Access Denied

## Overview

Shown when a citizen isn't allowed to view a page — often because they're
not signed in, their session expired, or they lack permission. It explains
what to do (sign in, go back), without revealing sensitive detail about why.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Government of Ethiopia          [ Language ▾]│
├───────────────────────────────────────────────┤
│  You don't have access to this page            │  ← h1
│  You may need to sign in, or you may not have  │
│  permission to view it.                        │
│                                                │
│  [        Log in            ]                  │
│  Go to the government home (link)              │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Title + explanation | `Heading` + `Text` |
| Primary recovery | `Button`/`Link` → [Login](../../ethds-patterns/patterns/login.md) |
| Secondary | `Link` (home) |
| Footer | `Footer` |

## Content & Behaviour

- If the likely cause is not being signed in, lead with **Log in**
  (returning the citizen to where they were after).
- Explain in plain language **without revealing** whether the resource
  exists or the specific permission missing — a
  [security](../../../docs/design-principles/08-security-and-privacy-by-design.md)
  consideration.
- Return the correct **HTTP 403** status.

## Accessibility & Localization

- One `<h1>`; standard chrome so the citizen stays oriented.
- Primary action is a real button/link with a clear name.
- All text translatable.

## React Source

```tsx
import { Header, Footer, Heading, Text, Button, Link } from '@ethds/react';

export function ForbiddenPage({ locale, onLocale, onLogin }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Government of Ethiopia" actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Heading level={1}>You don't have access to this page</Heading>
        <Text>You may need to sign in, or you may not have permission to view it.</Text>
        <Button variant="primary" onClick={onLogin}>Log in</Button>
        <p><Link href="/">Go to the government home</Link></p>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## HTML Example

Same chrome as the [404 page](404-page.md#html-example); only the `main`
content and the primary action change.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Access denied — Government of Ethiopia</title>
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
    <h1>You don't have access to this page</h1>
    <p>You may need to sign in, or you may not have permission to view it.</p>

    <a href="/login" class="ethds-button ethds-button--primary">Log in</a>
    <p><a href="/" class="ethds-link">Go to the government home</a></p>
  </main>

  <footer class="ethds-footer" aria-label="Footer">
    <p>© 2026 Government of Ethiopia.</p>
  </footer>
</body>
</html>
```

The host application is responsible for returning the actual HTTP `403`
status alongside this markup. Leading with **Log in** (a real link
styled as the primary action) rather than only explaining the error
keeps the most common cause — not being signed in — one click away;
never reveal in the copy whether the resource exists or which specific
permission is missing.

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/403', layout: 'fullscreen'
```
