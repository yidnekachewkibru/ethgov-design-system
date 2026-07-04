import type { ReactNode } from 'react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { HomepageLayout } from '../_internal/HomepageLayout';
import type { HomepageLinkItem } from '../_internal/HomepageLayout';

export interface NationalPortalHomepageLabels {
  heading: ReactNode;
  searchLabel: string;
  searchSubmitLabel: string;
  popularServicesHeading: ReactNode;
  categoriesHeading: ReactNode;
  newsHeading: ReactNode;
}

export const DEFAULT_NATIONAL_PORTAL_LABELS: NationalPortalHomepageLabels = {
  heading: 'Government services, in one place',
  searchLabel: 'Search government services',
  searchSubmitLabel: 'Search',
  popularServicesHeading: 'Popular services',
  categoriesHeading: 'Browse by category',
  newsHeading: 'Latest news',
};

export interface NationalPortalHomepageProps {
  serviceName?: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  onSearch?: (query: string) => void;
  /** The genuinely most-used services, named in the citizen's own words. */
  popularServices: HomepageLinkItem[];
  categories: HomepageLinkItem[];
  news: HomepageLinkItem[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<NationalPortalHomepageLabels>;
}

/**
 * NationalPortalHomepage — the National Portal Homepage template
 * (docs/../ethds-templates/templates/national-portal-homepage.md).
 *
 * Leads with search and the most-used services (start with citizen
 * needs), not an org chart; categories help browsing when a citizen
 * doesn't know the exact service name.
 */
export function NationalPortalHomepage({
  serviceName = 'Government of Ethiopia',
  nav,
  languages,
  locale,
  onLocale,
  onSearch,
  popularServices,
  categories,
  news,
  footerGroups,
  copyright,
  labels,
}: NationalPortalHomepageProps) {
  const l = { ...DEFAULT_NATIONAL_PORTAL_LABELS, ...labels };
  return (
    <HomepageLayout
      serviceName={serviceName}
      homeLabel={`${serviceName} — home`}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      heading={l.heading}
      search={{ label: l.searchLabel, submitLabel: l.searchSubmitLabel, onSearch }}
      sections={[
        { heading: l.popularServicesHeading, items: popularServices, variant: 'cards' },
        { heading: l.categoriesHeading, items: categories, variant: 'list' },
        { heading: l.newsHeading, items: news, variant: 'list' },
      ]}
      footerGroups={footerGroups}
      copyright={copyright}
    />
  );
}
