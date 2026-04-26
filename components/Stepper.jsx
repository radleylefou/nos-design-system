import './Stepper.css';

/**
 * Stepper / Wizard — multi-step progress indicator for sequential flows.
 *
 * Props:
 *   steps:        Array<{ label: string, description?: string }> — step definitions
 *   currentStep:  number   — 0-indexed active step
 *   onStepClick:  function(index) — if provided, past steps are clickable
 *   orientation:  "horizontal" | "vertical"  (default: "horizontal")
 *   size:         "sm" | "md"                (default: "md")
 *   className
 *
 * Usage:
 *   <Stepper
 *     steps={[
 *       { label: 'Scope details' },
 *       { label: 'Requirements', description: 'Add L1–L3 items' },
 *       { label: 'Review & submit' },
 *     ]}
 *     currentStep={1}
 *     onStepClick={(i) => setStep(i)}
 *   />
 */
export function Stepper({
  steps = [],
  currentStep = 0,
  onStepClick,
  orientation = 'horizontal',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = [
    'nos-stepper',
    `nos-stepper--${orientation}`,
    `nos-stepper--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav
      className={classes}
      aria-label="Progress"
      {...rest}
    >
      <ol className="nos-stepper__list">
        {steps.map((step, index) => {
          const state =
            index < currentStep ? 'complete' :
            index === currentStep ? 'active' :
            'pending';

          const clickable = onStepClick && index < currentStep;

          return (
            <li
              key={index}
              className={`nos-stepper__step nos-stepper__step--${state}`}
              aria-current={state === 'active' ? 'step' : undefined}
            >
              <div className="nos-stepper__connector" aria-hidden="true" />

              <div
                className={`nos-stepper__item ${clickable ? 'nos-stepper__item--clickable' : ''}`}
                onClick={clickable ? () => onStepClick(index) : undefined}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={clickable
                  ? (e) => { if (e.key === 'Enter' || e.key === ' ') onStepClick(index); }
                  : undefined
                }
              >
                <span className="nos-stepper__marker" aria-hidden="true">
                  {state === 'complete' ? (
                    <CheckIcon />
                  ) : (
                    <span className="nos-stepper__number">{index + 1}</span>
                  )}
                </span>

                <span className="nos-stepper__labels">
                  <span className="nos-stepper__label">{step.label}</span>
                  {step.description && (
                    <span className="nos-stepper__desc">{step.description}</span>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8l4 4 6-7" />
    </svg>
  );
}
