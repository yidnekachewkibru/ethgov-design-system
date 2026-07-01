import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a button with its children as the accessible name', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('defaults to type="button" (not a form submit)', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick when activated', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Press' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is operable by keyboard (Enter/Space)', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);
    const btn = screen.getByRole('button');
    btn.focus();
    expect(btn).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Press
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards a ref to the underlying button', () => {
    let node: HTMLButtonElement | null = null;
    render(<Button ref={(n) => (node = n)}>Ref</Button>);
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
