import { useState, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type FilterCategory } from '@/data/projects'
import SectionHeading from '@/components/shared/SectionHeading'
import ProjectCard from '@/components/sections/ProjectCard'
import VideoModal from '@/components/shared/VideoModal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Lazy-load the cinematic showcase — only desktop, non-reduced-motion users pull it.
const ProjectShowcase = lazy(() => import('@/components/sections/ProjectShowcase'))

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Research', value: 'research' },
  { label: 'Competitions', value: 'competition' },
  { label: 'Web Dev', value: 'web' },
]

/** Responsive grid — used on mobile and when reduced motion is requested. */
function ProjectsGrid() {
  const [active, setActive] = useState<FilterCategory>('all')
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="projects" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="02"
        plain="Featured"
        accent="Projects"
        subtitle="Things I've built — from AI research to full-stack apps"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setActive(f.value)}
            className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ color: active === f.value ? '#0b0b0c' : 'var(--color-content-tertiary)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {active === f.value && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 bg-copper rounded-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {active !== f.value && (
              <span className="absolute inset-0 rounded-lg border border-white/[0.08] bg-white/[0.03]" />
            )}
            <span className="relative z-10">{f.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -16 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProjectCard project={project} onVideo={setVideoSrc} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {videoSrc && (
        <VideoModal isOpen={!!videoSrc} src={videoSrc} onClose={() => setVideoSrc(null)} />
      )}
    </section>
  )
}

export default function Projects() {
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (reduced || !isDesktop) return <ProjectsGrid />
  return (
    <Suspense fallback={<div id="projects" className="min-h-screen" />}>
      <ProjectShowcase />
    </Suspense>
  )
}
