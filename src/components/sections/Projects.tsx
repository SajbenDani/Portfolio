import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Play, BookOpen, Trophy, Lock, PlayCircle } from 'lucide-react'
import { projects, type FilterCategory, type Project } from '@/data/projects'
import SectionHeading from '@/components/shared/SectionHeading'
import VideoModal from '@/components/shared/VideoModal'

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Research', value: 'research' },
  { label: 'Competitions', value: 'competition' },
  { label: 'Web Dev', value: 'web' },
]

function getPrimaryLink(project: Project): string | null {
  if (project.isPrivate) return null
  if (project.primaryLink) return project.primaryLink
  if (project.github) return project.github
  if (project.pdf) return project.pdf
  return null
}

export default function Projects() {
  const [active, setActive] = useState<FilterCategory>('all')
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  const handleCardClick = (project: Project) => {
    if (project.isPrivate) return
    if (project.video) {
      setVideoSrc(project.video)
      return
    }
    const url = getPrimaryLink(project)
    if (url) window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <section id="projects" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        plain="Featured"
        accent="Projects"
        subtitle="Things I've built — from AI research to full-stack apps"
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setActive(f.value)}
            className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ color: active === f.value ? '#030303' : 'rgba(255,255,255,0.5)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {active === f.value && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 bg-[#00d4ff] rounded-lg"
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

      {/* Project grid */}
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
              <motion.div
                className={`glass-card rounded-xl overflow-hidden group ${project.isPrivate ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={
                  project.isPrivate
                    ? undefined
                    : { y: -6, boxShadow: '0 20px 40px rgba(0,212,255,0.12)' }
                }
                transition={{ duration: 0.25 }}
                onClick={() => handleCardClick(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${project.isPrivate ? '' : 'group-hover:scale-105'}`}
                    style={project.isPrivate ? { filter: 'blur(6px)', transform: 'scale(1.05)' } : undefined}
                    onError={(e) => {
                      const target = e.currentTarget
                      if (!target.src.includes('unsplash')) {
                        target.src =
                          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format'
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Private overlay */}
                  {project.isPrivate && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
                      <Lock size={24} className="text-white/60" />
                      <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Not Yet Public</span>
                    </div>
                  )}

                  {/* Category badge */}
                  {!project.isPrivate && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono bg-black/50 backdrop-blur-sm border border-white/10 text-white/70">
                      {filters.find((f) => f.value === project.category)?.label ?? project.category}
                    </span>
                  )}

                  {/* Achievement badge */}
                  {project.achievement && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 text-amber-300">
                      <Trophy size={10} />
                      {project.achievement}
                    </span>
                  )}

                  {/* Video play overlay */}
                  {project.video && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                        <PlayCircle size={36} className="text-[#00d4ff]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-semibold text-white text-lg flex-1">{project.title}</h3>
                    {project.isPrivate && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/[0.04] border border-white/[0.07] flex-shrink-0">
                        <Lock size={10} />
                        Ericsson × BME
                      </span>
                    )}
                  </div>

                  {project.isPrivate ? (
                    <p
                      className="text-sm text-white/55 leading-relaxed mb-4 select-none"
                      style={{ filter: 'blur(5px)', userSelect: 'none' }}
                    >
                      Agentic pipeline for semantic validation of telecommunications configuration files using LLM reasoning with tool-use to detect logical inconsistencies and policy violations — Ericsson × BME student research collaboration.
                    </p>
                  ) : (
                    <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div
                    className="flex flex-wrap gap-1.5 mb-4"
                    style={project.isPrivate ? { filter: 'blur(4px)', userSelect: 'none' } : undefined}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-mono text-[#00d4ff]/70 bg-[#00d4ff]/[0.06] border border-[#00d4ff]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links row — only for public projects */}
                  {!project.isPrivate && (
                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      {project.video && (
                        <button
                          onClick={() => setVideoSrc(project.video!)}
                          className="flex items-center gap-1.5 text-xs text-[#00d4ff]/80 hover:text-[#00d4ff] transition-colors"
                        >
                          <Play size={14} fill="currentColor" />
                          Watch Demo
                        </button>
                      )}
                      {project.github && !project.primaryLink && !project.video && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                        >
                          <Github size={14} />
                          Source
                        </a>
                      )}
                      {project.github && project.video && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                        >
                          <Github size={14} />
                          Source
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00d4ff] transition-colors"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {project.pdf && (
                        <a
                          href={project.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00d4ff] transition-colors"
                        >
                          <BookOpen size={14} />
                          Read Paper
                        </a>
                      )}
                      {project.github && project.category === 'competition' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00d4ff] transition-colors"
                        >
                          <ExternalLink size={14} />
                          Competition
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
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
