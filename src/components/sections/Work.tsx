import { useLayoutEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { projects, projectFilters, type Project, type ProjectCategory } from '@/data/projects'
import { Flip, gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { asset, cn } from '@/lib/utils'
import { useTilt } from '@/hooks/useTilt'
import ChapterHeading from '@/components/ui/ChapterHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import Picture from '@/components/ui/Picture'
import Modal from '@/components/ui/Modal'
import { ArrowButton, ArrowLink } from '@/components/ui/ArrowLink'

type Filter = ProjectCategory | 'all'

const hasImage = (p: Project) => Boolean(p.photo || p.banner)

function Links({ project, onWatch }: { project: Project; onWatch: (src: string) => void }) {
  return (
    <div className="flex flex-wrap gap-x-6">
      {project.paper && <ArrowLink href={asset(project.paper)} target="_blank" rel="noopener">Read the paper</ArrowLink>}
      {project.video && (
        <ArrowButton onClick={() => onWatch(project.video!)}>
          <Play size={14} strokeWidth={2} className="mr-1" aria-hidden="true" />
          Watch the demo
        </ArrowButton>
      )}
      {project.github && <ArrowLink href={project.github}>Code</ArrowLink>}
      {project.kaggle && <ArrowLink href={project.kaggle}>Competition</ArrowLink>}
      {project.pdf && (
        <ArrowLink href={asset(project.pdf)} target="_blank" rel="noopener">
          {project.pdfLabel ?? 'PDF'}
        </ArrowLink>
      )}
    </div>
  )
}

function Tags({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-raised-2 px-2.5 py-0.5 text-[0.8125rem] text-label-2">
          {t}
        </li>
      ))}
    </ul>
  )
}

/** A project with an artefact of its own: photo, figure or demo frame. */
function ProjectCard({ project, hidden, onWatch }: { project: Project; hidden: boolean; onWatch: (src: string) => void }) {
  const outer = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLElement>(null)
  useTilt(outer, card)
  const wide = project.wide
  const sizes = wide ? '(max-width: 1023px) 92vw, 640px' : '(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 380px'

  return (
    <li className={cn('work-card', wide && 'md:col-span-2', hidden && 'hidden')} data-flip-id={project.id}>
      <div ref={outer} className="t-tilt h-full">
        <article
          ref={card}
          aria-labelledby={`${project.id}-title`}
          className={cn(
            't-tilt-card flex h-full flex-col rounded-card bg-raised p-2',
            wide && 'lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-2',
          )}
        >
          <div className={cn('photo-edge relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-black', wide && 'lg:aspect-auto lg:min-h-[340px]')}>
            {project.photo ? (
              <Picture photo={project.photo} alt={project.imageAlt ?? ''} sizes={sizes} className="h-full w-full" imgClassName={project.imagePosition} />
            ) : (
              <img
                src={asset(project.banner!)}
                alt={project.imageAlt ?? ''}
                width={1200}
                height={725}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <h3 id={`${project.id}-title`} className="text-[1.375rem] font-semibold leading-tight tracking-[-0.015em]">
              {project.title}
            </h3>
            <p className="text-label-2">{project.summary}</p>
            <Tags tags={project.tags} label="Built with" />
            <div className="mt-auto pt-1">
              <Links project={project} onWatch={onWatch} />
            </div>
          </div>
          <div className="t-tilt-glare" aria-hidden="true" />
        </article>
      </div>
    </li>
  )
}

/** A project without an artefact to show: a hairline row, no stand-in image. */
function ProjectRow({ project, hidden, onWatch }: { project: Project; hidden: boolean; onWatch: (src: string) => void }) {
  return (
    <li className={cn('work-card border-b border-hairline', hidden && 'hidden')} data-flip-id={project.id}>
      <article
        aria-labelledby={`${project.id}-title`}
        className="grid gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
      >
        <h3 id={`${project.id}-title`} className="text-[1.375rem] font-semibold leading-snug tracking-[-0.015em]">
          {project.title}
        </h3>
        <div className="space-y-4">
          <p className="text-label-2">{project.summary}</p>
          <Tags tags={project.tags} label="Built with" />
          <Links project={project} onWatch={onWatch} />
        </div>
      </article>
    </li>
  )
}

/**
 * Chapter "Work". Projects with an artefact of their own get a card; the rest
 * are listed. Filtering keeps everything mounted and lets GSAP Flip carry both
 * lists from their old layout to the new one.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [video, setVideo] = useState<string | null>(null)
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const flipTl = useRef<gsap.core.Timeline | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const fromHeight = useRef(0)

  const { contextSafe } = useGSAP({ scope: root })

  const changeFilter = contextSafe((next: Filter) => {
    if (next === filter) return
    // Settle a flip still in flight so rapid clicks never leave cards mid-move.
    flipTl.current?.progress(1)
    if (!window.matchMedia(MQ.reduce).matches) {
      fromHeight.current = gridRef.current?.offsetHeight ?? 0
      flipState.current = Flip.getState('.work-card')
    }
    setFilter(next)
  })

  useLayoutEffect(() => {
    const state = flipState.current
    const grid = gridRef.current
    if (!state || !grid) return
    flipState.current = null
    // Flip lifts the cards out of flow while they move; hold the grid's height and
    // ease it to the new one, so the chapter below never jumps up underneath.
    const toHeight = grid.offsetHeight
    gsap.set(grid, { height: fromHeight.current })
    const tl = Flip.from(state, {
      duration: 0.6,
      ease: 'expo.out',
      absolute: true,
      nested: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45, delay: 0.1, overwrite: 'auto' }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.96, duration: 0.25, ease: 'power2.out', overwrite: 'auto' }),
      onComplete: () => {
        gsap.set(grid, { clearProps: 'height' })
        ScrollTrigger.refresh()
      },
    })
    tl.to(grid, { height: toHeight, duration: 0.6, ease: 'expo.out' }, 0)
    flipTl.current = tl
  }, [filter])

  const visible = (p: Project) => filter === 'all' || p.category === filter
  const cards = projects.filter(hasImage)
  const rows = projects.filter((p) => !hasImage(p))
  const anyRows = rows.some(visible)

  return (
    <section ref={root} id="work" className="mx-auto max-w-[1240px] px-5 py-[clamp(6rem,12vw,10rem)] md:px-8">
      <ChapterHeading title="Work." muted="From diffusion models to a car that teaches itself to drive." />

      <div className="mt-12 md:mt-16">
        <FilterTabs label="Filter projects" options={projectFilters} value={filter} onChange={changeFilter} controls="work-grid" />
      </div>

      <div ref={gridRef} id="work-grid" role="tabpanel" aria-labelledby={`tab-${filter}`}>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((p) => (
            <ProjectCard key={p.id} project={p} hidden={!visible(p)} onWatch={setVideo} />
          ))}
        </ul>

        <div className={cn('mt-16', !anyRows && 'hidden')}>
          <h3 className="text-title font-bold tracking-[-0.02em]">More projects</h3>
          <ul className="mt-6 border-t border-hairline">
            {rows.map((p) => (
              <ProjectRow key={p.id} project={p} hidden={!visible(p)} onWatch={setVideo} />
            ))}
          </ul>
        </div>
      </div>

      <Modal open={video !== null} onClose={() => setVideo(null)} label="Self-driving car simulation demo">
        {video && (
          <video
            src={asset(video)}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="w-full rounded-card bg-raised"
          />
        )}
      </Modal>
    </section>
  )
}
