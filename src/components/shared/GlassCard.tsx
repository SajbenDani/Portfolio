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
      whileHover={hover ? { borderColor: 'rgba(0,212,255,0.25)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
