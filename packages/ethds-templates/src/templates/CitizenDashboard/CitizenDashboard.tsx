import type { ReactNode } from 'react';
import { Heading, Notification, Table, Link, Button } from '@ethds/react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import styles from './CitizenDashboard.module.css';

export interface DashboardApplication {
  id: string;
  href: string;
  service: ReactNode;
  /** Plain-language status (e.g. "Approved", "Pending") — see Status Tracking. */
  status: ReactNode;
}

export interface DashboardLinkItem {
  href: string;
  label: ReactNode;
}

export interface CitizenDashboardLabels {
  /** `{name}` is substituted with the citizen's name. */
  greeting: (name: ReactNode) => ReactNode;
  actionNeededTitle: string;
  actionNeededMessage: string;
  applicationsHeading: ReactNode;
  applicationsCaption: string;
  referenceHeader: string;
  serviceHeader: string;
  statusHeader: string;
  noApplicationsMessage: ReactNode;
  appointmentsHeading: ReactNode;
  noAppointmentsMessage: ReactNode;
  paymentsHeading: ReactNode;
  noPaymentsMessage: ReactNode;
  startNewLabel: string;
}

export const DEFAULT_CITIZEN_DASHBOARD_LABELS: CitizenDashboardLabels = {
  greeting: (name) => <>Welcome back, {name}</>,
  actionNeededTitle: 'Action needed',
  actionNeededMessage: 'You have 1 item that needs your attention.',
  applicationsHeading: 'Your applications',
  applicationsCaption: 'Your applications',
  referenceHeader: 'Reference',
  serviceHeader: 'Service',
  statusHeader: 'Status',
  noApplicationsMessage: 'You have no applications yet.',
  appointmentsHeading: 'Upcoming appointments',
  noAppointmentsMessage: 'You have no upcoming appointments.',
  paymentsHeading: 'Recent payments',
  noPaymentsMessage: 'You have no recent payments.',
  startNewLabel: 'Start a new application',
};

export interface CitizenDashboardProps {
  name: ReactNode;
  /** Whether to surface the action-needed notification (checked before the citizen's records). */
  actionNeeded: boolean;
  applications: DashboardApplication[];
  appointments: DashboardLinkItem[];
  payments: DashboardLinkItem[];
  onStartNew: () => void;
  serviceName?: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<CitizenDashboardLabels>;
}

/**
 * CitizenDashboard — the Citizen Dashboard template
 * (docs/../ethds-templates/templates/citizen-dashboard.md).
 *
 * Surfaces anything needing the citizen's action first (a live-region
 * `Notification`), then their records. The applications table links each
 * row to its Status Tracking detail; status is plain language, never a
 * workflow code.
 */
export function CitizenDashboard({
  name,
  actionNeeded,
  applications,
  appointments,
  payments,
  onStartNew,
  serviceName = 'Government of Ethiopia',
  nav,
  languages,
  locale,
  onLocale,
  footerGroups,
  copyright,
  labels,
}: CitizenDashboardProps) {
  const l = { ...DEFAULT_CITIZEN_DASHBOARD_LABELS, ...labels };
  return (
    <PageChrome
      serviceName={serviceName}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      footerGroups={footerGroups}
      copyright={copyright}
    >
      <Heading level={1}>{l.greeting(name)}</Heading>
      {actionNeeded && (
        <Notification variant="warning" iconLabel={l.actionNeededTitle} title={l.actionNeededTitle}>
          {l.actionNeededMessage}
        </Notification>
      )}
      <Heading level={2}>{l.applicationsHeading}</Heading>
      <Table
        caption={l.applicationsCaption}
        columns={[
          { header: l.referenceHeader, cell: (a: DashboardApplication) => <Link href={a.href}>{a.id}</Link> },
          { header: l.serviceHeader, cell: (a: DashboardApplication) => a.service },
          { header: l.statusHeader, cell: (a: DashboardApplication) => a.status },
        ]}
        rows={applications}
        rowKey={(a) => a.id}
        emptyMessage={l.noApplicationsMessage}
      />
      <div className={styles.grid}>
        <div>
          <Heading level={2} visualLevel={3}>
            {l.appointmentsHeading}
          </Heading>
          {appointments.length === 0 ? (
            <p>{l.noAppointmentsMessage}</p>
          ) : (
            <ul className={styles.list}>
              {appointments.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Heading level={2} visualLevel={3}>
            {l.paymentsHeading}
          </Heading>
          {payments.length === 0 ? (
            <p>{l.noPaymentsMessage}</p>
          ) : (
            <ul className={styles.list}>
              {payments.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Button variant="primary" onClick={onStartNew}>
        {l.startNewLabel}
      </Button>
    </PageChrome>
  );
}
