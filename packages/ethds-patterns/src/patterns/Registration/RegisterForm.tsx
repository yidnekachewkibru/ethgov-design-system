import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { TextInput, Checkbox, Button, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem } from '@ethds/react';
import styles from './RegisterForm.module.css';

export interface RegistrationData {
  givenName: string;
  fathersName: string;
  grandfathersName: string;
  phone: string;
  password: string;
  terms: boolean;
}

export interface RegisterFormLabels {
  heading: ReactNode;
  errorSummaryTitle: string;
  givenNameLabel: string;
  fathersNameLabel: string;
  grandfathersNameLabel: string;
  phoneLabel: string;
  phoneHint: string;
  passwordLabel: string;
  passwordHint: string;
  termsLabel: string;
  submitLabel: string;
  givenNameRequiredError: string;
  fathersNameRequiredError: string;
  termsRequiredError: string;
}

export const DEFAULT_REGISTER_LABELS: RegisterFormLabels = {
  heading: 'Create an account',
  errorSummaryTitle: 'There is a problem',
  givenNameLabel: 'Given name',
  fathersNameLabel: "Father's name",
  grandfathersNameLabel: "Grandfather's name (optional)",
  phoneLabel: 'Phone number',
  phoneHint: "We'll send a code to confirm it.",
  passwordLabel: 'Password',
  passwordHint: 'At least 8 characters.',
  termsLabel: 'I accept the terms of service',
  submitLabel: 'Create account',
  givenNameRequiredError: 'Enter your given name.',
  fathersNameRequiredError: "Enter your father's name.",
  termsRequiredError: 'You must accept the terms to continue.',
};

export interface RegisterFormProps {
  onSubmit: (data: RegistrationData) => Promise<void>;
  labels?: Partial<RegisterFormLabels>;
}

/**
 * RegisterForm — the Registration pattern
 * (docs/../ethds-patterns/patterns/registration.md).
 *
 * Uses the given-name/father's-name convention (no surname field) and
 * collects only the phone (verified separately via OTP) and password
 * needed to activate the account — address collection is left to the
 * consuming service, since not every service needs it at registration
 * time (Redundant Entry, WCAG 2.2 SC 3.3.7).
 */
export function RegisterForm({ onSubmit, labels }: RegisterFormProps) {
  const l = { ...DEFAULT_REGISTER_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: ErrorSummaryItem[] = [];
    if (!form.get('givenName')) next.push({ message: l.givenNameRequiredError, href: '#givenName' });
    if (!form.get('fathersName')) next.push({ message: l.fathersNameRequiredError, href: '#fathersName' });
    if (!form.get('terms')) next.push({ message: l.termsRequiredError, href: '#terms' });
    setErrors(next);
    if (next.length === 0) {
      await onSubmit({
        givenName: String(form.get('givenName') ?? ''),
        fathersName: String(form.get('fathersName') ?? ''),
        grandfathersName: String(form.get('grandfathersName') ?? ''),
        phone: String(form.get('phone') ?? ''),
        password: String(form.get('password') ?? ''),
        terms: form.get('terms') === 'on',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h1>{l.heading}</h1>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      <TextInput id="givenName" label={l.givenNameLabel} name="givenName" autoComplete="given-name" required />
      <TextInput id="fathersName" label={l.fathersNameLabel} name="fathersName" required />
      <TextInput label={l.grandfathersNameLabel} name="grandfathersName" />
      <TextInput
        label={l.phoneLabel}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        hint={l.phoneHint}
        required
      />
      <TextInput
        label={l.passwordLabel}
        name="password"
        type="password"
        autoComplete="new-password"
        hint={l.passwordHint}
        required
      />
      <Checkbox id="terms" label={l.termsLabel} name="terms" />
      <Button type="submit" variant="primary">
        {l.submitLabel}
      </Button>
    </form>
  );
}
