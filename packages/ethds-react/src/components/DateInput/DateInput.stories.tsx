import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  args: { legend: 'Date of birth', hint: 'For example, 1 Meskerem 2015' },
};
export default meta;

type Story = StoryObj<typeof DateInput>;

export const Ethiopian: Story = {};

export const Gregorian: Story = {
  args: {
    legend: 'Date of birth',
    calendar: 'gregorian',
    hint: 'For example, 11 9 2026',
  },
};

export const WithError: Story = {
  args: { error: 'Date of birth must include a day, month and year' },
};
