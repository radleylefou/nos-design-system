import { COMPONENT_CATEGORIES } from '../nav.js';
import './CategoryPage.css';

const CATEGORY_COUNTS = Object.fromEntries(
  COMPONENT_CATEGORIES.map((cat) => [cat.label, cat.components.length]),
);

/**
 * CategoryPage — landing grid shown when "Components" is selected but no
 * category has been chosen yet. Each card navigates into that category's
 * component list.
 *
 * Props:
 *   onSelectCategory: callback(categoryLabel) called when a card is clicked
 */
export function CategoryPage({ onSelectCategory }) {
  return (
    <div className="wb-category-page">
      <header className="wb-category-page__header">
        <p className="wb-category-page__eyebrow">Component Library</p>
        <h1 className="wb-category-page__title">Components</h1>
        <p className="wb-category-page__desc">
          Select a category to browse its components.
        </p>
      </header>

      <div className="wb-category-grid">
        {COMPONENT_CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"
            className="wb-category-card"
            onClick={() => onSelectCategory(cat.label)}
          >
            <div className="wb-category-card__body">
              <div className="wb-category-card__label">{cat.label}</div>
              <p className="wb-category-card__desc">{cat.description}</p>
            </div>
            <div className="wb-category-card__footer">
              <span className="wb-category-card__count">
                {CATEGORY_COUNTS[cat.label]} component{CATEGORY_COUNTS[cat.label] !== 1 ? 's' : ''}
              </span>
              <span className="wb-category-card__arrow" aria-hidden="true">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
