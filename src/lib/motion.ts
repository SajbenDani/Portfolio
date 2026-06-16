import type { Variants } from 'framer-motion'

/** Shared easing — same curve the site already uses for entrances. */
export const EASE_OUT = [0.4, 0, 0.2, 1] as const

export const DURATION = { fast: 0.35, base: 0.6, slow: 0.8 } as const

/** Standard once-only viewport trigger used across sections. */
export const VIEWPORT_ONCE = { once: true, margin: '-60px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
}

export const staggerContainer = (stagger = 0.12, delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
