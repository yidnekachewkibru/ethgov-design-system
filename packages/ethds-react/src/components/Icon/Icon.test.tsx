import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Icon } from './Icon';
import { CheckIcon } from './icons';

describe('Icon', () => {
  it('is hidden from assistive tech when decorative (no label)', () => {
    const { container } = render(<Icon>{CheckIcon}</Icon>);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role', 'img');
  });

  it('is exposed with an accessible name when labelled', () => {
    render(<Icon label="Verified">{CheckIcon}</Icon>);
    const img = screen.getByRole('img', { name: 'Verified' });
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('aria-hidden');
  });

  it('has no axe violations decorative or labelled', async () => {
    const { container } = render(
      <div>
        <span>
          Done <Icon>{CheckIcon}</Icon>
        </span>
        <Icon label="Success">{CheckIcon}</Icon>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
