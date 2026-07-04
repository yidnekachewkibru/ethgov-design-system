import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Patterns/Registration',
  component: RegisterForm,
  args: { onSubmit: async () => {} },
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};
