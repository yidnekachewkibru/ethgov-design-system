import { forwardRef, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Radio.module.css';

export interface RadioOption {
  value: string;
  label: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Group label, rendered as a `<legend>` (translatable). */
  legend: ReactNode;
  /** Shared `name` for the radios; auto-generated if omitted. */
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Help text for the whole group. */
  hint?: ReactNode;
  /** Error message for the whole group. */
  error?: ReactNode;
  required?: boolean;
  /** Render options as large bordered tiles (USWDS-style). */
  tile?: boolean;
}

/**
 * RadioGroup — a labelled set of mutually exclusive options.
 *
 * Renders a `<fieldset>` + `<legend>` grouping native radios, which give
 * correct roving arrow-key behaviour and screen-reader semantics for free.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { legend, name, options, value, defaultValue, onChange, hint, error, required, tile = false, className, ...rest },
  ref,
) {
  const autoName = useId();
  const groupName = name ?? autoName;
  const hintId = `${groupName}-hint`;
  const errorId = `${groupName}-error`;
  const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

  return (
    <fieldset
      ref={ref}
      className={cx(styles.group, className)}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      {...rest}
    >
      <legend className={styles.legend}>
        {legend}
        {required && <span className={styles.required}> (required)</span>}
      </legend>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <div className={styles.options}>
        {options.map((opt) => {
          const optId = `${groupName}-${opt.value}`;
          const optHintId = `${optId}-hint`;
          return (
            <div key={opt.value} className={cx(styles.option, tile && styles.tile)}>
              <div className={styles.row}>
                <input
                  type="radio"
                  id={optId}
                  name={groupName}
                  value={opt.value}
                  className={styles.input}
                  disabled={opt.disabled}
                  aria-describedby={opt.hint ? optHintId : undefined}
                  {...(value !== undefined
                    ? { checked: value === opt.value, onChange: () => onChange?.(opt.value) }
                    : {
                        defaultChecked: defaultValue === opt.value,
                        onChange: () => onChange?.(opt.value),
                      })}
                />
                <label htmlFor={optId} className={styles.label}>
                  {opt.label}
                </label>
              </div>
              {opt.hint && (
                <span id={optHintId} className={styles.optionHint}>
                  {opt.hint}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </fieldset>
  );
});
