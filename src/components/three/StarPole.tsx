import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { AdditiveBlending, type Points as ThreePoints } from 'three'
import type { MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * The vertical "pole" the project cards orbit — an unstructured column of
 * copper dots (denser toward the axis) plus off-white sparkle. Slowly self-
 * rotates. Rendered in its own R3F canvas, composited behind the CSS-3D cards.
 */
function PoleField({ spin }: { spin?: MotionValue<number> }) {
  const ref = useRef<ThreePoints>(null)
  const idle = useRef(0)

  const positions = useMemo(() => {
    const N = 460
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const y = (Math.random() * 2 - 1) * 5.2
      // bias radius toward the axis for a dense, wispy pole
      const r = Math.pow(Math.random(), 0.6) * 0.55
      const a = Math.random() * Math.PI * 2
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sin(a) * r
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    idle.current += Math.min(delta, 0.05) * 0.1
    // co-rotate with the scroll-driven helix (parallax: ~half speed)
    const scrollSpin = spin ? (spin.get() * Math.PI) / 180 * 0.5 : 0
    g.rotation.y = idle.current + scrollSpin
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#e3a579"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

export default function StarPole({
  className,
  spin,
}: {
  className?: string
  spin?: MotionValue<number>
}) {
  return (
    <div className={cn(className)}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <PoleField spin={spin} />
        <Sparkles count={70} scale={[1.4, 10.5, 1.4]} size={2.2} speed={0.3} color="#f4f1ec" opacity={0.55} />
      </Canvas>
    </div>
  )
}
