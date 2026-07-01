import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { RadioGroup } from './Radio';

const options = [
  { value: 'am', label: 'Amharic' },
  { value: 'om', label: 'Afaan Oromoo' },
  { value: 'ti', label: 'Tigrinya' },
];

describe('RadioGroup', () => {
  it('renders a group with a legend and radios', () => {
    render(<RadioGroup legend="Preferred language" options={options} />);
    expect(screen.getByRole('group', { name: /Preferred language/ })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selects an option on click and reports the value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup legend="Language" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Afaan Oromoo' }));
    expect(onChange).toHaveBeenCalledWith('om');
    expect(screen.getByRole('radio', { name: 'Afaan Oromoo' })).toBeChecked();
  });

  it('supports controlled selection', () => {
    render(<RadioGroup legend="Language" options={options} value="ti" onChange={() => {}} />);
    expect(screen.getByRole('radio', { name: 'Tigrinya' })).toBeChecked();
  });

  it('marks the group invalid on error', () => {
    render(<RadioGroup legend="Language" options={options} error="Choose one" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <form>
        <RadioGroup legend="Preferred language" hint="Used for notices" options={options} required />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
