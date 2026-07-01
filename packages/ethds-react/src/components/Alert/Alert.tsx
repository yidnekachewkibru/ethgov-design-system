import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { InfoIcon, CheckIcon, WarningIcon, ErrorIcon } from '../Icon/icons';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  /** Optional heading for the alert (translatable). */
  title?: ReactNode;
  /**
   * Accessible name for the status icon, in the active language
   * (e.g. "Error"). Colour is never the only signal — the icon is labelled
   * and the text carries the meaning.
   */
  iconLabel?: string;
  children: ReactNode;
}

const ICONS: Record<AlertVariant, ReactNode> = {
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

/**
 * Alert — a prominent, semantic message.
 *
 * `error` uses `role="alert"` (assertive) so it is announced immediately;
 * the others use `role="status"` (polite). Meaning is carried by the text
 * and a labelled icon, never by colour alone.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, iconLabel, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={variant === 'error' ? 'alert' : 'status'}
      className={cx(styles.alert, styles[variant], className)}
      {...rest}
    >
      <span className={styles.icon}>
        <Icon label={iconLabel} aria-hidden={iconLabel ? undefined : true}>
          {ICONS[variant]}
        </Icon>
      </span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
});
