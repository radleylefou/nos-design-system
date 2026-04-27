import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { CategoryPage } from './pages/CategoryPage.jsx';
import { ComponentsPage } from './pages/ComponentsPage.jsx';
import { TokensPage } from './pages/TokensPage.jsx';
import { PlaygroundPage } from './pages/PlaygroundPage.jsx';
import { IconsPage } from './pages/IconsPage.jsx';
import { ChangelogPage } from './pages/ChangelogPage.jsx';
import { PageExamplesPage } from './pages/PageExamplesPage.jsx';
import { COMPONENT_CATEGORIES } from './nav.js';
import './App.css';

// Default view — workbench home.
const INITIAL_VIEW = { section: 'home' };

export function App() {
  const [view, setView] = useState(INITIAL_VIEW);

  function handleSelectCategory(categoryLabel) {
    const cat = COMPONENT_CATEGORIES.find((c) => c.label === categoryLabel);
    setView({ section: 'component', categoryId: categoryLabel, componentId: cat?.components[0] });
  }

  return (
    <div className="wb-app">
      <Sidebar view={view} onNavigate={setView} />
      <main className="wb-main">
        {view.section === 'home' && <HomePage onNavigate={setView} />}
        {view.section === 'component' && !view.categoryId && (
          <CategoryPage onSelectCategory={handleSelectCategory} />
        )}
        {view.section === 'component' && view.categoryId && view.componentId && (
          <ComponentsPage componentId={view.componentId} categoryId={view.categoryId} onNavigate={setView} />
        )}
        {view.section === 'tokens'       && <TokensPage category={view.category} />}
        {view.section === 'icons'        && <IconsPage />}
        {view.section === 'changelog'    && <ChangelogPage />}
        {view.section === 'playground'   && <PlaygroundPage playgroundView={view.playgroundView} />}
        {view.section === 'pageExamples' && <PageExamplesPage />}
      </main>
    </div>
  );
}
