import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ' },
  { code: 'so', label: 'Soomaali' },
  { code: 'aa', label: 'Qafar' },
];

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
};
export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

export const Interactive: Story = {
  render: () => {
    const [locale, setLocale] = useState('en');
    return (
      <LanguageSwitcher
        label="Choose language"
        languages={languages}
        value={locale}
        onChange={setLocale}
      />
    );
  },
};
