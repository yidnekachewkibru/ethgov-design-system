import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { TextInput, Button, Alert } from '@ethds/react';
import styles from './OtpForm.module.css';

export interface OtpFormLabels {
  heading: ReactNode;
  /** `{maskedTo}` is substituted with the masked destination. */
  sentTo: (maskedTo: string) => ReactNode;
  codeLabel: string;
  submitLabel: string;
  genericErrorMessage: string;
  resendLabel: string;
  /** `{seconds}` is substituted with the remaining cooldown. */
  resendCooldown: (seconds: number) => ReactNode;
  changeNumberLabel: string;
}

export const DEFAULT_OTP_LABELS: OtpFormLabels = {
  heading: 'Enter the code we sent',
  sentTo: (maskedTo) => `We sent a 6-digit code to ${maskedTo}.`,
  codeLabel: 'Code',
  submitLabel: 'Verify',
  genericErrorMessage: 'That code is incorrect or has expired. Check the SMS or request a new code.',
  resendLabel: 'Resend code',
  resendCooldown: (seconds) => `Resend in 0:${String(seconds).padStart(2, '0')}`,
  changeNumberLabel: 'Wrong number? Change it',
};

export interface OtpFormProps {
  /** The masked destination shown to the citizen, e.g. "09•• ••• •67". */
  maskedTo: string;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => void;
  /** Seconds left before resend is available again; 0 means resend is enabled. */
  resendCooldownSeconds?: number;
  changeNumberHref?: string;
  labels?: Partial<OtpFormLabels>;
}

/**
 * OtpForm — the OTP Verification pattern
 * (docs/../ethds-patterns/patterns/otp-verification.md).
 *
 * A single labelled code field (never a one-box-per-digit widget — those
 * break paste, screen readers, and OS autofill), with
 * `autocomplete="one-time-code"` and tolerant trimming of pasted spaces.
 * Meets WCAG 2.2 SC 3.3.8 Accessible Authentication: paste and autofill
 * both work, no image/puzzle challenge.
 */
export function OtpForm({
  maskedTo,
  onVerify,
  onResend,
  resendCooldownSeconds = 0,
  changeNumberHref,
  labels,
}: OtpFormProps) {
  const l = { ...DEFAULT_OTP_LABELS, ...labels };
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const raw = String(new FormData(e.currentTarget).get('code') ?? '');
    const code = raw.replace(/\s+/g, ''); // tolerate pasted spaces
    try {
      await onVerify(code);
    } catch {
      setError(l.genericErrorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h1>{l.heading}</h1>
      <p>{l.sentTo(maskedTo)}</p>
      {error && (
        <Alert variant="error" iconLabel="Error">
          {error}
        </Alert>
      )}
      <TextInput
        label={l.codeLabel}
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        // No maxLength: a hard native truncation would cut off a pasted
        // code that includes spaces before the trim-before-checking logic
        // below ever sees it — the field accepts the code "with or
        // without surrounding spaces" per the pattern's Validation Rules.
        aria-invalid={error ? true : undefined}
        required
      />
      <Button type="submit" variant="primary">
        {l.submitLabel}
      </Button>
      <div className={styles.footer} aria-live="polite">
        {resendCooldownSeconds > 0 ? (
          <span>{l.resendCooldown(resendCooldownSeconds)}</span>
        ) : (
          onResend && (
            <button type="button" className={styles.resendLink} onClick={onResend}>
              {l.resendLabel}
            </button>
          )
        )}
        {changeNumberHref && (
          <a href={changeNumberHref} className={styles.resendLink}>
            {l.changeNumberLabel}
          </a>
        )}
      </div>
    </form>
  );
}
