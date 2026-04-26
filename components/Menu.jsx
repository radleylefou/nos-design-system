import { useRef, useEffect, useState } from 'react';
import { Popover } from './Popover.jsx';
import './Menu.css';

/**
 * Menu / DropdownMenu — contextual action list anchored to a trigger.
 *
 * Built on Popover. Keyboard-navigable (arrow keys, Enter, Escape).
 *
 * Simple usage (items array):
 *   <Menu
 *     trigger={<Button variant="ghost" size="sm">Actions</Button>}
 *     items={[
 *       { label: 'Open', onClick: () => {} },
 *       { label: 'Duplicate', onClick: () => {} },
 *       { separator: true },
 *       { label: 'Archive', variant: 'danger', onClick: () => {} },
 *     ]}
 *   />
 *
 * Compound usage:
 *   <Menu trigger={<Button>…</Button>}>
 *     <Menu.Item onClick={open}>Open</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item variant="danger" onClick={archive}>Archive</Menu.Item>
 *   </Menu>
 *
 * Props — Menu:
 *   trigger:   ReactNode
 *   items:     Array<{ label, onClick, variant?, disabled?, icon?, separator? }>
 *   children:  ReactNode (compound alternative to items)
 *   placement: Popover placement  (default: "bottom-start")
 *   className
 *
 * Props — Menu.Item:
 *   onClick:  function
 *   variant:  "default" | "danger"  (default: "default")
 *   disabled: boolean
 *   icon:     ReactNode
 */
export function Menu({
  trigger,
  items,
  children,
  placement = 'bottom-start',
  className = '',
}) {
  const [open, setOpen] = useState(false);

  const content = (
    <MenuPanel
      items={items}
      onClose={() => setOpen(false)}
      className={className}
    >
      {children}
    </MenuPanel>
  );

  return (
    <Popover
      trigger={trigger}
      content={content}
      placement={placement}
      open={open}
      onOpenChange={setOpen}
    />
  );
}

function MenuPanel({ items, onClose, children, className }) {
  const panelRef = useRef(null);

  // Arrow-key navigation
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const getItems = () =>
      Array.from(el.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'));

    const handleKey = (e) => {
      const itemEls = getItems();
      const active = document.activeElement;
      const idx = itemEls.indexOf(active);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        itemEls[(idx + 1) % itemEls.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        itemEls[(idx - 1 + itemEls.length) % itemEls.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        itemEls[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        itemEls[itemEls.length - 1]?.focus();
      }
    };

    el.addEventListener('keydown', handleKey);
    // Focus first item on mount
    requestAnimationFrame(() => getItems()[0]?.focus());
    return () => el.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      ref={panelRef}
      className="nos-menu"
      role="menu"
      aria-orientation="vertical"
    >
      {/* items-array API */}
      {items?.map((item, i) =>
        item.separator
          ? <MenuSeparator key={i} />
          : (
            <MenuItem
              key={i}
              variant={item.variant}
              disabled={item.disabled}
              icon={item.icon}
              onClick={() => { item.onClick?.(); onClose(); }}
            >
              {item.label}
            </MenuItem>
          )
      )}

      {/* compound API */}
      {children && (
        <MenuContext.Provider value={{ onClose }}>
          {children}
        </MenuContext.Provider>
      )}
    </div>
  );
}

import { createContext, useContext } from 'react';
const MenuContext = createContext({ onClose: () => {} });

function MenuItem({
  children,
  onClick,
  variant = 'default',
  disabled = false,
  icon,
  className = '',
  ...rest
}) {
  const { onClose } = useContext(MenuContext);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    onClose();
  };

  return (
    <button
      type="button"
      role="menuitem"
      className={[
        'nos-menu-item',
        `nos-menu-item--${variant}`,
        disabled ? 'nos-menu-item--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      tabIndex={-1}
      {...rest}
    >
      {icon && <span className="nos-menu-item__icon" aria-hidden="true">{icon}</span>}
      <span className="nos-menu-item__label">{children}</span>
    </button>
  );
}

function MenuSeparator({ className = '', ...rest }) {
  return (
    <div
      role="separator"
      className={['nos-menu-separator', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}

Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;
