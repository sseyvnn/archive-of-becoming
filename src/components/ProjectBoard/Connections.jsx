
/**
 * Short connecting lines between project artifacts.
 * Applies to every project board.
 */
export default function Connections({ artifactsById, connections }) {
  const ANCHOR_Y_OFFSET = 4
  const TRIM = 7

  return (
    <svg
      className="board-connections"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {connections.map(({ from, to }) => {
        const a = artifactsById[from]
        const b = artifactsById[to]

        if (!a || !b) return null

        const x1 = a.x + a.width / 2
        const y1 = a.y + ANCHOR_Y_OFFSET
        const x2 = b.x + b.width / 2
        const y2 = b.y + ANCHOR_Y_OFFSET

        const dx = x2 - x1
        const dy = y2 - y1
        const distance = Math.hypot(dx, dy)

        if (distance <= TRIM * 2) return null

        const ux = dx / distance
        const uy = dy / distance

        return (
          <line
            key={`${from}-${to}`}
            x1={x1 + ux * TRIM}
            y1={y1 + uy * TRIM}
            x2={x2 - ux * TRIM}
            y2={y2 - uy * TRIM}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
    </svg>
  )
}
