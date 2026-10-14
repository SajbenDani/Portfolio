import { useRef } from 'react'
import { cn } from '@/lib/utils'

const LIFT = -4
const FALLOFF = 0.45
const SCALE = 1.05
const EASE_IN = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASE_OUT = 'cubic-bezier(0.34, 3.85, 0.64, 1)'

/**
 * A row of chips with transitions.dev "avatar group hover": the hovered chip
 * lifts, its neighbours follow with distance falloff, a springy return on leave.
 */
export default function ChipRow({ items, className }: { items: readonly string[]; className?: string }) {
  const rootRef = useRef<HTMLUListElement>(null)

  const setShifts = (active: number | null, phase: 'in' | 'out') => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    rootRef.current?.querySelectorAll<HTMLElement>('.t-avatar').forEach((el, i) => {
      el.style.transitionTimingFunction = phase === 'out' ? EASE_OUT : EASE_IN
      if (active == null) {
        el.style.setProperty('--shift', '0px')
        el.style.setProperty('--scale-active', '1')
        return
      }
      const d = Math.abs(i - active)
      el.style.setProperty('--shift', `${(LIFT * Math.pow(FALLOFF, d)).toFixed(3)}px`)
      el.style.setProperty('--scale-active', i === active ? String(SCALE) : '1')
    })
  }

  return (
    <ul ref={rootRef} className={cn('flex flex-wrap gap-2', className)} onMouseLeave={() => setShifts(null, 'out')}>
      {items.map((item, i) => (
        <li
          key={item}
          className="t-avatar rounded-full bg-raised px-3.5 py-1.5 text-[0.9375rem] text-label"
          onMouseEnter={() => setShifts(i, 'in')}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
