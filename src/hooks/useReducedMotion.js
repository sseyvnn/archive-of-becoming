import { useEffect, useState } from 'react'

/**
 * Tracks the user's prefers-reduced-motion setting reactively (it can
 * change mid-session on some OSes). Most animation on this site is CSS
 * driven and already respects the media query on its own; this hook is
 * for the handful of interactions authored in JS (Framer Motion, the
 * marquee's duplication logic, the custom cursor).
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}
