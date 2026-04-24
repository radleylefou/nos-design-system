import { COMPONENT_CATEGORIES, TOKEN_CATEGORIES } from './nav.js';
import './Sidebar.css';

const COMPONENT_GROUPS = COMPONENT_CATEGORIES.filter((category) => category.components.length > 0);

const PRIMARY_SECTIONS = [
  { id: 'component', label: 'Components' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'playground', label: 'Playground' },
];

const PLAYGROUND_VIEWS = [
  { id: 'components', label: 'Components' },
  { id: 'loading', label: 'Loading Lab' },
];

/**
 * Sidebar — two-layer workbench navigation.
 *
 * Layer 1: top-level workbench areas.
 * Layer 2: contextual groups/items for the selected area.
 *
 * Props:
 *   view:       current navigation state { section, componentId?, category? }
 *   onNavigate: callback(view) called on item click
 */
export function Sidebar({ view, onNavigate }) {
  const activePrimary = PRIMARY_SECTIONS.find((section) => section.id === view.section) || PRIMARY_SECTIONS[0];

  return (
    <aside className="wb-sidebar">
      <div className="wb-sidebar__rail">
        <div className="wb-sidebar__brand">
          <div className="wb-sidebar__mark" aria-hidden="true">N</div>
          <div className="wb-sidebar__brand-copy">
            <div className="wb-sidebar__brand-title">NOS</div>
            <div className="wb-sidebar__brand-subtitle">Design System</div>
          </div>
        </div>

        <nav className="wb-sidebar__primary-nav" aria-label="Workbench sections">
          {PRIMARY_SECTIONS.map((section) => {
            const active = activePrimary.id === section.id;
            return (
              <button
                key={section.id}
                type="button"
                className={`wb-sidebar__primary-item ${active ? 'wb-sidebar__primary-item--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(getSectionView(section.id, view))}
              >
                {section.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="wb-sidebar__panel">
        <div className="wb-sidebar__panel-header">
          <div className="wb-sidebar__panel-eyebrow">{getPanelEyebrow(view.section)}</div>
          <div className="wb-sidebar__panel-title">{getPanelTitle(view.section)}</div>
        </div>

        <div className="wb-sidebar__panel-body">
          {view.section === 'component' && (
            <nav className="wb-sidebar__secondary-nav" aria-label="Component library">
              {COMPONENT_GROUPS.map((group) => (
                <div key={group.label} className="wb-sidebar__group">
                  <div className="wb-sidebar__group-label">{group.label}</div>
                  <div className="wb-sidebar__group-items">
                    {group.components.map((name) => {
                      const active = view.componentId === name;
                      return (
                        <button
                          key={name}
                          type="button"
                          className={`wb-sidebar__secondary-item ${active ? 'wb-sidebar__secondary-item--active' : ''}`}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => onNavigate({ section: 'component', componentId: name })}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          )}

          {view.section === 'tokens' && (
            <nav className="wb-sidebar__secondary-nav" aria-label="Token categories">
              <div className="wb-sidebar__group">
                <div className="wb-sidebar__group-label">Foundations</div>
                <div className="wb-sidebar__group-items">
                  {TOKEN_CATEGORIES.map((category) => {
                    const active = view.category === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        className={`wb-sidebar__secondary-item ${active ? 'wb-sidebar__secondary-item--active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => onNavigate({ section: 'tokens', category })}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          )}

          {view.section === 'playground' && (
            <nav className="wb-sidebar__secondary-nav" aria-label="Playground views">
              <div className="wb-sidebar__group">
                <div className="wb-sidebar__group-label">Workspace</div>
                <div className="wb-sidebar__group-items">
                  {PLAYGROUND_VIEWS.map((item) => {
                    const active = getPlaygroundView(view) === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`wb-sidebar__secondary-item ${active ? 'wb-sidebar__secondary-item--active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => onNavigate({ section: 'playground', playgroundView: item.id })}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
}

function getSectionView(sectionId, currentView) {
  if (sectionId === 'component') {
    return currentView.section === 'component'
      ? currentView
      : { section: 'component', componentId: currentView.componentId || COMPONENT_GROUPS[0]?.components[0] };
  }

  if (sectionId === 'tokens') {
    return currentView.section === 'tokens'
      ? currentView
      : { section: 'tokens', category: currentView.category || TOKEN_CATEGORIES[0] };
  }

  return currentView.section === 'playground'
    ? currentView
    : { section: 'playground', playgroundView: 'components' };
}

function getPanelEyebrow(section) {
  if (section === 'tokens') return 'Design Tokens';
  if (section === 'playground') return 'Workspace';
  return 'Component Library';
}

function getPanelTitle(section) {
  if (section === 'tokens') return 'Tokens';
  if (section === 'playground') return 'Playground';
  return 'Components';
}

function getPlaygroundView(view) {
  return PLAYGROUND_VIEWS.some((item) => item.id === view.playgroundView)
    ? view.playgroundView
    : 'components';
}
