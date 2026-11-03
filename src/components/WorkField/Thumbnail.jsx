/**
 * One 16:9 thumbnail. `media` is null while a project has no real asset
 * yet — it then renders a flat, muted placeholder (no fake imagery). Swap
 * in a real image or looping video by filling `thumbnail` in
 * data/workField.js; nothing here needs to change.
 */
export default function Thumbnail({ media, tone }) {
  if (!media) {
    return (
      <span className="work-thumb work-thumb--placeholder" style={{ background: tone }}>
        <span className="work-thumb-note mono upper" aria-hidden="true">
          Placeholder 16:9
        </span>
      </span>
    )
  }

  return (
    <span className="work-thumb">
      {media.type === 'video' ? (
        <video
          className="work-thumb-media"
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={media.alt}
        >
          {media.sources?.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : (
        <img
          className="work-thumb-media"
          src={media.src}
          alt={media.alt ?? ''}
          loading="lazy"
          decoding="async"
        />
      )}
    </span>
  )
}
