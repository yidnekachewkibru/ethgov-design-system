import { forwardRef, useId } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './LanguageSwitcher.module.css';

export interface LanguageOption {
  /** BCP 47 locale code, e.g. "am". */
  code: string;
  /** The language's own name (autonym), e.g. "አማርኛ". */
  label: string;
}

export interface LanguageSwitcherProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Accessible label for the control, in the active language
   * (e.g. "Choose language / ቋንቋ ይምረጡ").
   */
  label: string;
  languages: LanguageOption[];
  /** Currently active locale code. */
  value: string;
  onChange: (code: string) => void;
}

/**
 * LanguageSwitcher — lets a citizen choose their language.
 *
 * Renders a labelled native `<select>` listing every language by its own
 * name (autonym), so a speaker recognises theirs without reading the
 * current language. Each option sets `lang` for correct pronunciation.
 * Switching calls `onChange`; persistence and applying the locale are the
 * host app's responsibility (see docs/localization/language-switcher.md).
 */
export const LanguageSwitcher = forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  function LanguageSwitcher({ label, languages, value, onChange, className, ...rest }, ref) {
    const id = useId();
    return (
      <div ref={ref} className={cx(styles.wrap, className)} {...rest}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <select
          id={id}
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {languages.map((lng) => (
            <option key={lng.code} value={lng.code} lang={lng.code}>
              {lng.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
