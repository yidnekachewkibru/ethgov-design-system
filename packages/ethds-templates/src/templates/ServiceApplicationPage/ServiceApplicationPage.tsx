import type { ReactNode } from 'react';
import { Breadcrumb } from '@ethds/react';
import type {
  BreadcrumbItem,
  FooterLinkGroup,
  HeaderNavItem,
  LanguageOption,
  RadioOption,
  SelectOption,
} from '@ethds/react';
import { ApplicationSubmissionFlow } from '@ethds/patterns';
import type { ApplicationData, ApplicationSubmissionFlowLabels, SubmitResult } from '@ethds/patterns';
import { PageChrome } from '../_internal/PageChrome';

export interface ServiceApplicationPageProps {
  /** Organisation identity shown in the Header (the delivering ministry/agency). */
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** e.g. Home ▸ Services ▸ Apply for a passport. */
  breadcrumb: BreadcrumbItem[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  /** Passed straight through to the Application Submission pattern. */
  initialData?: Partial<ApplicationData>;
  onSaveDraft?: (data: Partial<ApplicationData>) => void | Promise<void>;
  onSubmit: (data: ApplicationData) => Promise<SubmitResult>;
  regions?: SelectOption[];
  activities?: RadioOption[];
  labels?: Partial<ApplicationSubmissionFlowLabels>;
}

/**
 * ServiceApplicationPage — the Service Application Page template
 * (docs/../ethds-templates/templates/service-application-page.md).
 *
 * Hosts the [Application Submission pattern](../../../../ethds-patterns/patterns/application-submission.md)
 * inside the standard page frame. Each step of the flow renders its own
 * `<h1>`, so the page itself adds no competing heading — one `<h1>` per
 * screen is preserved across the whole application.
 */
export function ServiceApplicationPage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  breadcrumb,
  footerGroups,
  copyright,
  initialData,
  onSaveDraft,
  onSubmit,
  regions,
  activities,
  labels,
}: ServiceApplicationPageProps) {
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
      <Breadcrumb items={breadcrumb} />
      <ApplicationSubmissionFlow
        initialData={initialData}
        onSaveDraft={onSaveDraft}
        onSubmit={onSubmit}
        regions={regions}
        activities={activities}
        labels={labels}
      />
    </PageChrome>
  );
}
