import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, GraduationCap, FlaskConical, Download } from 'lucide-react'
import { experiences } from '@/data/experience'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { asset } from '@/lib/utils'

const typeIcon = {
  work: Briefcase,
  education: GraduationCap,
  research: FlaskConical,
}

const typeColor = {
  work: 'text-copper-lite bg-copper/12',
  education: 'text-copper bg-copper/12',
  research: 'text-copper-lite bg-bronze/20',
}

function TimelineItem({
  exp,
  index,
  reduced,
}: {
  exp: (typeof experiences)[number]
  index: number
  reduced: boolean
}) {
  const Icon = typeIcon[exp.type]
  const colorClass = typeColor[exp.type]

  return (
    <div className="relative" style={{ perspective: '900px' }}>
      {/* Spine node */}
      <div className="absolute -left-8 md:-left-9 top-5">
        <motion.div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${colorClass}`}
          initial={{ scale: 0 }}
          whileInView={{
            scale: 1,
            boxShadow: [
              '0 0 0px rgba(200,126,84,0)',
              '0 0 14px rgba(200,126,84,0.45)',
              '0 0 0px rgba(200,126,84,0)',
            ],
          }}
          viewport={{ once: true }}
          transition={{
            scale: { delay: index * 0.05 + 0.2, type: 'spring', stiffness: 300, damping: 20 },
            boxShadow: { duration: 2.6, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' },
          }}
        >
          <Icon size={16} />
        </motion.div>
      </div>

      {/* Card — swings in to face the viewer */}
      <motion.div
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, rotateY: -32, x: 28 }
        }
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, rotateY: 0, x: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformPerspective: 900, transformOrigin: 'left center' }}
      >
        <GlassCard lift className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-content text-base">{exp.role}</h3>
              <p className="text-copper text-sm">{exp.org}</p>
            </div>
            <div className="text-right text-xs text-content-tertiary">
              <p className="font-mono">{exp.period}</p>
              <p>{exp.location}</p>
            </div>
          </div>
          <p className="text-sm text-content-tertiary leading-relaxed mb-3">{exp.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5 flex-1">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs font-mono text-content-tertiary bg-white/[0.04] border border-white/[0.07]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {exp.pdf && (
              <a
                href={asset(exp.pdf)}
                download
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-copper bg-copper/[0.08] border border-copper/25 hover:bg-copper/[0.15] transition-colors flex-shrink-0"
              >
                <Download size={12} />
                {exp.pdfLabel ?? 'Download'}
              </a>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="03"
        plain="Experience &"
        accent="Education"
        subtitle="My professional journey so far"
      />

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Spine track */}
        <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-white/[0.08]" />
        {/* Spine fill — draws in with scroll (echo of the star-pole) */}
        <motion.div
          className="absolute left-4 md:left-5 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-copper-lite via-copper to-bronze shadow-[0_0_10px_rgba(200,126,84,0.5)]"
          style={{ scaleY: reduced ? 1 : fill }}
        />

        <div className="space-y-6 pl-11 md:pl-14">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}
