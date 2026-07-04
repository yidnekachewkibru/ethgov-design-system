import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextInput, Button, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem } from '@ethds/react';
import formStyles from '../PasswordResetFlow.module.css';

const MIN_LENGTH = 8;

export interface SetNewPasswordStepData {
  newPassword: string;
}

export interface SetNewPasswordStepLabels {
  heading: string;
  stepLabel: string;
  errorSummaryTitle: string;
  passwordLabel: string;
  passwordHint: string;
  showLabel: string;
  hideLabel: string;
  submitLabel: string;
  tooShortError: string;
}

export const DEFAULT_SET_NEW_PASSWORD_LABELS: SetNewPasswordStepLabels = {
  heading: 'Set a new password',
  stepLabel: 'Step 3 of 3: New password',
  errorSummaryTitle: 'There is a problem',
  passwordLabel: 'New password',
  passwordHint: 'At least 8 characters.',
  showLabel: 'Show password',
  hideLabel: 'Hide password',
  submitLabel: 'Save password',
  tooShortError: 'Enter a password that is at least 8 characters long.',
};

export interface SetNewPasswordStepProps {
  onNext: (data: SetNewPasswordStepData) => void;
  labels?: Partial<SetNewPasswordStepLabels>;
}

/**
 * Step 3 of the Password Reset flow — a single password field with a
 * show/hide toggle (rather than a confirm-by-re-entry field) to reduce
 * error, per the pattern's Validation Rules. Paste and password managers
 * both work: no restriction is placed on the field beyond a minimum
 * length, and `autocomplete="new-password"` lets managers fill it (WCAG
 * 2.2 SC 3.3.8 Accessible Authentication).
 */
export function SetNewPasswordStep({ onNext, labels }: SetNewPasswordStepProps) {
  const l = { ...DEFAULT_SET_NEW_PASSWORD_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [visible, setVisible] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newPassword = String(new FormData(e.currentTarget).get('newPassword') ?? '');
    if (newPassword.length < MIN_LENGTH) {
      setErrors([{ message: l.tooShortError, href: '#newPassword' }]);
      return;
    }
    setErrors([]);
    onNext({ newPassword });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      <div className={formStyles.passwordField}>
        <TextInput
          id="newPassword"
          label={l.passwordLabel}
          name="newPassword"
          type={visible ? 'text' : 'password'}
          hint={l.passwordHint}
          autoComplete="new-password"
          required
        />
        <Button type="button" variant="secondary" aria-pressed={visible} onClick={() => setVisible((v) => !v)}>
          {visible ? l.hideLabel : l.showLabel}
        </Button>
      </div>
      <Button type="submit" variant="primary">
        {l.submitLabel}
      </Button>
    </form>
  );
}
