import { useMemo, useState } from 'react';
import './InstructionsPage.css';

const GITHUB_ROOT = 'https://github.com/radleylefou/nos-design-system';

const REFERENCE_FILES = [
  {
    path: 'DESIGN.md',
    label: 'Design brief',
    description: 'High-level NOS product character, visual principles, and agent guidance.',
  },
  {
    path: 'rules/rules.md',
    label: 'Composition rules',
    description: 'Tactical design rules for composing NOS screens and component patterns.',
  },
  {
    path: 'AGENTS.md',
    label: 'Codex project guide',
    description: 'Authoritative repo instructions, component conventions, and constraints.',
  },
  {
    path: 'CLAUDE.md',
    label: 'Claude project guide',
    description: 'Parallel project context for agents that read Claude-oriented instructions.',
  },
  {
    path: 'tokens/tokens.json',
    label: 'Token source',
    description: 'Source of truth for NOS design values before CSS generation.',
  },
  {
    path: 'tokens/base.css',
    label: 'Global CSS entry',
    description: 'Global stylesheet for token variables, base styles, and reduced motion rules.',
  },
  {
    path: 'components/index.js',
    label: 'Component registry',
    description: 'Exports the reusable NOS components that downstream apps should import.',
  },
];

const QUICK_LINKS = [
  {
    label: 'Components',
    description: 'Browse reusable primitives and demos.',
    view: { section: 'component' },
  },
  {
    label: 'Tokens',
    description: 'Inspect color, type, spacing, radius, shadow, and border values.',
    view: { section: 'tokens', category: 'Color' },
  },
  {
    label: 'Icons',
    description: 'Find the NOS icon set and naming patterns.',
    view: { section: 'icons' },
  },
  {
    label: 'Page Examples',
    description: 'Review full-screen compositions in product context.',
    view: { section: 'pageExamples' },
  },
  {
    label: 'Playground',
    description: 'Prototype combinations with live component examples.',
    view: { section: 'playground', playgroundView: 'components' },
  },
];

/**
 * InstructionsPage - agent handoff page for using the NOS workbench.
 *
 * Props:
 *   onNavigate: callback(view) called by quick-link buttons
 */
export function InstructionsPage({ onNavigate }) {
  const workbenchUrl = getWorkbenchUrl();
  const starterPrompt = useMemo(() => createStarterPrompt(workbenchUrl), [workbenchUrl]);

  return (
    <div className="wb-page wb-instructions">
      <header className="wb-page__header wb-instructions__header">
        <div className="wb-page__eyebrow">Agent Handoff</div>
        <h1 className="wb-page__title">Instructions</h1>
        <p className="wb-page__subtitle">
          Use this page to orient AppGen tools to NOS before they design or build product UI.
          Start with the hosted workbench, then verify implementation details against the
          repo source.
        </p>
      </header>

      <section className="wb-instructions__hero" aria-labelledby="instructions-context">
        <div className="wb-instructions__copy">
          <h2 id="instructions-context">How to use NOS from an AppGen tool</h2>
          <p>
            NOS is the shared component and token library for Nymbl's internal operating
            tools. Agents should treat the workbench as the visual reference, the source
            files as implementation truth, and <code>DESIGN.md</code> as the high-level
            design brief.
          </p>
        </div>
        <div className="wb-instructions__callout" aria-label="Recommended order">
          <span>Recommended order</span>
          <strong>Design brief to Workbench to Tokens to Components to Build</strong>
        </div>
      </section>

      <section className="wb-instructions__section" aria-labelledby="starter-prompt">
        <div className="wb-instructions__section-head">
          <div>
            <div className="wb-instructions__label">Copy into AppGen</div>
            <h2 id="starter-prompt">Starter prompt</h2>
          </div>
          <CopyButton text={starterPrompt} label="Copy prompt" />
        </div>

        <pre className="wb-instructions__prompt" aria-label="Starter prompt">
          <code>{starterPrompt}</code>
        </pre>
      </section>

      <section className="wb-instructions__section" aria-labelledby="reference-files">
        <div className="wb-instructions__section-head">
          <div>
            <div className="wb-instructions__label">Source references</div>
            <h2 id="reference-files">Files agents should inspect</h2>
          </div>
        </div>

        <div className="wb-instructions__reference-grid">
          {REFERENCE_FILES.map((file) => (
            <article key={file.path} className="wb-instructions__reference-card">
              <div className="wb-instructions__reference-body">
                <h3>{file.label}</h3>
                <code>{file.path}</code>
                <p>{file.description}</p>
              </div>
              <div className="wb-instructions__reference-actions">
                <CopyButton text={file.path} label="Copy path" />
                <a
                  className="wb-instructions__source-link"
                  href={`${GITHUB_ROOT}/blob/main/${file.path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wb-instructions__section" aria-labelledby="usage-checklist">
        <div className="wb-instructions__section-head">
          <div>
            <div className="wb-instructions__label">Working agreement</div>
            <h2 id="usage-checklist">Checklist for generated apps</h2>
          </div>
        </div>

        <ul className="wb-instructions__checklist">
          <li>Read <code>DESIGN.md</code> before making layout, color, or typography decisions.</li>
          <li>Import real NOS components from <code>components/index.js</code> instead of recreating them.</li>
          <li>Use CSS custom properties from the token files for all visual values.</li>
          <li>Follow <code>rules/rules.md</code> when composing screens from multiple primitives.</li>
          <li>Verify against workbench demos and page examples before adding new patterns.</li>
        </ul>
      </section>

      <section className="wb-instructions__section" aria-labelledby="quick-nav">
        <div className="wb-instructions__section-head">
          <div>
            <div className="wb-instructions__label">Workbench map</div>
            <h2 id="quick-nav">Jump to references</h2>
          </div>
        </div>

        <div className="wb-instructions__quick-grid">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              className="wb-instructions__quick-card"
              onClick={() => onNavigate(link.view)}
            >
              <span>{link.label}</span>
              <p>{link.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function getWorkbenchUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return 'the hosted NOS workbench';
}

function createStarterPrompt(workbenchUrl) {
  return [
    'You are building with the NOS Design System for Nymbl internal tools.',
    '',
    `Use the hosted workbench as the visual reference: ${workbenchUrl}`,
    `Use the GitHub source as the implementation reference: ${GITHUB_ROOT}`,
    '',
    'Before coding:',
    '1. Read DESIGN.md for the NOS design direction.',
    '2. Browse the workbench Components area and reuse existing NOS components first.',
    '3. Browse Tokens before choosing colors, spacing, radii, shadows, typography, or motion.',
    '4. Import components from components/index.js and import tokens/tokens.css globally.',
    '5. Follow rules/rules.md, AGENTS.md, and CLAUDE.md for composition and repo constraints.',
    '6. Do not hardcode visual values. Do not add UI component libraries that duplicate NOS components. Headless capability libraries such as dnd-kit, @xyflow/react, and @tiptap/react are permitted for behavior that cannot be hand-built.',
    '7. Verify the UI against workbench demos and page examples before inventing new patterns.',
    '8. If a needed component is not in components/index.js, build it as a NOS-compliant component: create ComponentName.jsx and ComponentName.css in components/, export it from index.js, and add a workbench demo.',
    '9. App-specific semantic tokens go in a local tokens-app.css file. Values must reference NOS token variables, never raw hex, and each override needs a comment explaining its semantic intent.',
  ].join('\n');
}

function CopyButton({ text, label }) {
  const [status, setStatus] = useState('idle');

  const handleCopy = async () => {
    const copied = await copyText(text);
    setStatus(copied ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), 1500);
  };

  const buttonLabel = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : label;

  return (
    <button type="button" className="wb-instructions__copy-button" onClick={handleCopy}>
      {buttonLabel}
    </button>
  );
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopy(text);
    }
  }

  return fallbackCopy(text);
}

function fallbackCopy(text) {
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    document.body.removeChild(textarea);
    return false;
  }
}
