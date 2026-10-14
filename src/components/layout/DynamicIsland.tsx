import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, Download, Mail } from 'lucide-react'
import { chapters, type ChapterId } from '@/data/chapters'
import { CV, EMAIL } from '@/data/links'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollToId } from '@/lib/smooth'
import { asset, cn } from '@/lib/utils'
import SwapText from '@/components/ui/SwapText'

const CLOSE_MS = 150 // --dropdown-close-dur

/**
 * The "Dynamic Island": a glass capsule that names the current chapter and
 * shows reading progress; tap it to open the chapter menu (transitions.dev
 * menu dropdown, origin top-center). On phones it is the whole navigation.
 */
export default function DynamicIsland({ active }: { active: ChapterId }) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [labelWidth, setLabelWidth] = useState<number>()
  const rootRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const label = chapters.find((c) => c.id === active)?.label ?? ''

  // Capsule width follows the label (transitions.dev card resize).
  useLayoutEffect(() => {
    if (measureRef.current) setLabelWidth(measureRef.current.offsetWidth)
  }, [label])

  // Reading progress along the capsule's lower edge, scrubbed by scroll.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`
      },
    })
  })

  const close = (returnFocus = false) => {
    if (!open) return
    setOpen(false)
    setClosing(true)
    window.setTimeout(() => setClosing(false), CLOSE_MS)
    if (returnFocus) triggerRef.current?.focus()
  }

  // Closed menu leaves the tab order (React 18 has no `inert` prop).
  useEffect(() => {
    menuRef.current?.toggleAttribute('inert', !open)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    rootRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const go = (id: string) => {
    close()
    scrollToId(id)
  }

  return (
    <nav ref={rootRef} aria-label="Chapters" className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="island-menu"
        onClick={() => (open ? close() : setOpen(true))}
        className="press glass relative flex h-11 items-center gap-2 overflow-hidden rounded-full pl-4 pr-3 text-[0.9375rem] font-semibold text-label"
      >
        <span className="sr-only-text">Current chapter:</span>
        <span
          className="relative inline-flex overflow-hidden whitespace-nowrap"
          style={{ width: labelWidth, transition: 'width 300ms var(--ease-smooth-out)' }}
        >
          <SwapText text={label} />
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className={cn('text-label-2 transition-transform duration-[250ms]', open && 'rotate-180')}
        />
        <span aria-hidden="true" className="absolute inset-x-4 bottom-[6px] h-[2px] overflow-hidden rounded-full bg-white/12">
          <span ref={progressRef} className="block h-full w-full origin-left bg-label/80" style={{ transform: 'scaleX(0)' }} />
        </span>
      </button>

      {/* Off-screen measurer for the capsule width. */}
      <span ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute whitespace-nowrap text-[0.9375rem] font-semibold">
        {label}
      </span>

      <div className="pointer-events-none absolute left-1/2 top-[52px] -translate-x-1/2">
        <div
          id="island-menu"
          ref={menuRef}
          data-origin="top-center"
          className={cn('t-dropdown glass w-[264px] rounded-[26px] p-2', open && 'is-open', closing && 'is-closing')}
          aria-hidden={!open}
        >
          <ul className="flex flex-col">
            {chapters.map((c) => {
              const current = c.id === active
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => go(c.id)}
                    aria-current={current ? 'true' : undefined}
                    className={cn(
                      'press flex h-11 w-full items-center justify-between rounded-[18px] px-4 text-left text-[1.0625rem]',
                      current ? 'bg-white/10 font-semibold text-label' : 'text-label-2 hover:bg-white/6 hover:text-label',
                    )}
                  >
                    {c.label}
                    {current && <span className="h-1.5 w-1.5 rounded-full bg-label" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mx-3 my-2 h-px bg-hairline" />
          <div className="flex gap-2 p-1">
            <a
              href={asset(CV)}
              download
              className="press flex h-11 flex-1 items-center justify-center gap-2 rounded-[18px] bg-raised-2 text-[0.9375rem] font-semibold text-label"
            >
              <Download size={16} strokeWidth={2} aria-hidden="true" /> CV
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="press flex h-11 flex-1 items-center justify-center gap-2 rounded-[18px] bg-accent-fill text-[0.9375rem] font-semibold text-white"
            >
              <Mail size={16} strokeWidth={2} aria-hidden="true" /> Email
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
