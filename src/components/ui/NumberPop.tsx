import { useRef } from 'react'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * transitions.dev "number pop-in": each character re-enters with a short
 * blurred rise, the last two staggered, when the figure scrolls into view.
 */
export default function NumberPop({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const chars = value.split('')

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => ref.current?.classList.add('is-animating'),
    })
  })

  return (
    <span ref={ref} className={cn('t-digit-group tabular', className)} aria-label={value} role="text">
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="t-digit"
          data-stagger={i === chars.length - 2 ? '1' : i === chars.length - 1 ? '2' : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
