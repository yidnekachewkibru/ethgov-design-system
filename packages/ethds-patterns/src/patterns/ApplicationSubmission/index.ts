export {
  ApplicationSubmissionFlow,
  DEFAULT_APPLICATION_SUBMISSION_LABELS,
} from './ApplicationSubmissionFlow';
export type {
  ApplicationSubmissionFlowProps,
  ApplicationSubmissionFlowLabels,
} from './ApplicationSubmissionFlow';
export type { ApplicationData } from './types';

export { ApplicantStep, DEFAULT_APPLICANT_LABELS } from './steps/ApplicantStep';
export type { ApplicantStepProps, ApplicantStepData, ApplicantStepLabels } from './steps/ApplicantStep';

export { BusinessDetailsStep, DEFAULT_BUSINESS_DETAILS_LABELS } from './steps/BusinessDetailsStep';
export type {
  BusinessDetailsStepProps,
  BusinessDetailsStepData,
  BusinessDetailsStepLabels,
} from './steps/BusinessDetailsStep';

export { DocumentsStep, DEFAULT_DOCUMENTS_LABELS } from './steps/DocumentsStep';
export type { DocumentsStepProps, DocumentsStepData, DocumentsStepLabels } from './steps/DocumentsStep';

export { ReviewStep, DEFAULT_REVIEW_LABELS } from './steps/ReviewStep';
export type { ReviewStepProps, ReviewStepLabels } from './steps/ReviewStep';

export { ConfirmationPanel, DEFAULT_CONFIRMATION_LABELS } from './ConfirmationPanel';
export type { ConfirmationPanelProps, ConfirmationPanelLabels } from './ConfirmationPanel';
