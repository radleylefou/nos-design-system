import { useId } from 'react';
import './RadioGroup.css';

/**
 * RadioGroup — mutually exclusive option set with label and helper/error text.
 *
 * Props:
 *   label:       string | node
 *   helperText:  string | node
 *   error:       string | boolean — when truthy the group renders in the error state.
 *                                   If a string is given it replaces helperText.
 *   options:     array of { label, value, helperText, disabled }
 *   orientation: "vertical" | "horizontal"   (default: "vertical")
 *   disabled:    boolean
 *   name:        radio group name; generated when omitted
 *   value, defaultValue, onChange: native radio control props
 *   All other props pass through to the underlying <fieldset>.
 *
 * Usage:
 *   <RadioGroup label="Priority" options={priorityOptions} defaultValue="normal" />
 */
export function RadioGroup({
  label,
  helperText,
  error = false,
  options = [],
  orientation = 'vertical',
  disabled = false,
  name,
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const groupName = name || generatedId;
  const describedById = `${generatedId}-desc`;

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const classes = [
    'nos-radio-group',
    `nos-radio-group--${orientation}`,
    hasError ? 'nos-radio-group--error' : '',
    disabled ? 'nos-radio-group--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset
      className={classes}
      disabled={disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={message ? describedById : undefined}
      {...rest}
    >
      {label && <legend className="nos-radio-group__legend">{label}</legend>}
      <div className="nos-radio-group__options">
        {options.map((option) => {
          const controlProps = value === undefined
            ? { defaultChecked: defaultValue === option.value }
            : { checked: value === option.value };

          return (
            <label
              key={option.value}
              className={`nos-radio-group__option ${option.disabled ? 'nos-radio-group__option--disabled' : ''}`}
            >
              <input
                className="nos-radio-group__control"
                type="radio"
                name={groupName}
                value={option.value}
                disabled={disabled || option.disabled}
                onChange={onChange}
                {...controlProps}
              />
              <span className="nos-radio-group__copy">
                <span className="nos-radio-group__label">{option.label}</span>
                {option.helperText && (
                  <span className="nos-radio-group__hint">{option.helperText}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {message && (
        <div
          id={describedById}
          className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}
        >
          {message}
        </div>
      )}
    </fieldset>
  );
}
