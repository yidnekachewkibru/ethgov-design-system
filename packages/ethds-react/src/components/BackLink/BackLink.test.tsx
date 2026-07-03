import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('renders as an anchor with the given href and text', () => {
    render(<BackLink href="/application/step-1">Back</BackLink>);
    const link = screen.getByRole('link', { name: 'Back' });
    expect(link).toHaveAttribute('href', '/application/step-1');
  });

  it('has no axe violations', async () => {
    const { container } = render(<BackLink href="/application/step-1">Back</BackLink>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
