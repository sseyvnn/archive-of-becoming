import { useEffect, useRef, useState } from 'react'
import { usePointerFine } from '../../hooks/usePointerFine'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Cursor.css'

/**
 * A restrained custom cursor: a small dot by default, replaced by a tiny
 * "VIEW ↗" / "OPEN ↗" label over elements tagged data-cursor="view"|"open".
 *
 * Only ever active on precise-pointer desktop devices — touch devices and
 * reduced-motion users always keep the native cursor, per spec ("if a
 * custom cursor compromises usability, use the normal browser cursor").
 */
const LABELS = {
  view: 'VIEW ↗',
  open: 'OPEN ↗',
}

export default function Cursor() {
  const isFinePointer = usePointerFine()
  const reducedMotion = useReducedMotion()
  const dotRef = useRef(null)
  const [variant, setVariant] = useState(null)
  const [visible, setVisible] = useState(false)

  const active = isFinePointer && !reducedMotion

  useEffect(() => {
    if (!active) return undefined

    const dot = dotRef.current
    if (!dot) return undefined

    const handleMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      if (!visible) setVisible(true)
    }

    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      setVariant(target ? target.getAttribute('data-cursor') : null)
    }

    const handleLeaveWindow = () => setVisible(false)

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow)
    }
  }, [active, visible])

  if (!active) return null

  return (
    <div
      ref={dotRef}
      className={`custom-cursor${variant ? ' has-label' : ''}${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      {variant ? <span className="custom-cursor-label mono">{LABELS[variant]}</span> : null}
    </div>
  )
}
