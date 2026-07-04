import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('renders the given-name/father\'s-name fields — no surname field', () => {
    render(<RegisterForm onSubmit={async () => {}} />);
    expect(screen.getByLabelText('Given name', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Father's name/)).toBeInTheDocument();
    expect(screen.getByLabelText("Grandfather's name (optional)")).toBeInTheDocument();
    expect(screen.queryByLabelText(/surname/i)).not.toBeInTheDocument();
  });

  it('blocks submit and shows a focusable error summary when required fields are missing', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<RegisterForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Create account' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Enter your given name.');
    expect(alert).toHaveTextContent("Enter your father's name.");
    expect(alert).toHaveTextContent('You must accept the terms to continue.');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the collected data once required fields and terms are filled in', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<RegisterForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Given name', { exact: false }), 'Abebe');
    await user.type(screen.getByLabelText(/^Father's name/), 'Kebede');
    await user.type(screen.getByLabelText('Phone number', { exact: false }), '0911234567');
    await user.type(screen.getByLabelText('Password', { exact: false }), 'at-least-8-chars');
    await user.click(screen.getByLabelText('I accept the terms of service'));
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(onSubmit).toHaveBeenCalledWith({
      givenName: 'Abebe',
      fathersName: 'Kebede',
      grandfathersName: '',
      phone: '0911234567',
      password: 'at-least-8-chars',
      terms: true,
    });
  });

  it('has no axe violations', async () => {
    const { container } = render(<RegisterForm onSubmit={async () => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
