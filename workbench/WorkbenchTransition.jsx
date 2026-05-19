import { useEffect, useRef, useState } from 'react';

const EXIT_MS = 120;

/**
 * WorkbenchTransition — lightweight keyed page/panel transition.
 *
 * Keeps the outgoing child mounted briefly so it can fade and drift upward
 * before the incoming child fades in from below. This mirrors the reference
 * motion without adding an animation dependency to the workbench.
 */
export function WorkbenchTransition({ transitionKey, children, className = '', variant = 'page' }) {
  const [rendered, setRendered] = useState({
    children,
    key: transitionKey,
    phase: 'enter',
  });
  const timeoutRef = useRef(null);
  const nextKeyRef = useRef(transitionKey);
  const nextChildrenRef = useRef(children);

  nextKeyRef.current = transitionKey;
  nextChildrenRef.current = children;

  useEffect(() => {
    if (rendered.key === transitionKey) {
      return undefined;
    }

    window.clearTimeout(timeoutRef.current);

    if (prefersReducedMotion()) {
      setRendered({
        children: nextChildrenRef.current,
        key: nextKeyRef.current,
        phase: 'enter',
      });
      return undefined;
    }

    setRendered((current) => (
      current.phase === 'exit' ? current : { ...current, phase: 'exit' }
    ));

    timeoutRef.current = window.setTimeout(() => {
      setRendered({
        children: nextChildrenRef.current,
        key: nextKeyRef.current,
        phase: 'enter',
      });
    }, EXIT_MS);

    return () => window.clearTimeout(timeoutRef.current);
  }, [rendered.key, transitionKey]);

  const classes = [
    'wb-transition',
    `wb-transition--${rendered.phase}`,
    variant === 'tab' ? 'wb-transition--tab' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} data-transition-key={rendered.key}>
      {rendered.children}
    </div>
  );
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
