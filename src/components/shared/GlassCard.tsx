import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export default function GlassCard({ className, children, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn('glass-card rounded-xl p-6', className)}
      whileHover={hover ? { borderColor: 'rgba(200,126,84,0.32)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
