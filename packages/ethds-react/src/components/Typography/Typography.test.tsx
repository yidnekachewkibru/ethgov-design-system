import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Heading, Text } from './Typography';

describe('Heading', () => {
  it('renders the semantic level requested', () => {
    render(<Heading level={2}>Section</Heading>);
    const h = screen.getByRole('heading', { level: 2, name: 'Section' });
    expect(h.tagName).toBe('H2');
  });

  it('keeps the semantic level when only the visual level changes', () => {
    render(
      <Heading level={3} visualLevel={1}>
        Looks big, still h3
      </Heading>,
    );
    // Screen readers still see level 3 (correct outline)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Body copy</Text>);
    expect(screen.getByText('Body copy').tagName).toBe('P');
  });

  it('can render as a span', () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText('Inline').tagName).toBe('SPAN');
  });

  it('has no axe violations in a document outline', async () => {
    const { container } = render(
      <article>
        <Heading level={1}>Title</Heading>
        <Text>Intro paragraph.</Text>
        <Heading level={2}>Subsection</Heading>
        <Text secondary>Secondary note.</Text>
      </article>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
