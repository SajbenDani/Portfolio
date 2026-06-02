import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/sections/ProjectCard'
import StarPole from '@/components/three/StarPole'
import VideoModal from '@/components/shared/VideoModal'

// Helix geometry: each card steps ANGLE_STEP° around the pole and V_STEP px down,
// forming a spiral. Scrolling rotates the helix AND lifts it so the active card
// stays front-and-centre — you spiral down the pole past each card.
// ANGLE_STEP = 90 → 4 cards per 360° (roughly one card to each side of centre).
const ANGLE_STEP = 90
const V_STEP = 210
const RADIUS = 340
const deg2rad = (d: number) => (d * Math.PI) / 180

function HelixCard({
  rotation,
  index,
  project,
  onVideo,
}: {
  rotation: MotionValue<number>
  index: number
  project: (typeof projects)[number]
  onVideo: (src: string) => void
}) {
  // Negative base + positive scroll rotation makes the helix spin the SAME
  // visual direction as the idle pole / About-ring rotations when scrolling down.
  const base = -ANGLE_STEP * index
  const yi = V_STEP * index
  const facing = useTransform(rotation, (r) => Math.cos(deg2rad(r + base)))
  const opacity = useTransform(facing, (f) => 0.06 + 0.94 * Math.pow(Math.max(0, f), 1.3))
  const zIndex = useTransform(facing, (f) => Math.round((f + 1) * 100))
  const pointerEvents = useTransform(facing, (f) => (f > 0.6 ? 'auto' : 'none'))

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[160px] -mt-[200px] w-[320px] h-[400px] backface-hidden"
      style={{
        opacity,
        zIndex,
        pointerEvents: pointerEvents as unknown as MotionValue<string>,
        transform: `rotateY(${base}deg) translateZ(${RADIUS}px) translateY(${yi}px)`,
      }}
    >
      <ProjectCard project={project} onVideo={onVideo} flat />
      <span className="sr-only">
        Project {index + 1} of {projects.length}
      </span>
    </motion.div>
  )
}

export default function ProjectHelix() {
  const sectionRef = useRef<HTMLElement>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const count = projects.length
  const span = count - 1

  // Synchronised spiral motion: rotate the helix and lift it so the card at the
  // current scroll position sits front-and-centre.
  const rotation = useTransform(scrollYProgress, (p) => p * span * ANGLE_STEP)
  const lift = useTransform(scrollYProgress, (p) => -p * span * V_STEP)

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: `${count * 50}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Heading */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <div className="section-kicker mb-3 flex items-center justify-center gap-3">
            <span className="text-copper">02</span>
            <span className="h-px w-8 bg-gradient-to-r from-copper/60 to-transparent" />
            <span>Featured</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] font-display">
            Featured <span className="text-copper-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Scroll to spiral down the pole · click a card to open
          </p>
        </div>

        {/* Star pole behind the cards — co-rotates with the scroll */}
        <StarPole className="absolute inset-0 z-0" spin={rotation} />

        {/* CSS-3D spiral of cards */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ perspective: '1800px' }}
        >
          <motion.div
            className="relative preserve-3d"
            style={{ width: 1, height: 1, rotateY: rotation, y: lift }}
          >
            {projects.map((project, i) => (
              <HelixCard
                key={project.id}
                rotation={rotation}
                index={i}
                project={project}
                onVideo={setVideoSrc}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <motion.span
              className="block w-px h-8 bg-gradient-to-b from-copper/60 to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </div>
      </div>

      {videoSrc && (
        <VideoModal isOpen={!!videoSrc} src={videoSrc} onClose={() => setVideoSrc(null)} />
      )}
    </section>
  )
}
