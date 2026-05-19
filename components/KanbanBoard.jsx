/**
 * KanbanBoard — Token-driven Kanban board with drag-and-drop via dnd-kit.
 *
 * Composed of three presentational sub-components:
 *   - KanbanBoard: the horizontal board container
 *   - KanbanColumn: a swimlane column with header and card list
 *   - KanbanCard: an individual draggable card (presentational)
 *
 * Drag behavior is wired via dnd-kit. All visual output uses NOS tokens.
 *
 * @example
 * // Minimal controlled usage:
 * const [columns, setColumns] = useState(initialColumns);
 *
 * <KanbanBoard
 *   columns={columns}
 *   onCardMove={({ cardId, fromColumn, toColumn }) => { ... }}
 *   renderCard={(card) => <KanbanCard key={card.id} {...card} />}
 * />
 *
 * @prop {Array}    columns        - Array of { id, title, cards[] }
 * @prop {Function} onCardMove     - Called with { cardId, fromColumn, toColumn, newIndex }
 * @prop {Function} renderCard     - Optional custom card renderer; receives card data
 * @prop {string}   className      - Additional class names for the board container
 */

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './KanbanBoard.css';

/* ── KanbanCard (presentational) ─────────────────────────────────────────── */

/**
 * KanbanCard — A single card rendered inside a KanbanColumn.
 * Purely presentational. Drag wiring is applied by KanbanColumn via useSortable.
 *
 * @prop {string} id          - Unique card identifier
 * @prop {string} title       - Primary card title
 * @prop {string} [status]    - Optional status string for StatusPill
 * @prop {string} [typeColor] - CSS custom property value for the L1 type dot (e.g. var(--color-type-experience))
 * @prop {string} [label]     - Secondary metadata label (e.g. epic name, assignee)
 * @prop {boolean} isDragging - Provided by sortable context; dims the card while dragging
 * @prop {object} dragHandleProps - Spread onto the drag handle element
 */
export function KanbanCard({
  id,
  title,
  status,
  typeColor,
  label,
  isDragging = false,
  isOverlay = false,
  dragHandleProps = {},
  className = '',
  ...rest
}) {
  const cls = [
    'kanban-card',
    isDragging ? 'kanban-card--dragging' : '',
    isOverlay ? 'kanban-card--overlay' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} tabIndex={0} aria-label={title} {...rest}>
      <div className="kanban-card__header">
        <span className="kanban-card__title">{title}</span>
        <span className="kanban-card__drag-handle" {...dragHandleProps} aria-hidden>
          {/* Grip icon using NOS icon paths */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 4h.01M5 8h.01M5 12h.01M11 4h.01M11 8h.01M11 12h.01" />
          </svg>
        </span>
      </div>
      {(typeColor || label || status) && (
        <div className="kanban-card__meta">
          {typeColor && (
            <span className="kanban-card__type-dot" style={{ background: typeColor }} />
          )}
          {label && <span className="kanban-card__label">{label}</span>}
          {status && (
            <span className="kanban-card__label" style={{ marginLeft: 'auto' }}>{status}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ── SortableCard (drag wiring wrapper) ──────────────────────────────────── */

function SortableCard({ card, renderCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (renderCard) {
    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        {renderCard(card, { isDragging, dragHandleProps: listeners })}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <KanbanCard
        {...card}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
}

/* ── KanbanColumn ────────────────────────────────────────────────────────── */

/**
 * KanbanColumn — A swimlane column containing sorted, droppable cards.
 *
 * @prop {string}   id         - Column identifier (used by dnd-kit)
 * @prop {string}   title      - Column header label
 * @prop {Array}    cards      - Array of card data objects (must have `id`)
 * @prop {Function} renderCard - Optional custom card renderer
 * @prop {string}   className  - Additional class names
 */
export function KanbanColumn({ id, title, cards = [], renderCard, className = '', ...rest }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const cls = [
    'kanban-column',
    isOver ? 'kanban-column--over' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      <div className="kanban-column__header">
        <span className="kanban-column__title">{title}</span>
        <span className="kanban-column__count">{cards.length}</span>
      </div>
      <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="kanban-column__cards">
          {cards.map(card => (
            <SortableCard key={card.id} card={card} renderCard={renderCard} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

/* ── KanbanBoard ─────────────────────────────────────────────────────────── */

/**
 * KanbanBoard — Horizontal board container. Manages drag-and-drop state
 * via dnd-kit and calls onCardMove when a card is dropped in a new position.
 *
 * @prop {Array}    columns    - Array of { id, title, cards[] }
 * @prop {Function} onCardMove - Called with { cardId, fromColumn, toColumn, newIndex }
 * @prop {Function} renderCard - Optional custom card renderer
 * @prop {string}   className  - Additional class names
 */
export function KanbanBoard({ columns = [], onCardMove, renderCard, className = '', ...rest }) {
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function findColumn(cardId) {
    return columns.find(col => col.cards.some(c => c.id === cardId));
  }

  function handleDragStart({ active }) {
    const col = findColumn(active.id);
    const card = col?.cards.find(c => c.id === active.id);
    setActiveCard(card ?? null);
  }

  function handleDragEnd({ active, over }) {
    setActiveCard(null);
    if (!over || active.id === over.id) return;

    const fromCol = findColumn(active.id);
    const toCol = findColumn(over.id) ?? columns.find(c => c.id === over.id);
    if (!fromCol || !toCol) return;

    const oldIndex = fromCol.cards.findIndex(c => c.id === active.id);
    const newIndex = toCol.cards.findIndex(c => c.id === over.id);

    onCardMove?.({
      cardId: active.id,
      fromColumn: fromCol.id,
      toColumn: toCol.id,
      oldIndex,
      newIndex: newIndex === -1 ? toCol.cards.length : newIndex,
    });
  }

  const cls = ['kanban-board', className].filter(Boolean).join(' ');

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cls} {...rest}>
        {columns.map(col => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            cards={col.cards}
            renderCard={renderCard}
          />
        ))}
      </div>

      {/* Drag overlay — renders a floating copy of the dragged card */}
      <DragOverlay>
        {activeCard
          ? renderCard
            ? renderCard(activeCard, { isOverlay: true })
            : <KanbanCard {...activeCard} isOverlay />
          : null}
      </DragOverlay>
    </DndContext>
  );
}
