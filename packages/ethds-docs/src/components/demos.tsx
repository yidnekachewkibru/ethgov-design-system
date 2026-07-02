/**
 * Stateful demo wrappers for component pages — for the few components
 * whose props are controlled (value/onChange). Everything else is used
 * directly in MDX.
 */
import { useState } from 'react';
import { Pagination, LanguageSwitcher, RadioGroup, Notification, Button } from '@ethds/react';

const PAGE_LABELS = {
  nav: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (p: number, current: boolean) =>
    current ? `Page ${p}, current page` : `Go to page ${p}`,
};

export function PaginationDemo({ totalPages = 12 }: { totalPages?: number }) {
  const [page, setPage] = useState(6);
  return (
    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} labels={PAGE_LABELS} />
  );
}

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ' },
  { code: 'so', label: 'Soomaali' },
  { code: 'aa', label: 'Qafar' },
];

export function LanguageSwitcherDemo() {
  const [locale, setLocale] = useState('en');
  return (
    <LanguageSwitcher label="Choose language" languages={LANGS} value={locale} onChange={setLocale} />
  );
}

export function RadioGroupControlledDemo() {
  const [value, setValue] = useState('am');
  return (
    <RadioGroup
      legend="Preferred language"
      hint="Used for all correspondence."
      value={value}
      onChange={setValue}
      options={[
        { value: 'am', label: 'Amharic (አማርኛ)' },
        { value: 'om', label: 'Afaan Oromoo' },
        { value: 'ti', label: 'Tigrinya (ትግርኛ)' },
      ]}
    />
  );
}

export function NotificationDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <Button variant="secondary" onClick={() => setVisible(true)}>
        Show the notification again
      </Button>
    );
  }
  return (
    <Notification
      variant="success"
      iconLabel="Success"
      title="Saved"
      dismissLabel="Dismiss"
      onDismiss={() => setVisible(false)}
    >
      Your changes have been saved.
    </Notification>
  );
}
