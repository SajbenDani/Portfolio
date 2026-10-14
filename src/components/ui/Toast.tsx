import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'

interface ToastApi {
  show: (message: string) => void
}

const ToastContext = createContext<ToastApi>({ show: () => {} })

export const useToast = () => useContext(ToastContext)

/** transitions.dev "toast open/close": rises in with fade, blur and scale; slower in than out. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((next: string) => {
    window.clearTimeout(timer.current)
    setMessage(next)
    setOpen(true)
    timer.current = window.setTimeout(() => setOpen(false), 2400)
  }, [])

  const host = typeof document !== 'undefined' ? document.getElementById('overlay-root') : null

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {host &&
        createPortal(
          <div
            className="pointer-events-none fixed inset-x-0 z-[80] flex justify-center px-4"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
          >
            <div
              role="status"
              aria-live="polite"
              className={`t-toast glass inline-flex h-12 items-center gap-2.5 rounded-full px-5 text-[0.9375rem] font-medium text-label ${open ? 'is-open' : ''}`}
            >
              <Check size={18} strokeWidth={2} className="text-live" aria-hidden="true" />
              {message}
            </div>
          </div>,
          host,
        )}
    </ToastContext.Provider>
  )
}
