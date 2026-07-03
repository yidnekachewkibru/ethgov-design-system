import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './ErrorSummary.module.css';

export interface ErrorSummaryItem {
  /** The error message (translatable). */
  message: ReactNode;
  /** Anchor to the offending field, e.g. "#given-name". */
  href?: string;
}

export interface ErrorSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Summary heading (translatable), e.g. "There is a problem". */
  title: ReactNode;
  errors: ErrorSummaryItem[];
  /** Move focus to the summary when it appears (default true). */
  autoFocus?: boolean;
}

/**
 * ErrorSummary — the focusable summary of form errors shown at the top of
 * the page on failed submit.
 *
 * `role="alert"` announces it; focus moves to it (WCAG error-focus
 * pattern) so keyboard and screen-reader users land on the problem. Each
 * error links to its field.
 */
export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(function ErrorSummary(
  { title, errors, autoFocus = true, className, ...rest },
  ref,
) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  useEffect(() => {
    if (autoFocus) localRef.current?.focus();
  }, [autoFocus]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={localRef}
      role="alert"
      tabIndex={-1}
      className={cx(styles.summary, className)}
      {...rest}
    >
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {errors.map((err, i) => (
          <li key={i}>
            {err.href ? (
              <a href={err.href} className={styles.link}>
                {err.message}
              </a>
            ) : (
              <span className={styles.message}>{err.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
