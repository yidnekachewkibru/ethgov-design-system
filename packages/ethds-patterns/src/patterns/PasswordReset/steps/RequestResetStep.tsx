import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextInput, Button, Alert, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem } from '@ethds/react';
import formStyles from '../PasswordResetFlow.module.css';

export interface RequestResetStepData {
  identifier: string;
}

export interface RequestResetStepLabels {
  heading: string;
  stepLabel: string;
  errorSummaryTitle: string;
  identifierLabel: string;
  submitLabel: string;
  identifierRequiredError: string;
  networkErrorMessage: string;
}

export const DEFAULT_REQUEST_RESET_LABELS: RequestResetStepLabels = {
  heading: 'Reset your password',
  stepLabel: 'Step 1 of 3: Reset password',
  errorSummaryTitle: 'There is a problem',
  identifierLabel: 'Phone number or email',
  submitLabel: 'Send code',
  identifierRequiredError: 'Enter your phone number or email.',
  networkErrorMessage: 'Something went wrong sending the code. Try again.',
};

export interface RequestResetStepProps {
  onRequest: (identifier: string) => Promise<void>;
  onNext: (data: RequestResetStepData) => void;
  labels?: Partial<RequestResetStepLabels>;
}

/**
 * Step 1 of the Password Reset flow (docs/../ethds-patterns/patterns/password-reset.md).
 *
 * Always advances to the OTP step once the request completes without a
 * network error — whether the identifier actually matches an account is
 * never branched on here, so nothing in this step can leak account
 * existence. The non-revealing "if an account matches, we've sent a code"
 * message is shown on the following OTP screen instead.
 */
export function RequestResetStep({ onRequest, onNext, labels }: RequestResetStepProps) {
  const l = { ...DEFAULT_REQUEST_RESET_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const identifier = String(new FormData(e.currentTarget).get('identifier') ?? '');
    if (!identifier) {
      setErrors([{ message: l.identifierRequiredError, href: '#identifier' }]);
      return;
    }
    setErrors([]);
    setNetworkError(null);
    setSubmitting(true);
    try {
      await onRequest(identifier);
      onNext({ identifier });
    } catch {
      setNetworkError(l.networkErrorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      {networkError && (
        <Alert variant="error" iconLabel="Error">
          {networkError}
        </Alert>
      )}
      <TextInput id="identifier" label={l.identifierLabel} name="identifier" autoComplete="username" required />
      <Button type="submit" variant="primary" disabled={submitting}>
        {l.submitLabel}
      </Button>
    </form>
  );
}
