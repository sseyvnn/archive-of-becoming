import { motion } from 'framer-motion'
import { ProjectHoverProvider } from '../context/ProjectHoverContext'
import Marquee from '../components/Marquee/Marquee'
import WorkField from '../components/WorkField/WorkField'
import ProjectReferences from '../components/ProjectReferences/ProjectReferences'
import IndexNav from '../components/IndexNav/IndexNav'
import Footer from '../components/Footer/Footer'

/**
 * The landing / work page:
 *   marquee -> editorial thumbnail field -> reference list -> index -> footer.
 * No navbar, no hero, no about copy — the work comes first.
 *
 * The only motion beyond the marquee and hover states is a single, quiet
 * fade-in on first load (MotionConfig in App.jsx already makes this a
 * no-op for prefers-reduced-motion).
 */
export default function Work() {
  return (
    <ProjectHoverProvider>
      {/* Visually hidden — the visual identity is the marquee + imagery
          themselves, but the page still needs one real h1 for a11y/SEO. */}
      <h1 className="visually-hidden">
        SEYVN — creative technologist working across fashion, digital experience, 3D and
        emerging fashion technology. Selected work.
      </h1>
      <Marquee />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <WorkField />
        <ProjectReferences />
        <IndexNav />
      </motion.div>
      <Footer />
    </ProjectHoverProvider>
  )
}
