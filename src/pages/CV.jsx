import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee/Marquee'
import Footer from '../components/Footer/Footer'
import { downloadHref, experience, education, selectedProjectSlugs, technologies, additional } from '../data/cv'
import { getProjectBySlug } from '../data/projects'
import './CV.css'

function EntryRow({ period, title, org, location, description, placeholder }) {
  return (
    <div className={`cv-entry${placeholder ? ' is-placeholder' : ''}`}>
      <span className="cv-entry-period mono">{period}</span>
      <div className="cv-entry-body">
        <p className="cv-entry-title upper">{title}</p>
        <p className="cv-entry-org">
          {org}
          {location ? <span className="cv-entry-location"> — {location}</span> : null}
        </p>
        {description ? <p className="cv-entry-description">{description}</p> : null}
      </div>
    </div>
  )
}

/**
 * CV / 02 — a typeset archival CV. No cards, no skill bars, no progress
 * percentages, no software icons — typography and spacing only.
 */
export default function CV() {
  const selectedProjects = selectedProjectSlugs.map(getProjectBySlug).filter(Boolean)

  return (
    <>
      <Marquee />

      <main className="cv-page content-frame">
        <div className="cv-header">
          <span className="page-kicker mono upper">CV / 02</span>
          <a className="cv-download mono upper" href={downloadHref} data-cursor="open">
            Download CV ↗
          </a>
        </div>
        <p className="cv-download-note mono">[Placeholder path — add the real file at /public{downloadHref}]</p>

        <section className="cv-section">
          <h2 className="section-label">Experience</h2>
          <div className="cv-entry-list">
            {experience.map((item, i) => (
              <EntryRow
                key={i}
                period={item.period}
                title={item.role}
                org={item.org}
                location={item.location}
                description={item.description}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="section-label">Education</h2>
          <div className="cv-entry-list">
            {education.map((item, i) => (
              <EntryRow
                key={i}
                period={item.period}
                title={item.field}
                org={item.org}
                location={item.location}
                description={item.description}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="section-label">Selected Projects</h2>
          <div className="cv-project-list">
            {selectedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.slug}`}
                className="cv-project-row"
                data-cursor="view"
              >
                <span className="cv-project-number mono">{project.number}</span>
                <span className="cv-project-title">{project.title}</span>
                <span className="cv-project-year mono">{project.year}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="section-label">Technologies</h2>
          <p className="cv-inline-list">{technologies.join('   ·   ')}</p>
        </section>

        <section className="cv-section">
          <h2 className="section-label">Additional</h2>
          <div className="cv-additional-list">
            {additional.map((note, i) => (
              <p className="cv-additional-item" key={i}>
                {note}
              </p>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
