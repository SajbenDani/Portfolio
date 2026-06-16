import { motion } from 'framer-motion'
import { BookOpen, ExternalLink } from 'lucide-react'
import { publications } from '@/data/publications'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion'
import { asset } from '@/lib/utils'

const statusStyle = {
  'under review': 'text-copper-lite bg-copper/12 border-copper/30',
  preprint: 'text-content-secondary bg-white/[0.05] border-white/15',
  published: 'text-available bg-[rgba(110,231,168,0.10)] border-[rgba(110,231,168,0.25)]',
  unpublished: 'text-content-tertiary bg-white/[0.04] border-white/12',
}

const statusLabel = {
  'under review': 'Under Review',
  preprint: 'Preprint',
  published: 'Published',
  unpublished: 'Unpublished',
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
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {publications.map((pub) => (
          <motion.div key={pub.id} variants={fadeUp}>
            <GlassCard lift className="p-6">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen size={16} className="text-copper" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-content text-base leading-snug mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-content-tertiary font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>
                        {pub.venue} · {pub.year}
                      </span>
                      {pub.collab && (
                        <span className="px-2 py-0.5 rounded text-[0.7rem] text-copper-text bg-copper/[0.07] border border-copper/15">
                          {pub.collab}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border flex-shrink-0 ${statusStyle[pub.status]}`}
                >
                  {pub.status === 'under review' && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-copper-lite"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {statusLabel[pub.status]}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm text-content-tertiary leading-relaxed mb-4 pl-12 select-none"
                style={pub.blurDescription ? { filter: 'blur(5px)', userSelect: 'none' } : undefined}
                aria-hidden={pub.blurDescription}
              >
                {pub.description}
              </p>
              {pub.blurDescription && (
                <p className="text-xs text-content-faint italic mb-4 pl-12">
                  Full details available upon publication.
                </p>
              )}

              {/* Footer: tags + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pl-12">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono text-copper-text bg-copper/[0.07] border border-copper/15"
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
