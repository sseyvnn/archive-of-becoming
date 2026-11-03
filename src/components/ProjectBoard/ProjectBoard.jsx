import { useState } from 'react'
import Artifact from './Artifact'
import Connections from './Connections'
import Lightbox from './Lightbox'
import './ProjectBoard.css'

// Reading order for the mobile editorial sequence — a coherent process
// narrative (info, then research through to the final output) rather than
// the board's spatial/data order. Applied as a flex `order`, so desktop
// and mobile share one set of DOM nodes (no duplicated media/video).
const MOBILE_ORDER = ['info', 'research', 'prototype', 'model', 'experiment', 'interface', 'final']

function suffixOf(artifactId) {
  return MOBILE_ORDER.find((key) => artifactId.endsWith(`-${key}`)) ?? ''
}

/**
 * Desktop: the project's ecosystem as one spatial composition — artifacts
 * placed at their authored x/y/width, thin connecting lines between
 * related ones. Mobile: the same artifacts, same DOM, re-flowed (via CSS
 * `order`) into an intentional vertical editorial sequence — see
 * ProjectBoard.css.
 */
export default function ProjectBoard({ board }) {
  const [expanded, setExpanded] = useState(null)

  const artifactsById = Object.fromEntries(board.artifacts.map((a) => [a.id, a]))

  return (
    <div className="project-board">
      <Connections artifactsById={artifactsById} connections={board.connections} />

      <div className="project-board-artifacts">
        {board.artifacts.map((artifact) => (
          <Artifact
            key={artifact.id}
            artifact={artifact}
            onExpand={setExpanded}
            mobileOrder={MOBILE_ORDER.indexOf(suffixOf(artifact.id))}
          />
        ))}
      </div>

      <Lightbox artifact={expanded} onClose={() => setExpanded(null)} />
    </div>
  )
}
