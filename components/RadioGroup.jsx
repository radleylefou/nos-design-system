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
 *   All other props pass through to the underlying radio group wrapper.
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
  const labelId = `${generatedId}-label`;
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
    <div
      className={classes}
      role="radiogroup"
      aria-invalid={hasError || undefined}
      aria-disabled={disabled || undefined}
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={message ? describedById : undefined}
      {...rest}
    >
      {label && (
        <div id={labelId} className="nos-radio-group__label-text">
          {label}
        </div>
      )}
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
                <span className="nos-radio-group__option-label">{option.label}</span>
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
          className={`nos-radio-group__message ${hasError ? 'nos-radio-group__message--error' : ''}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
