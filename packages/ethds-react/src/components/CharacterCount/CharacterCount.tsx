import { forwardRef, useId, useState } from 'react';
import type { ChangeEvent, ReactNode, TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './CharacterCount.module.css';

export interface CharacterCountProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'maxLength'> {
  /** Visible label text (translatable). Required for accessibility. */
  label: ReactNode;
  id?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** The character limit. */
  maxLength: number;
  /**
   * Builds the live status message from the remaining character count
   * (negative once over the limit). Translatable — override for other
   * languages/plural rules. Defaults to English.
   */
  getCountMessage?: (remaining: number, limit: number) => string;
}

function defaultCountMessage(remaining: number, limit: number): string {
  if (remaining < 0) {
    const over = Math.abs(remaining);
    return `You have ${over} character${over === 1 ? '' : 's'} too many`;
  }
  return `You have ${remaining} character${remaining === 1 ? '' : 's'} remaining (limit ${limit})`;
}

/**
 * CharacterCount — a `<textarea>` with a live remaining-character count.
 *
 * The count is a polite live region, announced as the citizen types
 * without interrupting them, and switches to a visible warning state once
 * the limit is exceeded (never colour alone — the message text says so).
 */
export const CharacterCount = forwardRef<HTMLTextAreaElement, CharacterCountProps>(
  function CharacterCount(
    {
      label,
      id,
      hint,
      error,
      required = false,
      maxLength,
      getCountMessage = defaultCountMessage,
      rows = 4,
      className,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const countId = `${inputId}-count`;
    const describedBy =
      cx(hint ? hintId : undefined, error ? errorId : undefined, countId) || undefined;

    const [length, setLength] = useState(
      typeof value === 'string' ? value.length : typeof defaultValue === 'string' ? defaultValue.length : 0,
    );

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      setLength(e.target.value.length);
      onChange?.(e);
    }

    const remaining = maxLength - length;
    const overLimit = remaining < 0;

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
          className={cx(
            styles.textarea,
            error || overLimit ? styles.textareaError : undefined,
            className,
          )}
          aria-describedby={describedBy}
          aria-invalid={error || overLimit ? true : undefined}
          aria-required={required || undefined}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...rest}
        />
        <span
          id={countId}
          className={cx(styles.count, overLimit ? styles.countError : undefined)}
          aria-live="polite"
        >
          {getCountMessage(remaining, maxLength)}
        </span>
        {error && (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
