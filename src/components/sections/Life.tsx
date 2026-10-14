import { useId, useRef, useState } from 'react'
import { Activity, ChefHat, Dumbbell, Heart, Sigma, Spade, Users, type LucideIcon } from 'lucide-react'
import { interests } from '@/data/personal'
import { gsap, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { cn } from '@/lib/utils'
import ChapterHeading from '@/components/ui/ChapterHeading'
import Picture from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'

const icons: Record<(typeof interests)[number]['id'], LucideIcon> = {
  strength: Dumbbell,
  data: Activity,
  cooking: ChefHat,
  people: Users,
  maths: Sigma,
  poker: Spade,
}

function CardBack() {
  const id = `lattice-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 96 136" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H10M0 0V10" stroke="rgb(255 255 255 / 0.13)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="7" y="7" width="82" height="122" rx="6" fill={`url(#${id})`} />
      <rect x="7.5" y="7.5" width="81" height="121" rx="6" fill="none" stroke="rgb(255 255 255 / 0.28)" />
      <path d="M48 52 L60 68 L48 84 L36 68 Z" fill="var(--color-raised-2)" stroke="rgb(255 255 255 / 0.5)" strokeWidth="1.25" />
      <path d="M48 60 L54 68 L48 76 L42 68 Z" fill="rgb(255 255 255 / 0.5)" />
    </svg>
  )
}

function PlayingCard({ suit, dealt, delay }: { suit: 'spades' | 'hearts'; dealt: boolean; delay: number }) {
  const Icon = suit === 'spades' ? Spade : Heart
  const red = suit === 'hearts'
  return (
    <div className="h-[8.5rem] w-24 [perspective:800px]">
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-700 ease-[var(--ease-smooth-out)] [transform-style:preserve-3d] reduced:transition-none',
          dealt && '[transform:rotateY(180deg)] reduced:[transform:none]',
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* back: an authored card back — framed lattice with a centre lozenge */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden rounded-xl bg-raised-2 [backface-visibility:hidden]',
            'reduced:transition-opacity reduced:duration-150',
            dealt && 'reduced:opacity-0',
          )}
        >
          <CardBack />
        </div>
        {/* face */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-between rounded-xl bg-label p-2.5 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'reduced:[transform:none] reduced:opacity-0 reduced:transition-opacity reduced:duration-150',
            dealt && 'reduced:opacity-100',
            red ? 'text-card-red' : 'text-black',
          )}
        >
          <span className="flex flex-col items-start text-[1.375rem] font-bold leading-none">
            A
            <Icon size={14} strokeWidth={2.5} fill="currentColor" aria-hidden="true" className="mt-1" />
          </span>
          <Icon size={34} strokeWidth={1.5} fill="currentColor" aria-hidden="true" className="self-center" />
          <span className="rotate-180 self-end text-[1.375rem] font-bold leading-none">A</span>
        </div>
      </div>
    </div>
  )
}

/** Poker: deal pocket aces and show the pre-flop odds. Small, honest, his kind of maths. */
function Odds() {
  const [dealt, setDealt] = useState(false)
  return (
    <div className="rounded-card bg-raised p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex gap-3" role="img" aria-label={dealt ? 'Ace of spades and ace of hearts' : 'Two cards face down'}>
          <PlayingCard suit="spades" dealt={dealt} delay={0} />
          <PlayingCard suit="hearts" dealt={dealt} delay={90} />
        </div>
        <div className="min-w-[14rem] flex-1">
          <p className="text-[1.125rem] font-semibold text-label" aria-live="polite">
            {dealt ? 'Pocket aces. About 85% to win.' : 'Want to see the best start in poker?'}
          </p>
          <p className="mt-1 text-[0.9375rem] text-label-2">
            {dealt
              ? 'Heads-up, pre-flop, against a random hand. Still loses about one time in seven.'
              : 'Two cards, one probability.'}
          </p>
          <Button variant="secondary" className="mt-4" onClick={() => setDealt((d) => !d)}>
            {dealt ? 'Shuffle' : 'Deal me in'}
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Chapter "Off the clock". The lakeside portrait gets a slow camera push-in
 * as the chapter scrolls by: a small move rather than a pinned scene.
 */
export default function Life() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // A slow push-in as the chapter passes: the camera drifts toward him.
        gsap.fromTo(
          '.life-img',
          { scale: 1.12, yPercent: 2 },
          { scale: 1, yPercent: -2, ease: 'none', scrollTrigger: { trigger: '.life-photo', start: 'top bottom', end: 'bottom top', scrub: 0.6 } },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="life" className="mx-auto max-w-[1240px] px-5 py-[clamp(6rem,12vw,10rem)] md:px-8">
      <ChapterHeading title="Off the clock." muted="Lifting, cooking, data and the odds." />

      <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <figure className="life-photo photo-edge relative aspect-[3/4] overflow-hidden rounded-stage bg-raised">
          <Picture
            photo="portrait"
            alt="Dániel smiling in a white shirt and light jeans, a softly blurred atrium behind him."
            sizes="(max-width: 1023px) 92vw, 480px"
            className="life-img absolute inset-0"
            imgClassName="object-[50%_25%]"
          />
        </figure>

        <div className="flex flex-col gap-10">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {interests.map((it) => {
              const Icon = icons[it.id]
              return (
                <li key={it.id} className="flex gap-5 py-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-raised text-label">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">{it.title}</h3>
                    <p className="mt-1 text-label-2">{it.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <Odds />
        </div>
      </div>
    </section>
  )
}
