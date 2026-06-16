import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Floating back-to-top button, appears after ~600px of scroll. */
export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  const reduced = useReducedMotion()

  // Same-value setState bails out, so this doesn't re-render per scroll pixel.
  // Hidden near the page bottom — the footer's own "Back to top" takes over there.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearBottom =
      y + window.innerHeight >= document.documentElement.scrollHeight - 140
    setShow(y > 600 && !nearBottom)
  })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 rounded-full glass-card flex items-center justify-center text-copper hover:text-copper-lite transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
