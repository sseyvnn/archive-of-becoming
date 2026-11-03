import { Link } from 'react-router-dom'
import './IndexNav.css'

const ENTRIES = [
  { number: '00', label: 'Work', to: '/work' },
  { number: '01', label: 'About', to: '/about' },
  { number: '02', label: 'CV', to: '/cv' },
  { number: '03', label: 'Contact', to: '/contact' },
]

/**
 * The site's main navigation, styled as a publication's index rather than
 * a navbar. Lives inline in the page flow, well after the work itself.
 */
export default function IndexNav() {
  return (
    <nav className="index-nav content-frame" aria-label="Site index">
      <h2 className="index-heading upper">Index</h2>

      <ol className="index-list">
        {ENTRIES.map((entry) => (
          <li className="index-row" key={entry.number}>
            <Link to={entry.to} className="index-link" data-cursor="open">
              <span className="index-number mono">{entry.number}</span>
              <span className="index-label upper">{entry.label}</span>
              <span className="index-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
