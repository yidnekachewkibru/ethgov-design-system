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

export { StatusView, DEFAULT_STATUS_VIEW_LABELS } from './patterns/StatusTracking';
export type { StatusViewProps, StatusViewLabels, StatusStep } from './patterns/StatusTracking';

export {
  ComplaintForm,
  DEFAULT_COMPLAINT_LABELS,
  DEFAULT_COMPLAINT_CATEGORIES,
} from './patterns/ComplaintSubmission';
export type { ComplaintFormProps, ComplaintFormLabels, ComplaintData } from './patterns/ComplaintSubmission';

export { BookingForm, DEFAULT_BOOKING_LABELS } from './patterns/AppointmentBooking';
export type {
  BookingFormProps,
  BookingFormLabels,
  BookingConfirmation,
} from './patterns/AppointmentBooking';
