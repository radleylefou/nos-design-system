import './Kbd.css';

/**
 * Kbd — keyboard key display element.
 *
 * Props:
 *   children:  string | string[] — key label(s). When an array is passed,
 *              keys are rendered with a + separator (chord display).
 *   size:      "sm" | "md"   (default: "md")
 *   className
 *
 * Usage:
 *   <Kbd>⌘</Kbd>
 *   <Kbd>Enter</Kbd>
 *   <Kbd>{['⌘', 'K']}</Kbd>   — renders ⌘ + K
 *
 * Convenience aliases:
 *   <Kbd.Cmd />   → ⌘
 *   <Kbd.Ctrl />  → Ctrl
 *   <Kbd.Shift /> → ⇧
 *   <Kbd.Alt />   → ⌥
 *   <Kbd.Enter /> → ↵
 *   <Kbd.Esc />   → Esc
 */
export function Kbd({ children, size = 'md', className = '', ...rest }) {
  const keys = Array.isArray(children) ? children : [children];

  const classes = ['nos-kbd-group', `nos-kbd-group--${size}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {keys.map((key, i) => (
        <span key={i} className="nos-kbd-group__pair">
          {i > 0 && <span className="nos-kbd-group__plus" aria-hidden="true">+</span>}
          <kbd className="nos-kbd">{key}</kbd>
        </span>
      ))}
    </span>
  );
}

Kbd.Cmd   = (props) => <Kbd {...props}>⌘</Kbd>;
Kbd.Ctrl  = (props) => <Kbd {...props}>Ctrl</Kbd>;
Kbd.Shift = (props) => <Kbd {...props}>⇧</Kbd>;
Kbd.Alt   = (props) => <Kbd {...props}>⌥</Kbd>;
Kbd.Enter = (props) => <Kbd {...props}>↵</Kbd>;
Kbd.Esc   = (props) => <Kbd {...props}>Esc</Kbd>;
