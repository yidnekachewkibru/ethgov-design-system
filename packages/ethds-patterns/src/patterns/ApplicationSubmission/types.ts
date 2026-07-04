export interface ApplicationData {
  givenName: string;
  fathersName: string;
  phone: string;
  businessName: string;
  region: string;
  activity: string;
  /** The chosen file's name, for display on the Review step. */
  documentName: string;
}

export interface StepProps<TStepData> {
  draft: Partial<ApplicationData>;
  onNext: (data: TStepData) => void;
  onBack?: () => void;
}
