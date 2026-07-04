import type { Meta, StoryObj } from '@storybook/react';
import { NewsListingPage } from './NewsListingPage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof NewsListingPage> = {
  title: 'Templates/NewsPage/Listing',
  component: NewsListingPage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Government of Ethiopia',
    languages,
    locale: 'en',
    onLocale: () => {},
    items: [
      {
        href: '/news/1',
        title: 'New tax filing deadline',
        date: 'Meskerem 9, 2019 EC',
        summary: 'The filing deadline has been extended by two weeks.',
      },
      {
        href: '/news/2',
        title: 'Office hours change',
        date: 'Meskerem 12, 2019 EC',
        summary: 'Offices will open an hour later starting next week.',
      },
    ],
    page: 1,
    totalPages: 3,
    onPage: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof NewsListingPage>;

export const Listing: Story = {};
