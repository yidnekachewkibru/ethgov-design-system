import type { Meta, StoryObj } from '@storybook/react';
import { AgencyHomepage } from './AgencyHomepage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof AgencyHomepage> = {
  title: 'Templates/AgencyHomepage',
  component: AgencyHomepage,
  parameters: { layout: 'fullscreen' },
  args: {
    agencyName: 'Immigration Service',
    intro: 'Apply for and manage passports and visas.',
    languages,
    locale: 'en',
    onLocale: () => {},
    primaryTasks: [
      { href: '/apply-passport', label: 'Apply for a passport' },
      { href: '/check-status', label: 'Check your application' },
    ],
    services: [{ href: '/all', label: 'All immigration services' }],
    notices: [{ href: '/notices/1', label: 'Office closed for Ethiopian New Year' }],
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof AgencyHomepage>;

export const Default: Story = {};
