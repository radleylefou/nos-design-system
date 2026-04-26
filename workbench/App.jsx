import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { ComponentsPage } from './pages/ComponentsPage.jsx';
import { TokensPage } from './pages/TokensPage.jsx';
import { PlaygroundPage } from './pages/PlaygroundPage.jsx';
import { IconsPage } from './pages/IconsPage.jsx';
import { ChangelogPage } from './pages/ChangelogPage.jsx';
import './App.css';

// Default view shown on first load.
const INITIAL_VIEW = { section: 'component', componentId: 'Button' };

export function App() {
  const [view, setView] = useState(INITIAL_VIEW);

  return (
    <div className="wb-app">
      <Sidebar view={view} onNavigate={setView} />
      <main className="wb-main">
        {view.section === 'component'  && <ComponentsPage componentId={view.componentId} />}
        {view.section === 'tokens'     && <TokensPage category={view.category} />}
        {view.section === 'icons'      && <IconsPage />}
        {view.section === 'changelog'  && <ChangelogPage />}
        {view.section === 'playground' && <PlaygroundPage playgroundView={view.playgroundView} />}
      </main>
    </div>
  );
}
