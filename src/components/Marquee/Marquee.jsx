import { useLayoutEffect, useRef, useState } from 'react'
import './Marquee.css'

const WORD = 'SEYVN'

// Drift speed in CSS px per second — slow and subtle on purpose. The
// animation duration is derived from this and the measured loop length, so
// the speed looks identical on a phone and on an ultra-wide monitor.
const SPEED_PX_PER_SECOND = 20

// Generous first-paint guess (before measuring) so there's never a visible
// gap even for a single frame; replaced by the measured value immediately.
const INITIAL_COUNT = 48

function MarqueeGroup({ count, probeRef }) {
  return (
    <div className="marquee-group" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span className="marquee-item mono" key={i} ref={i === 0 ? probeRef : undefined}>
          {WORD}
        </span>
      ))}
    </div>
  )
}

/**
 * The SEYVN identity strip — a continuous right-to-left loop.
 *
 * The rail holds two identical groups side by side and translates exactly
 * -50%, so when group A has fully left the screen group B is sitting where
 * A started and the loop restarts with no visible jump. For that to be
 * seamless at ANY width, a single group must be at least as wide as the
 * viewport — otherwise an empty gap trails the first group on wide
 * screens. So the number of repetitions per group is measured (item width
 * vs. strip width) and recomputed on resize.
 *
 * prefers-reduced-motion: the animation is switched off entirely in
 * Marquee.css; the strip just sits still, already filled edge to edge.
 */
export default function Marquee() {
  const stripRef = useRef(null)
  const probeRef = useRef(null)
  const [layout, setLayout] = useState({ count: INITIAL_COUNT, duration: null })

  useLayoutEffect(() => {
    const strip = stripRef.current
    if (!strip) return undefined

    const measure = () => {
      const item = probeRef.current
      if (!item) return
      const itemWidth = item.getBoundingClientRect().width
      if (!itemWidth) return
      // +1 so the group always overshoots the viewport, never undershoots.
      const needed = Math.max(2, Math.ceil(strip.clientWidth / itemWidth) + 1)
      const duration = (needed * itemWidth) / SPEED_PX_PER_SECOND
      setLayout((prev) =>
        prev.count === needed && prev.duration && Math.abs(prev.duration - duration) < 0.01
          ? prev
          : { count: needed, duration }
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(strip)
    // Web fonts can change the glyph width after first paint.
    if (document.fonts?.ready) document.fonts.ready.then(measure)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="marquee" role="banner" aria-label="SEYVN" ref={stripRef}>
      <div
        className="marquee-rail"
        style={layout.duration ? { animationDuration: `${layout.duration}s` } : undefined}
      >
        <MarqueeGroup count={layout.count} probeRef={probeRef} />
        <MarqueeGroup count={layout.count} />
      </div>
    </div>
  )
}
