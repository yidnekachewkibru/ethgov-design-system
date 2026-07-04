import { useEffect, useRef } from 'react';
import { Alert, Button, Panel } from '@ethds/react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import type { SubmitResult } from '../../hooks/useMultiStepForm';
import { OtpForm, DEFAULT_OTP_LABELS } from '../OtpVerification';
import type { OtpFormLabels } from '../OtpVerification';
import { RequestResetStep, DEFAULT_REQUEST_RESET_LABELS } from './steps/RequestResetStep';
import type { RequestResetStepLabels } from './steps/RequestResetStep';
import { SetNewPasswordStep, DEFAULT_SET_NEW_PASSWORD_LABELS } from './steps/SetNewPasswordStep';
import type { SetNewPasswordStepLabels } from './steps/SetNewPasswordStep';
import type { PasswordResetData } from './types';
import formStyles from './PasswordResetFlow.module.css';

export interface PasswordResetConfirmationLabels {
  title: string;
  body: string;
}

export const DEFAULT_PASSWORD_RESET_CONFIRMATION_LABELS: PasswordResetConfirmationLabels = {
  title: 'Password changed',
  body: 'Your password has been changed. Other signed-in devices have been signed out for your security.',
};

export interface PasswordResetFlowLabels {
  requestReset: Partial<RequestResetStepLabels>;
  otp: Partial<OtpFormLabels>;
  setNewPassword: Partial<SetNewPasswordStepLabels>;
  confirmation: Partial<PasswordResetConfirmationLabels>;
  savingHeading: string;
  tryAgainLabel: string;
}

export const DEFAULT_PASSWORD_RESET_LABELS: PasswordResetFlowLabels = {
  requestReset: DEFAULT_REQUEST_RESET_LABELS,
  otp: DEFAULT_OTP_LABELS,
  setNewPassword: DEFAULT_SET_NEW_PASSWORD_LABELS,
  confirmation: DEFAULT_PASSWORD_RESET_CONFIRMATION_LABELS,
  savingHeading: 'Saving your new password',
  tryAgainLabel: 'Try again',
};

export interface PasswordResetFlowProps {
  /** Sends the code; must never reject just because the identifier doesn't match an account. */
  onRequestReset: (identifier: string) => Promise<void>;
  onVerifyCode: (code: string) => Promise<void>;
  onSubmit: (data: PasswordResetData) => Promise<SubmitResult>;
  onSaveDraft?: (data: Partial<PasswordResetData>) => void | Promise<void>;
  labels?: Partial<PasswordResetFlowLabels>;
}

function maskIdentifier(identifier: string): string {
  if (identifier.includes('@')) {
    const [local, domain] = identifier.split('@');
    return `${local.slice(0, 1)}${'•'.repeat(Math.max(local.length - 1, 1))}@${domain}`;
  }
  const digits = identifier.replace(/\D/g, '');
  if (digits.length > 4) {
    return `${'•'.repeat(digits.length - 4)}${digits.slice(-4)}`;
  }
  return identifier;
}

/**
 * PasswordResetFlow — the Password Reset pattern
 * (docs/../ethds-patterns/patterns/password-reset.md): request → OTP
 * Verification (reusing `OtpForm`) → set a new password, on
 * `useMultiStepForm`. Step 1 never branches on whether the identifier
 * matches an account — the non-revealing wording lives in the OTP step's
 * `sentTo` label — so nothing in this flow can leak account existence.
 */
export function PasswordResetFlow({
  onRequestReset,
  onVerifyCode,
  onSubmit,
  onSaveDraft,
  labels,
}: PasswordResetFlowProps) {
  const l = { ...DEFAULT_PASSWORD_RESET_LABELS, ...labels };
  const form = useMultiStepForm<PasswordResetData>({
    totalSteps: 3,
    onSaveDraft,
    onSubmit,
  });
  const reviewStep = form.totalSteps + 1;
  const stepRef = useRef<HTMLDivElement>(null);

  // Focus moves to the top of each new step, per the pattern's
  // Accessibility Guidance.
  useEffect(() => {
    stepRef.current?.focus();
  }, [form.currentStep, form.result]);

  // Setting the new password (step 3) is the flow's last data-entry step;
  // once it's captured, submit immediately rather than showing a separate
  // review screen the doc never describes.
  useEffect(() => {
    if (form.currentStep === reviewStep && !form.result && !form.submitting && !form.submitError) {
      form.submit();
    }
  }, [form, form.currentStep, form.result, form.submitting, form.submitError, reviewStep]);

  if (form.result) {
    return (
      <div ref={stepRef} tabIndex={-1}>
        <Panel title={l.confirmation.title}>{l.confirmation.body}</Panel>
      </div>
    );
  }

  return (
    <div ref={stepRef} tabIndex={-1}>
      {form.currentStep === 1 && (
        <RequestResetStep onRequest={onRequestReset} onNext={(data) => form.goNext(data)} labels={l.requestReset} />
      )}
      {form.currentStep === 2 && (
        <OtpForm
          maskedTo={maskIdentifier(form.data.identifier ?? '')}
          onVerify={async (code) => {
            await onVerifyCode(code);
            await form.goNext({ code });
          }}
          labels={l.otp}
        />
      )}
      {form.currentStep === 3 && (
        <SetNewPasswordStep onNext={(data) => form.goNext(data)} labels={l.setNewPassword} />
      )}
      {form.currentStep === reviewStep && (
        <div className={formStyles.form}>
          <h1>{l.savingHeading}</h1>
          {form.submitError && (
            <>
              <Alert variant="error" iconLabel="Error">
                {form.submitError}
              </Alert>
              <Button type="button" variant="primary" onClick={() => form.submit()}>
                {l.tryAgainLabel}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
