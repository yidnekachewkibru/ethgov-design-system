# Registration

## Overview

Create an account / citizen profile. Registration is where "start with
citizen needs" meets real Ethiopian data: names follow the
given-name/father's-name convention (no inherited surname), addresses use
the region→zone/sub-city→woreda→kebele hierarchy (no mandatory street or
postcode), and only genuinely required data is collected.

**Components:** TextInput, Select, Checkbox, Button, Alert.
**Related:** [OTP Verification](otp-verification.md) (verify the phone
before activating), [Login](login.md).

## User Journey

1. Citizen chooses "Create an account".
2. Enters their name(s) as on their official ID, phone, and a password (or
   opts for passwordless).
3. Optionally enters address details for services that need them.
4. Accepts the terms.
5. Submits → verifies phone via [OTP](otp-verification.md) → account
   active.

## UX Flow

```
[Register form] --submit--> validating --ok--> [OTP Verification] --> [Account active]
      |                          |
      |                          └--fail--> [Register form + field errors]
```

## Wireframe

```
┌─────────────────────────────────────┐
│  Create an account                  │
│                                     │
│  Given name                         │
│  [ Abebe                        ]   │
│  Father's name                      │
│  [ Kebede                       ]   │
│  Grandfather's name (optional)      │
│  [ Tesfaye                      ]   │
│                                     │
│  Phone number                       │
│  [ 0911 234 567                 ]   │
│  We'll send a code to confirm it.   │
│                                     │
│  Password                           │
│  [ ••••••••                     ]   │
│  At least 8 characters.             │
│                                     │
│  [x] I accept the terms of service  │
│  [       Create account       ]     │
└─────────────────────────────────────┘
```

## Validation Rules

- **Given name** and **Father's name**: required; full Unicode incl.
  **Ge'ez script**; never labelled "surname"; no "family name" field
  ([address & name standards](../../../docs/localization/address-standards.md)).
- **Grandfather's name:** optional unless the service's legal ID needs it.
- **Phone:** required; Ethiopian format, normalised to E.164; verified via
  OTP before the account is usable.
- **Password:** minimum length (≥8), no low upper cap, paste allowed.
- **Address (when shown):** Region → Zone/Sub-city → Woreda cascading
  selects from official lists; kebele + optional landmark free text; **no**
  mandatory street/postcode.
- **Terms:** must be checked.

## Error Handling

- Field-level errors sit beside the relevant field
  (`aria-describedby`/`aria-invalid`); an error summary Alert lists them
  and moves focus to the first invalid field.
- **Duplicate phone:** don't reveal "this account exists"; instead route
  to log in / reset ("If you already have an account, log in") to avoid
  enumeration.
- **Redundant Entry (WCAG 2.2 SC 3.3.7):** never re-ask for data the
  citizen already gave earlier in the flow; pre-fill where known.

## Accessibility Guidance

- Labelled fields, associated hints/errors, and a focusable error summary.
- Logical field order; a single `<h1>`; grouped related fields with a
  `fieldset`/`legend` (e.g. the name group).
- Password field allows paste and managers (SC 3.3.8).
- Correct `autocomplete` tokens (`given-name`, `tel`, `new-password`,
  `address-level1`, …).

## Localization

- All text translatable; name/address model per
  [Ethiopian conventions](../../../docs/localization/address-standards.md).
- Region/zone/woreda names localised; work in Ge'ez and Latin scripts.
- Phone accepted flexibly, stored E.164.

## React Example

```tsx
import { useState } from 'react';
import { TextInput, Checkbox, Button, Alert } from '@ethds/react';

export function RegisterForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: string[] = [];
    if (!data.get('givenName')) next.push('Enter your given name.');
    if (!data.get('fathersName')) next.push("Enter your father's name.");
    if (!data.get('terms')) next.push('You must accept the terms to continue.');
    setErrors(next);
    if (next.length === 0) await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Create an account</h1>
      {errors.length > 0 && (
        <Alert variant="error" iconLabel="Error" title="Check the form">
          <ul>{errors.map((msg) => <li key={msg}>{msg}</li>)}</ul>
        </Alert>
      )}
      <TextInput label="Given name" name="givenName" autoComplete="given-name" required />
      <TextInput label="Father's name" name="fathersName" required />
      <TextInput label="Grandfather's name (optional)" name="grandfathersName" />
      <TextInput
        label="Phone number"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        hint="We'll send a code to confirm it."
        required
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        required
      />
      <Checkbox label="I accept the terms of service" name="terms" />
      <Button type="submit" variant="primary">Create account</Button>
    </form>
  );
}
```

## HTML Example

Server-validated on submit, re-rendering with the same focusable error
summary and field-level state on failure — the same shape as
[Login](login.md#html-example).

```html
<form method="post" action="/register" novalidate>
  <h1>Create an account</h1>

  <!-- Only present when the server re-renders after a failed submit. -->
  <div role="alert" tabindex="-1" class="ethds-error-summary" id="error-summary">
    <h2 class="ethds-error-summary__title">There is a problem</h2>
    <ul class="ethds-error-summary__list">
      <li><a href="#givenName" class="ethds-error-summary__link">Enter your given name.</a></li>
      <li><a href="#fathersName" class="ethds-error-summary__link">Enter your father's name.</a></li>
    </ul>
  </div>

  <div class="ethds-field">
    <label for="givenName" class="ethds-label">Given name</label>
    <input id="givenName" name="givenName" type="text" autocomplete="given-name" class="ethds-input" required />
  </div>

  <div class="ethds-field">
    <label for="fathersName" class="ethds-label">Father's name</label>
    <input id="fathersName" name="fathersName" type="text" class="ethds-input" required />
  </div>

  <div class="ethds-field">
    <label for="grandfathersName" class="ethds-label">Grandfather's name (optional)</label>
    <input id="grandfathersName" name="grandfathersName" type="text" class="ethds-input" />
  </div>

  <div class="ethds-field">
    <label for="phone" class="ethds-label">Phone number</label>
    <span id="phone-hint" class="ethds-hint">We'll send a code to confirm it.</span>
    <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"
           class="ethds-input" aria-describedby="phone-hint" required />
  </div>

  <div class="ethds-field">
    <label for="password" class="ethds-label">Password</label>
    <span id="password-hint" class="ethds-hint">At least 8 characters.</span>
    <input id="password" name="password" type="password" autocomplete="new-password"
           class="ethds-input" aria-describedby="password-hint" minlength="8" required />
  </div>

  <div class="ethds-checkbox-row">
    <input id="terms" name="terms" type="checkbox" class="ethds-checkbox" required />
    <label for="terms" class="ethds-label">I accept the terms of service</label>
  </div>

  <button type="submit" class="ethds-button ethds-button--primary">Create account</button>
</form>

<script>
  document.getElementById('error-summary')?.focus();
</script>
```

On success, the server routes to [OTP Verification](otp-verification.md#html-example)
before activating the account, exactly as the React version's flow does.
On a duplicate phone number, redirect to log in rather than revealing
that the account already exists — the same non-enumeration rule
documented above.
