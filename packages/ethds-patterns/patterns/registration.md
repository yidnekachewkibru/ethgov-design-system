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
