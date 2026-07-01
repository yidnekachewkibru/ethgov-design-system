import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

const nav = [
  { label: 'Home', href: '#', current: true },
  { label: 'Services', href: '#' },
  { label: 'News', href: '#' },
  { label: 'Contact', href: '#' },
];

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  args: {
    serviceName: 'Federal Revenue Service',
    homeLabel: 'Federal Revenue Service — home',
    nav,
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithLanguageSwitcher: Story = {
  args: {
    actions: (
      <LanguageSwitcher
        label="Language"
        value="en"
        onChange={() => {}}
        languages={[
          { code: 'en', label: 'English' },
          { code: 'am', label: 'አማርኛ' },
          { code: 'om', label: 'Afaan Oromoo' },
        ]}
      />
    ),
  },
};
