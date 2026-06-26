import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { Github, ExternalLink, Play, BookOpen, Lock } from 'lucide-react'
import { projects } from '@/data/projects'
import { getPrimaryLink } from '@/components/sections/ProjectCard'
import ProjectArtwork from '@/components/shared/ProjectArtwork'
import VideoModal from '@/components/shared/VideoModal'
import { asset } from '@/lib/utils'

/**
 * Cinematic project showcase — Apple-product-page scrollytelling, in the
 * site's glass/copper language. The section pins for ~735vh: a stylized
 * CSS-3D laptop opens its lid as you arrive (copper DS monogram on the
 * back), the screen powers on, and each project takes the display one at a
 * time while its copy crossfades alongside. The lid closes as you leave.
 * Everything is scroll-scrubbed through motion values — no WebGL, no rAF
 * loops, no re-renders except the active-index state for the rail.
 */

// ── scroll timeline (fractions of the full track) ───────────────────────────
const OPEN_END = 0.1 //   lid opens during the first 10%
const CLOSE_START = 0.93 // … and closes during the last 7%
const P_START = 0.12 //   project 0 holds the screen
const P_END = 0.91 //     project N-1 holds the screen

const count = projects.length

const categoryLabel: Record<string, string> = {
  ai: 'AI / ML',
  research: 'Research',
  competition: 'Competitions',
  web: 'Web Dev',
}

const PRIVATE_BLURB =
  'Agentic pipeline for semantic validation of telecommunications configuration files using LLM ' +
  'reasoning with tool-use to detect logical inconsistencies and policy violations — Ericsson × BME ' +
  'student research collaboration.'

type ProjectT = (typeof projects)[number]

// ── per-project layer inside the laptop display ─────────────────────────────
function ScreenLayer({
  progress,
  index,
  project,
}: {
  progress: MotionValue<number>
  index: number
  project: ProjectT
}) {
  const opacity = useTransform(progress, (v) => Math.max(0, 1 - Math.abs(v - index) * 1.4))
  const x = useTransform(progress, (v) => (v - index) * -46)

  return (
    <motion.div className="absolute inset-0" style={{ opacity, x }}>
      <div
        className="absolute inset-0"
        style={project.isPrivate ? { filter: 'blur(8px)', transform: 'scale(1.06)' } : undefined}
      >
        {/* Generated artwork paints instantly while the photo streams in */}
        <ProjectArtwork id={project.id} category={project.category} />
        <img
          src={asset(project.image)}
          alt=""
          draggable={false}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Vignette unifies the photos' palettes and keeps the chrome legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25" />
      </div>
      {project.isPrivate && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45">
          <Lock size={26} className="text-content-tertiary" />
          <span className="text-xs font-mono text-content-tertiary tracking-widest uppercase">
            Not Yet Public
          </span>
        </div>
      )}
    </motion.div>
  )
}

// ── link chips for the copy column ──────────────────────────────────────────
function LinksRow({ project, onVideo }: { project: ProjectT; onVideo: (src: string) => void }) {
  const chip =
    'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-colors'
  const primary = `${chip} text-black bg-white border-white hover:bg-white/90 shadow-sm`
  const ghost = `${chip} text-content-tertiary bg-white/[0.03] border-white/[0.08] hover:text-content hover:border-white/[0.16]`

  return (
    <div className="flex flex-wrap gap-2.5">
      {project.video && (
        <button onClick={() => onVideo(project.video!)} className={primary}>
          <Play size={13} fill="currentColor" />
          Watch Demo
        </button>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={project.video ? ghost : primary}
        >
          {project.category === 'competition' ? (
            <>
              <ExternalLink size={13} />
              Competition
            </>
          ) : (
            <>
              <Github size={13} />
              Source
            </>
          )}
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={ghost}>
          <ExternalLink size={13} />
          Live Demo
        </a>
      )}
      {project.pdf && (
        <a
          href={asset(project.pdf)}
          target="_blank"
          rel="noopener noreferrer"
          className={project.github ? ghost : primary}
        >
          <BookOpen size={13} />
          Read Paper
        </a>
      )}
    </div>
  )
}

// ── per-project copy block (right column) ───────────────────────────────────
function CopyLayer({
  progress,
  index,
  project,
  onVideo,
}: {
  progress: MotionValue<number>
  index: number
  project: ProjectT
  onVideo: (src: string) => void
}) {
  // Steeper falloff than the artwork: text is fully out before the next block
  // arrives, so two titles never overlap mid-transition.
  const opacity = useTransform(progress, (v) => Math.max(0, 1 - Math.abs(v - index) * 2.2))
  const titleX = useTransform(progress, (v) => (v - index) * -34)
  const bodyX = useTransform(progress, (v) => (v - index) * -22)
  const ghostX = useTransform(progress, (v) => (v - index) * -70)
  const pe = useTransform(progress, (v) => (Math.abs(v - index) < 0.45 ? 'auto' : 'none'))

  const description = project.isPrivate ? PRIVATE_BLURB : project.description

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, pointerEvents: pe as unknown as MotionValue<string> }}
    >
      {/* ghost index numeral — strongest parallax, sits behind the copy */}
      <motion.span
        aria-hidden="true"
        className="absolute -top-4 -left-3 text-[9rem] leading-none font-display font-bold text-white/[0.04] select-none pointer-events-none"
        style={{ x: ghostX }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <motion.div style={{ x: titleX }} className="relative">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/80 mb-3">
          {categoryLabel[project.category] ?? project.category}
          {project.isPrivate && ' · Ericsson × BME'}
        </p>
        <h3 className="font-display font-bold text-3xl xl:text-4xl text-content tracking-heading mb-4">
          {project.title}
        </h3>
      </motion.div>

      <motion.div style={{ x: bodyX }} className="relative">
        <p
          className={`text-content-secondary leading-relaxed mb-5 max-w-md line-clamp-5 ${
            project.isPrivate ? 'select-none' : ''
          }`}
          style={project.isPrivate ? { filter: 'blur(5px)' } : undefined}
        >
          {description}
        </p>
        <div
          className="flex flex-wrap gap-1.5 mb-6"
          style={project.isPrivate ? { filter: 'blur(4px)' } : undefined}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs font-mono text-white/80 bg-white/[0.07] border border-white/15"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.isPrivate ? (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-content-tertiary bg-white/[0.04] border border-white/[0.07]">
            <Lock size={12} />
            Available upon publication
          </span>
        ) : (
          <LinksRow project={project} onVideo={onVideo} />
        )}
      </motion.div>

      <span className="sr-only">
        Project {index + 1} of {count}: {project.title}
      </span>
    </motion.div>
  )
}

// ── the showcase ────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Continuous project index 0..N-1 across the middle band of the track.
  const progress = useTransform(scrollYProgress, [P_START, P_END], [0, count - 1])

  // Lid angle: -91° (closed) → 0° (open) → -91° again on the way out.
  const lid = useTransform(scrollYProgress, [0, OPEN_END, CLOSE_START, 1], [-91, 0, 0, -91])
  const screenDark = useTransform(lid, [-91, -30, -6], [0.95, 0.7, 0])
  const hingeGlow = useTransform(lid, [-91, -10], [0.15, 0.55])
  const floorGlow = useTransform(lid, [-91, -10], [0.12, 0.3])

  const laptopY = useTransform(scrollYProgress, [0, OPEN_END, CLOSE_START, 1], [70, 0, 0, 40])
  const laptopScale = useTransform(scrollYProgress, [0, OPEN_END, CLOSE_START, 1], [0.92, 1, 1, 0.95])
  // Gentle continuous yaw so the device feels alive between beats.
  const wobble = useTransform(progress, (v) => Math.sin(v * 1.05) * 2.5)

  const headingOpacity = useTransform(scrollYProgress, [0, 0.07, 0.13], [1, 1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0.02, 0.06, 0.12, 0.18], [0, 1, 1, 0])
  const stageOpacity = useTransform(scrollYProgress, [0.07, 0.12, CLOSE_START, 0.97], [0, 1, 1, 0])

  useMotionValueEvent(progress, 'change', (v) => {
    const idx = Math.min(count - 1, Math.max(0, Math.round(v)))
    setActive((prev) => (prev === idx ? prev : idx))
  })

  const activeProject = projects[active]

  const openActive = () => {
    if (lid.get() < -10 || activeProject.isPrivate) return
    if (activeProject.video) {
      setVideoSrc(activeProject.video)
      return
    }
    const url = getPrimaryLink(activeProject)
    if (url) window.open(asset(url), '_blank', 'noopener noreferrer')
  }

  const jumpTo = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const track = el.offsetHeight - window.innerHeight
    const t = count > 1 ? P_START + (i / (count - 1)) * (P_END - P_START) : P_START
    // Two-arg form: html { scroll-behavior: smooth } supplies the easing
    // (and the reduced-motion media query switches it off).
    window.scrollTo(0, top + t * track)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.round((count + 1.5) * 70)}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Heading — hands the stage over once the lid is open */}
        <motion.div
          className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 px-4 w-full"
          style={{ opacity: headingOpacity }}
        >
          <div className="section-kicker mb-3 flex items-center justify-center gap-3">
            <span className="text-white">02</span>
            <span className="h-px w-8 bg-gradient-to-r from-white/60 to-transparent" />
            <span>Featured</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-heading font-display">
            Featured <span className="text-copper-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Scroll — each project takes the stage
          </p>
        </motion.div>

        <div className="h-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-16 items-center">
          {/* ── The laptop ──────────────────────────────────────────────── */}
          <motion.div className="relative" style={{ y: laptopY, scale: laptopScale }}>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mx-auto w-full max-w-[680px]" style={{ perspective: 1700 }}>
                <motion.div
                  className="preserve-3d"
                  style={{ rotateX: 10, rotateY: wobble }}
                >
                  {/* Screen assembly — hinged at its bottom edge */}
                  <motion.div
                    className="relative w-full aspect-[16/10] preserve-3d"
                    style={{ rotateX: lid, transformOrigin: 'bottom center' }}
                  >
                    {/* Front: the display */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={
                        activeProject.isPrivate
                          ? 'Private project — not yet public'
                          : `Open ${activeProject.title}`
                      }
                      onClick={openActive}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openActive()
                        }
                      }}
                      className={`absolute inset-0 rounded-[14px] border border-white/[0.12] bg-[#0a0a0b] overflow-hidden backface-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${
                        activeProject.isPrivate ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      {/* window chrome */}
                      <div className="absolute top-0 left-0 right-0 h-7 z-20 flex items-center gap-1.5 px-3 bg-black/50 border-b border-white/[0.06]">
                        <span className="w-2 h-2 rounded-full bg-white/15" />
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="w-2 h-2 rounded-full bg-white/15" />
                        <span className="ml-2 font-mono text-[10px] text-content-faint truncate">
                          ~/projects/{activeProject.id}
                        </span>
                      </div>
                      {/* project layers */}
                      <div className="absolute inset-0 top-7">
                        {projects.map((p, i) => (
                          <ScreenLayer key={p.id} progress={progress} index={i} project={p} />
                        ))}
                      </div>
                      {/* glass glare */}
                      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                      {/* power-on overlay — screen lights up as the lid opens */}
                      <motion.div
                        className="absolute inset-0 z-30 bg-black pointer-events-none"
                        style={{ opacity: screenDark }}
                      />
                    </div>

                    {/* Back: lid cover with the monogram */}
                    <div
                      className="absolute inset-0 rounded-[14px] border border-white/[0.15] bg-gradient-to-br from-[#333336] via-[#2c2c2e] to-[#1c1c1e] backface-hidden flex items-center justify-center shadow-inner"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="absolute inset-0 rounded-[14px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,255,255,0.06),transparent_70%)]" />
                      <span className="font-mono font-medium text-3xl tracking-[0.3em] text-white/90 translate-x-[0.15em]" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                        DS
                      </span>
                    </div>
                  </motion.div>

                  {/* Hinge glow */}
                  <motion.div
                    className="h-[2px] w-[88%] mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ opacity: hingeGlow }}
                  />

                  {/* Base */}
                  <div className="relative h-[16px] w-[104%] -ml-[2%] rounded-b-xl rounded-t-[3px] bg-gradient-to-b from-[#424245] via-[#2d2d2f] to-[#1d1d1f] border border-t-0 border-white/[0.15] shadow-xl">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[5px] w-24 rounded-b-md bg-black/40" />
                  </div>
                </motion.div>

                {/* Floor reflection */}
                <motion.div
                  className="mx-auto mt-8 h-10 w-[70%] rounded-[50%] bg-white/60 blur-[40px]"
                  style={{ opacity: floorGlow }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Copy column ─────────────────────────────────────────────── */}
          <motion.div
            className="relative h-[440px] xl:h-[480px] hidden lg:block"
            style={{ opacity: stageOpacity }}
          >
            {projects.map((p, i) => (
              <CopyLayer key={p.id} progress={progress} index={i} project={p} onVideo={setVideoSrc} />
            ))}
          </motion.div>
        </div>

        {/* ── Progress rail ───────────────────────────────────────────────── */}
        <motion.div
          className="absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5"
          style={{ opacity: stageOpacity }}
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => jumpTo(i)}
              aria-label={`Go to project ${i + 1}: ${p.title}`}
              aria-current={active === i ? 'true' : undefined}
              className="group flex items-center gap-2 justify-end py-0.5"
            >
              <span
                className={`text-[10px] font-mono transition-opacity ${
                  active === i
                    ? 'text-white opacity-100'
                    : 'text-content-faint opacity-0 group-hover:opacity-70'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`rounded-full transition-all duration-300 ${
                  active === i ? 'w-2 h-6 bg-white' : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </motion.div>

        {/* Scroll hint — visible during the opening beat */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex flex-col items-center gap-2 text-content-faint">
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <motion.span
              className="block w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </motion.div>
      </div>

      {videoSrc && (
        <VideoModal isOpen={!!videoSrc} src={videoSrc} onClose={() => setVideoSrc(null)} />
      )}
    </section>
  )
}
