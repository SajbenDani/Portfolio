import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { setScrollPaused } from '@/lib/smooth'

const CLOSE_MS = 150 // --modal-close-dur

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
}

/**
 * transitions.dev "modal open/close" (scale 0.96 → 1, softer close), with a
 * focus trap, Esc to close, focus return and the page behind made inert.
 */
export default function Modal({ open, onClose, label, children }: ModalProps) {
  const [mounted, setMounted] = useState(open)
  const [phase, setPhase] = useState<'open' | 'closing' | 'idle'>('idle')
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('open')))
      return
    }
    if (!mounted) return
    setPhase('closing')
    const t = window.setTimeout(() => {
      setMounted(false)
      setPhase('idle')
    }, CLOSE_MS)
    return () => window.clearTimeout(t)
  }, [open, mounted])

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const page = document.getElementById('smooth-wrapper')
    const bar = document.getElementById('top-bar')
    page?.setAttribute('inert', '')
    bar?.setAttribute('inert', '')
    setScrollPaused(true)
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button, video, a[href]')
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      page?.removeAttribute('inert')
      bar?.removeAttribute('inert')
      setScrollPaused(false)
      opener?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  const host = document.getElementById('overlay-root')
  if (!mounted || !host) return null

  const state = phase === 'open' ? 'is-open' : phase === 'closing' ? 'is-closing' : ''

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div
        className="absolute inset-0 bg-black/80 transition-opacity duration-[250ms]"
        style={{ opacity: phase === 'open' ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`t-modal relative w-full max-w-5xl ${state}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="press glass absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full text-label"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>,
    host,
  )
}
