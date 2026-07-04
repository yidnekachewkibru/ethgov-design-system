import type { MouseEvent, ReactNode } from 'react';
import { SummaryList, Button, Alert } from '@ethds/react';
import type { SummaryListRow } from '@ethds/react';
import formStyles from '../ApplicationSubmissionFlow.module.css';
import type { ApplicationData } from '../types';

export interface ReviewStepLabels {
  heading: string;
  stepLabel: string;
  changeLabel: string;
  givenNameLabel: string;
  fathersNameLabel: string;
  phoneLabel: string;
  businessNameLabel: string;
  regionLabel: string;
  activityLabel: string;
  documentLabel: string;
  submitLabel: string;
  submitting: string;
}

export const DEFAULT_REVIEW_LABELS: ReviewStepLabels = {
  heading: 'Check your answers',
  stepLabel: 'Step 4 of 4: Review',
  changeLabel: 'Change',
  givenNameLabel: 'Given name',
  fathersNameLabel: "Father's name",
  phoneLabel: 'Phone number',
  businessNameLabel: 'Business name',
  regionLabel: 'Region',
  activityLabel: 'Activity',
  documentLabel: 'Document',
  submitLabel: 'Submit application',
  submitting: 'Submitting…',
};

export interface ReviewStepProps {
  data: Partial<ApplicationData>;
  /** Jump back to a specific step (1-based) to edit that section. */
  onChangeStep: (step: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
  labels?: Partial<ReviewStepLabels>;
  regionLabelFor?: (value: string) => ReactNode;
  activityLabelFor?: (value: string) => ReactNode;
}

/**
 * ReviewStep — step 4 (the Review screen) of the Application Submission
 * flow. Each row's "Change" link is a real anchor (`href="#step-N"`,
 * keyboard-operable on its own) whose click is intercepted to jump back
 * to that step in-place rather than navigating.
 */
export function ReviewStep({
  data,
  onChangeStep,
  onSubmit,
  submitting,
  submitError,
  labels,
  regionLabelFor = (v) => v,
  activityLabelFor = (v) => v,
}: ReviewStepProps) {
  const l = { ...DEFAULT_REVIEW_LABELS, ...labels };

  function changeAction(step: number, visuallyHiddenText: string) {
    return { label: l.changeLabel, href: `#step-${step}`, visuallyHiddenText };
  }

  function handleClick(e: MouseEvent<HTMLDListElement>) {
    const link = (e.target as HTMLElement).closest('a[href^="#step-"]');
    if (!link) return;
    e.preventDefault();
    const step = Number(link.getAttribute('href')!.replace('#step-', ''));
    onChangeStep(step);
  }

  const rows: SummaryListRow[] = [
    { key: l.givenNameLabel, value: data.givenName, action: changeAction(1, l.givenNameLabel.toLowerCase()) },
    { key: l.fathersNameLabel, value: data.fathersName, action: changeAction(1, l.fathersNameLabel.toLowerCase()) },
    { key: l.phoneLabel, value: data.phone, action: changeAction(1, l.phoneLabel.toLowerCase()) },
    {
      key: l.businessNameLabel,
      value: data.businessName,
      action: changeAction(2, l.businessNameLabel.toLowerCase()),
    },
    {
      key: l.regionLabel,
      value: data.region ? regionLabelFor(data.region) : '',
      action: changeAction(2, l.regionLabel.toLowerCase()),
    },
    {
      key: l.activityLabel,
      value: data.activity ? activityLabelFor(data.activity) : '',
      action: changeAction(2, l.activityLabel.toLowerCase()),
    },
    { key: l.documentLabel, value: data.documentName, action: changeAction(3, l.documentLabel.toLowerCase()) },
  ];

  return (
    <div className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      {submitError && (
        <Alert variant="error" iconLabel="Error">
          {submitError}
        </Alert>
      )}
      <SummaryList rows={rows} onClick={handleClick} />
      <Button variant="primary" onClick={onSubmit} disabled={submitting}>
        {submitting ? l.submitting : l.submitLabel}
      </Button>
    </div>
  );
}
