import { COMPONENT_CATEGORIES } from '../nav.js';
import { DEMOS } from '../demos/index.jsx';
import './ComponentsPage.css';

/**
 * ComponentsPage — three-level component browser.
 *
 * Level 1 (no categoryId, no componentId): card grid of all components
 * Level 2 (categoryId, no componentId):    category-filtered card grid
 * Level 3 (categoryId + componentId):      component detail view
 *
 * Props:
 *   categoryId:  active category label; drives accordion expansion
 *   componentId: active component name; drives detail view
 *   onNavigate:  callback(view) for all navigation
 */
export function ComponentsPage({ categoryId, componentId, onNavigate }) {
  return (
    <div className="comp-page">
      <ComponentNavSidebar
        categoryId={categoryId}
        componentId={componentId}
        onNavigate={onNavigate}
      />
      <div className="comp-page__content">
        {componentId ? (
          <ComponentDetail
            componentId={componentId}
            categoryId={categoryId}
            onNavigate={onNavigate}
          />
        ) : categoryId ? (
          <CategoryGrid categoryId={categoryId} onNavigate={onNavigate} />
        ) : (
          <AllComponentsGrid onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}

// ── Secondary nav sidebar ──────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M11 7H3M6 4L3 7L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComponentNavSidebar({ categoryId, componentId, onNavigate }) {
  return (
    <nav className="comp-nav" aria-label="Component categories">
      <div className="comp-nav__header">
        <span className="comp-nav__heading">Components</span>
      </div>
      <div className="comp-nav__body">
        {COMPONENT_CATEGORIES.length === 0 ? (
          <p className="comp-nav__empty">No components yet.</p>
        ) : (
          <>
            <button
              type="button"
              className="comp-nav__all"
              onClick={() => onNavigate({ section: 'component' })}
            >
              <span className="comp-nav__all-arrow" aria-hidden="true"><ArrowLeftIcon /></span>
              <span>All components</span>
            </button>
            {COMPONENT_CATEGORIES.map((category) => {
              const isExpanded = categoryId === category.label;
              return (
                <div key={category.label} className="comp-nav__category">
                  <button
                    type="button"
                    className={`comp-nav__cat-header${isExpanded ? ' comp-nav__cat-header--expanded' : ''}`}
                    onClick={() =>
                      onNavigate(
                        isExpanded
                          ? { section: 'component' }
                          : { section: 'component', categoryId: category.label }
                      )
                    }
                  >
                    <span className="comp-nav__cat-label">{category.label}</span>
                    <span className="comp-nav__cat-arrow" aria-hidden="true" />
                  </button>
                  {isExpanded && (
                    <div className="comp-nav__items">
                      {category.components.map((name) => {
                        const isActive = componentId === name;
                        return (
                          <button
                            key={name}
                            type="button"
                            className={`comp-nav__item${isActive ? ' comp-nav__item--active' : ''}`}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() =>
                              onNavigate({
                                section: 'component',
                                categoryId: category.label,
                                componentId: name,
                              })
                            }
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </nav>
  );
}

// ── Content area: Level 1 — all components ────────────────────────────────

function AllComponentsGrid({ onNavigate }) {
  if (COMPONENT_CATEGORIES.length === 0) {
    return (
      <div className="comp-empty">
        <p className="comp-empty__title">No components registered.</p>
        <p className="comp-empty__body">
          Add categories and components to <code>workbench/nav.js</code> to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="comp-landing">
      {COMPONENT_CATEGORIES.map((cat) => (
        <section key={cat.label} className="comp-landing__section">
          <h2 className="comp-landing__section-heading">{cat.label}</h2>
          <div className="comp-grid">
            {cat.components.map((name) => (
              <ComponentCard
                key={name}
                name={name}
                categoryLabel={cat.label}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ── Content area: Level 2 — category grid ────────────────────────────────

function CategoryGrid({ categoryId, onNavigate }) {
  const category = COMPONENT_CATEGORIES.find((c) => c.label === categoryId);

  if (!category) {
    return (
      <div className="comp-empty">
        <p className="comp-empty__title">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="comp-category-view">
      <header className="comp-category-view__header">
        <h1 className="comp-category-view__title">{category.label}</h1>
        {category.description && (
          <p className="comp-category-view__description">{category.description}</p>
        )}
      </header>
      <div className="comp-grid">
        {category.components.map((name) => (
          <ComponentCard
            key={name}
            name={name}
            categoryLabel={category.label}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

// ── Content area: Level 3 — component detail ─────────────────────────────

function ComponentDetail({ componentId, categoryId, onNavigate }) {
  const demo = DEMOS[componentId];

  return (
    <div className="comp-detail">
      <header className="comp-detail__header">
        <div className="comp-detail__breadcrumb">
          <button
            type="button"
            className="comp-detail__breadcrumb-link"
            onClick={() => onNavigate({ section: 'component' })}
          >
            Components
          </button>
          <span className="comp-detail__breadcrumb-sep" aria-hidden="true">›</span>
          <button
            type="button"
            className="comp-detail__breadcrumb-link"
            onClick={() => onNavigate({ section: 'component', categoryId })}
          >
            {categoryId}
          </button>
          <span className="comp-detail__breadcrumb-sep" aria-hidden="true">›</span>
          <span className="comp-detail__breadcrumb-current">{componentId}</span>
        </div>
        <h1 className="comp-detail__title">{componentId}</h1>
        {demo?.description && (
          <p className="comp-detail__description">{demo.description}</p>
        )}
      </header>
      {demo?.detail ? (
        demo.detail()
      ) : (
        <div className="comp-detail__stub">
          <p className="comp-detail__stub-text">
            No demo registered for <strong>{componentId}</strong> yet.
          </p>
          <p className="comp-detail__stub-hint">
            Add an entry in <code>workbench/demos/index.js</code> to document this component.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Component card ────────────────────────────────────────────────────────

function ComponentCard({ name, categoryLabel, onNavigate }) {
  const demo = DEMOS[name];
  const navigate = () =>
    onNavigate({ section: 'component', categoryId: categoryLabel, componentId: name });
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="comp-card"
      onClick={navigate}
      onKeyDown={handleKeyDown}
    >
      <div className="comp-card__preview">
        {demo?.preview ? (
          <div className="comp-card__preview-inner">{demo.preview()}</div>
        ) : (
          <div className="comp-card__preview-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="comp-card__body">
        <span className="comp-card__name">{name}</span>
        {demo?.description && (
          <span className="comp-card__description">{demo.description}</span>
        )}
      </div>
    </div>
  );
}
