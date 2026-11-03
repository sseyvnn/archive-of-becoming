import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="micro-footer content-frame">
      <div className="micro-footer-row">
        <span className="mono upper">Archive of Becoming</span>
        <span className="mono">{year}</span>
      </div>
      <div className="micro-footer-row">
        <span className="mono upper">Becoming SEYVN</span>
        <span className="mono upper">Portfolio</span>
      </div>
    </footer>
  )
}
