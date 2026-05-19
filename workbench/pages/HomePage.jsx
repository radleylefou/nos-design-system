import './HomePage.css';

/**
 * HomePage — workbench landing view.
 *
 * Shows a "Recently Added" callout row above a grid of section navigation
 * tiles that link to the rest of the workbench (Instructions, Components,
 * Tokens, Icons, Playground, Page Examples, Changelog).
 *
 * Props:
 *   onNavigate: callback(view) — navigates the workbench to the given view
 *               object (same shape used by App.jsx and Sidebar.jsx).
 */

const RECENT = [
  {
    category: 'Foundations',
    name: 'Kbd',
    description: 'Inline keyboard key indicator for shortcuts and hints.',
    addedOn: 'Apr 24, 2026',
    categoryId: 'Foundations',
    componentId: 'Kbd',
  },
  {
    category: 'Feedback',
    name: 'Alerts & Banners',
    description: 'Inline alerts and full-width banners for status messages.',
    addedOn: 'Apr 22, 2026',
    categoryId: 'Feedback',
    componentId: 'Alerts & Banners',
  },
  {
    category: 'Layout',
    name: 'Accordion',
    description: 'Collapsible content panels for progressive disclosure.',
    addedOn: 'Apr 20, 2026',
    categoryId: 'Layout',
    componentId: 'Accordion',
  },
];

const SECTIONS = [
  {
    label: 'Instructions',
    description: 'Copy an AppGen starter prompt and find source references.',
    view: { section: 'instructions' },
  },
  {
    label: 'Components',
    description: 'Browse the full component library by category.',
    view: { section: 'component' },
  },
  {
    label: 'Tokens',
    description: 'Color, typography, spacing, and other design primitives.',
    view: { section: 'tokens', category: 'Color' },
  },
  {
    label: 'Icons',
    description: 'The token-driven NOS icon set with usage guidance.',
    view: { section: 'icons' },
  },
  {
    label: 'Playground',
    description: 'Compose and prototype with live components.',
    view: { section: 'playground', playgroundView: 'components' },
  },
  {
    label: 'Page Examples',
    description: 'Full-page compositions that show components in context.',
    view: { section: 'pageExamples' },
  },
  {
    label: 'Changelog',
    description: 'Recent additions, changes, and fixes across releases.',
    view: { section: 'changelog' },
  },
];

export function HomePage({ onNavigate }) {
  return (
    <div className="wb-page wb-home">
      <header className="wb-page__header">
        <div className="wb-page__eyebrow">NOS Design System</div>
        <h1 className="wb-page__title">Home</h1>
        <p className="wb-page__subtitle">
          The shared component and token library for Nymbl's internal NOS apps.
        </p>
      </header>

      <section className="wb-home__section" aria-labelledby="wb-home-recent">
        <div id="wb-home-recent" className="wb-home__section-label">
          Recently Added
        </div>
        <div className="wb-home__recent-grid">
          {RECENT.map((item) => (
            <article key={item.name} className="wb-home__recent-card">
              <div className="wb-home__recent-category">{item.category}</div>
              <h2 className="wb-home__recent-name">{item.name}</h2>
              <p className="wb-home__recent-desc">{item.description}</p>
              <button
                type="button"
                className="wb-home__recent-link"
                onClick={() =>
                  onNavigate({
                    section: 'component',
                    categoryId: item.categoryId,
                    componentId: item.componentId,
                  })
                }
              >
                View component →
              </button>
              <div className="wb-home__recent-date">Added {item.addedOn}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="wb-home__section" aria-labelledby="wb-home-explore">
        <div id="wb-home-explore" className="wb-home__section-label">
          Explore
        </div>
        <div className="wb-home__sections-grid">
          {SECTIONS.map((section) => (
            <button
              key={section.label}
              type="button"
              className="wb-home__section-tile"
              onClick={() => onNavigate(section.view)}
            >
              <div className="wb-home__section-tile-body">
                <div className="wb-home__section-tile-label">{section.label}</div>
                <p className="wb-home__section-tile-desc">{section.description}</p>
              </div>
              <span className="wb-home__section-tile-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
