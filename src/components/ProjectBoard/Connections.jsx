/**
 * Subtle thin lines connecting related artifacts, drawn as one SVG overlay
 * with a 0–100 viewBox — since artifact positions are already authored as
 * percentages (see data/projects.js), the line endpoints are just those
 * same percentages, no DOM measurement needed. Desktop-only: hidden on
 * the mobile editorial sequence via CSS (see ProjectBoard.css).
 */
export default function Connections({ artifactsById, connections }) {
  // Anchor near the top of each artifact (roughly where its number/title
  // caption sits) rather than attempting a true visual center, which would
  // require measuring rendered height.
  const ANCHOR_Y_OFFSET = 4

  return (
    <svg className="board-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {connections.map(({ from, to }) => {
        const a = artifactsById[from]
        const b = artifactsById[to]
        if (!a || !b) return null
        const x1 = a.x + a.width / 2
        const y1 = a.y + ANCHOR_Y_OFFSET
        const x2 = b.x + b.width / 2
        const y2 = b.y + ANCHOR_Y_OFFSET
        return (
          <line
            key={`${from}-${to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
    </svg>
  )
}
