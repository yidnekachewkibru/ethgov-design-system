import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` is the main call to action. */
  variant?: ButtonVariant;
  /** Control size. Affects padding and height, never below the min target size. */
  size?: ButtonSize;
  /** Stretch to the full width of the container. */
  fullWidth?: boolean;
}

/**
 * Button — the primary interactive control.
 *
 * Renders a native `<button>` (keyboard- and screen-reader-ready by
 * default). The accessible name comes from its children, so callers pass
 * translated text; icon-only buttons must supply an `aria-label`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    />
  );
});
