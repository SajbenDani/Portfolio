import { useMemo } from 'react'
import type { FilterCategory } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * Deterministic abstract artwork for project cards — a bespoke copper/bronze
 * mesh-gradient plus a per-category motif drawn in SVG. Replaces stock photos
 * so the whole section reads as designed, not templated. Pure SVG/CSS, no deps.
 */

// ── deterministic PRNG seeded from the project id ──────────────────────────
function hashString(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const COPPER = '#c87e54'
const COPPER_LITE = '#e3a579'
const BRONZE = '#8c5a3b'

interface Props {
  id: string
  category: FilterCategory
  className?: string
}

export default function ProjectArtwork({ id, category, className }: Props) {
  const { bg, motif } = useMemo(() => buildArtwork(id, category), [id, category])
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: bg }} />
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={COPPER_LITE} />
            <stop offset="100%" stopColor={BRONZE} />
          </linearGradient>
        </defs>
        {motif}
      </svg>
      {/* film grain + vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
    </div>
  )
}

function buildArtwork(id: string, category: FilterCategory) {
  const rnd = mulberry32(hashString(id))
  const stroke = `url(#stroke-${id})`

  // seeded warm mesh-gradient background
  const x1 = 15 + rnd() * 70
  const y1 = 10 + rnd() * 60
  const x2 = 20 + rnd() * 70
  const y2 = 40 + rnd() * 55
  const bg = `radial-gradient(120% 120% at ${x1}% ${y1}%, rgba(200,126,84,0.28), transparent 55%),
              radial-gradient(110% 110% at ${x2}% ${y2}%, rgba(140,90,59,0.30), transparent 60%),
              linear-gradient(135deg, #16130f 0%, #0d0c0b 100%)`

  let motif: JSX.Element

  switch (category) {
    case 'research': {
      // layered signal / brain waves
      const waves = Array.from({ length: 5 }, (_, i) => {
        const base = 60 + i * 32
        const amp = 14 + rnd() * 16
        const phase = rnd() * Math.PI * 2
        let d = `M -20 ${base}`
        for (let x = 0; x <= 420; x += 20) {
          const y = base + Math.sin(x / 38 + phase) * amp
          d += ` L ${x} ${y.toFixed(1)}`
        }
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={1.2}
            opacity={0.18 + i * 0.07}
          />
        )
      })
      motif = <g>{waves}</g>
      break
    }
    case 'ai': {
      // neural / agent graph: nodes + edges
      const nodes = Array.from({ length: 9 }, () => ({
        x: 40 + rnd() * 320,
        y: 30 + rnd() * 190,
        r: 2 + rnd() * 3,
      }))
      const edges: JSX.Element[] = []
      nodes.forEach((n, i) => {
        const m = nodes[(i + 1 + Math.floor(rnd() * 3)) % nodes.length]
        edges.push(
          <line
            key={`e${i}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke={stroke}
            strokeWidth={0.8}
            opacity={0.35}
          />,
        )
      })
      motif = (
        <g>
          {edges}
          {nodes.map((n, i) => (
            <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r} fill={i % 2 ? COPPER_LITE : COPPER} opacity={0.9} />
          ))}
        </g>
      )
      break
    }
    case 'web': {
      // perspective grid + window frame
      const lines: JSX.Element[] = []
      for (let i = 0; i <= 8; i++) {
        const x = i * 50
        lines.push(<line key={`v${i}`} x1={x} y1={0} x2={200} y2={250} stroke={stroke} strokeWidth={0.6} opacity={0.18} />)
      }
      for (let i = 0; i <= 6; i++) {
        const y = 70 + i * 30
        lines.push(<line key={`h${i}`} x1={0} y1={y} x2={400} y2={y} stroke={stroke} strokeWidth={0.6} opacity={0.12} />)
      }
      motif = (
        <g>
          {lines}
          <rect x={130} y={70} width={140} height={95} rx={6} fill="none" stroke={COPPER_LITE} strokeWidth={1.4} opacity={0.7} />
          <line x1={130} y1={88} x2={270} y2={88} stroke={COPPER_LITE} strokeWidth={1} opacity={0.6} />
          <circle cx={140} cy={79} r={2} fill={COPPER} />
          <circle cx={148} cy={79} r={2} fill={COPPER} />
        </g>
      )
      break
    }
    case 'competition': {
      // concentric podium rings + star
      const rings = Array.from({ length: 4 }, (_, i) => (
        <circle
          key={i}
          cx={200}
          cy={130}
          r={28 + i * 26}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          opacity={0.4 - i * 0.07}
        />
      ))
      const star = starPath(200, 128, 5, 22, 9)
      motif = (
        <g>
          {rings}
          <path d={star} fill={COPPER_LITE} opacity={0.92} />
        </g>
      )
      break
    }
    default: {
      // orbital ellipses (ties to the global orbital motif)
      const orbits = Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={i}
          cx={200}
          cy={125}
          rx={50 + i * 40}
          ry={22 + i * 16}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          opacity={0.35 - i * 0.06}
          transform={`rotate(${-20 + i * 12} 200 125)`}
        />
      ))
      motif = (
        <g>
          {orbits}
          <circle cx={200} cy={125} r={5} fill={COPPER_LITE} />
        </g>
      )
    }
  }

  return { bg, motif }
}

function starPath(cx: number, cy: number, points: number, outer: number, inner: number): string {
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI / points) * i - Math.PI / 2
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `
  }
  return d + 'Z'
}
