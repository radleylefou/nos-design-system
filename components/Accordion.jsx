import { useState, useId, createContext, useContext } from 'react';
import './Accordion.css';

/**
 * Accordion — collapsible content sections.
 *
 * Composition:
 *   <Accordion>
 *     <Accordion.Item title="What is NOS?">
 *       NOS is Nymbl's internal ops suite…
 *     </Accordion.Item>
 *     <Accordion.Item title="How do I add a scope?" defaultOpen>
 *       Click New Scope in the sidebar…
 *     </Accordion.Item>
 *   </Accordion>
 *
 * Props — Accordion:
 *   children:  Accordion.Item elements
 *   multiple:  boolean — allow multiple items open simultaneously  (default: false)
 *   className
 *
 * Props — Accordion.Item:
 *   title:       string | ReactNode — header label
 *   defaultOpen: boolean             (default: false)
 *   open:        boolean             — controlled
 *   onToggle:    function(boolean)   — controlled
 *   disabled:    boolean
 *   className
 */

const AccordionContext = createContext({ multiple: false, openIds: new Set(), toggle: () => {} });

export function Accordion({ children, multiple = false, className = '', ...rest }) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ multiple, openIds, toggle }}>
      <div
        className={['nos-accordion', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  title,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  const internalId = useId();
  const { openIds, toggle: contextToggle } = useContext(AccordionContext);
  const isControlled = controlledOpen !== undefined;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : (openIds.has(internalId) || internalOpen);

  const headerId = `${internalId}-header`;
  const panelId = `${internalId}-panel`;

  const handleToggle = () => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) {
      contextToggle(internalId);
      setInternalOpen(next);
    }
    onToggle?.(next);
  };

  return (
    <div
      className={[
        'nos-accordion-item',
        open ? 'nos-accordion-item--open' : '',
        disabled ? 'nos-accordion-item--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      <h3 className="nos-accordion-item__heading">
        <button
          id={headerId}
          type="button"
          className="nos-accordion-item__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={handleToggle}
        >
          <span className="nos-accordion-item__title">{title}</span>
          <span className="nos-accordion-item__chevron" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="nos-accordion-item__panel"
        hidden={!open}
      >
        <div className="nos-accordion-item__body">{children}</div>
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
