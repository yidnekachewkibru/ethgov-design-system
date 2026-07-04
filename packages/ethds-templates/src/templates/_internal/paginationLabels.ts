import type { PaginationLabels } from '@ethds/react';

/** Shared default `Pagination` labels for the templates that paginate a list. */
export const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  nav: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (page, isCurrent) => (isCurrent ? `Page ${page}, current` : `Go to page ${page}`),
};
