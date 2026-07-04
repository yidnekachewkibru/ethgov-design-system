import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { BookingForm } from './BookingForm';

const offices = [{ value: 'bole', label: 'Addis Ababa — Bole sub-city' }];
const dates = [{ value: '2019-01-05', label: 'Meskerem 5, 2019 EC' }];
const slots = [
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30', disabled: true },
  { value: '10:00', label: '10:00' },
];

describe('BookingForm', () => {
  it('requires office, date, and time before confirming', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(<BookingForm offices={offices} dates={dates} slots={slots} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Confirm booking' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Choose an office.');
    expect(alert).toHaveTextContent('Choose a date.');
    expect(alert).toHaveTextContent('Choose a time.');
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('only lets the citizen pick an available time', () => {
    render(<BookingForm offices={offices} dates={dates} slots={slots} onConfirm={vi.fn()} />);
    expect(screen.getByLabelText('09:30')).toBeDisabled();
    expect(screen.getByLabelText('09:00')).toBeEnabled();
  });

  it('confirms the booking with the chosen office, date, and time', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(<BookingForm offices={offices} dates={dates} slots={slots} onConfirm={onConfirm} />);

    await user.selectOptions(screen.getByLabelText('Office', { exact: false }), 'bole');
    await user.selectOptions(screen.getByLabelText('Date (Ethiopian calendar)', { exact: false }), '2019-01-05');
    await user.click(screen.getByLabelText('10:00'));
    await user.click(screen.getByRole('button', { name: 'Confirm booking' }));

    expect(onConfirm).toHaveBeenCalledWith({ office: 'bole', date: '2019-01-05', time: '10:00' });
  });

  it('offers another choice, without a bare error, when the slot was just taken', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn().mockRejectedValueOnce(new Error('slot taken'));
    render(<BookingForm offices={offices} dates={dates} slots={slots} onConfirm={onConfirm} />);

    await user.selectOptions(screen.getByLabelText('Office', { exact: false }), 'bole');
    await user.selectOptions(screen.getByLabelText('Date (Ethiopian calendar)', { exact: false }), '2019-01-05');
    await user.click(screen.getByLabelText('10:00'));
    await user.click(screen.getByRole('button', { name: 'Confirm booking' }));

    expect(await screen.findByText('That slot was just taken. Please choose another time.')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <BookingForm offices={offices} dates={dates} slots={slots} onConfirm={vi.fn().mockResolvedValue(undefined)} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
