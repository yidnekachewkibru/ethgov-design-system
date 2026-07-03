import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  args: { label: 'Upload your Fayda ID scan', hint: 'JPG, PNG or PDF, up to 5MB' },
};
export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Choose a file to upload' },
};

export const Multiple: Story = {
  args: { multiple: true, hint: 'You can select more than one file' },
};
