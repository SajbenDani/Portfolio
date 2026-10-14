import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

// Register every plugin once, before any component runs GSAP code.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, useGSAP)

// Mobile URL-bar show/hide resizes the viewport constantly; don't re-measure pins for it.
ScrollTrigger.config({ ignoreMobileResize: true })

gsap.defaults({ ease: 'expo.out', duration: 0.8 })

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, useGSAP }

// Dev-only handle for debugging in the browser console (stripped from production builds).
if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__gsap = { gsap, ScrollTrigger, ScrollSmoother }
}
