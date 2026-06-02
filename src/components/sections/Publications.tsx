import { motion } from 'framer-motion'
import { BookOpen, ExternalLink } from 'lucide-react'
import { publications } from '@/data/publications'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { asset } from '@/lib/utils'

const statusStyle = {
  'under review': 'text-copper-lite bg-copper/12 border-copper/30',
  preprint: 'text-white/70 bg-white/[0.05] border-white/15',
  published: 'text-available bg-[rgba(110,231,168,0.10)] border-[rgba(110,231,168,0.25)]',
  unpublished: 'text-white/55 bg-white/[0.04] border-white/12',
}

const statusLabel = {
  'under review': 'Under Review',
  preprint: 'Preprint',
  published: 'Published',
  unpublished: 'Unpublished',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function Publications() {
  return (
    <section id="publications" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="04"
        plain="Research"
        accent="Publications"
        subtitle="Peer-reviewed work and technical reports"
      />

      <motion.div
        className="max-w-3xl mx-auto space-y-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {publications.map((pub) => (
          <motion.div key={pub.id} variants={itemVariants}>
            <GlassCard className="p-6">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen size={16} className="text-copper" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-base leading-snug mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-white/40 font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>
                        {pub.venue} · {pub.year}
                      </span>
                      {pub.collab && (
                        <span className="px-2 py-0.5 rounded text-[0.7rem] text-copper/80 bg-copper/[0.07] border border-copper/15">
                          {pub.collab}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-mono border flex-shrink-0 ${statusStyle[pub.status]}`}
                >
                  {statusLabel[pub.status]}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm text-white/55 leading-relaxed mb-4 pl-12 select-none"
                style={pub.blurDescription ? { filter: 'blur(5px)', userSelect: 'none' } : undefined}
                aria-hidden={pub.blurDescription}
              >
                {pub.description}
              </p>
              {pub.blurDescription && (
                <p className="text-xs text-white/30 italic mb-4 pl-12">
                  Full details available upon publication.
                </p>
              )}

              {/* Footer: tags + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pl-12">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono text-copper/80 bg-copper/[0.07] border border-copper/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {pub.pdf && (
                  <LiquidButton size="sm" className="text-copper-lite" onClick={() => window.open(asset(pub.pdf!), '_blank')}>
                    <ExternalLink size={14} className="mr-1.5" />
                    Read Paper
                  </LiquidButton>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
