import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  plain: string
  accent: string
  subtitle?: string
  /** Editorial index label, e.g. "02". Renders as "02 — Plain". */
  index?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({
  plain,
  accent,
  subtitle,
  index,
  align = 'center',
}: SectionHeadingProps) {
  const left = align === 'left'
  return (
    <div className={cn('mb-16', left ? 'text-left max-w-2xl' : 'text-center')}>
      {index && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={cn('section-kicker mb-4 flex items-center gap-3', !left && 'justify-center')}
        >
          <span className="text-copper">{index}</span>
          <span className="h-px w-8 bg-gradient-to-r from-copper/60 to-transparent" />
          <span>{plain}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 font-display"
      >
        {plain} <span className="text-copper-gradient">{accent}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className={cn('text-muted-foreground text-lg leading-relaxed', !left && 'max-w-xl mx-auto')}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
