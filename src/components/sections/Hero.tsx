import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import Magnetic from '@/components/shared/Magnetic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { asset } from '@/lib/utils'

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

const SPOT_SIZE = 560

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const spotlightOn = finePointer && !reduced

  // Pointer-following copper spotlight — motion values only, no re-renders.
  const rawX = useMotionValue(-SPOT_SIZE)
  const rawY = useMotionValue(-SPOT_SIZE)
  const spotX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const spotY = useSpring(rawY, { stiffness: 60, damping: 20 })
  const hasMoved = useRef(false)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightOn) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left - SPOT_SIZE / 2
    const py = e.clientY - rect.top - SPOT_SIZE / 2
    if (!hasMoved.current) {
      hasMoved.current = true
      rawX.jump(px)
      rawY.jump(py)
      spotX.jump(px)
      spotY.jump(py)
      return
    }
    rawX.set(px)
    rawY.set(py)
  }

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
    >
      {/* Clean ambient glow behind the name */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.05),transparent_55%)] pointer-events-none" />

      {/* Pointer-following spotlight */}
      {spotlightOn && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 rounded-full"
          style={{
            x: spotX,
            y: spotY,
            width: SPOT_SIZE,
            height: SPOT_SIZE,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent 60%)',
          }}
        />
      )}

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
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-medium text-white font-mono shadow-[0_0_44px_rgba(255,255,255,0.1)] backdrop-blur-md">
                DS
              </div>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
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
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-display font-display"
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
                className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium tracking-wide"
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
            className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
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
            <Magnetic disabled={!spotlightOn}>
              <LiquidButton
                size="xl"
                className="text-copper-lite"
                onClick={() =>
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View My Work
              </LiquidButton>
            </Magnetic>
            <Magnetic disabled={!spotlightOn}>
              <LiquidButton
                size="xl"
                className="text-foreground/70"
                onClick={() => window.open(asset('/SajbenDánielCV.pdf'), '_blank')}
              >
                Download CV
              </LiquidButton>
            </Magnetic>
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
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-content-tertiary hover:text-white transition-colors"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
