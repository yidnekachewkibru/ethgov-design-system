import type { Meta, StoryObj } from '@storybook/react';
import { SearchResultsPage } from './SearchResultsPage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof SearchResultsPage> = {
  title: 'Templates/SearchResultsPage',
  component: SearchResultsPage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Government of Ethiopia',
    languages,
    locale: 'en',
    onLocale: () => {},
    query: 'passport',
    page: 1,
    onPage: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof SearchResultsPage>;

export const WithResults: Story = {
  args: {
    results: [
      {
        href: '/apply-passport',
        title: 'Apply for a passport',
        snippet: 'Immigration Service — start your application',
      },
      {
        href: '/renew-passport',
        title: 'Renew a passport',
        snippet: 'Immigration Service — for existing holders',
      },
    ],
    totalPages: 4,
  },
};

export const NoResults: Story = {
  args: { query: 'zzz', results: [], totalPages: 1 },
};
