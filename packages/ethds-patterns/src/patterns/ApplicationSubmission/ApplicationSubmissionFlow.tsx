import { useEffect, useRef } from 'react';
import { StepIndicator } from '@ethds/react';
import type { RadioOption, SelectOption } from '@ethds/react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import type { SubmitResult } from '../../hooks/useMultiStepForm';
import { ApplicantStep, DEFAULT_APPLICANT_LABELS } from './steps/ApplicantStep';
import type { ApplicantStepLabels } from './steps/ApplicantStep';
import { BusinessDetailsStep, DEFAULT_BUSINESS_DETAILS_LABELS } from './steps/BusinessDetailsStep';
import type { BusinessDetailsStepLabels } from './steps/BusinessDetailsStep';
import { DocumentsStep, DEFAULT_DOCUMENTS_LABELS } from './steps/DocumentsStep';
import type { DocumentsStepLabels } from './steps/DocumentsStep';
import { ReviewStep, DEFAULT_REVIEW_LABELS } from './steps/ReviewStep';
import type { ReviewStepLabels } from './steps/ReviewStep';
import { ConfirmationPanel, DEFAULT_CONFIRMATION_LABELS } from './ConfirmationPanel';
import type { ConfirmationPanelLabels } from './ConfirmationPanel';
import type { ApplicationData } from './types';

export interface ApplicationSubmissionFlowLabels {
  stepIndicatorLabel: string;
  stepNames: [string, string, string, string];
  applicant: Partial<ApplicantStepLabels>;
  businessDetails: Partial<BusinessDetailsStepLabels>;
  documents: Partial<DocumentsStepLabels>;
  review: Partial<ReviewStepLabels>;
  confirmation: Partial<ConfirmationPanelLabels>;
}

export const DEFAULT_APPLICATION_SUBMISSION_LABELS: ApplicationSubmissionFlowLabels = {
  stepIndicatorLabel: 'Application progress',
  stepNames: ['Applicant', 'Business details', 'Documents', 'Review'],
  applicant: DEFAULT_APPLICANT_LABELS,
  businessDetails: DEFAULT_BUSINESS_DETAILS_LABELS,
  documents: DEFAULT_DOCUMENTS_LABELS,
  review: DEFAULT_REVIEW_LABELS,
  confirmation: DEFAULT_CONFIRMATION_LABELS,
};

export interface ApplicationSubmissionFlowProps {
  initialData?: Partial<ApplicationData>;
  onSaveDraft?: (data: Partial<ApplicationData>) => void | Promise<void>;
  onSubmit: (data: ApplicationData) => Promise<SubmitResult>;
  regions?: SelectOption[];
  activities?: RadioOption[];
  labels?: Partial<ApplicationSubmissionFlowLabels>;
}

/**
 * ApplicationSubmissionFlow — the Application Submission pattern
 * (docs/../ethds-patterns/patterns/application-submission.md): Applicant
 * → Business details → Documents → Review → Confirmation, built on
 * `useMultiStepForm`.
 *
 * Preserves input across steps and a dropped connection (via
 * `onSaveDraft`, called after every successful step transition) and never
 * silently drops a submission — a failed submit keeps the Review step's
 * data intact and offers retry.
 */
export function ApplicationSubmissionFlow({
  initialData,
  onSaveDraft,
  onSubmit,
  regions,
  activities,
  labels,
}: ApplicationSubmissionFlowProps) {
  const l = { ...DEFAULT_APPLICATION_SUBMISSION_LABELS, ...labels };
  const form = useMultiStepForm<ApplicationData>({
    totalSteps: 3,
    initialData,
    onSaveDraft,
    onSubmit,
  });

  const stepRef = useRef<HTMLDivElement>(null);

  // Focus moves to the top of each new step (its heading immediately
  // follows), per the pattern's Accessibility Guidance.
  useEffect(() => {
    stepRef.current?.focus();
  }, [form.currentStep, form.result]);

  if (form.result) {
    return (
      <div ref={stepRef} tabIndex={-1}>
        <ConfirmationPanel reference={form.result.reference} labels={l.confirmation} />
      </div>
    );
  }

  function regionLabelFor(value: string) {
    return regions?.find((r) => r.value === value)?.label ?? value;
  }
  function activityLabelFor(value: string) {
    return activities?.find((a) => a.value === value)?.label ?? value;
  }

  return (
    <div>
      <StepIndicator label={l.stepIndicatorLabel} steps={l.stepNames} current={Math.min(form.currentStep, 4)} />
      <div ref={stepRef} tabIndex={-1}>
        {form.currentStep === 1 && (
          <ApplicantStep draft={form.data} onNext={(data) => form.goNext(data)} labels={l.applicant} />
        )}
        {form.currentStep === 2 && (
          <BusinessDetailsStep
            draft={form.data}
            onNext={(data) => form.goNext(data)}
            onBack={form.goBack}
            regions={regions}
            activities={activities}
            labels={l.businessDetails}
          />
        )}
        {form.currentStep === 3 && (
          <DocumentsStep
            draft={form.data}
            onNext={(data) => form.goNext(data)}
            onBack={form.goBack}
            labels={l.documents}
          />
        )}
        {form.currentStep === 4 && (
          <ReviewStep
            data={form.data}
            onChangeStep={form.goToStep}
            onSubmit={form.submit}
            submitting={form.submitting}
            submitError={form.submitError}
            labels={l.review}
            regionLabelFor={regionLabelFor}
            activityLabelFor={activityLabelFor}
          />
        )}
      </div>
    </div>
  );
}
