import { useState, type ReactNode } from 'react'
import {
  motion,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { GraduationCap, Briefcase, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import { useInertialRotation } from '@/hooks/useInertialRotation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const techTags = [
  'Python', 'PyTorch', 'TensorFlow', 'Deep Learning',
  'Computer Vision', 'Generative AI', 'NLP', 'AI Agents',
  'Java Spring', 'Angular', 'React', 'TypeScript', 'SQL',
]

/** The three info-card faces, shared by the 3D ring and the stacked fallback. */
const cardFaces: { label: string; content: ReactNode }[] = [
  {
    label: 'Education',
    content: (
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-content mb-2">Education</h3>
          <div className="space-y-2 text-[13px] text-content-tertiary leading-snug">
            <div>
              <p className="text-content font-medium">MSc Advanced Artificial Intelligence</p>
              <p>University College Dublin (top 100 globally) · 2026–2027</p>
            </div>
            <div>
              <p className="text-content font-medium">B.Sc. Computer Science Engineering</p>
              <p>Budapest Univ. of Technology · GPA 4.65/5.00 · First Class Honours</p>
            </div>
            <div>
              <p className="text-content font-medium">Exchange — AI &amp; Deep Learning</p>
              <p>Technical University of Munich (TUM) · GPA 1.3/5.0</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Current Focus',
    content: (
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <Briefcase size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-content mb-2">Current Focus</h3>
          <div className="space-y-2 text-[13px] text-content-tertiary leading-snug">
            <div>
              <p className="text-content font-medium">Data Science &amp; AI Engineer Intern</p>
              <p>PTC Hungary · Python · MCP · AI Agents</p>
            </div>
            <div>
              <p className="text-content font-medium">Thesis Research</p>
              <p>fMRI Super-Resolution · Synthetic Data Gen</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Location',
    content: (
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <MapPin size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-content mb-2">Location &amp; Availability</h3>
          <p className="text-[13px] text-content-tertiary">Based in Dublin, Ireland</p>
          <p className="text-[13px] text-content-tertiary mt-1 leading-snug">
            EU citizen · Open to roles in{' '}
            <span className="text-content">Dublin · London · Munich · Budapest · Remote</span>
          </p>
        </div>
      </div>
    ),
  },
]

const RADIUS_X = 210
const RADIUS_Z = 300
const rad = (deg: number) => (deg * Math.PI) / 180

function RingCard({
  rotation,
  index,
  count,
  children,
}: {
  rotation: MotionValue<number>
  index: number
  count: number
  children: ReactNode
}) {
  const base = (360 / count) * index
  const x = useTransform(rotation, (r) => Math.sin(rad(r + base)) * RADIUS_X)
  const z = useTransform(rotation, (r) => Math.cos(rad(r + base)) * RADIUS_Z)
  const depth = useTransform(rotation, (r) => Math.cos(rad(r + base)))
  const opacity = useTransform(depth, (d) => 0.3 + 0.7 * ((d + 1) / 2))
  const blur = useTransform(depth, (d) => ((1 - d) / 2) * 3)
  const filter = useMotionTemplate`blur(${blur}px)`
  const zIndex = useTransform(depth, (d) => Math.round((d + 1) * 50))

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[320px] h-[300px] -ml-[160px] -mt-[150px]"
      style={{ x, z, opacity, filter, zIndex }}
    >
      <div className="glass-card rounded-2xl h-full w-full overflow-hidden p-6 flex items-center">
        {children}
      </div>
    </motion.div>
  )
}

function AboutRing() {
  const count = cardFaces.length
  const { rotation, bind, next, prev, goToIndex, freeze, unfreeze } = useInertialRotation({ count })
  const [active, setActive] = useState(0)

  useMotionValueEvent(rotation, 'change', (r) => {
    const idx = (((Math.round(-r / (360 / count)) % count) + count) % count)
    setActive((prevIdx) => (prevIdx === idx ? prevIdx : idx))
  })

  return (
    <div className="flex flex-col items-center">
      <div
        {...bind()}
        onMouseEnter={freeze}
        onMouseLeave={unfreeze}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prev()
          if (e.key === 'ArrowRight') next()
        }}
        tabIndex={0}
        role="group"
        aria-label="Rotating cards — drag to spin, arrow keys to navigate"
        className="scene-3d relative h-[420px] w-full touch-none select-none cursor-grab active:cursor-grabbing outline-none"
      >
        <div className="preserve-3d absolute inset-0">
          {cardFaces.map((face, i) => (
            <RingCard key={face.label} rotation={rotation} index={i} count={count}>
              {face.content}
            </RingCard>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={prev}
          aria-label="Previous card"
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-content-tertiary hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {cardFaces.map((face, i) => (
            <button
              key={face.label}
              onClick={() => goToIndex(i)}
              aria-label={`Show ${face.label}`}
              className={`h-2 rounded-full transition-all ${
                active === i ? 'w-6 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next card"
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-content-tertiary hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <p className="text-xs text-content-faint mt-3 font-mono tracking-wide">drag to spin · flick to throw</p>
    </div>
  )
}

function StackedCards() {
  return (
    <div className="space-y-4">
      {cardFaces.map((face) => (
        <GlassCard key={face.label}>{face.content}</GlassCard>
      ))}
    </div>
  )
}

export default function About() {
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section id="about" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="01"
        plain="About"
        accent="Me"
        subtitle="A little about who I am and what I do"
      />

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left — prose */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <p className="text-content-secondary leading-relaxed text-lg">
            I'm a Computer Science Engineering graduate from{' '}
            <span className="text-content font-medium">
              Budapest University of Technology (First Class Honours)
            </span>
            , currently pursuing an{' '}
            <span className="text-content font-medium">
              MSc in Advanced AI at University College Dublin
            </span>
            .
          </p>
          <p className="text-content-secondary leading-relaxed">
            Currently working as a{' '}
            <span className="text-white font-medium">Data Science &amp; AI Engineer at PTC Hungary</span>,
            building agentic pipelines and an MCP server. Simultaneously conducting thesis research on fMRI
            super-resolution and synthetic data generation.
          </p>
          <p className="text-content-secondary leading-relaxed">
            My work sits at the intersection of cutting-edge AI research and practical engineering.
            I'm passionate about generative models, computer vision, and intelligent agents that
            operate in real-world environments.
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="px-3 py-1 rounded-full text-xs font-mono text-content-tertiary border border-white/[0.08] bg-white/[0.03] cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right — 3D ring (desktop) / stacked (mobile + reduced motion) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          {reduced || !isDesktop ? <StackedCards /> : <AboutRing />}
        </motion.div>
      </div>
    </section>
  )
}
