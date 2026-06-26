import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import type { Group } from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * Fixed, full-bleed ambient starfield that sits behind all content and ties the
 * sections together (replaces the old plasma shader). Constant slow drift +
 * scroll-driven tilt give the page depth. White "dust" adds the accent warmth.
 * Reduced-motion users get a static warm gradient instead of a live canvas.
 */
function Drifting() {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    // constant slow rotation
    g.rotation.y += Math.min(delta, 0.05) * 0.012
    // gentle tilt that tracks scroll progress
    const doc = document.documentElement
    const denom = doc.scrollHeight - doc.clientHeight
    const p = denom > 0 ? doc.scrollTop / denom : 0
    const targetX = p * 0.6 - 0.15
    g.rotation.x += (targetX - g.rotation.x) * 0.04
  })

  return (
    <group ref={group}>
      <Stars radius={90} depth={55} count={2600} factor={3.2} saturation={0} fade speed={0.5} />
      <Sparkles
        count={45}
        scale={[20, 20, 8]}
        size={3.4}
        speed={0.22}
        color="#ffffff"
        opacity={0.55}
        noise={1.4}
      />
    </group>
  )
}

export default function AmbientScene({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        className={cn(
          'bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]',
          className,
        )}
      />
    )
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Drifting />
      </Canvas>
    </div>
  )
}
