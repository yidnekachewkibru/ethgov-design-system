import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  args: {
    groups: [
      {
        title: 'Services',
        links: [
          { label: 'All services', href: '#' },
          { label: 'Track an application', href: '#' },
          { label: 'Pay a fee', href: '#' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'Contact us', href: '#' },
          { label: 'Accessibility statement', href: '#' },
          { label: 'Privacy', href: '#' },
        ],
      },
    ],
    copyright: '© 2026 Government of Ethiopia. Built with ETHDS. MIT licensed.',
  },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
