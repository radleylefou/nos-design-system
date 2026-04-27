import { COMPONENT_CATEGORIES } from './nav.js';
import './Sidebar.css';

const COMPONENT_GROUPS = COMPONENT_CATEGORIES.filter((category) => category.components.length > 0);

const PRIMARY_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'component', label: 'Components' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'icons', label: 'Icons' },
  { id: 'playground', label: 'Playground' },
  { id: 'pageExamples', label: 'Page Examples' },
  { id: 'changelog', label: 'Changelog' },
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

  const activeCategory = view.section === 'component' && view.categoryId
    ? COMPONENT_GROUPS.find((g) => g.label === view.categoryId)
    : null;

  const showPanel = !!activeCategory;

  return (
    <aside className={`wb-sidebar${showPanel ? '' : ' wb-sidebar--no-panel'}`}>
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

      {activeCategory && (
        <div className="wb-sidebar__panel">
          <div className="wb-sidebar__panel-body">
            <button
              type="button"
              className="wb-sidebar__back-btn"
              onClick={() => onNavigate({ section: 'component' })}
            >
              ← All categories
            </button>
            <nav className="wb-sidebar__secondary-nav" aria-label={`${activeCategory.label} components`}>
              <div className="wb-sidebar__group-items">
                {activeCategory.components.map((name) => {
                  const active = view.componentId === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      className={`wb-sidebar__secondary-item ${active ? 'wb-sidebar__secondary-item--active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => onNavigate({ section: 'component', categoryId: view.categoryId, componentId: name })}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </aside>
  );
}

function getSectionView(sectionId, currentView) {
  if (sectionId === 'home') {
    return { section: 'home' };
  }

  if (sectionId === 'component') {
    // Always go back to the category landing grid.
    return { section: 'component' };
  }

  if (sectionId === 'tokens') {
    return { section: 'tokens', category: 'Color' };
  }

  if (sectionId === 'icons') {
    return { section: 'icons' };
  }

  if (sectionId === 'changelog') {
    return { section: 'changelog' };
  }

  if (sectionId === 'pageExamples') {
    return { section: 'pageExamples' };
  }

  return currentView.section === 'playground'
    ? currentView
    : { section: 'playground', playgroundView: 'components' };
}
