/**
 * PageExamplesPage — full-page composition examples showing components in context.
 * Reuses the global .wb-page shell from App.css. No per-file CSS.
 */

const PLANNED_EXAMPLES = [
  { name: 'Dashboard Overview', description: 'Metrics, charts, and activity feed for a NOS app home screen.' },
  { name: 'Data Table View', description: 'Filterable, sortable table with pagination and row actions.' },
  { name: 'Form Wizard', description: 'Multi-step form with validation, progress indicator, and review step.' },
  { name: 'Settings Page', description: 'Sectioned settings layout with toggles, inputs, and save controls.' },
  { name: 'Detail / Profile', description: 'Entity detail page with sidebar metadata and tabbed content areas.' },
];

export function PageExamplesPage() {
  return (
    <div className="wb-page">
      <header className="wb-page__header">
        <div className="wb-page__eyebrow">Workspace</div>
        <h1 className="wb-page__title">Page Examples</h1>
        <p className="wb-page__subtitle">
          Full-page compositions showing NOS components working together in realistic layouts.
        </p>
      </header>

      <section className="wb-section">
        <div className="wb-section__title">Planned examples</div>
        <div className="wb-demo wb-demo--module" style={{ flexDirection: 'column', gap: 'var(--spacing-0)' }}>
          {PLANNED_EXAMPLES.map((ex, i) => (
            <div
              key={ex.name}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-4) 0',
                borderBottom: i < PLANNED_EXAMPLES.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--fg-default)', fontSize: 'var(--font-size-sm)', minWidth: '160px' }}>
                {ex.name}
              </span>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--fg-muted)' }}>
                {ex.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
