import { forwardRef } from 'react';
import type { SVGProps, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Icon.module.css';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'title'> {
  /** The SVG path/shape content (24×24 viewBox, `currentColor` fills). */
  children: ReactNode;
  size?: IconSize;
  /**
   * Accessible label. When provided, the icon is exposed to assistive tech
   * with this name (role="img"). When omitted, the icon is decorative and
   * hidden from assistive tech (`aria-hidden`).
   */
  label?: string;
}

/**
 * Icon — an accessible SVG wrapper on a 24×24 grid.
 *
 * Decorative by default (hidden from screen readers). Pass `label` to make
 * a meaningful icon announced — the label should be in the active language.
 * Icons inherit `currentColor`, so they match surrounding text contrast.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { children, size = 'md', label, className, ...rest },
  ref,
) {
  const labelled = typeof label === 'string' && label.length > 0;
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={cx(styles.icon, styles[size], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable={false}
      {...rest}
    >
      {children}
    </svg>
  );
});
