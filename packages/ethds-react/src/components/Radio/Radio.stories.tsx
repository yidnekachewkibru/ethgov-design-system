import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    legend: 'Preferred language',
    options: [
      { value: 'am', label: 'Amharic (አማርኛ)' },
      { value: 'om', label: 'Afaan Oromoo' },
      { value: 'ti', label: 'Tigrinya (ትግርኛ)' },
      { value: 'so', label: 'Somali' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
export const WithHint: Story = {
  args: { hint: 'This is used for all correspondence.', required: true },
};
export const WithError: Story = { args: { error: 'Please choose a language' } };
export const WithOptionHints: Story = {
  args: {
    legend: 'Delivery method',
    options: [
      { value: 'pickup', label: 'Pick up', hint: 'Collect from your kebele office' },
      { value: 'post', label: 'Post', hint: 'Delivered to your P.O. Box' },
    ],
  },
};
