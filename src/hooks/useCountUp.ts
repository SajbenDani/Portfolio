import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Counts from 0 to `target` once the attached element scrolls into view.
 * Reduced-motion users get the final value immediately.
 */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(target)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, target])

  return { ref, value }
}
