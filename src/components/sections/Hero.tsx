import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { scrollToId } from '@/lib/smooth'
import Picture from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'

/**
 * Chapter "Hello". A stage panel holds the studio portrait split into two
 * depth layers (backdrop plate + alpha cut-out). Scrolling flies the camera
 * in: the panel tilts up and centres, then pushes in and arcs a few degrees,
 * the subject growing faster than the backdrop — a drone dolly around him.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MQ.motion, desktop: '(min-width: 768px)' }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const stage = root.current!.querySelector<HTMLElement>('.hero-stage')!

        // Entrance: the headline rises out of line masks (re-split once the web
        // font lands, so line breaks match the final type), the stage lifts in.
        SplitText.create('.hero-title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 100, duration: 1.1, stagger: 0.09, ease: 'expo.out', delay: 0.05 }),
        })
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.hero-sub', { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.35)
          .from('.hero-stage-in', { y: 90, autoAlpha: 0, duration: 1.4 }, 0.2)

        // Scroll: pinned camera move, scrubbed to the scrollbar.
        gsap.set('.hero-rig', { transformPerspective: desktop ? 1800 : 1100, transformOrigin: '50% 100%' })
        // Settle slightly below centre so the head never slides under the top bar.
        const centre = () => -(stage.offsetTop - (window.innerHeight - stage.offsetHeight) / 2 - window.innerHeight * 0.06)

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: '.hero-pin',
              start: 'top top',
              end: desktop ? '+=115%' : '+=85%',
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to('.hero-copy', { autoAlpha: 0, y: -48, duration: 0.3 }, 0)
          .fromTo('.hero-rig', { rotateX: 6, scale: 0.97 }, { rotateX: 0, scale: 1, y: centre, duration: 0.55 }, 0)
          .to('.hero-rig', { rotateY: desktop ? -6 : -4, scale: desktop ? 1.04 : 1.03, duration: 0.45 }, 0.55)
          .fromTo('.hero-bg', { scale: 1.24, xPercent: -2.5 }, { scale: 1.06, xPercent: 2.5, duration: 1 }, 0)
          .fromTo('.hero-fg', { scale: 1, xPercent: 2 }, { scale: 1.12, xPercent: -2, duration: 1 }, 0)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="hello"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip [--hero-r:1.75rem] md:[--hero-r:2.5rem] [--pop:1.1] [--stage-h:min(60svh,520px)] [--stage-y:0.73] md:[--pop:1.12] md:[--stage-h:min(64svh,620px)] md:[--stage-y:0.65]"
    >
      <div className="hero-pin relative full-motion:h-[100svh]">
        <div className="hero-copy relative z-10 mx-auto max-w-[1240px] px-5 pt-[clamp(5.25rem,12svh,7.5rem)] text-center">
          <h1 id="hero-title" tabIndex={-1} data-focus-target className="hero-title text-hero font-bold tracking-[-0.04em] outline-none [text-wrap:wrap]">
            <span className="block">Dániel Sajben.</span>
            <span className="mt-2 block text-chapter tracking-[-0.035em] text-label-2">Enthusiastic about AI research.</span>
          </h1>
          <p className="hero-sub mx-auto mt-5 max-w-[42ch] text-lead text-label-2 md:max-w-[54ch]">
            First-author paper at IEEE CAMAD 2026. Now an MSc Advanced AI student at University College Dublin,
            after PTC, Morgan Stanley and research with Ericsson.
          </p>
          <div className="hero-sub mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="max-sm:h-11 max-sm:px-5 max-sm:text-[0.9375rem]" onClick={() => scrollToId('contact')}>
              Get in touch
            </Button>
            <Button size="lg" variant="secondary" className="max-sm:h-11 max-sm:px-5 max-sm:text-[0.9375rem]" onClick={() => scrollToId('research')}>
              See the research
            </Button>
          </div>
        </div>

        <div
          className="hero-stage hero-stage-in mx-auto mt-14 h-[var(--stage-h)] w-[min(1120px,calc(100vw-2.5rem))] full-motion:absolute full-motion:inset-x-0 full-motion:mt-0 full-motion:top-[calc(100svh-var(--stage-h)*var(--stage-y))]"
        >
          <div className="hero-rig relative h-full w-full will-change-transform">
            <div className="photo-edge absolute inset-0 overflow-hidden rounded-[var(--hero-r)] bg-raised">
              <Picture
                photo="lakesideBg"
                alt=""
                sizes="(max-width: 767px) 92vw, 1120px"
                priority
                reveal={false}
                className="hero-bg absolute inset-0"
                imgClassName="object-[50%_45%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.45),rgb(0_0_0/0)_45%)]" />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: 'inset(-60% 0 0 0 round 0 0 var(--hero-r) var(--hero-r))' }}
            >
              <div className="hero-fg absolute inset-x-0 bottom-0 mx-auto aspect-[3/4] h-[calc(var(--pop)*100%)] origin-bottom will-change-transform">
                <Picture
                  photo="lakesideFg"
                  alt="Dániel Sajben, smiling, in a light grey suit by a lake at dusk."
                  sizes="(max-width: 767px) 80vw, 560px"
                  priority
                  reveal={false}
                  className="h-full w-full"
                  imgClassName="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
