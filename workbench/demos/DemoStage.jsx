import './DemoStage.css';

/**
 * DemoStage — preview container for workbench demos.
 *
 * Renders the component on a white surface.
 *
 * Props:
 *   label      — section label shown above the stage (optional)
 *   children   — the component instance to preview
 *   render     — alternatively, a render function () => JSX if you need
 *                an independent instance (e.g. to avoid shared state)
 *   fullWidth  — stretch surface to full container width (for tables)
 */
export function DemoStage({ label, children, render, fullWidth }) {
  return (
    <div className="demo-stage">
      {label && <p className="demo-stage__label">{label}</p>}
      <div className={`demo-stage__surface${fullWidth ? ' demo-stage__surface--full-width' : ''}`}>
        {render ? render() : children}
      </div>
    </div>
  );
}
