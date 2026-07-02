# OTP Verification

## Overview

Verify that a citizen controls a phone number (or email) by sending a
one-time code and asking them to enter it. Common in registration, login,
and sensitive actions. In Ethiopia this is almost always an **SMS code to
a +251 mobile number**. The entry must be paste-friendly and never a
puzzle.

**Components:** TextInput, Button, Alert, Link.
**Related:** [Login](login.md), [Registration](registration.md),
[Password Reset](password-reset.md).

## User Journey

1. The service sends a code to the citizen's phone.
2. Citizen reads the SMS and enters (or pastes) the code.
3. Submits → verified → continues.
4. If it didn't arrive, they request a resend (after a short cooldown).

## UX Flow

```
[Code sent] --> [Enter code] --submit--> verifying --ok--> [Continue]
                    |                         |
                    |                         └--fail--> [Enter code + error]
                    └--"Resend code" (after cooldown)--> [Code sent]
```

## Wireframe

```
┌─────────────────────────────────────┐
│  Enter the code we sent             │
│                                     │
│  We sent a 6-digit code to          │
│  09•• ••• •67.                      │
│                                     │
│  Code                               │
│  [ 1 2 3 4 5 6                  ]   │
│                                     │
│  [        Verify            ]       │
│                                     │
│  Didn't get it? Resend in 0:28      │
│  Wrong number? Change it (link)     │
└─────────────────────────────────────┘
```

## Validation Rules

- **Code:** required; expected length (e.g. 6 digits); `inputmode="numeric"`
  and `autocomplete="one-time-code"` (enables OS autofill of SMS codes).
- Accept the code **with or without** surrounding spaces; trim before
  checking (citizens paste with stray spaces).
- Codes expire (e.g. 5–10 minutes) and are single-use.

## Error Handling

- **Wrong code:** "That code is incorrect or has expired. Check the SMS or
  request a new code." Allow retries up to a sensible limit.
- **Expired:** prompt to resend; don't force a full restart of the flow.
- **Resend cooldown:** disable resend for a short countdown to prevent spam
  (SMS costs the citizen nothing but the system money) — show the timer in
  plain language.
- Masked destination (`09•• ••• •67`) so a shoulder-surfer can't read the
  full number
  ([security](../../../docs/design-principles/08-security-and-privacy-by-design.md)).

## Accessibility Guidance

- **Accessible Authentication (SC 3.3.8):** the code field **allows paste**
  and OS autofill; there is no image/puzzle to transcribe.
- Single labelled input (avoid one-box-per-digit patterns that break paste,
  screen readers, and autofill).
- On failure, focus moves to the error Alert (`role="alert"`); the field is
  marked `aria-invalid`.
- The resend countdown is announced politely (a live region), not just
  visual.

## Localization

- All text translatable; the SMS body itself is localized to the citizen's
  language.
- Numerals shown in Western Arabic digits
  ([number formatting](../../../docs/localization/number-formatting.md)).
- Time phrasing ("Resend in 28 seconds") uses locale-aware formatting.

## React Example

```tsx
import { useState } from 'react';
import { TextInput, Button, Alert } from '@ethds/react';

export function OtpForm({
  maskedTo,
  onVerify,
}: {
  maskedTo: string;
  onVerify: (code: string) => Promise<void>;
}) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const raw = String(new FormData(e.currentTarget).get('code') ?? '');
    const code = raw.replace(/\s+/g, ''); // tolerate pasted spaces
    try {
      await onVerify(code);
    } catch {
      setError('That code is incorrect or has expired. Check the SMS or request a new code.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Enter the code we sent</h1>
      <p>We sent a 6-digit code to {maskedTo}.</p>
      {error && (
        <Alert variant="error" iconLabel="Error">
          {error}
        </Alert>
      )}
      <TextInput
        label="Code"
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        required
      />
      <Button type="submit" variant="primary">Verify</Button>
    </form>
  );
}
```
