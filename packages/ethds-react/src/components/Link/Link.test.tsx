import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Link } from './Link';

describe('Link', () => {
  it('renders an anchor with its href and accessible name', () => {
    render(<Link href="/services">Services</Link>);
    const link = screen.getByRole('link', { name: 'Services' });
    expect(link).toHaveAttribute('href', '/services');
  });

  it('sets safe rel and target for external links', () => {
    render(
      <Link href="https://example.gov.et" external>
        External
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        See the <Link href="/help">help page</Link> for details.
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
