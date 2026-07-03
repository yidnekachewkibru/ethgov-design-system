import { forwardRef, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
  /** Optional description, shown under the label (used by tiles). */
  hint?: ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Group question, rendered as a `<legend>` (translatable). */
  legend: ReactNode;
  /** Shared name for the checkboxes; auto-generated if omitted. */
  name?: string;
  options: CheckboxGroupOption[];
  /** Controlled selected values. */
  values?: string[];
  /** Uncontrolled initial selection. */
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Render options as large bordered tiles (USWDS-style). */
  tile?: boolean;
}

/**
 * CheckboxGroup — a labelled set of independent choices (pick any number).
 *
 * A `<fieldset>` + `<legend>` grouping native checkboxes; the `tile`
 * variant renders each option as a large bordered tile with an optional
 * description — bigger touch targets for mobile-first services.
 */
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  function CheckboxGroup(
    { legend, name, options, values, defaultValues, onChange, hint, error, required, tile = false, className, ...rest },
    ref,
  ) {
    const autoName = useId();
    const groupName = name ?? autoName;
    const hintId = `${groupName}-hint`;
    const errorId = `${groupName}-error`;
    const describedBy = cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined;

    function toggle(value: string, checked: boolean) {
      if (!onChange) return;
      const current = values ?? [];
      onChange(checked ? [...current, value] : current.filter((v) => v !== value));
    }

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
                    type="checkbox"
                    id={optId}
                    name={groupName}
                    value={opt.value}
                    className={styles.input}
                    disabled={opt.disabled}
                    aria-describedby={opt.hint ? optHintId : undefined}
                    {...(values !== undefined
                      ? {
                          checked: values.includes(opt.value),
                          onChange: (e) => toggle(opt.value, e.target.checked),
                        }
                      : {
                          defaultChecked: defaultValues?.includes(opt.value),
                          onChange: (e) => toggle(opt.value, e.target.checked),
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
  },
);
