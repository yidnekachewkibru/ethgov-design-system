import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { DateInput } from './DateInput';

describe('DateInput', () => {
  it('renders a fieldset/legend with day, month, and year fields', () => {
    render(<DateInput legend="Date of birth" />);
    expect(screen.getByRole('group', { name: 'Date of birth' })).toBeInTheDocument();
    expect(screen.getByLabelText('Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
  });

  it('converts an Ethiopian-calendar entry to an ISO Gregorian date on change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateInput legend="Date of birth" onChange={onChange} />);

    // Meskerem 1, 2019 E.C. == 11 September 2026 G.C. (per docs/localization/date-formatting.md)
    await user.type(screen.getByLabelText('Day'), '1');
    await user.type(screen.getByLabelText('Month'), '1');
    await user.type(screen.getByLabelText('Year'), '2019');

    expect(onChange).toHaveBeenLastCalledWith('2026-09-11');
  });

  it('accepts Gregorian entry directly when calendar="gregorian"', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateInput legend="Date of birth" calendar="gregorian" onChange={onChange} />);

    await user.type(screen.getByLabelText('Day'), '11');
    await user.type(screen.getByLabelText('Month'), '9');
    await user.type(screen.getByLabelText('Year'), '2026');

    expect(onChange).toHaveBeenLastCalledWith('2026-09-11');
  });

  it('seeds the fields from an ISO value, displayed in the active calendar', () => {
    render(<DateInput legend="Date of birth" value="2026-09-11" />);
    expect(screen.getByLabelText('Day')).toHaveValue('1');
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2019');
  });

  it('reports undefined while the date is incomplete', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateInput legend="Date of birth" onChange={onChange} />);
    await user.type(screen.getByLabelText('Day'), '1');
    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <DateInput legend="Date of birth" hint="For example, 1 Meskerem 2015" error="Enter a valid date" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
