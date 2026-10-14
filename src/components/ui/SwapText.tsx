import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const SWAP_MS = 150 // --text-swap-dur

/**
 * transitions.dev "text states swap": the old text exits up with a blur,
 * the new one rises in. Three phases, driven from the `text` prop.
 */
export default function SwapText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(text)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (text === shown) return
    const el = ref.current
    if (!el) return
    window.clearTimeout(timer.current)
    el.classList.add('is-exit')
    timer.current = window.setTimeout(() => {
      setShown(text)
      el.classList.remove('is-exit')
      el.classList.add('is-enter-start')
      void el.offsetHeight
      requestAnimationFrame(() => el.classList.remove('is-enter-start'))
    }, SWAP_MS)
    return () => window.clearTimeout(timer.current)
  }, [text, shown])

  return (
    <span ref={ref} className={cn('t-text-swap', className)}>
      {shown}
    </span>
  )
}
