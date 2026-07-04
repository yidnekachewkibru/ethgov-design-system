import type { Meta, StoryObj } from '@storybook/react';
import { ContactPage } from './ContactPage';

const meta: Meta<typeof ContactPage> = {
  title: 'Templates/ContactPage',
  component: ContactPage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Ministry of Revenue',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Contact' }],
    phone: { href: 'tel:+251111234567', label: '+251 11 123 4567' },
    email: { href: 'mailto:info@revenue.gov.et', label: 'info@revenue.gov.et' },
    hours: 'Monday–Friday, 08:30–17:00 EAT',
    office: 'Addis Ababa, Kirkos sub-city',
    onSend: async () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof ContactPage>;

export const Default: Story = {};

export const SendFailed: Story = {
  args: {
    onSend: async () => {
      throw new Error('network error');
    },
  },
};
