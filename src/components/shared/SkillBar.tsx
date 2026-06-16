import { motion } from 'framer-motion'

interface SkillBarProps {
  name: string
  level: 1 | 2 | 3 | 4 | 5
  delay?: number
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="group flex items-center justify-between gap-3 py-2 -mx-2 px-2 rounded-md transition-colors hover:bg-white/[0.03]">
      <span className="text-sm text-content-secondary flex-1 min-w-0 truncate transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-content">
        {name}
      </span>
      <div className="flex gap-1.5 flex-shrink-0">
        {Array.from({ length: 5 }, (_, i) => (
          // Outer div owns the hover scale cascade (CSS); inner motion.div owns
          // the entrance — they'd fight over `transform` on one element.
          <div
            key={i}
            className="transition-transform duration-200 group-hover:scale-110"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i < level ? 'bg-copper group-hover:bg-copper-lite' : 'bg-white/10'
              }`}
              initial={i < level ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              whileInView={i < level ? { scale: 1, opacity: 1 } : undefined}
              transition={
                i < level
                  ? { duration: 0.3, delay: delay + i * 0.06, ease: 'backOut' }
                  : undefined
              }
              viewport={{ once: true }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
