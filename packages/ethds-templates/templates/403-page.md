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

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Error/403', layout: 'fullscreen'
```
