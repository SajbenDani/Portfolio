import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useNavHidden } from '@/hooks/useNavHidden'
import { navLinks } from '@/data/nav'

export default function Navbar() {
  const hidden = useNavHidden()
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.88])
  const bgColor = useMotionTemplate`rgba(3,3,3,${bgOpacity})`
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: hidden && !mobileOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.div
        className="border-b border-white/[0.06]"
        style={{
          backgroundColor: bgColor,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-copper font-medium text-xl font-mono tracking-widest select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            DS
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <motion.button
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-sm text-content-tertiary hover:text-content transition-colors"
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-copper rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden text-content-tertiary hover:text-content p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const active = activeSection === link.href.slice(1)
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left py-2.5 pl-3 border-l-2 text-sm transition-colors ${
                      active
                        ? 'text-copper border-copper'
                        : 'text-content-tertiary border-transparent hover:text-content'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
