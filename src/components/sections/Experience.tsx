import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, FlaskConical, Download } from 'lucide-react'
import { experiences } from '@/data/experience'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'

const typeIcon = {
  work: Briefcase,
  education: GraduationCap,
  research: FlaskConical,
}

const typeColor = {
  work: 'text-[#00d4ff] bg-[#00d4ff]/10',
  education: 'text-indigo-400 bg-indigo-400/10',
  research: 'text-violet-400 bg-violet-400/10',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        plain="Experience &"
        accent="Education"
        subtitle="My professional journey so far"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Animated vertical timeline line */}
        <motion.div
          className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-[#00d4ff] via-indigo-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{ transformOrigin: 'top', height: '100%' }}
        />

        <motion.div
          className="space-y-6 pl-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experiences.map((exp, i) => {
            const Icon = typeIcon[exp.type]
            const colorClass = typeColor[exp.type]
            return (
              <motion.div key={exp.id} variants={itemVariants} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-9 top-5">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      scale: 1,
                      boxShadow: [
                        '0 0 0px rgba(0,212,255,0)',
                        '0 0 12px rgba(0,212,255,0.35)',
                        '0 0 0px rgba(0,212,255,0)',
                      ],
                    }}
                    transition={{
                      scale: { delay: i * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 20 },
                      boxShadow: { duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' },
                    }}
                  >
                    <Icon size={16} />
                  </motion.div>
                </div>

                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-base">{exp.role}</h3>
                      <p className="text-[#00d4ff] text-sm">{exp.org}</p>
                    </div>
                    <div className="text-right text-xs text-white/40">
                      <p className="font-mono">{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-3">{exp.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.07]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {exp.pdf && (
                      <a
                        href={exp.pdf}
                        download
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/[0.08] border border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.15] transition-colors flex-shrink-0"
                      >
                        <Download size={12} />
                        {exp.pdfLabel ?? 'Download'}
                      </a>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
