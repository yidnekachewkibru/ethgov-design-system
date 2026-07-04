import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FileUpload, Button, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem } from '@ethds/react';
import gridStyles from '../../../styles/grid.module.css';
import formStyles from '../ApplicationSubmissionFlow.module.css';
import type { StepProps } from '../types';

export interface DocumentsStepData {
  documentName: string;
}

export interface DocumentsStepLabels {
  heading: string;
  stepLabel: string;
  errorSummaryTitle: string;
  documentLabel: string;
  documentHint: string;
  backLabel: string;
  nextLabel: string;
  documentRequiredError: string;
}

export const DEFAULT_DOCUMENTS_LABELS: DocumentsStepLabels = {
  heading: 'Apply for a business licence',
  stepLabel: 'Step 3 of 4: Documents',
  errorSummaryTitle: 'There is a problem',
  documentLabel: 'Upload your business registration document',
  documentHint: 'PDF, JPG or PNG, up to 5MB',
  backLabel: 'Back',
  nextLabel: 'Next',
  documentRequiredError: 'Choose a file to upload.',
};

export interface DocumentsStepProps extends StepProps<DocumentsStepData> {
  labels?: Partial<DocumentsStepLabels>;
}

/** Step 3 of the Application Submission flow — supporting documents. */
export function DocumentsStep({ draft, onNext, onBack, labels }: DocumentsStepProps) {
  const l = { ...DEFAULT_DOCUMENTS_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [documentName, setDocumentName] = useState(draft.documentName ?? '');

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setDocumentName(e.target.files?.[0]?.name ?? '');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: ErrorSummaryItem[] = [];
    if (!documentName) next.push({ message: l.documentRequiredError, href: '#document' });
    setErrors(next);
    if (next.length === 0) onNext({ documentName });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      <FileUpload
        id="document"
        label={l.documentLabel}
        hint={l.documentHint}
        onChange={handleFileChange}
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
