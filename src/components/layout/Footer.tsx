import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion'

const socials = [
  { icon: Github, href: 'https://github.com/SajbenDani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A1nielsajben/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sajben.dani@gmail.com', label: 'Email' },
]

export default function Footer() {
  const reduced = useReducedMotion()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative mt-12">
      {/* Copper hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="max-w-6xl mx-auto px-6 py-14"
      >
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-copper font-medium font-mono tracking-widest text-lg">DS</span>
              <span className="h-4 w-px bg-white/10" />
              <span className="text-sm text-content-secondary">Dániel Sajben</span>
            </div>
            <p className="text-sm text-content-tertiary leading-relaxed max-w-xs mb-4">
              AI researcher &amp; engineer — deep learning, generative AI, and the systems around
              them.
            </p>
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-available"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-content-tertiary">
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-mono uppercase tracking-widest text-content-faint mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-content-tertiary hover:text-copper transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-content-faint mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2.5 text-sm text-content-tertiary hover:text-copper transition-colors"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-content-faint">
            © {new Date().getFullYear()} Dániel Sajben
          </p>
          <p className="text-[0.7rem] text-content-faint font-mono tracking-wide">
            Designed &amp; built with React · Three.js · Framer Motion · Tailwind
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs text-content-tertiary hover:text-copper transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
