import type { Meta, StoryObj } from '@storybook/react';
import { PasswordResetFlow } from './PasswordResetFlow';

const meta: Meta<typeof PasswordResetFlow> = {
  title: 'Patterns/PasswordReset',
  component: PasswordResetFlow,
  args: {
    onRequestReset: async () => {},
    onVerifyCode: async () => {},
    onSubmit: async () => ({ reference: 'n/a' }),
  },
};
export default meta;

type Story = StoryObj<typeof PasswordResetFlow>;

export const Default: Story = {};

export const WrongCode: Story = {
  args: {
    onVerifyCode: async () => {
      throw new Error('invalid code');
    },
  },
};
