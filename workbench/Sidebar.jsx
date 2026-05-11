import './Sidebar.css';

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
 * Sidebar — global workbench navigation rail.
 *
 * Renders top-level workbench sections only. Component-level secondary
 * navigation lives inside ComponentsPage, not here.
 *
 * Props:
 *   view:       current navigation state { section, componentId?, category? }
 *   onNavigate: callback(view) called on item click
 */
export function Sidebar({ view, onNavigate }) {
  const activePrimary = PRIMARY_SECTIONS.find((s) => s.id === view.section) || PRIMARY_SECTIONS[0];

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
    </aside>
  );
}

function getSectionView(sectionId, currentView) {
  if (sectionId === 'home') return { section: 'home' };
  if (sectionId === 'component') return { section: 'component' };
  if (sectionId === 'tokens') return { section: 'tokens', category: 'Color' };
  if (sectionId === 'icons') return { section: 'icons' };
  if (sectionId === 'changelog') return { section: 'changelog' };
  if (sectionId === 'pageExamples') return { section: 'pageExamples' };

  return currentView.section === 'playground'
    ? currentView
    : { section: 'playground', playgroundView: 'components' };
}
