import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  id?: string;
  options: SelectOption[];
  /** Optional placeholder shown as a disabled first option. */
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/**
 * Select — a labelled native `<select>`.
 *
 * Native-first: the browser's select is fully keyboard- and
 * screen-reader-accessible and works well on mobile. Label, hint, and
 * error are wired via `htmlFor` / `aria-describedby` / `aria-invalid`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, id, options, placeholder, hint, error, required = false, className, defaultValue, ...rest },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;
  const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
        {required && <span className={styles.required}> (required)</span>}
      </label>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cx(styles.select, error ? styles.selectError : undefined, className)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        required={required}
        defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
});
