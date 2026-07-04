import { Panel } from '@ethds/react';

export interface ConfirmationPanelLabels {
  title: string;
  referencePrefix: string;
  body: string;
}

export const DEFAULT_CONFIRMATION_LABELS: ConfirmationPanelLabels = {
  title: 'Application complete',
  referencePrefix: 'Your reference number is',
  body: 'We have emailed you a confirmation. Keep your reference number to track your application.',
};

export interface ConfirmationPanelProps {
  reference: string;
  labels?: Partial<ConfirmationPanelLabels>;
}

/** Shown once `useMultiStepForm`'s submit succeeds. */
export function ConfirmationPanel({ reference, labels }: ConfirmationPanelProps) {
  const l = { ...DEFAULT_CONFIRMATION_LABELS, ...labels };
  return (
    <Panel title={l.title} reference={`${l.referencePrefix} ${reference}`}>
      {l.body}
    </Panel>
  );
}
