import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'Approved', variant: 'success' },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag variant="neutral">Draft</Tag>
      <Tag variant="info">In review</Tag>
      <Tag variant="success">Approved</Tag>
      <Tag variant="warning">Action needed</Tag>
      <Tag variant="error">Rejected</Tag>
    </div>
  ),
};
