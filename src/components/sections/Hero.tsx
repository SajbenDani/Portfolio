import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const roles = [
  'AI Researcher',
  'Deep Learning Engineer',
  'ML Engineer',
  'Computer Scientist',
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/SajbenDani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A1nielsajben/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sajben.dani@gmail.com', label: 'Email' },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Soft copper key-light behind the name */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(200,126,84,0.10),transparent_55%)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 0.86, 0.39, 0.96] }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-24 h-24 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-copper/25 to-bronze/20 border border-copper/40 flex items-center justify-center text-3xl font-bold text-copper-lite font-mono shadow-[0_0_44px_rgba(200,126,84,0.22)]">
                DS
              </div>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-copper/25"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-available"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-muted-foreground tracking-wide">Dublin</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-[-0.03em] font-display"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/75">
              Dániel Sajben
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-10 flex items-center justify-center mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIdx]}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-xl sm:text-2xl md:text-3xl text-copper-gradient font-medium"
              >
                {roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed font-light max-w-2xl mx-auto"
          >
            MSc AI student at UCD Dublin, B.Sc. at BME with First Class Honours. Specialising in
            Deep Learning, Generative AI and AI for medicine.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <LiquidButton
              size="xl"
              className="text-copper-lite"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View My Work
            </LiquidButton>
            <LiquidButton
              size="xl"
              className="text-foreground/70"
              onClick={() => window.open('/SajbenDánielCV.pdf', '_blank')}
            >
              Download CV
            </LiquidButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex items-center justify-center gap-3"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-copper transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-copper/45"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
