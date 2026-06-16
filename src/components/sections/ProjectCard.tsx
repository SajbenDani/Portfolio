import { motion } from 'framer-motion'
import { Github, ExternalLink, Play, BookOpen, Trophy, Lock, PlayCircle } from 'lucide-react'
import { type Project } from '@/data/projects'
import ProjectArtwork from '@/components/shared/ProjectArtwork'
import { asset } from '@/lib/utils'

const categoryLabel: Record<string, string> = {
  ai: 'AI / ML',
  research: 'Research',
  competition: 'Competitions',
  web: 'Web Dev',
  all: 'All',
}

export function getPrimaryLink(project: Project): string | null {
  if (project.isPrivate) return null
  if (project.primaryLink) return project.primaryLink
  if (project.github) return project.github
  if (project.pdf) return project.pdf
  return null
}

interface Props {
  project: Project
  onVideo: (src: string) => void
  /** Disables the lift-on-hover (used inside the 3D helix where transforms collide). */
  flat?: boolean
  className?: string
}

/**
 * The canonical project card. Used by both the responsive grid (reduced-motion /
 * mobile fallback) and the 3D helix (rendered via drei <Html>). Visuals come from
 * the bespoke <ProjectArtwork> system rather than stock photos.
 */
export default function ProjectCard({ project, onVideo, flat = false, className }: Props) {
  const handleClick = () => {
    if (project.isPrivate) return
    if (project.video) {
      onVideo(project.video)
      return
    }
    const url = getPrimaryLink(project)
    if (url) window.open(asset(url), '_blank', 'noopener noreferrer')
  }

  return (
    <motion.div
      className={`glass-card rounded-xl overflow-hidden group ${project.isPrivate ? 'cursor-default' : 'cursor-pointer'} ${className ?? ''}`}
      whileHover={
        project.isPrivate
          ? undefined
          : flat
            ? // Color-only feedback inside the helix — transforms would fight the CSS-3D stage.
              { borderColor: 'rgba(200,126,84,0.3)' }
            : { y: -6, boxShadow: '0 20px 40px rgba(200,126,84,0.14)', borderColor: 'rgba(200,126,84,0.3)' }
      }
      transition={{ duration: 0.25 }}
      onClick={handleClick}
    >
      {/* Artwork */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={project.isPrivate ? { filter: 'blur(7px)', transform: 'scale(1.08)' } : undefined}
        >
          <ProjectArtwork id={project.id} category={project.category} />
        </div>

        {/* Private overlay */}
        {project.isPrivate && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
            <Lock size={24} className="text-content-tertiary" />
            <span className="text-xs font-mono text-content-tertiary tracking-widest uppercase">
              Not Yet Public
            </span>
          </div>
        )}

        {/* Category badge */}
        {!project.isPrivate && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono bg-black/50 backdrop-blur-sm border border-white/10 text-content-secondary">
            {categoryLabel[project.category] ?? project.category}
          </span>
        )}

        {/* Achievement badge */}
        {project.achievement && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-copper/20 backdrop-blur-sm border border-copper/35 text-copper-lite">
            <Trophy size={10} />
            {project.achievement}
          </span>
        )}

        {/* Video play overlay */}
        {project.video && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(200,126,84,0.35)]">
              <PlayCircle size={36} className="text-copper-lite" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-semibold text-content text-lg flex-1">{project.title}</h3>
          {project.isPrivate && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono text-content-tertiary bg-white/[0.04] border border-white/[0.07] flex-shrink-0">
              <Lock size={10} />
              Ericsson × BME
            </span>
          )}
        </div>

        {project.isPrivate ? (
          <p
            className="text-sm text-content-tertiary leading-relaxed mb-4 select-none"
            style={{ filter: 'blur(5px)', userSelect: 'none' }}
          >
            Agentic pipeline for semantic validation of telecommunications configuration files
            using LLM reasoning with tool-use to detect logical inconsistencies and policy
            violations — Ericsson × BME student research collaboration.
          </p>
        ) : (
          <p className="text-sm text-content-tertiary leading-relaxed mb-4 line-clamp-3">
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
              className="px-2 py-0.5 rounded text-xs font-mono text-copper-text bg-copper/[0.07] border border-copper/15"
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
                onClick={() => onVideo(project.video!)}
                className="flex items-center gap-1.5 text-xs text-copper-text hover:text-copper-lite transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-content-tertiary hover:text-content transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-content-tertiary hover:text-content transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-content-tertiary hover:text-copper transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.pdf && (
              <a
                href={asset(project.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-content-tertiary hover:text-copper transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-content-tertiary hover:text-copper transition-colors"
              >
                <ExternalLink size={14} />
                Competition
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
