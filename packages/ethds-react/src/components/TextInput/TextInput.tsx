import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './TextInput.module.css';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  /** Optional id; auto-generated if omitted. */
  id?: string;
  /** Help text shown below the label, associated via aria-describedby. */
  hint?: ReactNode;
  /** Error message; when set, marks the field invalid and shows the error. */
  error?: ReactNode;
  /** Marks the field required (adds an aria-required and a visible marker). */
  required?: boolean;
}

/**
 * TextInput — a labelled single-line text field.
 *
 * Wires the label, hint, and error to the input via `htmlFor` /
 * `aria-describedby` / `aria-invalid`, so screen-reader users hear the
 * label, guidance, and any error. All text is passed in (translatable).
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, id, hint, error, required = false, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy =
    cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required}> (required)</span>
        )}
      </label>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cx(styles.input, error ? styles.inputError : undefined, className)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        required={required}
        {...rest}
      />
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
});
