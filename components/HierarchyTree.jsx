import { useState, createContext, useContext } from 'react';
import './HierarchyTree.css';

/**
 * HierarchyTree — collapsible L1/L2/L3 nesting for scope hierarchies.
 *
 * Composition:
 *   <HierarchyTree>
 *     <HierarchyTree.Node label="Scope Area">
 *       <HierarchyTree.Node label="Capability">
 *         <HierarchyTree.Node label="Requirement" leaf />
 *       </HierarchyTree.Node>
 *     </HierarchyTree.Node>
 *   </HierarchyTree>
 *
 * Props — HierarchyTree:
 *   children: TreeNode elements
 *   className
 *
 * Props — HierarchyTree.Node:
 *   label:           string | ReactNode  — primary label
 *   meta:            ReactNode           — trailing slot (status, count, actions)
 *   defaultExpanded: boolean             (default: true)
 *   expanded:        boolean             — controlled
 *   onToggle:        function(expanded)  — controlled
 *   leaf:            boolean             — no expand toggle, no indent for children
 *   disabled:        boolean
 *   selected:        boolean
 *   onClick:         function
 */

const LevelContext = createContext(0);

export function HierarchyTree({ children, className = '', ...rest }) {
  return (
    <div className={['nos-tree', className].filter(Boolean).join(' ')} role="tree" {...rest}>
      <LevelContext.Provider value={1}>
        {children}
      </LevelContext.Provider>
    </div>
  );
}

function TreeNode({
  label,
  meta,
  defaultExpanded = true,
  expanded: controlledExpanded,
  onToggle,
  leaf = false,
  disabled = false,
  selected = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const level = useContext(LevelContext);
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const hasChildren = !leaf && !!children;

  const handleToggle = (e) => {
    e.stopPropagation();
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  };

  const classes = [
    'nos-tree-node',
    selected ? 'nos-tree-node--selected' : '',
    disabled ? 'nos-tree-node--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ '--_level': level }}
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <div
        className="nos-tree-node__row"
        onClick={!disabled ? onClick : undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick?.();
          if (e.key === 'ArrowRight' && hasChildren && !expanded) handleToggle(e);
          if (e.key === 'ArrowLeft' && hasChildren && expanded) handleToggle(e);
        }}
      >
        <span className="nos-tree-node__indent" aria-hidden="true" />

        {hasChildren ? (
          <button
            type="button"
            className={`nos-tree-node__toggle ${expanded ? 'nos-tree-node__toggle--open' : ''}`}
            onClick={handleToggle}
            tabIndex={-1}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        ) : (
          <span className="nos-tree-node__toggle-placeholder" aria-hidden="true" />
        )}

        <span className="nos-tree-node__label">{label}</span>

        {meta && <span className="nos-tree-node__meta">{meta}</span>}
      </div>

      {hasChildren && expanded && (
        <div className="nos-tree-node__children" role="group">
          <LevelContext.Provider value={level + 1}>
            {children}
          </LevelContext.Provider>
        </div>
      )}
    </div>
  );
}

HierarchyTree.Node = TreeNode;
