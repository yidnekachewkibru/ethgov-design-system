import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its text (the meaning carrier)', () => {
    render(<Tag variant="success">Approved</Tag>);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders as an inline span (usable inside table cells)', () => {
    render(<Tag>Pending</Tag>);
    expect(screen.getByText('Pending').tagName).toBe('SPAN');
  });

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <p>
        <Tag variant="neutral">Draft</Tag> <Tag variant="info">In review</Tag>{' '}
        <Tag variant="success">Approved</Tag> <Tag variant="warning">Action needed</Tag>{' '}
        <Tag variant="error">Rejected</Tag>
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
