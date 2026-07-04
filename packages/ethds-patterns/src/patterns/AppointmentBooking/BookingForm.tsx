import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Select, RadioGroup, Button, Alert, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem, SelectOption, RadioOption } from '@ethds/react';
import styles from './BookingForm.module.css';

export interface BookingConfirmation {
  office: string;
  date: string;
  time: string;
}

export interface BookingFormLabels {
  heading: ReactNode;
  errorSummaryTitle: string;
  officeLabel: string;
  officePlaceholder: string;
  dateLabel: string;
  datePlaceholder: string;
  timeLegend: string;
  submitLabel: string;
  slotTakenMessage: string;
  officeRequiredError: string;
  dateRequiredError: string;
  timeRequiredError: string;
}

export const DEFAULT_BOOKING_LABELS: BookingFormLabels = {
  heading: 'Book an appointment',
  errorSummaryTitle: 'There is a problem',
  officeLabel: 'Office',
  officePlaceholder: 'Choose an office',
  dateLabel: 'Date (Ethiopian calendar)',
  datePlaceholder: 'Choose a date',
  timeLegend: 'Time (EAT)',
  submitLabel: 'Confirm booking',
  slotTakenMessage: 'That slot was just taken. Please choose another time.',
  officeRequiredError: 'Choose an office.',
  dateRequiredError: 'Choose a date.',
  timeRequiredError: 'Choose a time.',
};

export interface BookingFormProps {
  offices: SelectOption[];
  dates: SelectOption[];
  /** Unavailable slots should be passed with `disabled: true`, never omitted silently. */
  slots: RadioOption[];
  onConfirm: (booking: BookingConfirmation) => Promise<void>;
  labels?: Partial<BookingFormLabels>;
}

/**
 * BookingForm — the Appointment Booking pattern
 * (docs/../ethds-patterns/patterns/appointment-booking.md).
 *
 * Only available offices/dates/times are selectable — full or past slots
 * are passed in already `disabled`, per the pattern's Validation Rules,
 * rather than being accepted and rejected after submit. If the chosen
 * slot is taken between selection and confirmation (a real race, since
 * availability isn't re-locked client-side), `onConfirm` rejecting shows
 * a plain-language warning and lets the citizen pick another time — never
 * a bare error.
 */
export function BookingForm({ offices, dates, slots, onConfirm, labels }: BookingFormProps) {
  const l = { ...DEFAULT_BOOKING_LABELS, ...labels };
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [slotTaken, setSlotTaken] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const office = String(data.get('office') ?? '');
    const date = String(data.get('date') ?? '');

    const next: ErrorSummaryItem[] = [];
    if (!office) next.push({ message: l.officeRequiredError, href: '#office' });
    if (!date) next.push({ message: l.dateRequiredError, href: '#date' });
    if (!time) next.push({ message: l.timeRequiredError, href: '#time' });
    setErrors(next);
    if (next.length > 0) return;

    setSlotTaken(false);
    setSubmitting(true);
    try {
      await onConfirm({ office, date, time });
    } catch {
      setSlotTaken(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h1>{l.heading}</h1>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      {slotTaken && (
        <Alert variant="warning" iconLabel="Warning">
          {l.slotTakenMessage}
        </Alert>
      )}
      <Select id="office" label={l.officeLabel} name="office" options={offices} placeholder={l.officePlaceholder} required />
      <Select id="date" label={l.dateLabel} name="date" options={dates} placeholder={l.datePlaceholder} required />
      <RadioGroup id="time" legend={l.timeLegend} options={slots} value={time} onChange={setTime} required />
      <Button type="submit" variant="primary" disabled={submitting}>
        {l.submitLabel}
      </Button>
    </form>
  );
}
