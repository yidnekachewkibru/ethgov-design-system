import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './StepIndicator.module.css';

export interface StepIndicatorProps extends HTMLAttributes<HTMLElement> {
  /** Step names in order (translatable), e.g. ["Applicant", "Details", "Review"]. */
  steps: string[];
  /** Current step, 1-based. */
  current: number;
  /** Accessible name for the landmark (translatable), e.g. "Progress". */
  label: string;
}

/**
 * StepIndicator — shows where the citizen is in a multi-step flow
 * ("Step 2 of 4"), replacing hand-rolled progress text.
 *
 * An ordered list inside a labelled nav; the current step carries
 * `aria-current="step"`. Completed/upcoming state is conveyed by order
 * and styling, with the current step explicit for assistive tech.
 */
export const StepIndicator = forwardRef<HTMLElement, StepIndicatorProps>(function StepIndicator(
  { steps, current, label, className, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={label} className={cx(styles.nav, className)} {...rest}>
      <ol className={styles.list}>
        {steps.map((name, i) => {
          const n = i + 1;
          const state = n < current ? 'complete' : n === current ? 'current' : 'upcoming';
          return (
            <li
              key={n}
              className={cx(styles.step, styles[state])}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <span className={styles.number} aria-hidden="true">
                {n}
              </span>
              <span className={styles.name}>{name}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
