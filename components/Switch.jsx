import { useId } from 'react';
import './Switch.css';

/**
 * Switch — binary on/off setting control with label and helper text.
 *
 * Props:
 *   label:      string | node
 *   helperText: string | node
 *   disabled:   boolean
 *   All other props pass through to the underlying checkbox <input>.
 *
 * Usage:
 *   <Switch label="Auto-approve guidance" helperText="Applies to low-risk updates." />
 */
export function Switch({
  label,
  helperText,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const switchId = id || generatedId;
  const describedById = `${switchId}-desc`;

  const classes = [
    'nos-switch',
    disabled ? 'nos-switch--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <label className="nos-switch__row" htmlFor={switchId}>
        <input
          id={switchId}
          className="nos-switch__control"
          type="checkbox"
          role="switch"
          disabled={disabled}
          aria-describedby={helperText ? describedById : undefined}
          {...rest}
        />
        <span className="nos-switch__track" aria-hidden="true">
          <span className="nos-switch__thumb" />
        </span>
        <span className="nos-switch__copy">
          {label && <span className="nos-switch__label">{label}</span>}
          {helperText && (
            <span id={describedById} className="nos-switch__message">
              {helperText}
            </span>
          )}
        </span>
      </label>
    </div>
  );
}
