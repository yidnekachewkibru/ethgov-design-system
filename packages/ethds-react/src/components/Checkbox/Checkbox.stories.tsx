import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'I agree to the terms of service' },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'You can withdraw consent at any time' } };
export const WithError: Story = { args: { error: 'You must accept to continue' } };
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
