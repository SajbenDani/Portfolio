import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, MapPin } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'

const techTags = [
  'Python', 'PyTorch', 'TensorFlow', 'Deep Learning',
  'Computer Vision', 'Generative AI', 'NLP', 'AI Agents',
  'Java Spring', 'Angular', 'React', 'TypeScript', 'SQL',
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading plain="About" accent="Me" subtitle="A little about who I am and what I do" />

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left — prose */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <p className="text-white/70 leading-relaxed text-lg">
            I'm a Computer Science Engineering graduate from{' '}
            <span className="text-white/90 font-medium">
              Budapest University of Technology (First Class Honours)
            </span>
            , currently pursuing an{' '}
            <span className="text-white/90 font-medium">
              MSc in Advanced AI at University College Dublin
            </span>
            .
          </p>
          <p className="text-white/70 leading-relaxed">
            Currently working as a{' '}
            <span className="text-[#00d4ff]">Data Science & AI Engineer at PTC Hungary</span>,
            building agentic pipelines. Simultaneously conducting thesis research on fMRI
            harmonisation — NeurIPS 2026 submission. Also active in other research in the telcom
            domain.
          </p>
          <p className="text-white/70 leading-relaxed">
            My work sits at the intersection of cutting-edge AI research and practical engineering.
            I'm passionate about generative models, computer vision, and intelligent agents that
            operate in real-world environments.
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,255,0.15)' }}
                className="px-3 py-1 rounded-full text-xs font-mono text-white/60 border border-white/[0.08] bg-white/[0.03] cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right — cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={20} className="text-[#00d4ff]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Education</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div>
                    <p className="text-white/80 font-medium">MSc Advanced Artificial Intelligence</p>
                    <p>University College Dublin (#118 globally) · 2026–2027</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">B.Sc. Computer Science Engineering</p>
                    <p>Budapest University of Technology · GPA 4.65/5.00 · First Class Honours</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Exchange — AI & Deep Learning</p>
                    <p>Technical University of Munich (TUM) · GPA 1.3/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Briefcase size={20} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Current Focus</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div>
                    <p className="text-white/80 font-medium">Data Science & AI Engineer Intern</p>
                    <p>PTC Hungary · Python · LLM · AI Agents</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Thesis Research</p>
                    <p>fMRI Harmonisation · NeurIPS 2026 submission</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-rose-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Location & Availability</h3>
                <p className="text-sm text-white/60">Based in Dublin, Ireland</p>
                <p className="text-sm text-white/60 mt-1">
                  EU citizen · Open to roles in{' '}
                  <span className="text-white/80">Dublin · London · Munich · Budapest · Remote</span>
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
