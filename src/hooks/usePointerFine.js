import { useEffect, useState } from 'react'

/**
 * True only for devices with a precise pointer (mouse/trackpad) — used to
 * gate the custom cursor so touch devices always get the native, usable
 * default instead.
 */
export function usePointerFine() {
  const [isFine, setIsFine] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)')
    setIsFine(mql.matches)
    const handler = (e) => setIsFine(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isFine
}
