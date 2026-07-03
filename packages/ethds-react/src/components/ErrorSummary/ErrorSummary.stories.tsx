import type { Meta, StoryObj } from '@storybook/react';
import { ErrorSummary } from './ErrorSummary';

const meta: Meta<typeof ErrorSummary> = {
  title: 'Components/ErrorSummary',
  component: ErrorSummary,
  args: {
    title: 'There is a problem',
    autoFocus: false,
    errors: [
      { message: 'Enter your given name', href: '#given-name' },
      { message: "Enter your father's name", href: '#fathers-name' },
      { message: 'Choose a region', href: '#region' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof ErrorSummary>;

export const Default: Story = {};
