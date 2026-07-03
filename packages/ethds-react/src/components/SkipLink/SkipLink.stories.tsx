import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  args: { children: 'Skip to main content' },
};
export default meta;

type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: 80 }}>
      <SkipLink {...args} />
      <p>Press Tab — the skip link appears when focused.</p>
    </div>
  ),
};
