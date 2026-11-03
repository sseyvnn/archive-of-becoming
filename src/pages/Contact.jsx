import Marquee from '../components/Marquee/Marquee'
import Footer from '../components/Footer/Footer'
import { contactContent, identity } from '../data/siteConfig'
import './Contact.css'

/**
 * CONTACT / 03 — deliberately minimal. No form, no CTA. Channels without
 * a real link yet are shown as plain text with a small placeholder tag
 * rather than an invented, clickable handle.
 */
export default function Contact() {
  return (
    <>
      <Marquee />

      <main className="contact-page content-frame">
        <span className="page-kicker mono upper">Contact / 03</span>

        <section className="contact-section">
          <h2 className="section-label">Open To</h2>
          <ul className="contact-open-list">
            {contactContent.openTo.map((item) => (
              <li key={item} className="contact-open-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="contact-channels">
          {contactContent.channels.map((channel) => (
            <section className="contact-section" key={channel.label}>
              <h2 className="section-label">{channel.label}</h2>
              {channel.href ? (
                <a className="contact-value" href={channel.href} data-cursor="open">
                  {channel.value} ↗
                </a>
              ) : (
                <p className="contact-value is-placeholder">
                  {channel.value} <span className="contact-placeholder-tag mono">placeholder</span>
                </p>
              )}
            </section>
          ))}

          <section className="contact-section">
            <h2 className="section-label">Location</h2>
            <p className="contact-value">{identity.location}</p>
            <p className="contact-note">{identity.availability}</p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
