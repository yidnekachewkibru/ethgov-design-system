import type { Meta, StoryObj } from '@storybook/react';
import { CitizenDashboard } from './CitizenDashboard';

const meta: Meta<typeof CitizenDashboard> = {
  title: 'Templates/CitizenDashboard',
  component: CitizenDashboard,
  parameters: { layout: 'fullscreen' },
  args: {
    name: 'Abebe',
    applications: [
      { id: 'ETH-2026-0041', href: '/apps/ETH-2026-0041', service: 'Passport', status: 'Approved' },
      { id: 'ETH-2026-0042', href: '/apps/ETH-2026-0042', service: 'Business permit', status: 'Pending' },
    ],
    appointments: [{ href: '/appointments/1', label: 'Bole office, Meskerem 5, 2019 EC' }],
    payments: [{ href: '/receipts/1', label: 'ETB 350.00 receipt' }],
    onStartNew: () => {},
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof CitizenDashboard>;

export const Default: Story = {
  args: { actionNeeded: true },
};

export const NoActionNeeded: Story = {
  args: { actionNeeded: false },
};

export const NewCitizen: Story = {
  args: { actionNeeded: false, applications: [], appointments: [], payments: [] },
};
