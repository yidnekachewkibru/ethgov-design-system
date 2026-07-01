import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { InfoIcon, CheckIcon, WarningIcon, ErrorIcon } from '../Icon/icons';
import styles from './Notification.module.css';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: NotificationVariant;
  title?: ReactNode;
  /** Accessible name for the status icon (translatable), e.g. "Success". */
  iconLabel?: string;
  /**
   * When set, a dismiss button is shown. The value is its accessible label
   * (translatable), e.g. "Dismiss".
   */
  dismissLabel?: string;
  onDismiss?: () => void;
  children: ReactNode;
}

const ICONS: Record<NotificationVariant, ReactNode> = {
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

/**
 * Notification — a transient, optionally dismissible message.
 *
 * Wrapped in a live region so it is announced when it appears (`alert` for
 * errors, `status` otherwise). Meaning is carried by text + a labelled
 * icon, never colour alone. All text (including the dismiss label) is
 * passed in and translatable.
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  function Notification(
    { variant = 'info', title, iconLabel, dismissLabel, onDismiss, className, children, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role={variant === 'error' ? 'alert' : 'status'}
        className={cx(styles.notification, styles[variant], className)}
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
        {dismissLabel && (
          <button type="button" className={styles.dismiss} aria-label={dismissLabel} onClick={onDismiss}>
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
    );
  },
);
