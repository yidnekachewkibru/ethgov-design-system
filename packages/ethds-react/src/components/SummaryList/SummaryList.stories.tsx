import type { Meta, StoryObj } from '@storybook/react';
import { SummaryList } from './SummaryList';

const meta: Meta<typeof SummaryList> = {
  title: 'Components/SummaryList',
  component: SummaryList,
  args: {
    rows: [
      { key: 'Given name', value: 'Abebe', action: { label: 'Change', href: '#', visuallyHiddenText: 'given name' } },
      { key: "Father's name", value: 'Kebede', action: { label: 'Change', href: '#', visuallyHiddenText: "father's name" } },
      { key: 'Phone', value: '0911 234 567', action: { label: 'Change', href: '#', visuallyHiddenText: 'phone' } },
      { key: 'Region', value: 'Oromia' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof SummaryList>;

export const CheckYourAnswers: Story = {};
