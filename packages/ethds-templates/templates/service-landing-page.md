# Service Landing Page

## Overview

Explains a single government service and starts it. The citizen arrives
here from search or a homepage, learns what the service is, whether it
applies to them, what they'll need, and then begins — with one clear
primary action.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Immigration Service            [ Language ▾]│
│ Home ▸ Services ▸ Apply for a passport         │  ← Breadcrumb
├───────────────────────────────────────────────┤
│  Apply for a passport                          │  ← h1
│  Who this is for and what it does.             │
│                                                │
│  [        Start now         ]                  │  ← primary action
│                                                │
│  Before you start you'll need:                 │
│  • Your Fayda (national ID) number             │
│  • A recent photo                              │
│  • Payment of ETB 350.00                       │
│                                                │
│  How long it takes · Fees · Help               │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Location | `Breadcrumb` |
| Title + summary | `Heading` + `Text` |
| Start action | `Button` (primary) / `Link` |
| "What you'll need" | `Text` + list |
| Fees / timing / help | `Text` sections |
| Footer | `Footer` |

## Content & Behaviour

- One prominent **Start now** action; secondary detail (eligibility, fees,
  timing, help) below it.
- Sets expectations up front (documents, fees in **Birr**, time) so the
  citizen isn't surprised mid-flow.
- "Start now" leads to the
  [Service Application Page](service-application-page.md).

## Accessibility & Localization

- One `<h1>`; the primary action is a real button/link with a clear name.
- **Consistent Help (SC 3.2.6):** help is in the same place as on other
  services.
- Fees in Birr, any dates in the Ethiopian calendar; all text translatable.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Heading, Text, Button } from '@ethds/react';

export function ServiceLanding({ locale, onLocale, onStart }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Immigration Service" nav={AGENCY_NAV} actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Apply for a passport' }]} />
        <Heading level={1}>Apply for a passport</Heading>
        <Text>Who this service is for and what it does, in plain language.</Text>
        <Button variant="primary" onClick={onStart}>Start now</Button>
        <Heading level={2}>Before you start you'll need</Heading>
        <ul>
          <li>Your Fayda (national ID) number</li>
          <li>A recent photo</li>
          <li>Payment of ETB 350.00</li>
        </ul>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## HTML Example

```html
<header class="ethds-header">
  <div class="ethds-header__bar">
    <a href="/" class="ethds-header__identity" aria-label="Immigration Service — home">
      <span class="ethds-header__service-name">Immigration Service</span>
    </a>
    <div class="ethds-header__actions"><!-- LanguageSwitcher --></div>
  </div>
</header>

<main id="main" class="ethds-container">
  <nav aria-label="Breadcrumb" class="ethds-breadcrumb">
    <ol class="ethds-breadcrumb__list">
      <li class="ethds-breadcrumb__item">
        <a href="/" class="ethds-breadcrumb__link">Home</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <a href="/services" class="ethds-breadcrumb__link">Services</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <span aria-current="page" class="ethds-breadcrumb__current">Apply for a passport</span>
      </li>
    </ol>
  </nav>

  <h1>Apply for a passport</h1>
  <p>Get a new or renewed Ethiopian passport. Most applications are processed within 10 working days.</p>

  <a href="/apply/passport" class="ethds-button ethds-button--primary">Start now</a>

  <h2>Before you start you'll need</h2>
  <ul>
    <li>Your Fayda (national ID) number</li>
    <li>A recent photo</li>
    <li>Payment of ETB 350.00</li>
  </ul>
</main>

<footer class="ethds-footer" aria-label="Footer">
  <p>© 2026 Government of Ethiopia.</p>
</footer>
```

"Start now" is a plain link to the
[Service Application Page](service-application-page.md#html-example),
not a button with an `onClick` handler — the whole point of this
template is to send the citizen to a new page/URL, which a link already
does natively.

## Storybook Story

```tsx
export const Default = { args: { /* service copy, locale */ } };
// title: 'Templates/Service Landing Page', layout: 'fullscreen'
```
