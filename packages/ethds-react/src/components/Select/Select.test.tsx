import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Select } from './Select';

const regions = [
  { value: 'aa', label: 'Afar' },
  { value: 'am', label: 'Amhara' },
  { value: 'or', label: 'Oromia' },
];

describe('Select', () => {
  it('renders a labelled select with options', () => {
    render(<Select label="Region" options={regions} />);
    const select = screen.getByLabelText('Region');
    expect(select.tagName).toBe('SELECT');
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('lets the user choose an option', async () => {
    render(<Select label="Region" options={regions} />);
    const select = screen.getByLabelText<HTMLSelectElement>('Region');
    await userEvent.selectOptions(select, 'or');
    expect(select.value).toBe('or');
  });

  it('shows a disabled placeholder when provided', () => {
    render(<Select label="Region" placeholder="Choose a region" options={regions} />);
    const placeholder = screen.getByRole('option', { name: 'Choose a region' });
    expect(placeholder).toBeDisabled();
  });

  it('marks invalid and describes the error', () => {
    render(<Select label="Region" options={regions} error="Select your region" />);
    const select = screen.getByLabelText('Region');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    const id = select.getAttribute('aria-describedby')!;
    expect(document.getElementById(id)).toHaveTextContent('Select your region');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <form>
        <Select label="Region" placeholder="Choose a region" hint="Your region of residence" options={regions} required />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
