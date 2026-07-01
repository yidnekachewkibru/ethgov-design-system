import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { CheckIcon, InfoIcon, WarningIcon, ErrorIcon, SearchIcon, ChevronRightIcon } from './icons';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', color: 'var(--ethds-color-primary)' }}>
      <Icon label="Check">{CheckIcon}</Icon>
      <Icon label="Info">{InfoIcon}</Icon>
      <Icon label="Warning">{WarningIcon}</Icon>
      <Icon label="Error">{ErrorIcon}</Icon>
      <Icon label="Search">{SearchIcon}</Icon>
      <Icon label="Next">{ChevronRightIcon}</Icon>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon size="sm" label="Small">{SearchIcon}</Icon>
      <Icon size="md" label="Medium">{SearchIcon}</Icon>
      <Icon size="lg" label="Large">{SearchIcon}</Icon>
      <Icon size="xl" label="Extra large">{SearchIcon}</Icon>
    </div>
  ),
};
