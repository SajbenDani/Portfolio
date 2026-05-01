import { useState, useEffect, useRef } from 'react'

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY
      setDirection(current > prevScrollY.current ? 'down' : 'up')
      prevScrollY.current = current
      setScrollY(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return { direction, scrollY }
}
