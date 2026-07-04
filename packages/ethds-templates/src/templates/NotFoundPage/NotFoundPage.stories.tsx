import type { Meta, StoryObj } from '@storybook/react';
import { NotFoundPage } from './NotFoundPage';

const meta: Meta<typeof NotFoundPage> = {
  title: 'Templates/Error/404',
  component: NotFoundPage,
  args: {
    serviceName: 'Government of Ethiopia',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {};
