import { useRef, useState } from 'react'
import { milestones } from '@/data/milestones'
import { photos } from '@/data/photos'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { scrollToY } from '@/lib/smooth'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ChapterHeading from '@/components/ui/ChapterHeading'
import Picture from '@/components/ui/Picture'
import SwapText from '@/components/ui/SwapText'

const N = milestones.length
const clamp01 = gsap.utils.clamp(0, 1)
const sineInOut = gsap.parseEase('sine.inOut')
/** Mostly eased (the camera settles at each moment), partly linear (it never stalls). */
const glide = (t: number) => 0.35 * t + 0.65 * sineInOut(t)

/** Static fallback for reduced motion: the same moments as a captioned list. */
function MilestoneList() {
  return (
    <ol className="grid gap-x-6 gap-y-14 md:grid-cols-2">
      {milestones.map((m) => (
        <li key={m.id}>
          <figure>
            <Picture
              photo={m.photo}
              alt={m.alt}
              sizes="(max-width: 767px) 92vw, 560px"
              className="photo-edge aspect-[4/3] overflow-hidden rounded-card"
            />
            <figcaption className="mt-4">
              <p className="text-[1.375rem] font-semibold tracking-[-0.015em]">{m.title}</p>
              <p className="mt-1 text-label-2">
                <span className="text-label">{m.place}.</span> {m.caption}
              </p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  )
}

/**
 * Chapter "Milestones" — the drone flight. The photos hang in one 3D world;
 * scroll moves the camera forward through it. Each photo is approached at an
 * angle, squares up to the camera when it arrives, then the camera arcs on to
 * the next. Captions stay in a still 2D frame so they are always crisp.
 */
export default function Milestones() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const trigger = useRef<ScrollTrigger | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MQ.motion, desktop: '(min-width: 768px)' }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion || !root.current) return

        const world = root.current.querySelector<HTMLElement>('.flight-world')!
        const cards = gsap.utils.toArray<HTMLElement>('.flight-card')
        const GAP = desktop ? 1500 : 1150
        const TURN = desktop ? 12 : 8 // degrees each photo is angled off the flight path
        const side = (i: number) => (i % 2 === 0 ? -1 : 1)
        const xs = () => cards.map((_, i) => side(i) * (desktop ? 0.17 : 0.06) * window.innerWidth)
        const ys = cards.map((_, i) => ((i % 3) - 1) * (desktop ? 36 : 20))
        const turns = cards.map((_, i) => -side(i) * TURN)
        let x = xs()

        cards.forEach((card, i) => {
          gsap.set(card, { xPercent: -50, yPercent: -50, x: x[i], y: ys[i], z: -i * GAP, rotationY: turns[i] })
        })
        const fade = cards.map((card) => gsap.quickSetter(card, 'opacity'))
        const lerp = (arr: number[], f: number) => {
          const i = Math.min(N - 2, Math.floor(f))
          const t = glide(clamp01(f - i))
          return arr[i] + (arr[i + 1] - arr[i]) * t
        }

        let last = -1
        const render = (progress: number) => {
          const f = progress * (N - 1)
          const i0 = Math.min(N - 2, Math.floor(f))
          const camZ = (i0 + glide(clamp01(f - i0))) * GAP
          const wx = -lerp(x, f)
          const wy = -lerp(ys, f)
          const orbit = -lerp(turns, f)
          world.style.transformOrigin = `50% 50% ${-camZ}px`
          world.style.transform = `translate3d(${wx}px, ${wy}px, ${camZ}px) rotateY(${orbit}deg)`
          cards.forEach((card, i) => {
            const d = camZ - i * GAP // > 0: the photo has passed the screen plane, toward the viewer
            let o: number
            if (d < -0.6 * GAP) o = clamp01((d + 3.2 * GAP) / (2.6 * GAP))
            else if (d <= 0.12 * GAP) o = 1
            else o = clamp01(1 - (d - 0.12 * GAP) / (0.33 * GAP))
            fade[i](o)
            card.style.visibility = o < 0.01 ? 'hidden' : 'visible'
          })
          const idx = Math.round(f)
          if (idx !== last) {
            last = idx
            setActive(idx)
          }
        }

        trigger.current = ScrollTrigger.create({
          trigger: '.flight',
          start: 'top top',
          end: `+=${(N - 1) * (desktop ? 85 : 75)}%`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
          onUpdate: (self) => render(self.progress),
          onRefresh: (self) => {
            x = xs()
            cards.forEach((card, i) => gsap.set(card, { x: x[i] }))
            render(self.progress)
          },
          onToggle: (self) => world.classList.toggle('will-change-transform', self.isActive),
        })
        render(0)

        return () => {
          trigger.current = null
        }
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced] },
  )

  // A station is a share of the pin distance.
  const jumpTo = (i: number) => {
    const st = trigger.current
    if (st) scrollToY(st.start + ((st.end - st.start) * i) / (N - 1))
  }

  const current = milestones[active] ?? milestones[0]

  return (
    <section ref={root} id="milestones" className="relative">
      <div className="mx-auto max-w-[1240px] px-5 pt-[clamp(6rem,12vw,10rem)] md:px-8">
        <ChapterHeading
          title="Milestones."
          muted={reduced ? 'The moments behind the work.' : 'Scroll to fly through the moments behind the work.'}
        />
      </div>

      {reduced ? (
        <div className="mx-auto max-w-[1240px] px-5 pb-[clamp(6rem,12vw,10rem)] md:px-8">
          <div className="mt-12 rounded-stage bg-raised p-5 md:p-10">
            <MilestoneList />
          </div>
        </div>
      ) : (
        <div className="flight relative mt-10 h-[100svh]" aria-roledescription="carousel" aria-label="Milestones">
          <div className="absolute inset-2 overflow-hidden rounded-[1.75rem] bg-raised md:inset-4 md:rounded-stage">
          <div className="absolute inset-0 [perspective:900px] [perspective-origin:50%_42%] md:[perspective:1200px]">
            <div className="flight-world absolute inset-0 [transform-style:preserve-3d]">
              {milestones.map((m, i) => {
                const spec = photos[m.photo]
                const aspect = spec.width / spec.height
                return (
                  <figure
                    key={m.id}
                    className="flight-card absolute left-1/2 top-[44%] w-[var(--w-m)] [backface-visibility:hidden] md:w-[var(--w-d)]"
                    style={{
                      ['--w-m' as string]: `min(84vw, calc(50svh * ${aspect}))`,
                      ['--w-d' as string]: `min(52vw, 760px, calc(62svh * ${aspect}))`,
                    }}
                    aria-hidden={i !== active}
                  >
                    <Picture
                      photo={m.photo}
                      alt={m.alt}
                      sizes="(max-width: 767px) 84vw, 760px"
                      className="photo-edge overflow-hidden rounded-card"
                      imgClassName="h-auto"
                      reveal={false}
                    />
                  </figure>
                )
              })}
            </div>
          </div>

          {/* Still frame of reference: caption and stations never move in 3D. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(28_28_30/0.95),rgb(28_28_30/0))] pb-[max(env(safe-area-inset-bottom),1.75rem)] pt-24">
            <div className="mx-auto max-w-[1240px] px-5 md:px-10" aria-live="polite">
              <p className="text-title font-bold tracking-[-0.02em]">
                <SwapText text={current.title} />
              </p>
              <p className="mt-2 max-w-[56ch] text-label-2 md:text-lead">
                <SwapText text={`${current.place}. ${current.caption}`} />
              </p>
            </div>
          </div>

          <ol
            aria-label="Stations"
            className="absolute left-1/2 top-[calc(max(env(safe-area-inset-top),12px)+48px)] flex -translate-x-1/2 md:left-auto md:right-4 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col"
          >
            {milestones.map((m, i) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`${m.place}: ${m.title}`}
                  aria-current={i === active ? 'step' : undefined}
                  className="group grid h-11 w-11 place-items-center"
                >
                  <span
                    className={cn(
                      'block rounded-full transition-[width,height,background-color] duration-300',
                      i === active ? 'h-1.5 w-6 bg-label md:h-6 md:w-1.5' : 'h-1.5 w-1.5 bg-label-3 group-hover:bg-label-2',
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
          </div>
        </div>
      )}
    </section>
  )
}
