import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Heading, Link, Breadcrumb, TextInput, TextArea, Button, Alert, ErrorSummary } from '@ethds/react';
import type { BreadcrumbItem, ErrorSummaryItem, FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import styles from './ContactPage.module.css';

export interface ContactMethod {
  /** `tel:...` or `mailto:...`. */
  href: string;
  /** The visible, formatted value (e.g. "+251 11 123 4567"). */
  label: string;
}

export interface ContactMessageData {
  name: string;
  phone: string;
  message: string;
}

export interface ContactPageLabels {
  heading: ReactNode;
  phoneLabel: string;
  emailLabel: string;
  hoursLabel: string;
  officeLabel: string;
  formHeading: ReactNode;
  errorSummaryTitle: string;
  nameLabel: string;
  phoneFieldLabel: string;
  messageLabel: string;
  submitLabel: string;
  genericErrorMessage: string;
  nameRequiredError: string;
  messageRequiredError: string;
}

export const DEFAULT_CONTACT_LABELS: ContactPageLabels = {
  heading: 'Contact us',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  hoursLabel: 'Hours',
  officeLabel: 'Office',
  formHeading: 'Send us a message',
  errorSummaryTitle: 'There is a problem',
  nameLabel: 'Your name',
  phoneFieldLabel: 'Phone',
  messageLabel: 'Message',
  submitLabel: 'Send message',
  genericErrorMessage: 'Something went wrong sending your message. Your answers have been kept — try again.',
  nameRequiredError: 'Enter your name.',
  messageRequiredError: 'Enter your message.',
};

export interface ContactPageProps {
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** e.g. Home ▸ Contact. */
  breadcrumb: BreadcrumbItem[];
  phone?: ContactMethod;
  email?: ContactMethod;
  /** e.g. "Monday–Friday, 08:30–17:00 EAT". */
  hours?: ReactNode;
  /** The office address, following Ethiopian conventions. */
  office?: ReactNode;
  onSend: (data: ContactMessageData) => Promise<void>;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<ContactPageLabels>;
}

/**
 * ContactPage — the Contact Page template
 * (docs/../ethds-templates/templates/contact-page.md).
 *
 * Leads with the fastest ways to get help (phone, office) before the
 * form; follows the same validation/error pattern as Complaint Submission
 * (ethds-patterns/patterns/complaint-submission.md) — field-level errors
 * plus a focusable error summary, and a failed send never clears the
 * written message. Placed consistently across services (WCAG 2.2
 * Consistent Help, SC 3.2.6).
 */
export function ContactPage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  breadcrumb,
  phone,
  email,
  hours,
  office,
  onSend,
  footerGroups,
  copyright,
  labels,
}: ContactPageProps) {
  const l = { ...DEFAULT_CONTACT_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const phoneValue = String(data.get('phone') ?? '');

    const next: ErrorSummaryItem[] = [];
    if (!name) next.push({ message: l.nameRequiredError, href: '#contact-name' });
    if (!message) next.push({ message: l.messageRequiredError, href: '#contact-message' });
    setErrors(next);
    if (next.length > 0) return;

    setSendError(null);
    setSending(true);
    try {
      await onSend({ name, phone: phoneValue, message });
    } catch {
      setSendError(l.genericErrorMessage);
    } finally {
      setSending(false);
    }
  }

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
      <Heading level={1}>{l.heading}</Heading>
      <dl className={styles.details}>
        {phone && (
          <>
            <dt>{l.phoneLabel}</dt>
            <dd>
              <Link href={phone.href}>{phone.label}</Link>
            </dd>
          </>
        )}
        {email && (
          <>
            <dt>{l.emailLabel}</dt>
            <dd>
              <Link href={email.href}>{email.label}</Link>
            </dd>
          </>
        )}
        {hours && (
          <>
            <dt>{l.hoursLabel}</dt>
            <dd>{hours}</dd>
          </>
        )}
        {office && (
          <>
            <dt>{l.officeLabel}</dt>
            <dd>{office}</dd>
          </>
        )}
      </dl>
      <Heading level={2}>{l.formHeading}</Heading>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
        {sendError && (
          <Alert variant="error" iconLabel="Error">
            {sendError}
          </Alert>
        )}
        <TextInput id="contact-name" label={l.nameLabel} name="name" autoComplete="name" required />
        <TextInput
          id="contact-phone"
          label={l.phoneFieldLabel}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
        <TextArea id="contact-message" label={l.messageLabel} name="message" rows={5} required />
        <Button type="submit" variant="primary" disabled={sending}>
          {l.submitLabel}
        </Button>
      </form>
    </PageChrome>
  );
}
