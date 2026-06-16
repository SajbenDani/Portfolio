import { motion } from 'framer-motion'
import { stats, type Stat } from '@/data/stats'
import { useCountUp } from '@/hooks/useCountUp'
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion'

function StatCell({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value)
  return (
    <motion.div variants={fadeUp} className="glass-card rounded-xl p-5 text-center">
      <p className="font-display font-bold text-3xl md:text-4xl tabular-nums mb-1">
        <span className="text-copper-gradient">
          {stat.prefix}
          <span ref={ref}>{value}</span>
          {stat.suffix}
        </span>
      </p>
      <p className="text-sm text-content-tertiary">{stat.label}</p>
      {stat.sub && <p className="text-xs font-mono text-content-faint mt-1">{stat.sub}</p>}
    </motion.div>
  )
}

export default function StatStrip() {
  return (
    <section aria-label="Key numbers" className="px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {stats.map((s) => (
          <StatCell key={s.label} stat={s} />
        ))}
      </motion.div>
    </section>
  )
}
