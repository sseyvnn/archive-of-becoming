import { createContext, useContext, useMemo, useState, useCallback } from 'react'

/**
 * Shared hover state between the Project Image Field and the Project
 * Reference List. The two are two representations of the same archive:
 * hovering a media tile identifies its project's reference row, and
 * hovering a reference row identifies that project's media tiles.
 *
 * Kept as a single small context rather than duplicating hover logic in
 * both components.
 */
const ProjectHoverContext = createContext(null)

export function ProjectHoverProvider({ children }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null)

  const setHovered = useCallback((projectId) => setHoveredProjectId(projectId), [])
  const clearHovered = useCallback(() => setHoveredProjectId(null), [])

  const value = useMemo(
    () => ({ hoveredProjectId, setHovered, clearHovered }),
    [hoveredProjectId, setHovered, clearHovered]
  )

  return <ProjectHoverContext.Provider value={value}>{children}</ProjectHoverContext.Provider>
}

export function useProjectHover() {
  const ctx = useContext(ProjectHoverContext)
  if (!ctx) {
    throw new Error('useProjectHover must be used within a ProjectHoverProvider')
  }
  return ctx
}
