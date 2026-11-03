/**
 * One node on a project's process board. The artifact IS the node — no
 * circle, no box drawn around it; only its own media/text plus a small
 * archival number+caption.
 *
 * type: 'info' | 'image' | 'video' | 'text' | 'diagram'
 *
 * mobileOrder: index into the editorial reading sequence used on mobile
 * (applied as CSS `order` on a flex container) — desktop ignores it since
 * artifacts there are positioned absolutely by x/y.
 */
export default function Artifact({ artifact, onExpand, mobileOrder }) {
  const style = {
    '--x': artifact.x,
    '--y': artifact.y,
    '--w': artifact.width,
    '--mobile-order': mobileOrder ?? 0,
  }

  const isMedia = artifact.type === 'image' || artifact.type === 'video'

  return (
    <div className={`board-artifact board-artifact--${artifact.type}`} style={style}>
      <div className="board-artifact-meta mono">
        <span className="board-artifact-number">{artifact.number}</span>
        <span className="board-artifact-title upper">{artifact.title}</span>
      </div>

      {isMedia ? (
        <button
          type="button"
          className="board-artifact-media-frame"
          
          onClick={() => onExpand(artifact)}
          data-cursor="view"
          aria-label={`Expand ${artifact.title.toLowerCase()}`}
        >
          {artifact.type === 'video' ? (
            <video
              className="board-artifact-visual"
              poster={artifact.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={artifact.alt}
            >
              {artifact.sources?.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          ) : (
            <img
              className="board-artifact-visual"
              src={artifact.src}
              alt={artifact.alt}
              loading="lazy"
              decoding="async"
            />
          )}
        </button>
      ) : (
        <div className="board-artifact-text">
          {artifact.type === 'info' ? (
            <p className="board-artifact-caption mono">{artifact.caption}</p>
          ) : (
            <>
              <p className="board-artifact-caption mono">{artifact.caption}</p>
              <p className="board-artifact-body">{artifact.body}</p>
            </>
          )}
        </div>
      )}

      {isMedia && artifact.caption ? (
        <p className="board-artifact-media-caption mono">{artifact.caption}</p>
      ) : null}
    </div>
  )
}
