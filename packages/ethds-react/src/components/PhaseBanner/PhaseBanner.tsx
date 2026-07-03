import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Tag } from '../Tag/Tag';
import styles from './PhaseBanner.module.css';

export type PhaseBannerPhase = 'alpha' | 'beta';

export interface PhaseBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** The service's current development phase. */
  phase: PhaseBannerPhase;
  /** The phase tag text (translatable), e.g. "Alpha" / "Beta". */
  phaseLabel: string;
  /** The message after the tag, e.g. "This is a new service — …". */
  children: ReactNode;
}

/**
 * PhaseBanner — flags a service still in alpha or beta.
 *
 * Sits directly under the header on every page of the service. The tag
 * carries the phase name as text (not colour alone); the message usually
 * links to a feedback route.
 */
export const PhaseBanner = forwardRef<HTMLDivElement, PhaseBannerProps>(function PhaseBanner(
  { phase, phaseLabel, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.banner, className)} {...rest}>
      <Tag variant={phase === 'alpha' ? 'warning' : 'info'} className={styles.tag}>
        {phaseLabel}
      </Tag>
      <p className={styles.message}>{children}</p>
    </div>
  );
});
