import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    legend: 'How should we contact you?',
    hint: 'Select all that apply.',
    options: [
      { value: 'sms', label: 'SMS' },
      { value: 'email', label: 'Email' },
      { value: 'post', label: 'Post', hint: 'Delivered to your P.O. Box' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {};
export const Tile: Story = { args: { tile: true } };
export const WithError: Story = { args: { error: 'Choose at least one contact method' } };
