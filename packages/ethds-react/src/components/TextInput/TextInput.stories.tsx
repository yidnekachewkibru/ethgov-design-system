import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: { label: 'Given name' },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithHint: Story = {
  args: { label: 'Phone number', hint: 'Format: 09xx xxx xxx' },
};
export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'not-an-email', error: 'Enter a valid email address' },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Locked' } };
