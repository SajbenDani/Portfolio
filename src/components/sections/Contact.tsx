import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'

const socials = [
  { icon: Github, href: 'https://github.com/SajbenDani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A1nielsajben/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sajben.dani@gmail.com', label: 'Email' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeading
        index="06"
        plain="Get In"
        accent="Touch"
        subtitle="Open to collaborations, research opportunities, and new roles"
      />

      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-muted-foreground leading-relaxed mb-8"
        >
          Whether you have an exciting project, a role in AI/ML research, or just want to talk tech
          — my inbox is always open.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <LiquidButton
            size="xl"
            className="text-copper-lite"
            onClick={() => (window.location.href = 'mailto:sajben.dani@gmail.com')}
          >
            Send a Message
          </LiquidButton>
          <LiquidButton
            size="xl"
            className="text-foreground/70"
            onClick={() => window.open('/SajbenDánielCV.pdf', '_blank')}
          >
            Download CV
          </LiquidButton>
        </motion.div>

        {/* Info cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants}>
            <GlassCard className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-copper" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 mb-0.5">Email</p>
                <a
                  href="mailto:sajben.dani@gmail.com"
                  className="text-sm text-white/80 hover:text-copper transition-colors font-mono"
                >
                  sajben.dani@gmail.com
                </a>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants}>
            <GlassCard className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-lg bg-bronze/15 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-copper-lite" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 mb-0.5">Location</p>
                <p className="text-sm text-white/80">Dublin, Ireland</p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Job preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-available"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-white/70">
                Available for new opportunities
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              <span className="text-white/60 font-medium">EU citizen</span> · Dublin · London ·
              Munich · Budapest · Remote
            </p>
          </GlassCard>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-copper transition-colors"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
