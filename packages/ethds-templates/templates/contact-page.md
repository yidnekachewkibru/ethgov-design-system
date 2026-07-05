# Contact Page

## Overview

How to reach a government body: office locations, phone, email, hours, and
an optional contact form. Placed **consistently** across services (WCAG 2.2
Consistent Help) so a citizen always knows where to find help.

## Wireframe

```
┌───────────────────────────────────────────────┐
│ ⭐ Ministry of Revenue            [ Language ▾]│
│ Home ▸ Contact                                 │  ← Breadcrumb
├───────────────────────────────────────────────┤
│  Contact us                                    │  ← h1
│                                                │
│  Phone   +251 11 xxx xxxx                       │
│  Email   info@…gov.et                          │
│  Hours   Mon–Fri, 08:30–17:00 EAT              │
│  Office  Addis Ababa, Kirkos sub-city, …       │
│                                                │
│  Send us a message                             │
│  Name    [ .......................... ]        │
│  Phone   [ .......................... ]        │
│  Message [ .......................... ]        │
│  [        Send message        ]                │
├───────────────────────────────────────────────┤
│ Footer                                         │
└───────────────────────────────────────────────┘
```

## Component Mapping

| Region | Component(s) |
|---|---|
| Identity + nav | `Header` + `LanguageSwitcher` |
| Location | `Breadcrumb` |
| Title | `Heading` |
| Contact details | `Text` / `Link` (`tel:`, `mailto:`) |
| Message form | `TextInput`, `TextArea`, `Button`, `Alert` |
| Footer | `Footer` |

## Content & Behaviour

- Lead with the **fastest ways to get help** (phone, office), then the
  form.
- Phone as a `tel:` link (tappable on mobile); hours state **EAT**;
  address follows [Ethiopian conventions](../../../docs/localization/address-standards.md).
- The message form follows the same validation/error pattern as
  [Complaint Submission](../../ethds-patterns/patterns/complaint-submission.md).

## Accessibility & Localization

- One `<h1>`; contact details as a description list or labelled text;
  `tel:`/`mailto:` links have clear names.
- Form fields labelled with associated errors; error summary focusable.
- **Consistent Help (SC 3.2.6):** the contact route is in the same place
  across the estate.
- All labels translatable; phone/address/hours per Ethiopian conventions.

## React Source

```tsx
import { Header, Footer, Breadcrumb, Heading, Text, Link, TextInput, TextArea, Button } from '@ethds/react';

export function ContactPage({ locale, onLocale, onSend }: Props) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header serviceName="Ministry of Revenue" nav={NAV} actions={<Lang locale={locale} onLocale={onLocale} />} />
      <main id="main" className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <Heading level={1}>Contact us</Heading>
        <dl>
          <dt>Phone</dt><dd><Link href="tel:+251111234567">+251 11 123 4567</Link></dd>
          <dt>Email</dt><dd><Link href="mailto:info@revenue.gov.et">info@revenue.gov.et</Link></dd>
          <dt>Hours</dt><dd>Monday–Friday, 08:30–17:00 EAT</dd>
        </dl>
        <Heading level={2}>Send us a message</Heading>
        <form onSubmit={onSend}>
          <TextInput label="Your name" name="name" required />
          <TextInput label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
          <TextArea label="Message" name="message" rows={5} required />
          <Button type="submit" variant="primary">Send message</Button>
        </form>
      </main>
      <Footer groups={FOOTER_GROUPS} copyright="© 2026 Government of Ethiopia." />
    </>
  );
}
```

## HTML Example

```html
<main id="main" class="ethds-container">
  <nav aria-label="Breadcrumb" class="ethds-breadcrumb">
    <ol class="ethds-breadcrumb__list">
      <li class="ethds-breadcrumb__item">
        <a href="/" class="ethds-breadcrumb__link">Home</a>
        <span class="ethds-breadcrumb__separator" aria-hidden="true">›</span>
      </li>
      <li class="ethds-breadcrumb__item">
        <span aria-current="page" class="ethds-breadcrumb__current">Contact</span>
      </li>
    </ol>
  </nav>

  <h1>Contact us</h1>

  <dl>
    <dt>Phone</dt><dd><a href="tel:+251111234567" class="ethds-link">+251 11 123 4567</a></dd>
    <dt>Email</dt><dd><a href="mailto:info@revenue.gov.et" class="ethds-link">info@revenue.gov.et</a></dd>
    <dt>Hours</dt><dd>Monday–Friday, 08:30–17:00 EAT</dd>
    <dt>Office</dt><dd>Bole Road, Addis Ababa</dd>
  </dl>

  <h2>Send us a message</h2>
  <form method="post" action="/contact" novalidate>
    <!-- Only present when the server re-renders after a failed submit. -->
    <div role="alert" tabindex="-1" class="ethds-error-summary" id="error-summary">
      <h3 class="ethds-error-summary__title">There is a problem</h3>
      <ul class="ethds-error-summary__list">
        <li><a href="#name" class="ethds-error-summary__link">Enter your name.</a></li>
      </ul>
    </div>

    <div class="ethds-field">
      <label for="name" class="ethds-label">Your name</label>
      <input id="name" name="name" type="text" class="ethds-input" required />
    </div>
    <div class="ethds-field">
      <label for="phone" class="ethds-label">Phone</label>
      <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" class="ethds-input" />
    </div>
    <div class="ethds-field">
      <label for="message" class="ethds-label">Message</label>
      <textarea id="message" name="message" rows="5" class="ethds-textarea" required></textarea>
    </div>
    <button type="submit" class="ethds-button ethds-button--primary">Send message</button>
  </form>
</main>

<script>
  document.getElementById('error-summary')?.focus();
</script>
```

Phone and email are real `tel:`/`mailto:` links, immediately actionable
on a mobile device — never plain text. The message form follows the same
[Error summary](/docs/components/error-summary#plain-html)/[Text input](/docs/components/text-input#plain-html)/[Textarea](/docs/components/textarea#plain-html)
convention as [Complaint Submission](../../ethds-patterns/patterns/complaint-submission.md#html-example),
for anything that doesn't need a full tracked complaint.

## Storybook Story

```tsx
export const Default = { args: { /* locale */ } };
// title: 'Templates/Contact Page', layout: 'fullscreen'
```
