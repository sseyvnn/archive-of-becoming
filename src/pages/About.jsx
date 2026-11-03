import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee/Marquee'
import Footer from '../components/Footer/Footer'
import { aboutContent, identity } from '../data/siteConfig'
import './About.css'

function ListSection({ label, items }) {
  return (
    <div className="about-list-section">
      <h3 className="section-label">{label}</h3>
      <ul className="about-list">
        {items.map((item) => (
          <li key={item} className="about-list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * ABOUT / 01 — editorial profile / archive entry. No "Hi, I'm..." copy;
 * reads like a documentary page about the practice, not an introduction.
 */
export default function About() {
  return (
    <>
      <Marquee />

      <main className="about-page content-frame">
        <div className="about-header">
          <span className="page-kicker mono upper">About / 01</span>
        </div>

        <div className="about-lede">
          <p className="about-statement">{aboutContent.statement}</p>

          <div className="about-portrait" aria-hidden="true">
            <span className="about-portrait-label mono upper">Portrait</span>
            <span className="about-portrait-note mono">[Placeholder — replace with a real image]</span>
          </div>
        </div>

        <div className="about-sections">
          <ListSection label="Practice" items={aboutContent.practice} />
          <ListSection label="Education" items={aboutContent.education} />
          <ListSection label="Currently Exploring" items={aboutContent.currentlyExploring} />
          <ListSection label="Tools" items={aboutContent.tools} />
        </div>

        <div className="about-archive-note">
          <h3 className="section-label">{identity.archiveName}</h3>
          <p className="about-archive-statement">{aboutContent.archiveStatement}</p>
        </div>

        <div className="about-links">
          <Link to="/cv" className="about-link mono upper" data-cursor="open">
            CV ↗
          </Link>
          <Link to="/contact" className="about-link mono upper" data-cursor="open">
            Contact ↗
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
