import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders a link to the main content', () => {
    render(<SkipLink>Skip to main content</SkipLink>);
    const link = screen.getByRole('link', { name: 'Skip to main content' });
    expect(link).toHaveAttribute('href', '#main');
  });

  it('accepts a custom target', () => {
    render(<SkipLink href="#content">Skip</SkipLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#content');
  });

  it('is focusable (first tab stop pattern)', () => {
    render(<SkipLink>Skip to main content</SkipLink>);
    const link = screen.getByRole('link');
    link.focus();
    expect(link).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <SkipLink>Skip to main content</SkipLink>
        <main id="main">Content</main>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
