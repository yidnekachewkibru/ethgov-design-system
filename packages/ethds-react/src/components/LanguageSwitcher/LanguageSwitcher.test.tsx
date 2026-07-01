import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { LanguageSwitcher } from './LanguageSwitcher';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ' },
];

describe('LanguageSwitcher', () => {
  it('renders a labelled control listing languages by autonym', () => {
    render(
      <LanguageSwitcher label="Choose language" languages={languages} value="en" onChange={() => {}} />,
    );
    const select = screen.getByLabelText('Choose language');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'አማርኛ' })).toBeInTheDocument();
  });

  it('reflects the active locale', () => {
    render(
      <LanguageSwitcher label="Language" languages={languages} value="ti" onChange={() => {}} />,
    );
    expect(screen.getByLabelText<HTMLSelectElement>('Language').value).toBe('ti');
  });

  it('sets lang on each option for correct pronunciation', () => {
    render(
      <LanguageSwitcher label="Language" languages={languages} value="en" onChange={() => {}} />,
    );
    expect(screen.getByRole('option', { name: 'አማርኛ' })).toHaveAttribute('lang', 'am');
  });

  it('calls onChange with the chosen locale', async () => {
    const onChange = vi.fn();
    render(
      <LanguageSwitcher label="Language" languages={languages} value="en" onChange={onChange} />,
    );
    await userEvent.selectOptions(screen.getByLabelText('Language'), 'om');
    expect(onChange).toHaveBeenCalledWith('om');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <LanguageSwitcher label="Choose language" languages={languages} value="en" onChange={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
