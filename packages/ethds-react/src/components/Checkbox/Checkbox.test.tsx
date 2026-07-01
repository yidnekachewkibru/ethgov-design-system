import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a labelled checkbox', () => {
    render(<Checkbox label="I agree to the terms" />);
    expect(screen.getByRole('checkbox', { name: 'I agree to the terms' })).toBeInTheDocument();
  });

  it('toggles with the keyboard (Space)', async () => {
    render(<Checkbox label="Subscribe" />);
    const box = screen.getByRole('checkbox');
    box.focus();
    expect(box).not.toBeChecked();
    await userEvent.keyboard(' ');
    expect(box).toBeChecked();
  });

  it('associates hint and error', () => {
    render(<Checkbox label="Consent" hint="You can withdraw later" error="Required" />);
    const box = screen.getByRole('checkbox');
    expect(box).toHaveAttribute('aria-invalid', 'true');
    const ids = box.getAttribute('aria-describedby')!;
    expect(ids).toContain('-hint');
    expect(ids).toContain('-error');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <form>
        <Checkbox label="I agree" hint="Please read first" />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
