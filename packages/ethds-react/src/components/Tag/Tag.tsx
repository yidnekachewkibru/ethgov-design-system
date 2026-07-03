import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './Tag.module.css';

export type TagVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. The text carries the meaning; colour reinforces it. */
  variant?: TagVariant;
}

/**
 * Tag — a small status label ("Approved", "Pending", "Rejected").
 *
 * Meaning is carried by the translated text; the tint is reinforcement
 * only (all pairings verified WCAG 2.2 AA). Use in status tracking,
 * tables, and dashboards.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'neutral', className, ...rest },
  ref,
) {
  return <span ref={ref} className={cx(styles.tag, styles[variant], className)} {...rest} />;
});
