import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import './Popover.css';

/**
 * Popover — anchor-based floating panel.
 *
 * The foundational primitive for Tooltip, Menu, and Combobox dropdown panels.
 * Uses getBoundingClientRect() + position:fixed so it escapes scroll/overflow.
 *
 * Props:
 *   trigger:      ReactNode — the anchor element rendered inline
 *   content:      ReactNode — the floating panel content
 *   placement:    "bottom-start" | "bottom-end" | "bottom" |
 *                 "top-start" | "top-end" | "top"   (default: "bottom-start")
 *   offset:       number   — gap between anchor and panel  (default: 6)
 *   open:         boolean  — controlled open state
 *   onOpenChange: function(boolean)  — controlled
 *   disabled:     boolean
 *   className:    string   — applied to the floating panel
 *
 * Usage:
 *   <Popover
 *     trigger={<Button>Open</Button>}
 *     content={<div>Panel content</div>}
 *   />
 *
 *   // Controlled:
 *   <Popover
 *     open={open}
 *     onOpenChange={setOpen}
 *     trigger={<Button>Open</Button>}
 *     content={<Menu.Items />}
 *   />
 */
export function Popover({
  trigger,
  content,
  placement = 'bottom-start',
  offset = 6,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  className = '',
}) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;

  const [coords, setCoords] = useState({ top: 0, left: 0, minWidth: 0 });
  const anchorRef = useRef(null);
  const panelRef = useRef(null);
  const id = useId();

  const setOpen = useCallback((next) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  // Calculate position whenever open changes
  useEffect(() => {
    if (!open || !anchorRef.current) return;

    const place = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const panel = panelRef.current;
      const panelH = panel?.offsetHeight || 0;
      const panelW = panel?.offsetWidth || 0;

      let top, left;
      const [side, align] = placement.split('-');

      if (side === 'bottom') {
        top = rect.bottom + offset;
      } else {
        top = rect.top - panelH - offset;
      }

      if (align === 'end') {
        left = rect.right - panelW;
      } else if (align === 'start' || !align) {
        left = rect.left;
      } else {
        left = rect.left + rect.width / 2 - panelW / 2;
      }

      // Clamp to viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      left = Math.max(8, Math.min(left, vw - panelW - 8));
      top  = Math.max(8, Math.min(top,  vh - panelH - 8));

      setCoords({ top, left, minWidth: rect.width });
    };

    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, placement, offset]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e) => {
      if (
        anchorRef.current?.contains(e.target) ||
        panelRef.current?.contains(e.target)
      ) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [open, setOpen]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, setOpen]);

  const handleTriggerClick = () => {
    if (!disabled) setOpen(!open);
  };

  return (
    <>
      <span
        ref={anchorRef}
        className="nos-popover-anchor"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={handleTriggerClick}
      >
        {trigger}
      </span>

      {open && createPortal(
        <div
          ref={panelRef}
          id={id}
          className={['nos-popover', `nos-popover--${placement}`, className].filter(Boolean).join(' ')}
          role="dialog"
          style={{ top: coords.top, left: coords.left, minWidth: coords.minWidth }}
        >
          {content}
        </div>,
        document.body,
      )}
    </>
  );
}
