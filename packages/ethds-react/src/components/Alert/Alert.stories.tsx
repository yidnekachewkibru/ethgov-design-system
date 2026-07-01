import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: { children: 'Your application has been received.', iconLabel: 'Information' },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = { args: { variant: 'info', iconLabel: 'Information' } };
export const Success: Story = {
  args: { variant: 'success', iconLabel: 'Success', title: 'Submitted', children: 'Reference: ETH-2026-00412.' },
};
export const Warning: Story = {
  args: { variant: 'warning', iconLabel: 'Warning', children: 'Offices close at 12:00 on holidays.' },
};
export const ErrorAlert: Story = {
  args: { variant: 'error', iconLabel: 'Error', title: 'Payment failed', children: 'No amount was charged. Please try again.' },
};
