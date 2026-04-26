import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './Combobox.css';

/**
 * Combobox — searchable single-select with keyboard navigation.
 *
 * Filtered popover list driven by free-text input. Use over Select when the
 * option list is large or users benefit from typing to narrow down.
 *
 * Props:
 *   options:      array of { label, value, description?, disabled? }
 *   value:        controlled selected value
 *   defaultValue: uncontrolled initial value
 *   onChange:     (value, option | null) => void
 *   label, helperText, error, placeholder, size, disabled — standard field chrome
 *   filter:       (option, query) => boolean — defaults to case-insensitive label match
 *   emptyText:    string shown when no options match (default "No matches")
 *   allowClear:   boolean (default true)
 *
 * Usage:
 *   <Combobox label="Owner" options={users} value={owner} onChange={setOwner} />
 */
export function Combobox({
  options = [],
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error = false,
  placeholder = 'Search…',
  size = 'md',
  disabled = false,
  filter,
  emptyText = 'No matches',
  allowClear = true,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const listId = `${generatedId}-list`;
  const describedById = `${inputId}-desc`;

  const [internal, setInternal] = useState(defaultValue ?? null);
  const selectedValue = value !== undefined ? value : internal;
  const selectedOption = options.find((o) => o.value === selectedValue) || null;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const fn = filter || ((opt, qq) => opt.label.toLowerCase().includes(qq));
    return options.filter((opt) => fn(opt, q));
  }, [options, query, filter]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const commit = (option) => {
    if (!option || option.disabled) return;
    if (value === undefined) setInternal(option.value);
    onChange?.(option.value, option);
    setOpen(false);
    setQuery('');
  };

  const clear = (e) => {
    e?.stopPropagation();
    if (value === undefined) setInternal(null);
    onChange?.(null, null);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlight((h) => Math.min(h + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open) commit(filteredOptions[highlight]);
      else setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'Backspace' && !query && selectedValue && allowClear) {
      clear();
    }
  };

  const wrapperClasses = [
    'nos-combobox',
    `nos-combobox--${size}`,
    hasError ? 'nos-combobox--error' : '',
    disabled ? 'nos-combobox--disabled' : '',
    open ? 'nos-combobox--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const display = open ? query : (selectedOption?.label ?? '');

  return (
    <div className="nos-field" ref={wrapperRef}>
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div className={wrapperClasses}>
        <input
          id={inputId}
          ref={inputRef}
          className="nos-combobox__input"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open ? `${generatedId}-opt-${highlight}` : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          value={display}
          placeholder={selectedOption ? selectedOption.label : placeholder}
          disabled={disabled}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={handleKey}
          autoComplete="off"
          {...rest}
        />
        {selectedValue && allowClear && !disabled && (
          <button
            type="button"
            className="nos-combobox__clear"
            aria-label="Clear selection"
            onClick={clear}
          >
            <ClearIcon />
          </button>
        )}
        <span className="nos-combobox__chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
        {open && (
          <ul id={listId} role="listbox" className="nos-combobox__list">
            {filteredOptions.length === 0 && (
              <li className="nos-combobox__empty">{emptyText}</li>
            )}
            {filteredOptions.map((option, i) => {
              const selected = option.value === selectedValue;
              const active = i === highlight;
              const itemClasses = [
                'nos-combobox__option',
                active ? 'nos-combobox__option--active' : '',
                selected ? 'nos-combobox__option--selected' : '',
                option.disabled ? 'nos-combobox__option--disabled' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li
                  key={option.value}
                  id={`${generatedId}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled || undefined}
                  className={itemClasses}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => { e.preventDefault(); commit(option); }}
                >
                  <span className="nos-combobox__option-label">{option.label}</span>
                  {option.description && (
                    <span className="nos-combobox__option-description">{option.description}</span>
                  )}
                  {selected && (
                    <span className="nos-combobox__check" aria-hidden="true">
                      <CheckIcon />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {message && (
        <div id={describedById} className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}

const ChevronIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4.5L6 7.5l3-3" />
  </svg>
);
const ClearIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 6l2.5 2.5L9.5 3.5" />
  </svg>
);
