import { COMPONENT_CATEGORIES, TOKEN_CATEGORIES } from './nav.js';
import './Sidebar.css';

/**
 * Sidebar — fixed left navigation for the workbench.
 *
 * Props:
 *   view:       current navigation state { section, componentId?, category? }
 *   onNavigate: callback(view) called on item click
 */
export function Sidebar({ view, onNavigate }) {
  return (
    <aside className="wb-sidebar">
      <div className="wb-sidebar__header">
        <div className="wb-sidebar__mark" aria-hidden="true">N</div>
        <div>
          <div className="wb-sidebar__title">NOS Design System</div>
          <div className="wb-sidebar__version">v0.1</div>
        </div>
      </div>

      <nav className="wb-sidebar__nav">
        {/* COMPONENTS */}
        <div className="wb-sidebar__section-label">Components</div>
        {COMPONENT_CATEGORIES.filter((cat) => cat.components.length > 0).map((cat) => (
          <div key={cat.label} className="wb-sidebar__category">
            <div className="wb-sidebar__category-label">{cat.label}</div>
            {cat.components.map((name) => {
              const active = view.section === 'component' && view.componentId === name;
              return (
                <button
                  key={name}
                  type="button"
                  className={`wb-sidebar__item ${active ? 'wb-sidebar__item--active' : ''}`}
                  onClick={() => onNavigate({ section: 'component', componentId: name })}
                >
                  {name}
                </button>
              );
            })}
          </div>
        ))}

        {/* TOKENS */}
        <div className="wb-sidebar__section-label wb-sidebar__section-label--spaced">Tokens</div>
        {TOKEN_CATEGORIES.map((cat) => {
          const active = view.section === 'tokens' && view.category === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`wb-sidebar__item ${active ? 'wb-sidebar__item--active' : ''}`}
              onClick={() => onNavigate({ section: 'tokens', category: cat })}
            >
              {cat}
            </button>
          );
        })}

        {/* PLAYGROUND */}
        <div className="wb-sidebar__section-label wb-sidebar__section-label--spaced">Playground</div>
        <button
          type="button"
          className={`wb-sidebar__item ${view.section === 'playground' ? 'wb-sidebar__item--active' : ''}`}
          onClick={() => onNavigate({ section: 'playground' })}
        >
          Playground
        </button>
      </nav>
    </aside>
  );
}
