import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './SummaryList.module.css';

export interface SummaryListRow {
  /** The label, e.g. "Given name" (translatable). */
  key: ReactNode;
  /** The citizen's answer. */
  value: ReactNode;
  /** Optional change action linking back to the question. */
  action?: {
    /** Visible action text, e.g. "Change" (translatable). */
    label: ReactNode;
    href: string;
    /**
     * Visually hidden suffix naming what is changed, e.g. "given name",
     * so the link reads "Change given name" to screen readers.
     */
    visuallyHiddenText?: string;
  };
}

export interface SummaryListProps extends HTMLAttributes<HTMLDListElement> {
  rows: SummaryListRow[];
}

/**
 * SummaryList — label/value rows for "check your answers" pages and
 * record summaries, with optional Change links back to each question.
 *
 * A semantic `<dl>`: screen readers announce each label with its value.
 */
export const SummaryList = forwardRef<HTMLDListElement, SummaryListProps>(function SummaryList(
  { rows, className, ...rest },
  ref,
) {
  return (
    <dl ref={ref} className={cx(styles.list, className)} {...rest}>
      {rows.map((row, i) => (
        <div key={i} className={styles.row}>
          <dt className={styles.key}>{row.key}</dt>
          <dd className={styles.value}>{row.value}</dd>
          <dd className={styles.actions}>
            {row.action && (
              <a href={row.action.href} className={styles.action}>
                {row.action.label}
                {row.action.visuallyHiddenText && (
                  <span className={styles.visuallyHidden}> {row.action.visuallyHiddenText}</span>
                )}
              </a>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
});
