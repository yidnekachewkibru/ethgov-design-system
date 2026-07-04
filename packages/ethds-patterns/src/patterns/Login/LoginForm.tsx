import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { TextInput, Button, Alert, Link } from '@ethds/react';
import styles from './LoginForm.module.css';

export interface LoginFormLabels {
  heading: ReactNode;
  identifierLabel: string;
  passwordLabel: string;
  forgotPasswordLabel: string;
  loginButtonLabel: string;
  otpButtonLabel: string;
  createAccountPrompt: ReactNode;
  createAccountLabel: string;
  /** Generic, non-revealing error shown on any login failure. */
  genericErrorMessage: string;
}

export const DEFAULT_LOGIN_LABELS: LoginFormLabels = {
  heading: 'Log in',
  identifierLabel: 'Phone number or email',
  passwordLabel: 'Password',
  forgotPasswordLabel: 'Forgot your password?',
  loginButtonLabel: 'Log in',
  otpButtonLabel: 'Log in with a code',
  createAccountPrompt: 'New here?',
  createAccountLabel: 'Create an account',
  genericErrorMessage: 'The phone number/email or password is incorrect.',
};

export interface LoginFormProps {
  onSubmit: (identifier: string, password: string) => Promise<void>;
  /** Selects passwordless OTP login; the button is hidden when omitted. */
  onOtpLogin?: () => void;
  forgotPasswordHref: string;
  registerHref: string;
  /** Translated labels; merged over the English defaults. */
  labels?: Partial<LoginFormLabels>;
}

/**
 * LoginForm — the Login pattern (docs/../ethds-patterns/patterns/login.md).
 *
 * Authenticates a returning citizen with a single generic error on any
 * failure — never reveals which part was wrong or whether the account
 * exists (prevents account enumeration). Allows paste/password managers
 * throughout (WCAG 2.2 SC 3.3.8 Accessible Authentication).
 */
export function LoginForm({
  onSubmit,
  onOtpLogin,
  forgotPasswordHref,
  registerHref,
  labels,
}: LoginFormProps) {
  const l = { ...DEFAULT_LOGIN_LABELS, ...labels };
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // The error Alert is a focusable summary announced on submit, per the
  // pattern's Accessibility Guidance — it mounts fresh each time `error`
  // goes from null to a message (conditionally rendered below), so this
  // effect fires exactly when a citizen needs to notice it.
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(identifier, password);
    } catch {
      setError(l.genericErrorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h1>{l.heading}</h1>
      {error && (
        <Alert ref={errorRef} variant="error" iconLabel="Error" tabIndex={-1}>
          {error}
        </Alert>
      )}
      <TextInput
        label={l.identifierLabel}
        name="username"
        autoComplete="username"
        inputMode="tel"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <TextInput
        label={l.passwordLabel}
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Link href={forgotPasswordHref}>{l.forgotPasswordLabel}</Link>
      <Button type="submit" variant="primary" fullWidth>
        {l.loginButtonLabel}
      </Button>
      {onOtpLogin && (
        <Button type="button" variant="secondary" fullWidth onClick={onOtpLogin}>
          {l.otpButtonLabel}
        </Button>
      )}
      <p className={styles.registerPrompt}>
        {l.createAccountPrompt} <Link href={registerHref}>{l.createAccountLabel}</Link>
      </p>
    </form>
  );
}
