import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Panel.module.css';

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The confirmation headline, e.g. "Application complete" (translatable). */
  title: ReactNode;
  /** Prominent reference line, e.g. the application/receipt number. */
  reference?: ReactNode;
  /** Supporting text below the reference. */
  children?: ReactNode;
}

/**
 * Panel — the confirmation banner shown when a citizen completes a
 * transaction ("Application complete" + reference number).
 *
 * White text on ETHDS success green (7.82:1). Use once, at the top of a
 * confirmation page, with the page's h1 as the title.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { title, reference, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.panel, className)} {...rest}>
      <h1 className={styles.title}>{title}</h1>
      {reference && <div className={styles.reference}>{reference}</div>}
      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
});
