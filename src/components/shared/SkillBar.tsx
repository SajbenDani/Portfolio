import { motion } from 'framer-motion'

interface SkillBarProps {
  name: string
  level: 1 | 2 | 3 | 4 | 5
  delay?: number
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-white/75 flex-1 min-w-0 truncate">{name}</span>
      <div className="flex gap-1.5 flex-shrink-0">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i < level ? 'bg-copper' : 'bg-white/10'}`}
            initial={i < level ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            whileInView={i < level ? { scale: 1, opacity: 1 } : undefined}
            transition={
              i < level
                ? { duration: 0.3, delay: delay + i * 0.06, ease: 'backOut' }
                : undefined
            }
            viewport={{ once: true }}
          />
        ))}
      </div>
    </div>
  )
}
