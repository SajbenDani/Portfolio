import { useState, useEffect } from 'react'

/**
 * True when the navbar should hide (scrolling down past `threshold`).
 * Most scroll events set the same boolean, so React bails out of the
 * re-render — consumers update only when the value actually flips,
 * not on every scroll pixel.
 */
export function useNavHidden(threshold = 80) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let prevY = window.scrollY
    const handler = () => {
      const y = window.scrollY
      // Small hysteresis so micro-jitters don't toggle the bar.
      if (Math.abs(y - prevY) < 6) return
      setHidden(y > prevY && y > threshold)
      prevY = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return hidden
}
