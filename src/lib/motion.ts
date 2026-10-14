/**
 * Media queries shared by every GSAP matchMedia branch, so motion and its
 * reduced-motion fallback are always decided the same way.
 *
 * Dev-only: append `?motion=reduce` to preview the reduced-motion paths in a
 * browser that cannot emulate the OS setting (CSS guards still follow the OS).
 */
const forceReduce =
  import.meta.env.DEV &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('motion') === 'reduce'

export const MQ = {
  motion: forceReduce ? '(max-width: 0px)' : '(prefers-reduced-motion: no-preference)',
  reduce: forceReduce ? '(min-width: 0px)' : '(prefers-reduced-motion: reduce)',
  fine: '(hover: hover) and (pointer: fine)',
  desktop: '(min-width: 1024px)',
} as const

/** GSAP eases mirroring the CSS motion tokens. */
export const EASE = {
  smoothOut: 'expo.out',
  inOut: 'power2.inOut',
} as const

/** Reduced-motion replacement for any movement: a short opacity fade (HIG). */
export const REDUCED_FADE = 0.15
