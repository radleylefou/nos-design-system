import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { InstructionsPage } from './pages/InstructionsPage.jsx';
import { ComponentsPage } from './pages/ComponentsPage.jsx';
import { TokensPage } from './pages/TokensPage.jsx';
import { PlaygroundPage } from './pages/PlaygroundPage.jsx';
import { IconsPage } from './pages/IconsPage.jsx';
import { ChangelogPage } from './pages/ChangelogPage.jsx';
import { PageExamplesPage } from './pages/PageExamplesPage.jsx';
import { WorkbenchTransition } from './WorkbenchTransition.jsx';
import './App.css';

// Default view — workbench home.
const INITIAL_VIEW = { section: 'home' };

export function App() {
  const [view, setView] = useState(INITIAL_VIEW);
  const viewKey = getViewKey(view);

  return (
    <div className="wb-app">
      <Sidebar view={view} onNavigate={setView} />
      <main className="wb-main">
        <WorkbenchTransition transitionKey={viewKey}>
          {view.section === 'home'         && <HomePage onNavigate={setView} />}
          {view.section === 'instructions' && <InstructionsPage onNavigate={setView} />}
          {view.section === 'component'    && (
            <ComponentsPage
              categoryId={view.categoryId}
              componentId={view.componentId}
              onNavigate={setView}
            />
          )}
          {view.section === 'tokens'       && <TokensPage category={view.category} />}
          {view.section === 'icons'        && <IconsPage />}
          {view.section === 'changelog'    && <ChangelogPage />}
          {view.section === 'playground'   && <PlaygroundPage playgroundView={view.playgroundView} />}
          {view.section === 'pageExamples' && <PageExamplesPage />}
        </WorkbenchTransition>
      </main>
    </div>
  );
}

function getViewKey(view) {
  return [
    view.section,
    view.categoryId,
    view.componentId,
    view.category,
    view.playgroundView,
  ].filter(Boolean).join(':');
}
