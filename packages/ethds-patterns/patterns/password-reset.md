# Password Reset

## Overview

Let a citizen who has lost access recover their account safely. The flow
never reveals whether an account exists, verifies control of the
phone/email via a [one-time code](otp-verification.md), and lets the
citizen set a new password without puzzles.

**Components:** TextInput, Button, Alert, Link.
**Related:** [Login](login.md), [OTP Verification](otp-verification.md).

## User Journey

1. From login, citizen selects "Forgot your password?".
2. Enters their phone/email.
3. Receives a code (if the account exists) and enters it.
4. Sets a new password.
5. Is signed in / returned to login with a success confirmation.

## UX Flow

```
[Request reset] --> "If that account exists, we sent a code" --> [Enter code]
      --> [Set new password] --submit--> [Done: signed in]
```

## Wireframe

```
Step 1                         Step 3
┌───────────────────────┐      ┌───────────────────────┐
│ Reset your password   │      │ Set a new password    │
│                       │      │                       │
│ Phone number or email │      │ New password          │
│ [ 0911 234 567    ]   │      │ [ ••••••••••      ]   │
│                       │      │ At least 8 characters │
│ [   Send code    ]    │      │                       │
│                       │      │ [   Save password ]   │
└───────────────────────┘      └───────────────────────┘
```

## Validation Rules

- **Identifier (step 1):** required; phone or email format.
- **Code (step 2):** as in [OTP Verification](otp-verification.md) — paste
  allowed, numeric, single-use, expiring.
- **New password (step 3):** minimum length (≥8), paste and managers
  allowed; optionally confirm by re-entry (but prefer a single field with a
  show/hide toggle to reduce error).

## Error Handling

- **Step 1 always shows the same message** regardless of whether the
  account exists — "If an account matches, we've sent a code." This
  prevents account enumeration
  ([security](../../../docs/design-principles/08-security-and-privacy-by-design.md)).
- **Wrong/expired code:** allow resend without restarting.
- **Weak new password:** explain the requirement in plain language beside
  the field.
- On success, invalidate other active sessions and tell the citizen.

## Accessibility Guidance

- Multi-step flow moves focus to each step's `<h1>` and announces the step.
- Error summary Alert is focusable and announced (`role="alert"`).
- **Accessible Authentication (SC 3.3.8):** paste and password managers
  work at every step; no image/puzzle challenge.
- `autocomplete="new-password"` on the new-password field.

## Localization

- All prompts, the SMS/email body, and errors are translatable.
- Phone handling and numerals per
  [number formatting](../../../docs/localization/number-formatting.md).

## React Example

```tsx
import { useState } from 'react';
import { TextInput, Button, Alert } from '@ethds/react';

// Step 1 — request a reset (non-revealing).
export function RequestReset({ onRequest }: { onRequest: (id: string) => Promise<void> }) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = String(new FormData(e.currentTarget).get('id') ?? '');
    await onRequest(id); // server sends a code only if the account exists
    setSent(true); // always show the same confirmation
  }

  if (sent) {
    return (
      <Alert variant="info" iconLabel="Information">
        If an account matches, we've sent a code. Enter it on the next screen.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Reset your password</h1>
      <TextInput label="Phone number or email" name="id" autoComplete="username" required />
      <Button type="submit" variant="primary">Send code</Button>
    </form>
  );
}
```

## HTML Example

Like [Application Submission](application-submission.md#html-example),
`PasswordResetFlow` is built on the shared client-side
`useMultiStepForm` hook. Without a client framework the three steps
become three pages — `/reset`, `/reset/verify`, `/reset/new-password` —
each a plain `<form method="post">`, with the identifier and verified
status held in the **server session** between them (never in the URL or
a hidden field, since either would leak whether a given identifier is
valid).

```html
<!-- Step 1 — /reset. Always shows the same confirmation regardless of
     whether the identifier matches an account. -->
<form method="post" action="/reset" novalidate>
  <h1>Reset your password</h1>
  <div class="ethds-field">
    <label for="id" class="ethds-label">Phone number or email</label>
    <input id="id" name="id" type="text" autocomplete="username" class="ethds-input" required />
  </div>
  <button type="submit" class="ethds-button ethds-button--primary">Send code</button>
</form>
```

The step-1 handler sends a code **only if** the identifier matches an
account, but redirects to the same `/reset/verify` confirmation page
either way:

```html
<!-- Shown after step 1, whether or not an account was actually found. -->
<div role="status" class="ethds-alert ethds-alert--info">
  <span role="img" aria-label="Information" class="ethds-alert__icon">i</span>
  <div class="ethds-alert__body">
    If an account matches, we've sent a code. Enter it on the next screen.
  </div>
</div>
```

Step 2 is exactly [OTP Verification's HTML Example](otp-verification.md#html-example),
posting to `/reset/verify`. Step 3 is a single
[Text input](/docs/components/text-input#plain-html)-style password
field posting to `/reset/new-password`:

```html
<form method="post" action="/reset/new-password" novalidate>
  <h1>Set a new password</h1>
  <div class="ethds-field">
    <label for="password" class="ethds-label">New password</label>
    <span id="password-hint" class="ethds-hint">At least 8 characters.</span>
    <input id="password" name="password" type="password" autocomplete="new-password"
           class="ethds-input" aria-describedby="password-hint" minlength="8" required />
  </div>
  <button type="submit" class="ethds-button ethds-button--primary">Save password</button>
</form>
```

Only after step 3 succeeds does the server clear the reset session,
invalidate other active sessions for that account, and redirect to a
confirmation page stating both facts in plain language — the same
security-relevant disclosure the React version's confirmation panel
makes.
