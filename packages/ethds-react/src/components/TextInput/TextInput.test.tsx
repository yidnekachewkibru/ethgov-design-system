import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('associates the label with the input', () => {
    render(<TextInput label="Full name" />);
    expect(screen.getByLabelText('Full name')).toBeInstanceOf(HTMLInputElement);
  });

  it('accepts typed input', async () => {
    render(<TextInput label="Given name" />);
    const input = screen.getByLabelText('Given name');
    await userEvent.type(input, 'Abebe');
    expect(input).toHaveValue('Abebe');
  });

  it('exposes the hint via aria-describedby', () => {
    render(<TextInput label="Phone" hint="Format: 09xx xxx xxx" />);
    const input = screen.getByLabelText('Phone');
    const describedby = input.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    expect(document.getElementById(describedby!)).toHaveTextContent('Format: 09xx xxx xxx');
  });

  it('marks the field invalid and describes the error when in error', () => {
    render(<TextInput label="Email" error="Enter a valid email address" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedby = input.getAttribute('aria-describedby');
    expect(document.getElementById(describedby!)).toHaveTextContent(
      'Enter a valid email address',
    );
  });

  it('has no axe violations (default, hint, error, required)', async () => {
    const { container } = render(
      <form>
        <TextInput label="Name" required />
        <TextInput label="TIN" hint="Your taxpayer identification number" />
        <TextInput label="Email" error="Required" />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
