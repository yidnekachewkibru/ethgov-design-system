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
