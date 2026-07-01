import type { ReactNode } from 'react';

/**
 * A small set of starter icon shapes (24×24, stroke-based) for the
 * foundation batch. The full ETHDS icon set ships as `@ethds/icons`.
 * Each export is the inner SVG content to pass as `Icon` children.
 */

export const CheckIcon: ReactNode = <path d="M20 6 9 17l-5-5" />;

export const ChevronRightIcon: ReactNode = <path d="m9 18 6-6-6-6" />;

export const InfoIcon: ReactNode = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </>
);

export const WarningIcon: ReactNode = (
  <>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </>
);

export const ErrorIcon: ReactNode = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-6 6M9 9l6 6" />
  </>
);

export const SearchIcon: ReactNode = (
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </>
);
