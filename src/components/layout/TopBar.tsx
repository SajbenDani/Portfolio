import { createPortal } from 'react-dom'
import type { ChapterId } from '@/data/chapters'
import { CV } from '@/data/links'
import { scrollToId } from '@/lib/smooth'
import { asset } from '@/lib/utils'
import DynamicIsland from '@/components/layout/DynamicIsland'

/**
 * Floating controls over the stage (HIG: navigation floats on glass above
 * content). Rendered outside the smooth-scroll wrapper so it stays fixed.
 */
export default function TopBar({ active }: { active: ChapterId }) {
  const host = document.getElementById('overlay-root')
  if (!host) return null

  return createPortal(
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Scroll edge effect: content softens as it slides under the controls. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.85),rgb(0_0_0/0))]"
      />
      <header
        id="top-bar"
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
      >
        <div className="relative mx-auto flex h-11 max-w-[1240px] items-center justify-between px-4 md:px-6">
          <a
            href="#hello"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('hello')
            }}
            className="press glass pointer-events-auto hidden h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold text-label md:inline-flex"
          >
            Dániel Sajben
          </a>
          <div className="pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2">
            <DynamicIsland active={active} />
          </div>
          <a
            href={asset(CV)}
            download
            className="press glass pointer-events-auto hidden h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold text-label md:inline-flex"
          >
            Download CV
          </a>
        </div>
      </header>
    </>,
    host,
  )
}
