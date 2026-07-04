import type { ReactNode } from 'react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { HomepageLayout } from '../_internal/HomepageLayout';
import type { HomepageLinkItem } from '../_internal/HomepageLayout';

export interface AgencyHomepageLabels {
  homeCrumbLabel: string;
  primaryTasksHeading: ReactNode;
  servicesHeading: ReactNode;
  noticesHeading: ReactNode;
}

export const DEFAULT_AGENCY_LABELS: AgencyHomepageLabels = {
  homeCrumbLabel: 'Home',
  primaryTasksHeading: 'Primary tasks',
  servicesHeading: 'All services',
  noticesHeading: 'Notices',
};

export interface AgencyHomepageProps {
  agencyName: ReactNode;
  /** What the agency does, in one or two plain sentences. */
  intro: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** The agency's most-used, narrowly-scoped tasks, shown as prominent cards. */
  primaryTasks: HomepageLinkItem[];
  services: HomepageLinkItem[];
  notices: HomepageLinkItem[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<AgencyHomepageLabels>;
}

/**
 * AgencyHomepage — the Agency Homepage template
 * (docs/../ethds-templates/templates/agency-homepage.md).
 *
 * Structurally the same as {@link MinistryHomepage} (shared government
 * identity, agency named as the delivering body) but foregrounds the
 * agency's narrower, more task-focused services as prominent cards
 * rather than a plain list.
 */
export function AgencyHomepage({
  agencyName,
  intro,
  nav,
  languages,
  locale,
  onLocale,
  primaryTasks,
  services,
  notices,
  footerGroups,
  copyright,
  labels,
}: AgencyHomepageProps) {
  const l = { ...DEFAULT_AGENCY_LABELS, ...labels };
  return (
    <HomepageLayout
      serviceName={agencyName}
      homeLabel={`${agencyName} — home`}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      breadcrumb={[{ label: l.homeCrumbLabel, href: '/' }, { label: agencyName }]}
      heading={agencyName}
      intro={intro}
      sections={[
        { heading: l.primaryTasksHeading, items: primaryTasks, variant: 'cards' },
        { heading: l.servicesHeading, items: services, variant: 'list' },
        { heading: l.noticesHeading, items: notices, variant: 'list' },
      ]}
      footerGroups={footerGroups}
      copyright={copyright}
    />
  );
}
