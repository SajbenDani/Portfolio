import { motion } from 'framer-motion'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { skills } from '@/data/skills'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import SkillBar from '@/components/shared/SkillBar'

export default function Skills() {
  const expert = skills.filter((s) => s.category === 'expert')
  const proficient = skills.filter((s) => s.category === 'proficient')
  const familiar = skills.filter((s) => s.category === 'familiar')

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
          <p className="text-center text-xs font-mono text-white/30 mb-4 tracking-widest uppercase">
            AI Researcher
          </p>
          <CpuArchitecture
            width="100%"
            height="200px"
            text="DS"
            className="text-white/20"
          />
          <p className="text-center text-xs text-white/20 mt-4 font-mono">
            ML · DL · CV · GenAI · NLP · Agents
          </p>
        </div>
      </motion.div>

      {/* Skill grids — 3 columns on lg */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Expert */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-copper-lite" />
              Expert
            </h3>
            <div className="divide-y divide-white/[0.05]">
              {expert.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.06} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Proficient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-copper" />
              Proficient
            </h3>
            <div className="divide-y divide-white/[0.05]">
              {proficient.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.06} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Familiar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze" />
              Familiar
            </h3>
            <div className="divide-y divide-white/[0.05]">
              {familiar.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.06} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
