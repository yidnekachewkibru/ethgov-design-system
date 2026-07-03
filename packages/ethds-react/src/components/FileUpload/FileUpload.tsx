import { forwardRef, useId, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './FileUpload.module.css';

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  id?: string;
  /** Help text — state accepted file types and any size limit here. */
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Announced when a file is chosen, e.g. "file chosen" (translatable). */
  chosenLabel?: string;
  /** Announced when no file is chosen, e.g. "No file chosen" (translatable). */
  noFileLabel?: string;
}

/**
 * FileUpload — a labelled native file picker.
 *
 * Uses the native `<input type="file">` control (keyboard- and
 * screen-reader-operable for free, works with any assistive technology or
 * on-device file picker) rather than a custom drag-and-drop widget. The
 * chosen file name is echoed in a live region so screen-reader users get
 * confirmation without relying on the native control's own announcement.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    label,
    id,
    hint,
    error,
    required = false,
    chosenLabel = 'file chosen',
    noFileLabel = 'No file chosen',
    className,
    onChange,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const statusId = `${inputId}-status`;
  const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined, statusId) || undefined;

  const [fileNames, setFileNames] = useState<string[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFileNames(e.target.files ? Array.from(e.target.files).map((f) => f.name) : []);
    onChange?.(e);
  }

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
      <input
        ref={ref}
        id={inputId}
        type="file"
        className={cx(styles.input, error ? styles.inputError : undefined, className)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      <span id={statusId} className={styles.status} aria-live="polite">
        {fileNames.length > 0 ? `${fileNames.join(', ')} — ${chosenLabel}` : noFileLabel}
      </span>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
});
