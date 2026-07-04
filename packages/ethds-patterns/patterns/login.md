# Login

## Overview

Authenticate a returning citizen so they can access their account and
services. ETHDS login is simple, phone-first (the most common identifier
in Ethiopia), and follows secure, accessible authentication — no cognitive
puzzles, paste allowed, and no leaking of whether an account exists.

**Components:** [Header](../../ethds-react/), TextInput, Button, Alert,
Link. **Related:** [OTP Verification](otp-verification.md),
[Password Reset](password-reset.md), [Registration](registration.md).

## User Journey

1. Citizen opens the service and selects "Log in".
2. Enters their identifier (phone number or email) and password — **or**
   chooses "Log in with a code" (passwordless OTP).
3. Submits.
4. On success, lands on their dashboard.
5. On failure, sees a clear, non-revealing error and can retry, reset
   their password, or register.

## UX Flow

```
[Login form] --submit--> validating --ok--> [Dashboard]
     |                        |
     |                        └--fail--> [Login form + error alert]
     └--"Log in with a code"--> [OTP Verification]
     └--"Forgot password"------> [Password Reset]
     └--"Create account"-------> [Registration]
```

## Wireframe

```
┌─────────────────────────────────────┐
│  ⭐ Federal Revenue Service          │  ← Header (identity)
├─────────────────────────────────────┤
│  Log in                             │  ← h1
│                                     │
│  Phone number or email              │
│  [ 0911 234 567                 ]   │
│                                     │
│  Password                           │
│  [ ••••••••                     ]   │
│  Forgot your password?  (link)      │
│                                     │
│  [        Log in            ]       │  ← primary button
│  ─────────── or ───────────         │
│  [   Log in with a code     ]       │  ← secondary (OTP)
│                                     │
│  New here?  Create an account (link)│
└─────────────────────────────────────┘
```

## Validation Rules

- **Identifier:** required; accepted as an Ethiopian phone
  (`09xxxxxxxx` / `+2519xxxxxxxx`, normalised to E.164) **or** an email.
- **Password:** required; no maximum length cap below 64; do **not** block
  paste or password managers (WCAG 2.2 SC 3.3.8 Accessible
  Authentication).
- Validate on submit; show inline errors tied to the field.

## Error Handling

- **Wrong credentials:** a single generic message — "The phone/email or
  password is incorrect." **Never** reveal which part was wrong or whether
  the account exists (prevents account enumeration — a
  [security](../../../docs/design-principles/08-security-and-privacy-by-design.md)
  requirement).
- **Rate limiting / lockout:** after repeated failures, offer OTP login or
  password reset rather than a hard dead end; explain in plain language.
- **Network failure:** keep the entered identifier (not the password) so
  the citizen doesn't re-type it; show a retry.
- Errors render in an [Alert](../../ethds-react/) with `role="alert"` and
  move focus to it.

## Accessibility Guidance

- Every field has a visible, associated label; the error summary is a
  focusable Alert announced on submit
  ([focus management](../../../docs/accessibility/focus-management.md)).
- **Accessible Authentication (SC 3.3.8):** allow paste and password
  managers; never require solving a puzzle or transcribing from an image.
- Keyboard-operable throughout; visible focus; ≥24px targets.
- Correct `autocomplete` (`username`, `current-password`) so assistive
  tools and browsers can fill fields.

## Localization

- All labels, buttons, and errors are translatable
  ([localization](../../../docs/localization/)).
- Phone input uses `type="tel"` / `inputmode="tel"` and accepts local
  (`09…`) or international (`+2519…`) forms, normalising to E.164
  ([number formatting](../../../docs/localization/number-formatting.md)).
- The [Language Switcher](../../../docs/localization/language-switcher.md)
  is present in the header on the login screen.

## React Example

```tsx
import { useState } from 'react';
import { TextInput, Button, Alert, Link } from '@ethds/react';

export function LoginForm({ onSubmit }: { onSubmit: (id: string, pw: string) => Promise<void> }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(id, pw);
    } catch {
      // Generic, non-revealing message.
      setError('The phone number/email or password is incorrect.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Log in</h1>
      {error && (
        <Alert variant="error" iconLabel="Error">
          {error}
        </Alert>
      )}
      <TextInput
        label="Phone number or email"
        name="username"
        autoComplete="username"
        inputMode="tel"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        required
      />
      <Link href="/reset">Forgot your password?</Link>
      <Button type="submit" variant="primary" fullWidth>
        Log in
      </Button>
      <Button type="button" variant="secondary" fullWidth>
        Log in with a code
      </Button>
      <p>
        New here? <Link href="/register">Create an account</Link>
      </p>
    </form>
  );
}
```

## HTML Example

Not on React? Login is arguably **simpler** without a client framework —
a plain `<form method="post">` that the server validates and re-renders
with the same non-revealing error on failure. No client-side state
management is required for this pattern.

```html
<form method="post" action="/login" novalidate>
  <h1>Log in</h1>

  <!-- Only rendered by the server when the previous submission failed.
       role="alert" + tabindex="-1" + focusing it server-side (e.g. via
       a small inline script, or by making it the first focusable element
       after the h1) gets the same "focus the error on submit" behaviour
       the React version gets from useEffect. -->
  <div role="alert" tabindex="-1" class="ethds-alert ethds-alert--error" id="login-error">
    The phone number/email or password is incorrect.
  </div>

  <div class="ethds-field">
    <label for="username" class="ethds-label">Phone number or email</label>
    <input
      id="username"
      name="username"
      type="text"
      inputmode="tel"
      autocomplete="username"
      class="ethds-input"
      required
    />
  </div>

  <div class="ethds-field">
    <label for="password" class="ethds-label">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      autocomplete="current-password"
      class="ethds-input"
      required
    />
  </div>

  <a href="/reset" class="ethds-link">Forgot your password?</a>

  <button type="submit" class="ethds-button ethds-button--primary">Log in</button>
  <a href="/login/otp" class="ethds-button ethds-button--secondary">Log in with a code</a>

  <p>New here? <a href="/register" class="ethds-link">Create an account</a></p>
</form>

<script>
  // Focus the error alert on load, same requirement as the React version's
  // focus-on-submit — here it's focus-on-reload, since the server
  // re-rendered the page with the error already in the markup.
  document.getElementById('login-error')?.focus();
</script>
```

**On multi-step patterns:** [Application Submission](application-submission.md)
and [Password Reset](password-reset.md) are built on a client-side
multi-step hook (`useMultiStepForm`) in the React version. Without a
client framework, the natural equivalent isn't a JavaScript port of that
hook — it's **multi-page**: one `<form>` per step, each posting to the
next step's URL, with the in-progress draft held in the server session
(exactly how most government paper-to-digital form flows already work).
This is a different shape, not a harder one — accessibility and
low-bandwidth behaviour are, if anything, easier to get right this way,
since each step is a full page load with no client state to lose on a
dropped connection.
