import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { useProjectHover } from '../../context/ProjectHoverContext'
import './ProjectReferences.css'

/**
 * The legend / reference section — modeled on the reference key at the
 * bottom of an architectural presentation board. Two-way hover sync with
 * the image field above via ProjectHoverContext.
 */
export default function ProjectReferences() {
  const { hoveredProjectId, setHovered, clearHovered } = useProjectHover()

  return (
    <section className="project-references content-frame" aria-labelledby="references-heading">
      <h2 id="references-heading" className="references-heading mono upper">
        Work / 2026
      </h2>

      <ul className="references-list">
        {projects.map((project) => {
          const isDimmed = hoveredProjectId !== null && hoveredProjectId !== project.id
          const isActive = hoveredProjectId === project.id

          return (
            <li
              key={project.id}
              className={`reference-item${isDimmed ? ' is-dimmed' : ''}${isActive ? ' is-active' : ''}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={clearHovered}
            >
              <Link
                to={`/project/${project.slug}`}
                className="reference-link"
                onFocus={() => setHovered(project.id)}
                onBlur={clearHovered}
                data-cursor="view"
              >
                <span className="reference-number mono">{project.number}</span>
                <span className="reference-body">
                  <span className="reference-title">{project.title}</span>
                  <span className="reference-desc">{project.shortDescription}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
