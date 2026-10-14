import { useLayoutEffect, useRef, type KeyboardEvent } from 'react'

interface FilterTabsProps<T extends string> {
  label: string
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
  controls: string
}

/** transitions.dev "tabs sliding": the active pill travels between options. */
export default function FilterTabs<T extends string>({ label, options, value, onChange, controls }: FilterTabsProps<T>) {
  const barRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const firstPaint = useRef(true)

  useLayoutEffect(() => {
    const bar = barRef.current
    const pill = pillRef.current
    if (!bar || !pill) return
    const place = (animate: boolean) => {
      const tab = bar.querySelector<HTMLElement>('[aria-selected="true"]')
      if (!tab) return
      if (!animate) {
        const prev = pill.style.transition
        pill.style.transition = 'none'
        pill.style.transform = `translateX(${tab.offsetLeft}px)`
        pill.style.width = `${tab.offsetWidth}px`
        void pill.offsetWidth
        pill.style.transition = prev
      } else {
        pill.style.transform = `translateX(${tab.offsetLeft}px)`
        pill.style.width = `${tab.offsetWidth}px`
      }
    }
    place(!firstPaint.current)
    firstPaint.current = false
    const onResize = () => place(false)
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(() => place(false))
    return () => window.removeEventListener('resize', onResize)
  }, [value])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length
    onChange(options[next].value)
    barRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <div ref={barRef} role="tablist" aria-label={label} className="t-tabs max-w-full overflow-x-auto [scrollbar-width:none]">
      <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
      {options.map((o, i) => {
        const selected = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            id={`tab-${o.value}`}
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKey(e, i)}
            className="t-tab shrink-0 text-[0.9375rem] font-semibold"
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
