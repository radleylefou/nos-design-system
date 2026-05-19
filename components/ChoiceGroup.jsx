import './ChoiceGroup.css';

/**
 * ChoiceGroup — single-select outlined pill group for form choices.
 *
 * Props:
 *   options    — array of { label, value, icon?, disabled? }
 *   value      — currently selected value
 *   onChange   — called with selected value
 *   size       — 'sm' | 'md'
 *   ariaLabel  — accessible label for the radio group
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to the root element
 */
export function ChoiceGroup({
  options = [],
  value,
  onChange,
  size = 'md',
  ariaLabel,
  className = '',
  ...rest
}) {
  const cls = ['nos-choice-group', `nos-choice-group--${size}`, className].filter(Boolean).join(' ');

  const handleKeyDown = (event, index) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();

    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const enabled = options
      .map((option, optionIndex) => ({ option, optionIndex }))
      .filter(({ option }) => !option.disabled);

    const currentEnabledIndex = enabled.findIndex(({ optionIndex }) => optionIndex === index);
    const nextEnabled = enabled[(currentEnabledIndex + direction + enabled.length) % enabled.length];

    if (nextEnabled) {
      onChange?.(nextEnabled.option.value);
    }
  };

  return (
    <div className={cls} role="radiogroup" aria-label={ariaLabel} {...rest}>
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={option.disabled}
            className={`nos-choice-group__item${active ? ' nos-choice-group__item--active' : ''}`}
            onClick={() => !option.disabled && onChange?.(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {option.icon && <span className="nos-choice-group__icon" aria-hidden="true">{option.icon}</span>}
            <span className="nos-choice-group__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
