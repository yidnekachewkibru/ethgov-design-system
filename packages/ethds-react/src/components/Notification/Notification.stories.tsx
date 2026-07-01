import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  args: {
    children: 'Your changes have been saved.',
    iconLabel: 'Success',
    variant: 'success',
    dismissLabel: 'Dismiss',
  },
};
export default meta;

type Story = StoryObj<typeof Notification>;

export const Success: Story = {};
export const Info: Story = {
  args: { variant: 'info', iconLabel: 'Information', children: 'A new service is available.' },
};
export const Warning: Story = {
  args: { variant: 'warning', iconLabel: 'Warning', title: 'Heads up', children: 'Maintenance tonight 22:00–23:00 EAT.' },
};
export const ErrorNotification: Story = {
  args: { variant: 'error', iconLabel: 'Error', children: 'Could not connect. Retrying…' },
};
