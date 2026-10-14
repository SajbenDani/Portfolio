import { useRef, useState } from 'react'
import { FileText, Lock } from 'lucide-react'
import { papers, type Paper } from '@/data/research'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MQ } from '@/lib/motion'
import { scrollToElement } from '@/lib/smooth'
import { asset, cn } from '@/lib/utils'
import ChapterHeading from '@/components/ui/ChapterHeading'
import Picture from '@/components/ui/Picture'
import NumberPop from '@/components/ui/NumberPop'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowLink } from '@/components/ui/ArrowLink'

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Topics">
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-raised-2 px-2.5 py-0.5 text-[0.8125rem] text-label-2">
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Title block shown inside a panel on small screens (the index carries it on desktop). */
function MobileTitle({ paper, meta = true }: { paper: Paper; meta?: boolean }) {
  return (
    <header className="mb-6 lg:hidden">
      <h3 className="text-title font-bold tracking-[-0.02em]">{paper.title}</h3>
      {meta && (
        <p className="mt-2 flex items-center gap-2 text-label-2">
          <StatusDot paper={paper} />
          {paper.venue} · {paper.statusLabel}
        </p>
      )}
    </header>
  )
}

function StatusDot({ paper }: { paper: Paper }) {
  return (
    <span
      aria-hidden="true"
      className={cn('h-1.5 w-1.5 shrink-0 rounded-full', paper.status === 'published' ? 'bg-live' : 'bg-label-3')}
    />
  )
}

function CamadPanel({ paper }: { paper: Paper }) {
  return (
    <article aria-labelledby={`${paper.id}-t`} className="space-y-8">
      <MobileTitle paper={paper} />
      <h3 id={`${paper.id}-t`} className="sr-only-text">{paper.title}</h3>
      {paper.photo && (
        <figure>
          <Picture
            photo={paper.photo}
            alt={paper.photoAlt ?? ''}
            sizes="(max-width: 1023px) 92vw, 640px"
            className="photo-edge aspect-[4/3] overflow-hidden rounded-card"
          />
          <figcaption className="mt-3 text-[0.9375rem] text-label-2">Presenting the paper at IEEE CAMAD 2026.</figcaption>
        </figure>
      )}
      <div className="space-y-3">
        <p className="text-[0.9375rem] font-medium text-label-2">{paper.authors}</p>
        <p className="text-lead text-label">{paper.summary}</p>
      </div>

      {paper.results && (
        <div className="rounded-card bg-raised p-2">
          <table className="w-full border-collapse text-left">
            <caption className="px-4 pb-3 pt-3 text-left text-[0.9375rem] font-semibold text-label">
              {paper.results.caption}
            </caption>
            <thead>
              <tr className="text-[0.8125rem] font-semibold text-label-2">
                <th scope="col" className="px-4 py-2 font-semibold">Model and mode</th>
                <th scope="col" className="px-4 py-2 text-right font-semibold">Accuracy</th>
                <th scope="col" className="px-4 py-2 text-right font-semibold">Macro-F1</th>
              </tr>
            </thead>
            <tbody>
              {paper.results.rows.map((r, i) => (
                <tr key={r.setup} className={cn('border-t border-hairline', i === 0 && 'text-label')}>
                  <th scope="row" className="px-4 py-3.5 text-[0.9375rem] font-medium text-label-2">
                    {r.setup}
                  </th>
                  <td className="px-4 py-3.5 text-right text-[1.375rem] font-semibold tracking-[-0.01em]">
                    <NumberPop value={r.accuracy} />
                  </td>
                  <td className="px-4 py-3.5 text-right text-[1.375rem] font-semibold tracking-[-0.01em]">
                    <NumberPop value={r.macroF1} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="space-y-1.5 border-t border-hairline px-4 pb-3 pt-4 text-[0.9375rem] text-label-2">
            {paper.results.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {paper.pdf && (
          <ButtonLink href={asset(paper.pdf)} target="_blank" rel="noopener" icon={<FileText size={18} strokeWidth={1.75} aria-hidden="true" />}>
            Read the paper
          </ButtonLink>
        )}
        <Tags tags={paper.tags} />
      </div>
    </article>
  )
}

function EmbargoPanel({ paper }: { paper: Paper }) {
  return (
    <article aria-labelledby={`${paper.id}-t`} className="overflow-hidden rounded-stage bg-raised">
      <div className="space-y-6 p-6 md:p-10">
        <MobileTitle paper={paper} meta={false} />
        <h3 id={`${paper.id}-t`} className="sr-only-text">{paper.title}</h3>
        <p className="flex items-center gap-2.5 text-[0.9375rem] font-semibold">
          <Lock size={16} strokeWidth={2} className="text-label-2" aria-hidden="true" />
          <span className="t-shimmer" data-text={`${paper.statusLabel} · ${paper.venue}`}>
            {paper.statusLabel} · {paper.venue}
          </span>
        </p>
        <p className="select-none text-lead text-label-2 blur-[6px]" aria-hidden="true">
          {paper.summary}
        </p>
        <p className="sr-only-text">The abstract stays private while the manuscript is under review.</p>
        <p className="text-[0.9375rem] text-label-2">First author. The abstract opens up once the paper is accepted.</p>
        <Tags tags={paper.tags} />
      </div>
    </article>
  )
}

function SurveyPanel({ paper }: { paper: Paper }) {
  return (
    <article aria-labelledby={`${paper.id}-t`} className="overflow-hidden rounded-stage bg-raised">
      <figure className="m-2 rounded-[2rem] bg-label px-4 pb-3 pt-5 md:px-8 md:pt-7">
        <img
          src={asset('/projects/gnn-survey-fig1.jpg')}
          alt="Figure 1 from the survey: LLM-centred, GNN-centred and fusion hybrids, drawn as three block diagrams."
          width={1200}
          height={410}
          loading="lazy"
          decoding="async"
          className="w-full"
        />
        <figcaption className="mt-2 text-center text-[0.8125rem] text-black/60">Figure 1 of the survey: the three ways to combine GNNs and LLMs.</figcaption>
      </figure>
      <div className="space-y-6 p-6 md:p-10">
        <MobileTitle paper={paper} />
        <h3 id={`${paper.id}-t`} className="sr-only-text">{paper.title}</h3>
        <p className="text-lead text-label">{paper.summary}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          {paper.pdf && (
            <ArrowLink href={asset(paper.pdf)} target="_blank" rel="noopener">
              Read the report (PDF)
            </ArrowLink>
          )}
          <Tags tags={paper.tags} />
        </div>
      </div>
    </article>
  )
}

/**
 * Chapter "Research". composer1-style: the paper index stays pinned on the
 * left while each paper's panel scrolls past on the right; the index lights
 * the paper in view. Phones get the panels stacked with their own titles.
 */
export default function Research() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.research-panel')
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })

      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop}`, () => {
        ScrollTrigger.create({
          trigger: '.research-index',
          pin: true,
          pinSpacing: false,
          start: 'top 120px',
          endTrigger: '.research-panels',
          end: () => `bottom ${120 + (root.current?.querySelector<HTMLElement>('.research-index')?.offsetHeight ?? 0)}px`,
          invalidateOnRefresh: true,
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const jump = (i: number) => {
    const panel = root.current?.querySelectorAll<HTMLElement>('.research-panel')[i]
    if (panel) scrollToElement(panel, 120)
  }

  return (
    <section ref={root} id="research" className="mx-auto max-w-[1240px] px-5 py-[clamp(6rem,12vw,10rem)] md:px-8">
      <ChapterHeading
        title="Research first."
        muted="One paper published, one in submission, one survey."
        lead="Medical imaging, graphs and language models. The questions I keep coming back to are whether a model can be trusted, and how you would know."
      />

      <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <nav aria-label="Papers" className="research-index hidden self-start lg:block">
          <ol className="space-y-2">
            {papers.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? 'true' : undefined}
                  className={cn(
                    'group w-full rounded-[1.25rem] px-5 py-4 text-left transition-colors duration-300',
                    active === i ? 'bg-raised' : 'hover:bg-raised/60',
                  )}
                >
                  <span
                    className={cn(
                      'block text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] transition-colors duration-300',
                      active === i ? 'text-label' : 'text-label-2 group-hover:text-label',
                    )}
                  >
                    {p.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2 text-[0.9375rem] text-label-2">
                    <StatusDot paper={p} />
                    {p.venue} · {p.statusLabel}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="research-panels space-y-20 lg:space-y-32">
          {papers.map((p) => (
            <div key={p.id} className="research-panel">
              {p.id === 'camad' && <CamadPanel paper={p} />}
              {p.embargoed && <EmbargoPanel paper={p} />}
              {p.id === 'survey' && <SurveyPanel paper={p} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
