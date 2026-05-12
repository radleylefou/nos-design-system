import './Overlay.css';

/**
 * Overlay — full-viewport scrim for modal and popup surfaces.
 *
 * Props:
 *   open       — renders the overlay when true
 *   onClick    — called when the scrim itself is clicked
 *   children   — centered overlay content
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to the root element
 */
export function Overlay({
  open = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  if (!open) return null;

  const cls = ['nos-overlay', className].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      onClick?.(event);
    }
  };

  return (
    <div className={cls} onClick={handleClick} {...rest}>
      {children}
    </div>
  );
}
