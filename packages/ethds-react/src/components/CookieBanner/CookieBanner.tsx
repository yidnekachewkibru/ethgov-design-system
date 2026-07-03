import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import styles from './CookieBanner.module.css';

export interface CookieBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The banner heading (translatable), e.g. "Cookies on this service". */
  title: ReactNode;
  /** The explanatory message. */
  children: ReactNode;
  /** Accept-cookies button text (translatable). */
  acceptLabel: string;
  /** Reject-cookies button text (translatable). */
  rejectLabel: string;
  /** Link to the full cookies policy, e.g. "View cookies". */
  viewCookiesLabel?: string;
  onAccept: () => void;
  onReject: () => void;
  onViewCookies?: () => void;
  /** Move focus to the banner when it appears (default true). */
  autoFocus?: boolean;
}

/**
 * CookieBanner — a consent banner requiring an explicit accept or reject.
 *
 * A focusable `role="region"` announced landmark so it's discoverable by
 * assistive tech even though it isn't the main content; receives focus on
 * mount so keyboard/screen-reader users meet it first, per GDPR-style
 * consent requirements (no pre-ticked or colour-only consent).
 */
export const CookieBanner = forwardRef<HTMLDivElement, CookieBannerProps>(function CookieBanner(
  {
    title,
    children,
    acceptLabel,
    rejectLabel,
    viewCookiesLabel,
    onAccept,
    onReject,
    onViewCookies,
    autoFocus = true,
    className,
    ...rest
  },
  ref,
) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  useEffect(() => {
    if (autoFocus) localRef.current?.focus();
  }, [autoFocus]);

  return (
    <div
      ref={localRef}
      role="region"
      aria-label={typeof title === 'string' ? title : undefined}
      tabIndex={-1}
      className={cx(styles.banner, className)}
      {...rest}
    >
      <p className={styles.title}>{title}</p>
      <div className={styles.message}>{children}</div>
      <div className={styles.actions}>
        <Button variant="primary" size="sm" onClick={onAccept}>
          {acceptLabel}
        </Button>
        <Button variant="secondary" size="sm" onClick={onReject}>
          {rejectLabel}
        </Button>
        {viewCookiesLabel && onViewCookies && (
          <button type="button" className={styles.viewLink} onClick={onViewCookies}>
            {viewCookiesLabel}
          </button>
        )}
      </div>
    </div>
  );
});
