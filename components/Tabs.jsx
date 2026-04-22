import { useId, useLayoutEffect, useRef, useState } from 'react';
import './Tabs.css';

/**
 * Tabs — dense page section switcher for admin workflows.
 *
 * Props:
 *   tabs:          array of { label, value, content, disabled }
 *   value:         controlled active tab value
 *   defaultValue:  initial active tab value when uncontrolled
 *   onValueChange: callback(nextValue)
 *   size:          "sm" | "md"      (default: "md")
 *   ariaLabel:     accessible label for the tab list
 *
 * Usage:
 *   <Tabs
 *     ariaLabel="Account sections"
 *     tabs={[
 *       { label: 'Overview', value: 'overview', content: <Overview /> },
 *       { label: 'Activity', value: 'activity', content: <Activity /> },
 *     ]}
 *   />
 */
export function Tabs({
  tabs = [],
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  ariaLabel = 'Tabs',
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const firstEnabled = tabs.find((tab) => !tab.disabled);
  const [internalValue, setInternalValue] = useState(defaultValue || firstEnabled?.value);
  const activeValue = value ?? internalValue;
  const activeTab = tabs.find((tab) => tab.value === activeValue) || firstEnabled;

  const classes = ['nos-tabs', `nos-tabs--${size}`, className].filter(Boolean).join(' ');

  const listRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const activeButton = listRef.current.querySelector('[aria-selected="true"]');
    if (!activeButton) return;
    const listRect = listRef.current.getBoundingClientRect();
    const tabRect = activeButton.getBoundingClientRect();
    const inset = 8; // spacing-2
    setIndicator({
      left: tabRect.left - listRect.left + inset,
      width: tabRect.width - inset * 2,
    });
  }, [activeTab?.value]);

  const activateTab = (nextValue, disabled) => {
    if (disabled) return;
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={classes} {...rest}>
      <div className="nos-tabs__list" role="tablist" aria-label={ariaLabel} ref={listRef}>
        {tabs.map((tab) => {
          const selected = tab.value === activeTab?.value;
          const tabId = `${generatedId}-${tab.value}-tab`;
          const panelId = `${generatedId}-${tab.value}-panel`;

          return (
            <button
              key={tab.value}
              id={tabId}
              type="button"
              role="tab"
              className="nos-tabs__tab"
              aria-selected={selected}
              aria-controls={panelId}
              disabled={tab.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => activateTab(tab.value, tab.disabled)}
            >
              {tab.label}
            </button>
          );
        })}
        {indicator && (
          <div
            className="nos-tabs__indicator"
            style={{ left: indicator.left, width: indicator.width }}
            aria-hidden="true"
          />
        )}
      </div>
      {activeTab && (
        <div
          id={`${generatedId}-${activeTab.value}-panel`}
          className="nos-tabs__panel"
          role="tabpanel"
          aria-labelledby={`${generatedId}-${activeTab.value}-tab`}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
