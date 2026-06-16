import { motion } from 'framer-motion'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { skills } from '@/data/skills'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import SkillBar from '@/components/shared/SkillBar'
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion'

const tiers = [
  { label: 'Expert', category: 'expert', dot: 'bg-copper-lite' },
  { label: 'Proficient', category: 'proficient', dot: 'bg-copper' },
  { label: 'Familiar', category: 'familiar', dot: 'bg-bronze' },
] as const

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="05"
        plain="Technical"
        accent="Skills"
        subtitle="Technologies and domains I work with"
      />

      {/* CPU Architecture centrepiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="mb-16 max-w-2xl mx-auto"
      >
        <div className="glass-card rounded-2xl p-8">
          <p className="text-center text-xs font-mono text-content-faint mb-4 tracking-widest uppercase">
            AI Researcher
          </p>
          <CpuArchitecture
            width="100%"
            height="200px"
            text="DS"
            className="text-white/20"
          />
          <p className="text-center text-xs text-content-faint mt-4 font-mono">
            ML · DL · CV · GenAI · NLP · Agents
          </p>
        </div>
      </motion.div>

      {/* Skill grids — 3 columns on lg */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {tiers.map((tier) => {
          const items = skills.filter((s) => s.category === tier.category)
          return (
            <motion.div key={tier.category} variants={fadeUp}>
              <GlassCard>
                <h3 className="font-semibold text-content mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${tier.dot}`} />
                  {tier.label}
                </h3>
                <div className="divide-y divide-white/[0.05]">
                  {items.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.06} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
