import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: { children: 'Go to services', href: '#' },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};
export const Subtle: Story = { args: { variant: 'subtle' } };
export const External: Story = {
  args: { external: true, href: 'https://example.gov.et', children: 'External site' },
};
export const InProse: Story = {
  render: (args) => (
    <p style={{ fontFamily: 'var(--ethds-font-sans)' }}>
      Read the <Link {...args}>full guidance</Link> before you apply.
    </p>
  ),
};
