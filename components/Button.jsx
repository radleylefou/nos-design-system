import './Button.css';

/**
 * Button — primary action control for NOS surfaces.
 *
 * Variants are derived from the Figma frames:
 *   primary   — solid brand fill, used for the main page CTA (e.g. "+ Time Entry")
 *   secondary — white surface with brand-tinted border, paired with primary
 *   ghost     — transparent, neutral text, used for tertiary / cancel actions
 *   soft      — brand-50 fill with brand text, used inline / in tables (e.g. "+ Note")
 *   link      — text-only, brand color, used for "View All →" patterns
 *
 * Sizes:
 *   sm — table-inline footprint
 *   md — default
 *
 * Props:
 *   variant       — 'primary' | 'secondary' | 'ghost' | 'soft' | 'link'
 *   size          — 'sm' | 'md'
 *   leadingIcon   — JSX node rendered before the label
 *   trailingIcon  — JSX node rendered after the label
 *   disabled      — disables the button
 *   ...rest       — forwarded to <button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'nos-btn',
    `nos-btn--${variant}`,
    `nos-btn--${size}`,
    !children && (leadingIcon || trailingIcon) ? 'nos-btn--icon-only' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      {leadingIcon && (
        <span className="nos-btn__icon nos-btn__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children && <span className="nos-btn__label">{children}</span>}
      {trailingIcon && (
        <span className="nos-btn__icon nos-btn__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
