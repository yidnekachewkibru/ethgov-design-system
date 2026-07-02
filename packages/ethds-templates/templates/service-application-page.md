# Service Application Page

## Overview

The page where the citizen actually completes a service application. It
hosts the [Application Submission pattern](../../ethds-patterns/patterns/application-submission.md)
— a multi-step form with progress, per-step validation, a review, and a
confirmation — inside the standard page frame.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Immigration Service            [ Language ▾]│
│ Home ▸ Services ▸ Apply for a passport         │  ← Breadcrumb
├───────────────────────────────────────────────┤
│  Apply for a passport                          │  ← h1
│  Step 2 of 4: Your details                     │  ← progress (announced)
│                                                │
│  [ error summary if any ]                      │  ← Alert (focusable)
│                                                │
│  Given name        [ .................... ]    │
│  Father's name     [ .................... ]    │
│  Fayda ID number   [ .................... ]    │
│                                                │
│  [  Back  ]                    [  Next  ]      │
│                                                │
│  Need help with this form?  (consistent)       │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) / Pattern |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Location | `Breadcrumb` |
| Title + step | `Heading` + `Text` |
| The form itself | [Application Submission pattern](../../ethds-patterns/patterns/application-submission.md) — `TextInput`, `Select`, `RadioGroup`, `Checkbox`, `Button`, `Alert` |
| Review step | `Table` |
| Help | consistent help block |
| Footer | `Footer` |

## Content & Behaviour

- One step per screen; **input is preserved** across Back/Next and across
  a dropped connection (low-bandwidth resilience).
- A review step summarises everything before submit; a confirmation page
  gives the reference and links to [Payment](../../ethds-patterns/patterns/payment-flow.md)
  where a fee applies.
- Full behaviour is defined by the
  [Application Submission pattern](../../ethds-patterns/patterns/application-submission.md).

## Accessibility & Localization

- Focus moves to each step's `<h1>`; step position announced ("Step 2 of
  4"); error summary is a focusable `Alert`.
- **Redundant Entry (SC 3.3.7):** never re-ask for known data.
- **Consistent Help (SC 3.2.6):** help in the same place each step.
- All fields/labels/errors translatable; Ethiopian name/address/date
  conventions.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Heading, Text } from '@ethds/react';
// The form body is the Application Submission pattern (see @ethds/patterns).
import { ApplicationForm } from './ApplicationForm';

export function ServiceApplicationPage({ locale, onLocale, step, draft, onNext, onBack }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Immigration Service" nav={AGENCY_NAV} actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Apply for a passport' }]} />
        <Heading level={1}>Apply for a passport</Heading>
        <Text>Step {step} of 4</Text>
        <ApplicationForm step={step} draft={draft} onNext={onNext} onBack={onBack} />
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## Storybook Story

```tsx
export const Step2 = { args: { step: 2, draft: {}, /* locale */ } };
// title: 'Templates/Service Application Page', layout: 'fullscreen'
```
