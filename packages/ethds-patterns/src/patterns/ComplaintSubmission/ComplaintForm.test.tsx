import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ComplaintForm } from './ComplaintForm';

describe('ComplaintForm', () => {
  it('requires category, description, and phone (unless anonymous)', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ComplaintForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Submit complaint' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Choose what this is about.');
    expect(alert).toHaveTextContent('Describe what happened.');
    expect(alert).toHaveTextContent('Add a phone number, or submit anonymously.');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('hides the phone field and does not require it once anonymous is checked', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ComplaintForm onSubmit={onSubmit} />);

    await user.click(screen.getByLabelText('Submit anonymously'));
    expect(screen.queryByLabelText('Phone (so we can follow up)', { exact: false })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('What is this about?', { exact: false }), 'delay');
    await user.type(screen.getByLabelText('Describe what happened', { exact: false }), 'The office was closed.');
    await user.click(screen.getByRole('button', { name: 'Submit complaint' }));

    expect(onSubmit).toHaveBeenCalledWith({
      category: 'delay',
      description: 'The office was closed.',
      anonymous: true,
      phone: '',
      attachmentName: undefined,
    });
  });

  it('submits category, description, and phone together', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ComplaintForm onSubmit={onSubmit} />);

    await user.selectOptions(screen.getByLabelText('What is this about?', { exact: false }), 'conduct');
    await user.type(screen.getByLabelText('Describe what happened', { exact: false }), 'Staff was rude.');
    await user.type(screen.getByLabelText('Phone (so we can follow up)', { exact: false }), '0911234567');
    await user.click(screen.getByRole('button', { name: 'Submit complaint' }));

    expect(onSubmit).toHaveBeenCalledWith({
      category: 'conduct',
      description: 'Staff was rude.',
      anonymous: false,
      phone: '0911234567',
      attachmentName: undefined,
    });
  });

  it('keeps the written complaint and offers retry when submit fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValueOnce(new Error('network error'));
    render(<ComplaintForm onSubmit={onSubmit} />);

    await user.selectOptions(screen.getByLabelText('What is this about?', { exact: false }), 'other');
    await user.type(screen.getByLabelText('Describe what happened', { exact: false }), 'A long complaint.');
    await user.type(screen.getByLabelText('Phone (so we can follow up)', { exact: false }), '0911234567');
    await user.click(screen.getByRole('button', { name: 'Submit complaint' }));

    expect(await screen.findByText(/went wrong/)).toBeInTheDocument();
    expect(screen.getByLabelText('Describe what happened', { exact: false })).toHaveValue('A long complaint.');
  });

  it('has no axe violations', async () => {
    const { container } = render(<ComplaintForm onSubmit={vi.fn().mockResolvedValue(undefined)} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
