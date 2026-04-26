import { useEffect, useId, useRef, useState } from 'react';
import './DatePicker.css';

/**
 * DatePicker — single-date picker with popover calendar.
 *
 * Dates are exchanged as ISO date strings (YYYY-MM-DD). Times/timezones are
 * deliberately out of scope; pair this with a separate time control if needed.
 *
 * Props:
 *   value:        ISO date string ("YYYY-MM-DD") — controlled value
 *   defaultValue: ISO date string — uncontrolled initial value
 *   onChange:     (next: string | null) => void
 *   label, helperText, error: standard field chrome
 *   placeholder:  text shown when empty (default "Select date")
 *   minDate, maxDate: ISO date strings to clamp the calendar
 *   size:         "sm" | "md" | "lg"   (default "md")
 *   disabled:     boolean
 *
 * Usage:
 *   <DatePicker label="Due date" value={due} onChange={setDue} />
 */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error = false,
  placeholder = 'Select date',
  minDate,
  maxDate,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;

  const [internal, setInternal] = useState(defaultValue || null);
  const current = value !== undefined ? value : internal;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
    setOpen(false);
  };

  const wrapperClasses = [
    'nos-datepicker',
    `nos-datepicker--${size}`,
    hasError ? 'nos-datepicker--error' : '',
    disabled ? 'nos-datepicker--disabled' : '',
    open ? 'nos-datepicker--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field" ref={wrapperRef}>
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div className={wrapperClasses}>
        <button
          type="button"
          id={inputId}
          className="nos-datepicker__trigger"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        >
          <CalendarIcon />
          <span className={`nos-datepicker__value ${current ? '' : 'nos-datepicker__value--placeholder'}`}>
            {current ? formatDisplay(current) : placeholder}
          </span>
          {current && !disabled && (
            <span
              className="nos-datepicker__clear"
              role="button"
              tabIndex={0}
              aria-label="Clear date"
              onClick={(e) => { e.stopPropagation(); select(null); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  select(null);
                }
              }}
            >
              <ClearIcon />
            </span>
          )}
        </button>
        {open && (
          <div className="nos-datepicker__popover" role="dialog">
            <Calendar
              value={current}
              onSelect={select}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
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

/**
 * DateRangePicker — start/end date popover. Same value model as DatePicker but
 * exchanges `{ start, end }` shape; either side may be null.
 *
 * Props mirror DatePicker except:
 *   value, defaultValue: { start, end }
 *   onChange:            (next: { start, end }) => void
 */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error = false,
  placeholder = 'Select range',
  minDate,
  maxDate,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;

  const [internal, setInternal] = useState(defaultValue || { start: null, end: null });
  const current = value !== undefined ? value : internal;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (!wrapperRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const update = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handlePick = (date) => {
    const { start, end } = current;
    if (!start || (start && end)) {
      update({ start: date, end: null });
    } else if (date < start) {
      update({ start: date, end: start });
      setOpen(false);
    } else {
      update({ start, end: date });
      setOpen(false);
    }
  };

  const display =
    current.start && current.end
      ? `${formatDisplay(current.start)} – ${formatDisplay(current.end)}`
      : current.start
      ? `${formatDisplay(current.start)} – …`
      : null;

  const wrapperClasses = [
    'nos-datepicker',
    `nos-datepicker--${size}`,
    hasError ? 'nos-datepicker--error' : '',
    disabled ? 'nos-datepicker--disabled' : '',
    open ? 'nos-datepicker--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field" ref={wrapperRef}>
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div className={wrapperClasses}>
        <button
          type="button"
          id={inputId}
          className="nos-datepicker__trigger"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        >
          <CalendarIcon />
          <span className={`nos-datepicker__value ${display ? '' : 'nos-datepicker__value--placeholder'}`}>
            {display || placeholder}
          </span>
          {(current.start || current.end) && !disabled && (
            <span
              className="nos-datepicker__clear"
              role="button"
              tabIndex={0}
              aria-label="Clear range"
              onClick={(e) => { e.stopPropagation(); update({ start: null, end: null }); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  update({ start: null, end: null });
                }
              }}
            >
              <ClearIcon />
            </span>
          )}
        </button>
        {open && (
          <div className="nos-datepicker__popover" role="dialog">
            <Calendar
              value={current.start}
              rangeStart={current.start}
              rangeEnd={current.end}
              onSelect={handlePick}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
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

/* ---------- Calendar ---------- */

function Calendar({ value, rangeStart, rangeEnd, onSelect, minDate, maxDate }) {
  const today = todayIso();
  const focusDate = value || rangeStart || today;
  const [view, setView] = useState(() => monthOf(focusDate));

  const monthLabel = new Date(view + '-01').toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const days = buildMonthGrid(view);
  const min = minDate || null;
  const max = maxDate || null;

  return (
    <div className="nos-cal">
      <div className="nos-cal__head">
        <button
          type="button"
          className="nos-cal__nav"
          onClick={() => setView(shiftMonth(view, -1))}
          aria-label="Previous month"
        >
          <ChevronIcon direction="left" />
        </button>
        <span className="nos-cal__month">{monthLabel}</span>
        <button
          type="button"
          className="nos-cal__nav"
          onClick={() => setView(shiftMonth(view, 1))}
          aria-label="Next month"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <div className="nos-cal__weekdays">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="nos-cal__grid">
        {days.map((d) => {
          const inMonth = d.iso.startsWith(view);
          const disabled =
            (min && d.iso < min) ||
            (max && d.iso > max);
          const isToday = d.iso === today;
          const isSelected = !rangeStart && d.iso === value;
          const isStart = rangeStart && d.iso === rangeStart;
          const isEnd = rangeEnd && d.iso === rangeEnd;
          const inRange =
            rangeStart && rangeEnd && d.iso > rangeStart && d.iso < rangeEnd;

          const classes = [
            'nos-cal__day',
            inMonth ? '' : 'nos-cal__day--muted',
            disabled ? 'nos-cal__day--disabled' : '',
            isToday ? 'nos-cal__day--today' : '',
            isSelected || isStart || isEnd ? 'nos-cal__day--selected' : '',
            inRange ? 'nos-cal__day--in-range' : '',
            isStart ? 'nos-cal__day--range-start' : '',
            isEnd ? 'nos-cal__day--range-end' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={d.iso}
              type="button"
              className={classes}
              disabled={disabled}
              onClick={() => onSelect(d.iso)}
              aria-pressed={isSelected || isStart || isEnd}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Date helpers ---------- */

function pad(n) { return String(n).padStart(2, '0'); }

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function monthOf(iso) {
  return iso.slice(0, 7); // "YYYY-MM"
}

function shiftMonth(yyyymm, delta) {
  const [y, m] = yyyymm.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function buildMonthGrid(yyyymm) {
  const [y, m] = yyyymm.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  // Start the grid on Monday.
  const dow = (first.getDay() + 6) % 7;
  const start = new Date(y, m - 1, 1 - dow);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    cells.push({
      iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      day: d.getDate(),
    });
  }
  return cells;
}

function formatDisplay(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/* ---------- Icons ---------- */

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" />
    <path d="M5 1.5v3M11 1.5v3M2 7h12" />
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

const ChevronIcon = ({ direction }) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === 'left' ? 'M7.5 3L4 6l3.5 3' : 'M4.5 3L8 6l-3.5 3'} />
  </svg>
);
