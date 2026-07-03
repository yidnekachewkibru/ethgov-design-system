import type { Meta, StoryObj } from '@storybook/react';
import { CharacterCount } from './CharacterCount';

const meta: Meta<typeof CharacterCount> = {
  title: 'Components/CharacterCount',
  component: CharacterCount,
  args: { label: 'Describe your complaint', maxLength: 200, hint: 'Keep it brief and specific.' },
};
export default meta;

type Story = StoryObj<typeof CharacterCount>;

export const Default: Story = {};

export const NearLimit: Story = {
  args: { maxLength: 40, defaultValue: 'This complaint is nearly at the limit no' },
};
