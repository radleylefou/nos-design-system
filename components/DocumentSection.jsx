import './DocumentSection.css';

/**
 * DocumentSection — card shell for document content sections.
 *
 * Provides three zones: header (above body), children (body content),
 * and footer (below body, separated by a divider). All zones are optional.
 * No layout is imposed on children — padding only.
 *
 * Props:
 *   header    — optional ReactNode rendered in the header zone (typically SectionHeader)
 *   footer    — optional ReactNode rendered below a divider (typically Button row or AssistBar)
 *   children  — body content
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <section>
 */
export function DocumentSection({ header, footer, children, className = '', ...rest }) {
  const cls = ['nos-document-section', className].filter(Boolean).join(' ');

  return (
    <section className={cls} {...rest}>
      {header && (
        <div className="nos-document-section__header">
          {header}
        </div>
      )}
      {children && (
        <div className="nos-document-section__body">
          {children}
        </div>
      )}
      {footer && (
        <>
          <div className="nos-document-section__divider" aria-hidden="true" />
          <div className="nos-document-section__footer">
            {footer}
          </div>
        </>
      )}
    </section>
  );
}
