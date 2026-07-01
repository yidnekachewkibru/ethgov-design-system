import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  args: { label: 'Describe your complaint' },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Up to 500 characters', required: true } };
export const WithError: Story = { args: { error: 'This field is required' } };
