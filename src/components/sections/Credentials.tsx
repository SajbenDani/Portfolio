import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { cn } from '@/lib/utils'

const credentials = [
  'IEEE CAMAD 2026',
  'Ericsson',
  'PTC',
  'Morgan Stanley',
  'Technical University of Munich',
  'University College Dublin',
  'Budapest University of Technology',
  'Anthropic certified',
  'PwC AI Hackathon finalist',
  'TDK award 2025',
]

/**
 * Where the work has been. A strip that slides with the scroll (it tracks
 * the visitor's own input, so it never moves on its own); static and wrapped
 * for reduced motion.
 */
export default function Credentials() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.cred-track',
          { xPercent: 0 },
          {
            xPercent: -38,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Affiliations and recognition" className="relative overflow-hidden py-16 md:py-24">
      <ul className="cred-track flex w-max items-center whitespace-nowrap px-6 reduced:w-auto reduced:flex-wrap reduced:justify-center reduced:gap-x-10 reduced:gap-y-4 reduced:whitespace-normal">
        {[...credentials, ...credentials.slice(0, 5)].map((item, i, all) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= credentials.length || undefined}
            className="flex items-center text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold tracking-[-0.02em] text-label-3 reduced:[&:nth-child(n+11)]:hidden"
          >
            <span className={cn('full-motion:whitespace-nowrap reduced:text-center', i % 3 === 0 && 'text-label')}>{item}</span>
            {/* Separator only between items, and only on the moving single line. */}
            {i < all.length - 1 && (
              <span className="mx-6 h-1.5 w-1.5 shrink-0 rounded-full bg-raised-3 md:mx-8 reduced:hidden" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
