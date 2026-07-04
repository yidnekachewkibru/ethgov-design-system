// @ethds/patterns — tested React compositions of the government service
// patterns documented in patterns/*.md, built on @ethds/react.

export { useMultiStepForm } from './hooks/useMultiStepForm';
export type {
  SubmitResult,
  UseMultiStepFormOptions,
  UseMultiStepFormResult,
} from './hooks/useMultiStepForm';

export { LoginForm, DEFAULT_LOGIN_LABELS } from './patterns/Login';
export type { LoginFormProps, LoginFormLabels } from './patterns/Login';

export { RegisterForm, DEFAULT_REGISTER_LABELS } from './patterns/Registration';
export type {
  RegisterFormProps,
  RegisterFormLabels,
  RegistrationData,
} from './patterns/Registration';

export { OtpForm, DEFAULT_OTP_LABELS } from './patterns/OtpVerification';
export type { OtpFormProps, OtpFormLabels } from './patterns/OtpVerification';

export {
  ApplicationSubmissionFlow,
  DEFAULT_APPLICATION_SUBMISSION_LABELS,
  ApplicantStep,
  BusinessDetailsStep,
  DocumentsStep,
  ReviewStep,
  ConfirmationPanel,
} from './patterns/ApplicationSubmission';
export type {
  ApplicationSubmissionFlowProps,
  ApplicationSubmissionFlowLabels,
  ApplicationData,
  ApplicantStepProps,
  ApplicantStepData,
  BusinessDetailsStepProps,
  BusinessDetailsStepData,
  DocumentsStepProps,
  DocumentsStepData,
  ReviewStepProps,
  ConfirmationPanelProps,
} from './patterns/ApplicationSubmission';

export {
  PasswordResetFlow,
  DEFAULT_PASSWORD_RESET_LABELS,
  DEFAULT_PASSWORD_RESET_CONFIRMATION_LABELS,
  RequestResetStep,
  DEFAULT_REQUEST_RESET_LABELS,
  SetNewPasswordStep,
  DEFAULT_SET_NEW_PASSWORD_LABELS,
} from './patterns/PasswordReset';
export type {
  PasswordResetFlowProps,
  PasswordResetFlowLabels,
  PasswordResetConfirmationLabels,
  PasswordResetData,
  RequestResetStepProps,
  RequestResetStepData,
  RequestResetStepLabels,
  SetNewPasswordStepProps,
  SetNewPasswordStepData,
  SetNewPasswordStepLabels,
} from './patterns/PasswordReset';
