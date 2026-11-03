import { useEffect } from 'react'

/**
 * Restrained click-to-expand for image/video artifacts. A quiet fade, a
 * close control, Escape/backdrop to dismiss — no zoom controls, no
 * infinite-canvas behavior.
 */
export default function Lightbox({ artifact, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!artifact) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={artifact.title}>
      <button type="button" className="lightbox-backdrop" onClick={onClose} aria-label="Close" />
      <div className="lightbox-frame">
        {artifact.type === 'video' ? (
          <video className="lightbox-media" autoPlay muted loop playsInline controls>
            {artifact.sources?.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          <img className="lightbox-media" src={artifact.src} alt={artifact.alt} />
        )}
        <div className="lightbox-caption mono">
          <span>{artifact.number}</span>
          <span className="upper">{artifact.title}</span>
        </div>
        <button type="button" className="lightbox-close mono upper" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
