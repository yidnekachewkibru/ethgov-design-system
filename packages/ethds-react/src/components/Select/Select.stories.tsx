import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const regions = [
  { value: 'aa', label: 'Afar' },
  { value: 'am', label: 'Amhara' },
  { value: 'or', label: 'Oromia' },
  { value: 'so', label: 'Somali' },
  { value: 'ti', label: 'Tigray' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Region', options: regions, placeholder: 'Choose a region' },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Your region of residence', required: true } };
export const WithError: Story = { args: { error: 'Please select your region' } };
export const Disabled: Story = { args: { disabled: true } };
