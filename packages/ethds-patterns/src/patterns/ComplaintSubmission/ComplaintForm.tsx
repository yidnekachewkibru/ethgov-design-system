import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Select, TextArea, TextInput, Checkbox, FileUpload, Button, Alert, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem, SelectOption } from '@ethds/react';
import styles from './ComplaintForm.module.css';

export interface ComplaintData {
  category: string;
  description: string;
  anonymous: boolean;
  phone: string;
  attachmentName?: string;
}

export interface ComplaintFormLabels {
  heading: ReactNode;
  errorSummaryTitle: string;
  categoryLabel: string;
  categoryPlaceholder: string;
  descriptionLabel: string;
  attachmentLabel: string;
  anonymousLabel: string;
  phoneLabel: string;
  submitLabel: string;
  genericErrorMessage: string;
  categoryRequiredError: string;
  descriptionRequiredError: string;
  phoneRequiredError: string;
}

export const DEFAULT_COMPLAINT_LABELS: ComplaintFormLabels = {
  heading: 'Submit a complaint',
  errorSummaryTitle: 'There is a problem',
  categoryLabel: 'What is this about?',
  categoryPlaceholder: 'Choose a category',
  descriptionLabel: 'Describe what happened',
  attachmentLabel: 'Attach evidence (optional)',
  anonymousLabel: 'Submit anonymously',
  phoneLabel: 'Phone (so we can follow up)',
  submitLabel: 'Submit complaint',
  genericErrorMessage: 'Something went wrong submitting your complaint. Your answers have been kept — try again.',
  categoryRequiredError: 'Choose what this is about.',
  descriptionRequiredError: 'Describe what happened.',
  phoneRequiredError: 'Add a phone number, or submit anonymously.',
};

export const DEFAULT_COMPLAINT_CATEGORIES: SelectOption[] = [
  { value: 'delay', label: 'Service delay' },
  { value: 'conduct', label: 'Staff conduct' },
  { value: 'error', label: 'Incorrect information' },
  { value: 'other', label: 'Other' },
];

export interface ComplaintFormProps {
  onSubmit: (data: ComplaintData) => Promise<void>;
  categories?: SelectOption[];
  labels?: Partial<ComplaintFormLabels>;
}

/**
 * ComplaintForm — the Complaint Submission pattern
 * (docs/../ethds-patterns/patterns/complaint-submission.md).
 *
 * The "Submit anonymously" checkbox toggles whether the phone field is
 * required — hiding it entirely rather than merely disabling it, since an
 * anonymous complaint should not display a follow-up field. A failed
 * submit never clears the (possibly long) written complaint; the fields
 * stay exactly as entered so the citizen can retry without retyping.
 */
export function ComplaintForm({ onSubmit, categories = DEFAULT_COMPLAINT_CATEGORIES, labels }: ComplaintFormProps) {
  const l = { ...DEFAULT_COMPLAINT_LABELS, ...labels };
  const [anonymous, setAnonymous] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | undefined>();
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const category = String(data.get('category') ?? '');
    const description = String(data.get('description') ?? '').trim();
    const phone = String(data.get('phone') ?? '');

    const next: ErrorSummaryItem[] = [];
    if (!category) next.push({ message: l.categoryRequiredError, href: '#category' });
    if (!description) next.push({ message: l.descriptionRequiredError, href: '#description' });
    if (!anonymous && !phone) next.push({ message: l.phoneRequiredError, href: '#phone' });
    setErrors(next);
    if (next.length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      await onSubmit({ category, description, anonymous, phone, attachmentName });
    } catch {
      setSubmitError(l.genericErrorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h1>{l.heading}</h1>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      {submitError && (
        <Alert variant="error" iconLabel="Error">
          {submitError}
        </Alert>
      )}
      <Select
        id="category"
        label={l.categoryLabel}
        name="category"
        options={categories}
        placeholder={l.categoryPlaceholder}
        required
      />
      <TextArea id="description" label={l.descriptionLabel} name="description" rows={5} required />
      <FileUpload
        id="attachment"
        label={l.attachmentLabel}
        name="attachment"
        onChange={(e) => setAttachmentName(e.target.files?.[0]?.name)}
      />
      <Checkbox
        id="anonymous"
        label={l.anonymousLabel}
        name="anonymous"
        checked={anonymous}
        onChange={(e) => setAnonymous(e.target.checked)}
      />
      {!anonymous && (
        <TextInput id="phone" label={l.phoneLabel} name="phone" type="tel" inputMode="tel" autoComplete="tel" />
      )}
      <Button type="submit" variant="primary" disabled={submitting}>
        {l.submitLabel}
      </Button>
    </form>
  );
}
