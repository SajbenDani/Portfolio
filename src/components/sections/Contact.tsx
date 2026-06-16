import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Copy, Check } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionHeading from '@/components/shared/SectionHeading'
import GlassCard from '@/components/shared/GlassCard'
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion'
import { asset } from '@/lib/utils'

const EMAIL = 'sajben.dani@gmail.com'

const socials = [
  { icon: Github, href: 'https://github.com/SajbenDani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A1nielsajben/', label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | undefined>(undefined)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.clearTimeout(resetTimer.current)
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. http) — the mailto link still works.
    }
  }

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
            onClick={() => (window.location.href = `mailto:${EMAIL}`)}
          >
            Send a Message
          </LiquidButton>
          <LiquidButton
            size="xl"
            className="text-foreground/70"
            onClick={() => window.open(asset('/SajbenDánielCV.pdf'), '_blank')}
          >
            Download CV
          </LiquidButton>
        </motion.div>

        {/* Info cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 mb-10"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.div variants={fadeUp}>
            <GlassCard className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-copper" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs text-content-tertiary mb-0.5">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-content-secondary hover:text-copper transition-colors font-mono break-all"
                >
                  {EMAIL}
                </a>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-content-tertiary hover:text-copper hover:bg-white/[0.05] transition-colors flex-shrink-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-available"
                    >
                      <Check size={15} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Copy size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-lg bg-bronze/15 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-copper-lite" />
              </div>
              <div className="text-left">
                <p className="text-xs text-content-tertiary mb-0.5">Location</p>
                <p className="text-sm text-content-secondary">Dublin, Ireland</p>
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
              <span className="text-sm font-medium text-content-secondary">
                Available for new opportunities
              </span>
            </div>
            <p className="text-xs text-content-tertiary leading-relaxed">
              <span className="text-content-secondary font-medium">EU citizen</span> · Dublin ·
              London · Munich · Budapest · Remote
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
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-content-tertiary hover:text-copper transition-colors"
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
