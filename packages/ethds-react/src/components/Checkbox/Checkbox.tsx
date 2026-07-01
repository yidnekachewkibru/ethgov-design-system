import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  id?: string;
  /** Help text below the label, associated via aria-describedby. */
  hint?: ReactNode;
  /** Error message; marks the field invalid. */
  error?: ReactNode;
}

/**
 * Checkbox — a labelled native checkbox.
 *
 * Renders a real `<input type="checkbox">` (keyboard toggle with Space,
 * correct role/state for screen readers) with an associated `<label>`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, hint, error, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

  return (
    <div className={styles.field}>
      <div className={styles.row}>
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={cx(styles.input, className)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      </div>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
});
