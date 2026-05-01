import { motion } from 'framer-motion'

interface SectionHeadingProps {
  plain: string
  accent: string
  subtitle?: string
}

export default function SectionHeading({ plain, accent, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display"
      >
        {plain}{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] to-indigo-400">
          {accent}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white/40 text-lg max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#00d4ff] to-indigo-400 rounded-full"
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}
