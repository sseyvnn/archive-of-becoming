import { Link } from 'react-router-dom'
import { useProjectHover } from '../../context/ProjectHoverContext'
import Thumbnail from './Thumbnail'

/**
 * One entry of the editorial field: a 16:9 thumbnail and its small label.
 * Pure presentation — position/size come from the entry's `layout` data,
 * handed to CSS as custom properties (see WorkField.css).
 */
export default function WorkFieldItem({ item }) {
  const { hoveredProjectId, setHovered, clearHovered } = useProjectHover()
  const { layout } = item

  const isDimmed = hoveredProjectId !== null && item.projectId !== hoveredProjectId
  const isActive = item.projectId !== null && hoveredProjectId === item.projectId

  const style = {
    '--x': layout.desktop.x,
    '--w': layout.desktop.w,
    '--pull': layout.desktop.pull,
    '--x-t': layout.tablet.x,
    '--w-t': layout.tablet.w,
    '--x-m': layout.mobile.x,
    '--w-m': layout.mobile.w,
  }

  const className = [
    'work-item',
    `work-item--${layout.desktop.label}`,
    isDimmed ? 'is-dimmed' : '',
    isActive ? 'is-active' : '',
    item.to ? '' : 'is-static',
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <Thumbnail media={item.thumbnail} tone={item.tone} />
      <span className="work-label">
        <span className="work-label-head">
          <span className="work-label-num mono">{item.number}</span>
          <span className="work-label-sep mono" aria-hidden="true">
            /
          </span>
          <span className="work-label-title mono upper">{item.title}</span>
        </span>
        <span className="work-label-desc mono">{item.description}</span>
        <span className="work-label-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
    </>
  )

  if (!item.to) {
    return (
      <div className={className} style={style}>
        {inner}
      </div>
    )
  }

  return (
    <Link
      to={item.to}
      className={className}
      style={style}
      onMouseEnter={() => item.projectId && setHovered(item.projectId)}
      onMouseLeave={clearHovered}
      onFocus={() => item.projectId && setHovered(item.projectId)}
      onBlur={clearHovered}
      data-cursor="view"
      aria-label={`View project ${item.number} — ${item.title}`}
    >
      {inner}
    </Link>
  )
}
