import { useRef, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ChapterHeadingProps {
  title: string
  /** Second clause, set in the secondary label colour (Apple keynote pattern). */
  muted?: string
  lead?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

/**
 * Chapter headline. Lines rise in with transitions.dev "texts reveal" values
 * (12px, 3px blur, 40ms stagger) once, when the heading enters the viewport.
 */
export default function ChapterHeading({ title, muted, lead, className, align = 'left' }: ChapterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        if (!ref.current) return
        SplitText.create(ref.current, {
          type: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              y: 12,
              autoAlpha: 0,
              filter: 'blur(3px)',
              duration: 0.6,
              stagger: 0.06,
              ease: 'expo.out',
              clearProps: 'filter',
              scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
            })
          },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <h2
        ref={ref}
        tabIndex={-1}
        data-focus-target
        className={cn(
          'text-chapter font-bold tracking-[-0.035em] text-label outline-none',
          align === 'center' && 'mx-auto',
          'max-w-[18ch]',
        )}
      >
        {title}
        {muted && (
          <>
            {' '}
            <span className="text-label-2">{muted}</span>
          </>
        )}
      </h2>
      {lead && (
        <p className={cn('mt-6 max-w-[46ch] text-lead text-label-2', align === 'center' && 'mx-auto')}>{lead}</p>
      )}
    </div>
  )
}
