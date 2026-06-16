import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
  /** Hover lift + copper glow — for standalone cards (publications, timeline). */
  lift?: boolean
}

export default function GlassCard({ className, children, hover = true, lift = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn('glass-card rounded-xl p-6', className)}
      whileHover={
        lift
          ? {
              y: -4,
              borderColor: 'rgba(200,126,84,0.32)',
              boxShadow: '0 14px 36px rgba(0,0,0,0.35), 0 0 24px rgba(200,126,84,0.10)',
            }
          : hover
            ? { borderColor: 'rgba(200,126,84,0.32)' }
            : undefined
      }
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
