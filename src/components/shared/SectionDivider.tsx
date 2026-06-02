import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Organic copper "seam" between sections — replaces the old straight gradient
 * cut (especially Hero → About). Two flowing curves: one draws in on scroll,
 * one drifts continuously, so the boundary feels alive rather than ruled.
 */
export default function SectionDivider({
  flip = false,
  className,
}: {
  flip?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('relative w-full h-20 md:h-28 overflow-hidden pointer-events-none', className)}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="divider-copper" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(200,126,84,0)" />
            <stop offset="50%" stopColor="rgba(227,165,121,0.65)" />
            <stop offset="100%" stopColor="rgba(200,126,84,0)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,60 C 240,12 480,108 720,60 C 960,12 1200,108 1440,60"
          fill="none"
          stroke="url(#divider-copper)"
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        <motion.path
          d="M0,72 C 300,34 520,104 760,66 C 1000,30 1180,102 1440,70"
          fill="none"
          stroke="url(#divider-copper)"
          strokeWidth={0.75}
          opacity={0.4}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
