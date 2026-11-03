import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Work from './pages/Work'
import Project from './pages/Project'
import About from './pages/About'
import CV from './pages/CV'
import Contact from './pages/Contact'
import Cursor from './components/Cursor/Cursor'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Cursor />
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:slug" element={<Project />} />
      </Routes>
    </MotionConfig>
  )
}
