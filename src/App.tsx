import { lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionDivider from '@/components/shared/SectionDivider'
import GrainOverlay from '@/components/shared/GrainOverlay'
import ScrollToTop from '@/components/shared/ScrollToTop'
import StatStrip from '@/components/shared/StatStrip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Publications from '@/components/sections/Publications'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

// Lazy-load the WebGL ambient scene so the hero paints before three.js loads.
const AmbientScene = lazy(() => import('@/components/three/AmbientScene'))

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div className="relative min-h-screen bg-background text-foreground font-body overflow-x-clip">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Ambient 3D starfield — fixed, behind everything */}
      <Suspense fallback={null}>
        <AmbientScene className="fixed inset-0 z-0 opacity-70 pointer-events-none" />
      </Suspense>
      {/* Clean ambient vignette to anchor the top of the page */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_55%)]" />
      {/* Film-grain texture above content, below progress bar */}
      <GrainOverlay />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-white/80 via-white/50 to-white/20 z-[60]"
        style={{ scaleX }}
      />

      <div className="relative z-10">
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <SectionDivider />
          <StatStrip />
          <About />
          <Projects />
          <SectionDivider flip />
          <Experience />
          <Publications />
          <Skills />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}
