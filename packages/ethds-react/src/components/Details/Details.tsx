import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Details.module.css';

export interface DetailsProps extends Omit<HTMLAttributes<HTMLDetailsElement>, 'title'> {
  /** The always-visible summary text (translatable). */
  summary: ReactNode;
  /** Expanded by default. */
  open?: boolean;
  children: ReactNode;
}

/**
 * Details — expandable "show more" content, built on the native
 * `<details>`/`<summary>` elements.
 *
 * Toggling, keyboard operability (Enter/Space on the summary), and the
 * expanded/collapsed state exposed to assistive technology all come free
 * from the native elements — no ARIA or JavaScript state management
 * needed.
 */
export const Details = forwardRef<HTMLDetailsElement, DetailsProps>(function Details(
  { summary, open, children, className, ...rest },
  ref,
) {
  return (
    <details ref={ref} open={open} className={cx(styles.details, className)} {...rest}>
      <summary className={styles.summary}>{summary}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
});
