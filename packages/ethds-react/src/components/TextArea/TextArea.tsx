import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './TextArea.module.css';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  id?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/**
 * TextArea — a labelled multi-line text field. Same label / hint / error
 * accessibility wiring as {@link TextInput}.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, id, hint, error, required = false, rows = 4, className, ...rest },
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
        {required && <span className={styles.required}> (required)</span>}
      </label>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cx(styles.textarea, error ? styles.textareaError : undefined, className)}
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
