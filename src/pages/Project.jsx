import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, getAdjacentProjects } from '../data/projects'
import Marquee from '../components/Marquee/Marquee'
import Footer from '../components/Footer/Footer'
import ProjectBoard from '../components/ProjectBoard/ProjectBoard'
import './Project.css'

/**
 * A single project's page — read as the project's "process board" rather
 * than a conventional case-study scroll. Desktop lays every artifact out
 * as one spatial composition (see ProjectBoard); on mobile the same
 * artifacts re-flow into an intentional vertical editorial sequence.
 */
export default function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <>
        <Marquee />
        <main className="project-page content-frame">
          <span className="page-kicker mono upper">Project</span>
          <p className="project-not-found">No project matches this address.</p>
          <Link to="/work" className="project-nav-link mono upper" data-cursor="open">
            ← Work
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const { previous, next } = getAdjacentProjects(slug)

  return (
    <>
      <Marquee />

      <main className="project-page content-frame">
        <div className="project-header">
          <span className="page-kicker mono upper">Project / {project.number}</span>
          <Link to="/work" className="project-nav-link mono upper" data-cursor="open">
            ← Work
          </Link>
        </div>

        <div className="project-intro">
          <h1 className="project-title upper">{project.title}</h1>
          <p className="project-short-description">{project.shortDescription}</p>

          <div className="project-meta mono">
            <span>{project.year}</span>
            <span>{project.role}</span>
            <span>{project.disciplines.join(' / ')}</span>
          </div>

          <p className="project-tools mono">{project.tools.join('   ·   ')}</p>
        </div>

        <ProjectBoard board={project.projectBoard} />

        <nav className="project-adjacent-nav" aria-label="Adjacent projects">
          {previous ? (
            <Link to={`/project/${previous.slug}`} className="project-adjacent-link" data-cursor="view">
              <span className="project-adjacent-label mono upper">← Previous Project</span>
              <span className="project-adjacent-title upper">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link to={`/project/${next.slug}`} className="project-adjacent-link is-next" data-cursor="view">
              <span className="project-adjacent-label mono upper">Next Project →</span>
              <span className="project-adjacent-title upper">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      <Footer />
    </>
  )
}
