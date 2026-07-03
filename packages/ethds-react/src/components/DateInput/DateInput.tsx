import { forwardRef, useEffect, useId, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ethiopianToGregorian, gregorianToEthiopian } from './ethiopianCalendar';
import styles from './DateInput.module.css';

export type DateInputCalendar = 'ethiopian' | 'gregorian';

export interface DateInputProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'id'> {
  /** Group question, rendered as a `<legend>` (translatable). */
  legend: ReactNode;
  id?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** The calendar the citizen enters the date in. Default 'ethiopian'. */
  calendar?: DateInputCalendar;
  /** Translated field labels. */
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
  /** ISO 8601 Gregorian date ("2026-09-11"); syncs the fields when it changes. */
  value?: string;
  /** ISO 8601 Gregorian date used to seed the fields on first render. */
  defaultValue?: string;
  /** Fires with an ISO 8601 Gregorian date once day/month/year all parse, or `undefined` while incomplete. */
  onChange?: (isoDate: string | undefined) => void;
}

interface Parts {
  day: string;
  month: string;
  year: string;
}

function isoToParts(iso: string | undefined, calendar: DateInputCalendar): Parts {
  if (!iso) return { day: '', month: '', year: '' };
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return { day: '', month: '', year: '' };
  const parts =
    calendar === 'ethiopian' ? gregorianToEthiopian({ year: y, month: m, day: d }) : { year: y, month: m, day: d };
  return { day: String(parts.day), month: String(parts.month), year: String(parts.year) };
}

function partsToIso(parts: Parts, calendar: DateInputCalendar): string | undefined {
  const d = Number(parts.day);
  const m = Number(parts.month);
  const y = Number(parts.year);
  if (!d || !m || !y) return undefined;
  if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) return undefined;
  const gregorian = calendar === 'ethiopian' ? ethiopianToGregorian({ year: y, month: m, day: d }) : { year: y, month: m, day: d };
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${gregorian.year}-${pad(gregorian.month)}-${pad(gregorian.day)}`;
}

/**
 * DateInput — three labelled day/month/year fields for entering a date,
 * per the RFC 0000 design. Defaults to the Ethiopian calendar (E.C.);
 * pass `calendar="gregorian"` for G.C. entry. Text entry is the whole
 * interaction — no calendar-grid widget — so it works on low-end devices
 * and with any assistive technology. Emits an unambiguous ISO 8601
 * Gregorian date via `onChange`, per
 * docs/localization/date-formatting.md.
 */
export const DateInput = forwardRef<HTMLFieldSetElement, DateInputProps>(function DateInput(
  {
    legend,
    id,
    hint,
    error,
    required,
    calendar = 'ethiopian',
    dayLabel = 'Day',
    monthLabel = 'Month',
    yearLabel = 'Year',
    value,
    defaultValue,
    onChange,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const groupId = id ?? autoId;
  const hintId = `${groupId}-hint`;
  const errorId = `${groupId}-error`;
  const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

  const [parts, setParts] = useState<Parts>(() => isoToParts(value ?? defaultValue, calendar));

  useEffect(() => {
    if (value === undefined) return;
    setParts(isoToParts(value, calendar));
  }, [value, calendar]);

  function update(field: keyof Parts, fieldValue: string) {
    const next = { ...parts, [field]: fieldValue };
    setParts(next);
    onChange?.(partsToIso(next, calendar));
  }

  return (
    <fieldset
      ref={ref}
      id={groupId}
      className={cx(styles.group, className)}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      {...rest}
    >
      <legend className={styles.legend}>
        {legend}
        {required && <span className={styles.required}> (required)</span>}
      </legend>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${groupId}-day`} className={styles.fieldLabel}>
            {dayLabel}
          </label>
          <input
            id={`${groupId}-day`}
            name={`${groupId}-day`}
            className={cx(styles.input, styles.day, error ? styles.inputError : undefined)}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={2}
            value={parts.day}
            onChange={(e) => update('day', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${groupId}-month`} className={styles.fieldLabel}>
            {monthLabel}
          </label>
          <input
            id={`${groupId}-month`}
            name={`${groupId}-month`}
            className={cx(styles.input, styles.month, error ? styles.inputError : undefined)}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={2}
            value={parts.month}
            onChange={(e) => update('month', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${groupId}-year`} className={styles.fieldLabel}>
            {yearLabel}
          </label>
          <input
            id={`${groupId}-year`}
            name={`${groupId}-year`}
            className={cx(styles.input, styles.year, error ? styles.inputError : undefined)}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={parts.year}
            onChange={(e) => update('year', e.target.value)}
          />
        </div>
      </div>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </fieldset>
  );
});
