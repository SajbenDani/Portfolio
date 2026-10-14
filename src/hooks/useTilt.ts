import { useEffect, type RefObject } from 'react'
import { MQ } from '@/lib/motion'

const MAX = 6 // degrees at the card edge: a quiet lean for large cards

/**
 * transitions.dev "card hover tilt": track the pointer on the flat outer
 * wrapper and tilt the inner card toward it, with a cursor-tracked glare.
 * Fine pointers only, so touch scrolling over cards is never captured.
 */
export function useTilt(outer: RefObject<HTMLElement>, card: RefObject<HTMLElement>) {
  useEffect(() => {
    const wrap = outer.current
    const el = card.current
    if (!wrap || !el) return
    const fine = window.matchMedia(MQ.fine)
    const reduce = window.matchMedia(MQ.reduce)
    if (!fine.matches || reduce.matches) return

    const reset = () => {
      wrap.classList.remove('is-hover')
      el.classList.remove('is-tilting')
      el.style.setProperty('--tilt-rx', '0deg')
      el.style.setProperty('--tilt-ry', '0deg')
    }
    const track = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
      wrap.classList.add('is-hover')
      el.classList.add('is-tilting')
      el.style.setProperty('--tilt-ry', `${((px - 0.5) * MAX).toFixed(2)}deg`)
      el.style.setProperty('--tilt-rx', `${((0.5 - py) * MAX).toFixed(2)}deg`)
      el.style.setProperty('--tilt-gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--tilt-gy', `${(py * 100).toFixed(1)}%`)
    }
    wrap.addEventListener('pointermove', track)
    wrap.addEventListener('pointerleave', reset)
    return () => {
      wrap.removeEventListener('pointermove', track)
      wrap.removeEventListener('pointerleave', reset)
    }
  }, [outer, card])
}
