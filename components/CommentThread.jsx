import { useState } from 'react';
import './CommentThread.css';

/**
 * CommentThread — threaded review comments on scope items.
 *
 * Composition:
 *   <CommentThread onSubmit={(text) => {}}>
 *     <CommentThread.Comment
 *       author="R. Lefou"
 *       timestamp="2d ago"
 *       onResolve={() => {}}
 *     >
 *       This requirement needs a clearer acceptance criterion.
 *       <CommentThread.Reply author="A. Smith" timestamp="1d ago">
 *         Agreed — I've updated the text.
 *       </CommentThread.Reply>
 *     </CommentThread.Comment>
 *   </CommentThread>
 *
 * Props — CommentThread:
 *   children:    Comment elements
 *   onSubmit:    function(text) — called when compose is submitted
 *   placeholder: string
 *   className
 *
 * Props — CommentThread.Comment:
 *   author:     string
 *   timestamp:  string
 *   resolved:   boolean
 *   onResolve:  function()
 *   children:   text + optional Reply elements
 *
 * Props — CommentThread.Reply:
 *   author:    string
 *   timestamp: string
 *   children:  text
 */
export function CommentThread({
  children,
  onSubmit,
  placeholder = 'Add a comment…',
  className = '',
  ...rest
}) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSubmit?.(text);
    setDraft('');
  };

  return (
    <div className={['nos-comment-thread', className].filter(Boolean).join(' ')} {...rest}>
      {children && <div className="nos-comment-thread__list">{children}</div>}

      {onSubmit && (
        <form className="nos-comment-thread__compose" onSubmit={handleSubmit}>
          <div className="nos-comment-thread__compose-avatar" aria-hidden="true">
            <span className="nos-comment__avatar-text">Me</span>
          </div>
          <div className="nos-comment-thread__compose-field">
            <textarea
              className="nos-comment-thread__input"
              placeholder={placeholder}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e);
              }}
            />
            {draft.trim() && (
              <div className="nos-comment-thread__compose-actions">
                <button
                  type="button"
                  className="nos-comment-thread__cancel"
                  onClick={() => setDraft('')}
                >
                  Cancel
                </button>
                <button type="submit" className="nos-comment-thread__submit">
                  Comment
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

/* ── Comment ──────────────────────────────────────────────────────── */

function Comment({
  author,
  timestamp,
  resolved = false,
  onResolve,
  children,
  className = '',
  ...rest
}) {
  // Separate Reply children from text content
  const replies = [];
  const body = [];
  if (children) {
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      if (child?.type === Reply) replies.push(child);
      else body.push(child);
    });
  }

  return (
    <div
      className={['nos-comment', resolved ? 'nos-comment--resolved' : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="nos-comment__avatar" aria-hidden="true">
        <span className="nos-comment__avatar-text">{initials(author)}</span>
      </div>

      <div className="nos-comment__main">
        <div className="nos-comment__header">
          <span className="nos-comment__author">{author}</span>
          {timestamp && <time className="nos-comment__timestamp">{timestamp}</time>}
          {resolved && <span className="nos-comment__resolved-badge">Resolved</span>}
          {onResolve && !resolved && (
            <button
              type="button"
              className="nos-comment__resolve-btn"
              onClick={onResolve}
              title="Resolve comment"
            >
              Resolve
            </button>
          )}
        </div>

        <div className="nos-comment__body">{body}</div>

        {replies.length > 0 && (
          <div className="nos-comment__replies">{replies}</div>
        )}
      </div>
    </div>
  );
}

/* ── Reply ────────────────────────────────────────────────────────── */

function Reply({ author, timestamp, children, className = '', ...rest }) {
  return (
    <div className={['nos-reply', className].filter(Boolean).join(' ')} {...rest}>
      <div className="nos-reply__avatar" aria-hidden="true">
        <span className="nos-comment__avatar-text">{initials(author)}</span>
      </div>
      <div className="nos-reply__main">
        <div className="nos-reply__header">
          <span className="nos-comment__author">{author}</span>
          {timestamp && <time className="nos-comment__timestamp">{timestamp}</time>}
        </div>
        <div className="nos-comment__body">{children}</div>
      </div>
    </div>
  );
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

CommentThread.Comment = Comment;
CommentThread.Reply = Reply;
