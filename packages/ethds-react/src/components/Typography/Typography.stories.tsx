import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text } from './Typography';

const meta: Meta = {
  title: 'Components/Typography',
};
export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={4}>Heading level 4</Heading>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ maxWidth: '40rem' }}>
      <Text size="lg">Lead paragraph, slightly larger for emphasis.</Text>
      <Text>Standard body copy at the base size (16px equivalent minimum).</Text>
      <Text secondary>Secondary text, de-emphasised.</Text>
      <Text size="sm">Small print for captions and fine detail.</Text>
    </div>
  ),
};
