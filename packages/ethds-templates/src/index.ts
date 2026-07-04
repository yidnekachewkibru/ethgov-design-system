// @ethds/templates — tested React compositions of the website templates
// documented in templates/*.md, built on @ethds/react and @ethds/patterns.

export { NotFoundPage, DEFAULT_NOT_FOUND_LABELS } from './templates/NotFoundPage';
export type { NotFoundPageProps, NotFoundPageLabels } from './templates/NotFoundPage';

export { ForbiddenPage, DEFAULT_FORBIDDEN_LABELS } from './templates/ForbiddenPage';
export type { ForbiddenPageProps, ForbiddenPageLabels } from './templates/ForbiddenPage';

export { ServerErrorPage, DEFAULT_SERVER_ERROR_LABELS } from './templates/ServerErrorPage';
export type { ServerErrorPageProps, ServerErrorPageLabels } from './templates/ServerErrorPage';

export {
  NationalPortalHomepage,
  DEFAULT_NATIONAL_PORTAL_LABELS,
} from './templates/NationalPortalHomepage';
export type {
  NationalPortalHomepageProps,
  NationalPortalHomepageLabels,
} from './templates/NationalPortalHomepage';

export { MinistryHomepage, DEFAULT_MINISTRY_LABELS } from './templates/MinistryHomepage';
export type { MinistryHomepageProps, MinistryHomepageLabels } from './templates/MinistryHomepage';

export { AgencyHomepage, DEFAULT_AGENCY_LABELS } from './templates/AgencyHomepage';
export type { AgencyHomepageProps, AgencyHomepageLabels } from './templates/AgencyHomepage';

export type { HomepageLinkItem, HomepageSection, HomepageSearchConfig } from './templates/_internal/HomepageLayout';
