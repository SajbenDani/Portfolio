import { useRef } from 'react'
import { useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'

interface Options {
  /** Number of items around the ring (used for goTo / step). */
  count: number
  /** Constant idle spin speed in deg/sec. */
  idleSpeed?: number
  /** Degrees of rotation per pixel dragged. */
  sensitivity?: number
  /** Clamp for fling velocity (deg/sec). */
  maxVelocity?: number
  /** When false, all physics is disabled (reduced motion). */
  enabled?: boolean
}

/**
 * Physics-based rotation for a 3D carousel:
 *  • a constant slow idle spin,
 *  • grab-and-drag that follows the pointer,
 *  • flick → fast spin that decays incrementally back to the idle speed (inertia),
 *  • precise goTo / next / prev for buttons + keyboard,
 *  • freeze-on-hover so the cards can be read.
 *
 * Built on framer-motion (motion value + rAF integrator + `animate`) and
 * @use-gesture/react (drag with velocity). Returns a MotionValue<number> of
 * degrees to feed the ring's rotateY.
 */
export function useInertialRotation({
  count,
  idleSpeed = 6,
  sensitivity = 0.5,
  maxVelocity = 720,
  enabled = true,
}: Options) {
  const rotation = useMotionValue(0)
  const velocity = useRef(idleSpeed)
  const dragging = useRef(false)
  const frozen = useRef(false)
  const controlled = useRef(false)
  const animRef = useRef<{ stop: () => void } | null>(null)

  useAnimationFrame((_, delta) => {
    if (!enabled || dragging.current || controlled.current || frozen.current) return
    const dt = Math.min(delta, 64) / 1000
    // exponential decay of velocity toward the constant idle speed
    const decay = Math.pow(0.94, dt * 60)
    velocity.current = idleSpeed + (velocity.current - idleSpeed) * decay
    rotation.set(rotation.get() + velocity.current * dt)
  })

  const stopAnim = () => {
    animRef.current?.stop()
    animRef.current = null
    controlled.current = false
  }

  const bind = useDrag(
    ({ first, active, last, delta: [dx], velocity: [vx], direction: [dirx] }) => {
      if (!enabled) return
      if (first) {
        dragging.current = true
        stopAnim()
      }
      if (active) {
        rotation.set(rotation.get() + dx * sensitivity)
      }
      if (last) {
        dragging.current = false
        let v = vx * dirx * 1000 * sensitivity
        v = Math.max(-maxVelocity, Math.min(maxVelocity, v))
        velocity.current = v
      }
    },
    { pointer: { touch: true }, filterTaps: true },
  )

  const goToIndex = (index: number) => {
    if (!enabled) return
    stopAnim()
    controlled.current = true
    const stepDeg = 360 / count
    const current = rotation.get()
    const targetBase = -stepDeg * index
    // shortest angular path to the target
    const diff = ((((targetBase - current) % 360) + 540) % 360) - 180
    const target = current + diff
    const controls = animate(rotation, target, {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      onComplete: () => {
        controlled.current = false
        velocity.current = idleSpeed
      },
    })
    animRef.current = controls
  }

  const step = (dir: number) => {
    const stepDeg = 360 / count
    const nearest = Math.round(-rotation.get() / stepDeg)
    goToIndex(nearest + dir)
  }

  const freeze = () => {
    frozen.current = true
  }
  const unfreeze = () => {
    frozen.current = false
    if (Math.abs(velocity.current) < idleSpeed) velocity.current = idleSpeed
  }

  return {
    rotation,
    bind,
    goToIndex,
    next: () => step(1),
    prev: () => step(-1),
    freeze,
    unfreeze,
  }
}
