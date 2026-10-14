import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'
import { MQ } from '@/lib/motion'

/**
 * Creates the ScrollSmoother before React mounts, so every pinned
 * ScrollTrigger the chapters create afterwards measures against it.
 * Only for fine pointers with motion allowed: touch keeps native momentum
 * scrolling and reduced-motion users keep plain scrolling (HIG).
 */
export function initSmoothScroll() {
  const smooth = gsap.matchMedia()
  smooth.add({ fine: MQ.fine, motion: MQ.motion }, (ctx) => {
    const { fine, motion } = ctx.conditions as { fine: boolean; motion: boolean }
    if (!fine || !motion) return
    ScrollSmoother.get()?.kill()
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: false,
      smoothTouch: false,
      normalizeScroll: false,
    })
    return () => smoother.kill()
  })

  // Re-measure when the page height changes (accordions, filters, late images).
  const content = document.getElementById('smooth-content')
  if (content && 'ResizeObserver' in window) {
    let last = content.offsetHeight
    let timer: number | undefined
    new ResizeObserver(() => {
      const h = content.offsetHeight
      if (Math.abs(h - last) < 2) return
      last = h
      window.clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 160)
    }).observe(content)
  }
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}

/** Scroll to an absolute scroll position, smoothed when allowed. */
export function scrollToY(y: number) {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(y, true)
    return
  }
  const reduce = window.matchMedia(MQ.reduce).matches
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
}

/** Scroll an element to the top of the viewport (minus an offset). */
export function scrollToElement(el: HTMLElement, offsetPx = 0) {
  const smoother = ScrollSmoother.get()
  const top = smoother ? smoother.offset(el, 'top top') : el.getBoundingClientRect().top + window.scrollY
  scrollToY(top - offsetPx)
}

/** Scroll to a chapter, update the URL hash and move focus to its heading. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  scrollToElement(el)
  history.replaceState(null, '', `#${id}`)
  // Move focus for keyboard and screen-reader users without a second scroll.
  const heading = el.querySelector<HTMLElement>('[data-focus-target]') ?? el
  heading.focus({ preventScroll: true })
}

/** Pause smoothing while a modal is open (body overflow alone doesn't stop it). */
export function setScrollPaused(paused: boolean) {
  const smoother = ScrollSmoother.get()
  if (smoother) smoother.paused(paused)
  document.documentElement.style.overflow = paused ? 'hidden' : ''
}
