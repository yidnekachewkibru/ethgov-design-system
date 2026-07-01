import { forwardRef, useId } from 'react';
import type { FormHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { SearchIcon } from '../Icon/icons';
import styles from './Search.module.css';

export interface SearchProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Accessible label for the search field (translatable), e.g. "Search". */
  label: string;
  /** Visible text on the submit button (translatable), e.g. "Search". */
  submitLabel: string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  /** Called with the query when the form is submitted. */
  onSearch?: (query: string) => void;
}

/**
 * Search — a labelled search field with a submit button.
 *
 * Renders a `<form role="search">` with an `<input type="search">`. The
 * label is associated (visually hidden by default via the label text being
 * provided) and the submit button carries visible text.
 */
export const Search = forwardRef<HTMLFormElement, SearchProps>(function Search(
  { label, submitLabel, id, name = 'q', placeholder, defaultValue, onSearch, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <form
      ref={ref}
      role="search"
      className={cx(styles.form, className)}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        onSearch?.(String(data.get(name) ?? ''));
      }}
      {...rest}
    >
      <label htmlFor={inputId} className={styles.visuallyHidden}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="search"
        inputMode="search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={styles.input}
      />
      <button type="submit" className={styles.submit}>
        <Icon>{SearchIcon}</Icon>
        <span>{submitLabel}</span>
      </button>
    </form>
  );
});
