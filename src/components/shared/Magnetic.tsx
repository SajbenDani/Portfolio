import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  /** Disable on coarse pointers / reduced motion. */
  disabled?: boolean
  className?: string
}

/** Wrapper that gently pulls its child toward the cursor (clamped ±10px). */
export default function Magnetic({ children, disabled = false, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 18 })
  const sy = useSpring(y, { stiffness: 240, damping: 18 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-10, Math.min(10, v))
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * 0.25))
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * 0.25))
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
