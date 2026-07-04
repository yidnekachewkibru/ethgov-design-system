import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Patterns/Login',
  component: LoginForm,
  args: {
    forgotPasswordHref: '#reset',
    registerHref: '#register',
    onSubmit: async () => {},
    onOtpLogin: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const WithoutOtpOption: Story = {
  args: { onOtpLogin: undefined },
};

export const FailedLogin: Story = {
  args: {
    onSubmit: async () => {
      throw new Error('invalid credentials');
    },
  },
};
