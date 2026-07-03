import type { Meta, StoryObj } from '@storybook/react';
import { OtpForm } from './OtpForm';

const meta: Meta<typeof OtpForm> = {
  title: 'Patterns/OtpVerification',
  component: OtpForm,
  args: {
    maskedTo: '09•• ••• •67',
    onVerify: async () => {},
    onResend: () => {},
    changeNumberHref: '#change',
  },
};
export default meta;

type Story = StoryObj<typeof OtpForm>;

export const Default: Story = {};

export const ResendCooldown: Story = {
  args: { resendCooldownSeconds: 28 },
};
