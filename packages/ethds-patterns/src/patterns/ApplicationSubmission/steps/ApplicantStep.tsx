import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextInput, Button, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem } from '@ethds/react';
import gridStyles from '../../../styles/grid.module.css';
import formStyles from '../ApplicationSubmissionFlow.module.css';
import type { StepProps } from '../types';

export interface ApplicantStepData {
  givenName: string;
  fathersName: string;
  phone: string;
}

export interface ApplicantStepLabels {
  heading: string;
  stepLabel: string;
  errorSummaryTitle: string;
  givenNameLabel: string;
  fathersNameLabel: string;
  phoneLabel: string;
  backLabel: string;
  nextLabel: string;
  givenNameRequiredError: string;
  fathersNameRequiredError: string;
  phoneRequiredError: string;
}

export const DEFAULT_APPLICANT_LABELS: ApplicantStepLabels = {
  heading: 'Apply for a business licence',
  stepLabel: 'Step 1 of 4: Applicant',
  errorSummaryTitle: 'There is a problem',
  givenNameLabel: 'Given name',
  fathersNameLabel: "Father's name",
  phoneLabel: 'Phone number',
  backLabel: 'Back',
  nextLabel: 'Next',
  givenNameRequiredError: 'Enter your given name.',
  fathersNameRequiredError: "Enter your father's name.",
  phoneRequiredError: 'Enter your phone number.',
};

export interface ApplicantStepProps extends StepProps<ApplicantStepData> {
  labels?: Partial<ApplicantStepLabels>;
}

/** Step 1 of the Application Submission flow — the citizen's own details. */
export function ApplicantStep({ draft, onNext, onBack, labels }: ApplicantStepProps) {
  const l = { ...DEFAULT_APPLICANT_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: ErrorSummaryItem[] = [];
    if (!data.get('givenName')) next.push({ message: l.givenNameRequiredError, href: '#givenName' });
    if (!data.get('fathersName')) next.push({ message: l.fathersNameRequiredError, href: '#fathersName' });
    if (!data.get('phone')) next.push({ message: l.phoneRequiredError, href: '#phone' });
    setErrors(next);
    if (next.length === 0) {
      onNext({
        givenName: String(data.get('givenName') ?? ''),
        fathersName: String(data.get('fathersName') ?? ''),
        phone: String(data.get('phone') ?? ''),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      <TextInput
        id="givenName"
        label={l.givenNameLabel}
        name="givenName"
        autoComplete="given-name"
        defaultValue={draft.givenName}
        required
      />
      <TextInput
        id="fathersName"
        label={l.fathersNameLabel}
        name="fathersName"
        defaultValue={draft.fathersName}
        required
      />
      <TextInput
        id="phone"
        label={l.phoneLabel}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        defaultValue={draft.phone}
        required
      />
      <div className={gridStyles.actions}>
        {onBack && (
          <Button type="button" variant="secondary" onClick={onBack}>
            {l.backLabel}
          </Button>
        )}
        <Button type="submit" variant="primary">
          {l.nextLabel}
        </Button>
      </div>
    </form>
  );
}
