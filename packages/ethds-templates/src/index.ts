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

export { ServiceLandingPage, DEFAULT_SERVICE_LANDING_LABELS } from './templates/ServiceLandingPage';
export type { ServiceLandingPageProps, ServiceLandingPageLabels } from './templates/ServiceLandingPage';

export { SearchResultsPage, DEFAULT_SEARCH_RESULTS_LABELS } from './templates/SearchResultsPage';
export type {
  SearchResultsPageProps,
  SearchResultsPageLabels,
  SearchResult,
} from './templates/SearchResultsPage';

export {
  NewsListingPage,
  DEFAULT_NEWS_LISTING_LABELS,
  NewsArticlePage,
  DEFAULT_NEWS_ARTICLE_LABELS,
} from './templates/NewsPage';
export type {
  NewsListingPageProps,
  NewsListingPageLabels,
  NewsListItem,
  NewsArticlePageProps,
  NewsArticlePageLabels,
} from './templates/NewsPage';

export { ContactPage, DEFAULT_CONTACT_LABELS } from './templates/ContactPage';
export type {
  ContactPageProps,
  ContactPageLabels,
  ContactMethod,
  ContactMessageData,
} from './templates/ContactPage';

export { CitizenDashboard, DEFAULT_CITIZEN_DASHBOARD_LABELS } from './templates/CitizenDashboard';
export type {
  CitizenDashboardProps,
  CitizenDashboardLabels,
  DashboardApplication,
  DashboardLinkItem,
} from './templates/CitizenDashboard';

export { ServiceApplicationPage } from './templates/ServiceApplicationPage';
export type { ServiceApplicationPageProps } from './templates/ServiceApplicationPage';
