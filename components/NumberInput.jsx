import { useId } from 'react';
import './NumberInput.css';

/**
 * NumberInput — numeric field with stepper buttons and clamping.
 *
 * Always emits numbers via onChange (or null when cleared). Use Input with
 * `type="number"` for cases where you don't need steppers or unit affixes.
 *
 * Props:
 *   value:        controlled number | null
 *   defaultValue: uncontrolled initial number
 *   onChange:     (value: number | null) => void
 *   min, max:     clamp bounds
 *   step:         increment for stepper buttons (default 1)
 *   precision:    number of decimal places to round to
 *   prefix, suffix: short adornment strings (e.g., "$", "hrs")
 *   label, helperText, error, placeholder, size, disabled — standard field chrome
 *
 * Usage:
 *   <NumberInput label="Quantity" min={0} step={1} />
 *   <NumberInput label="Hours" suffix="hrs" step={0.5} precision={2} />
 */
export function NumberInput({
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  precision,
  prefix,
  suffix,
  label,
  helperText,
  error = false,
  placeholder,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;

  const isControlled = value !== undefined;
  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const clamp = (n) => {
    if (n == null || Number.isNaN(n)) return null;
    let v = n;
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    if (precision != null) {
      const p = Math.pow(10, precision);
      v = Math.round(v * p) / p;
    }
    return v;
  };

  const emit = (next) => {
    onChange?.(next);
  };

  const adjust = (delta) => {
    const base = (isControlled ? value : null) ?? 0;
    emit(clamp(base + delta));
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      emit(null);
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    emit(clamp(n));
  };

  const wrapperClasses = [
    'nos-numberinput',
    `nos-numberinput--${size}`,
    hasError ? 'nos-numberinput--error' : '',
    disabled ? 'nos-numberinput--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputProps = isControlled
    ? { value: value ?? '' }
    : { defaultValue: defaultValue ?? '' };

  return (
    <div className="nos-field">
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div className={wrapperClasses}>
        {prefix && <span className="nos-numberinput__affix nos-numberinput__affix--prefix">{prefix}</span>}
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          className="nos-numberinput__control"
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          onChange={handleChange}
          {...inputProps}
          {...rest}
        />
        {suffix && <span className="nos-numberinput__affix nos-numberinput__affix--suffix">{suffix}</span>}
        <span className="nos-numberinput__steppers" aria-hidden="true">
          <button
            type="button"
            className="nos-numberinput__step"
            onClick={() => adjust(step)}
            disabled={disabled || (max != null && (isControlled ? (value ?? 0) >= max : false))}
            tabIndex={-1}
          >
            <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6L5 3.5 7.5 6" />
            </svg>
          </button>
          <button
            type="button"
            className="nos-numberinput__step"
            onClick={() => adjust(-step)}
            disabled={disabled || (min != null && (isControlled ? (value ?? 0) <= min : false))}
            tabIndex={-1}
          >
            <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 4L5 6.5 7.5 4" />
            </svg>
          </button>
        </span>
      </div>
      {message && (
        <div id={describedById} className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}
