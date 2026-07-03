import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { CheckboxGroup } from './CheckboxGroup';

const options = [
  { value: 'sms', label: 'SMS' },
  { value: 'email', label: 'Email' },
  { value: 'post', label: 'Post' },
];

describe('CheckboxGroup', () => {
  it('renders a group with a legend and checkboxes', () => {
    render(<CheckboxGroup legend="How should we contact you?" options={options} />);
    expect(screen.getByRole('group', { name: /How should we contact you\?/ })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('allows multiple selections and reports the values', async () => {
    const onChange = vi.fn();
    let values: string[] = [];
    const { rerender } = render(
      <CheckboxGroup legend="Contact" options={options} values={values} onChange={(v) => { values = v; onChange(v); }} />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'SMS' }));
    expect(onChange).toHaveBeenLastCalledWith(['sms']);
    rerender(
      <CheckboxGroup legend="Contact" options={options} values={values} onChange={(v) => { values = v; onChange(v); }} />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Email' }));
    expect(onChange).toHaveBeenLastCalledWith(['sms', 'email']);
  });

  it('supports uncontrolled defaults', () => {
    render(<CheckboxGroup legend="Contact" options={options} defaultValues={['post']} />);
    expect(screen.getByRole('checkbox', { name: 'Post' })).toBeChecked();
  });

  it('marks the group invalid on error and associates the message', () => {
    render(<CheckboxGroup legend="Contact" options={options} error="Choose at least one" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Choose at least one')).toBeInTheDocument();
  });

  it('renders tile options with per-option hints', () => {
    render(
      <CheckboxGroup
        legend="Documents"
        tile
        options={[{ value: 'id', label: 'Fayda ID', hint: 'Your national ID card' }]}
      />,
    );
    const box = screen.getByRole('checkbox', { name: 'Fayda ID' });
    const hintId = box.getAttribute('aria-describedby')!;
    expect(document.getElementById(hintId)).toHaveTextContent('Your national ID card');
  });

  it('has no axe violations (default and tile)', async () => {
    const { container } = render(
      <form>
        <CheckboxGroup legend="Contact" hint="Pick any" options={options} />
        <CheckboxGroup legend="Documents" tile options={options} />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
