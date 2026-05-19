import { useRef } from 'react';
import './PageTabs.css';

/**
 * PageTabs — horizontal underline-style tab bar for document navigation.
 *
 * Use for top-level section switching on document or detail pages (3–7 tabs).
 * For compact option toggles inside forms/modals, use SegmentedControl instead.
 *
 * Props:
 *   tabs        — array of { id: string, label: string }
 *   activeTab   — id of the currently active tab
 *   onTabChange — callback(id: string) called when a tab is clicked or activated via keyboard
 *   ...rest     — forwarded to the root <nav>
 */
export function PageTabs({ tabs = [], activeTab, onTabChange, className = '', ...rest }) {
  const listRef = useRef(null);
  const cls = ['nos-page-tabs', className].filter(Boolean).join(' ');

  function handleKeyDown(e, index) {
    const items = listRef.current?.querySelectorAll('[role="tab"]');
    if (!items) return;
    let next = null;

    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;

    e.preventDefault();
    items[next].focus();
    onTabChange?.(tabs[next].id);
  }

  return (
    <nav className={cls} {...rest}>
      <div className="nos-page-tabs__list" role="tablist" ref={listRef}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`nos-page-tabs__tab${isActive ? ' nos-page-tabs__tab--active' : ''}`}
              onClick={() => onTabChange?.(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={isActive ? 0 : -1}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
