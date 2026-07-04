import type { Meta, StoryObj } from '@storybook/react';
import { ForbiddenPage } from './ForbiddenPage';

const meta: Meta<typeof ForbiddenPage> = {
  title: 'Templates/Error/403',
  component: ForbiddenPage,
  args: {
    serviceName: 'Government of Ethiopia',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    onLogin: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof ForbiddenPage>;

export const Default: Story = {};
