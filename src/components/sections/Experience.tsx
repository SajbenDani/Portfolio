import { useState } from 'react'
import { roles, honours, type Role } from '@/data/experience'
import { toolkit, spokenLanguages } from '@/data/skills'
import { asset } from '@/lib/utils'
import ChapterHeading from '@/components/ui/ChapterHeading'
import ChipRow from '@/components/ui/ChipRow'
import { ArrowLink } from '@/components/ui/ArrowLink'

function Chevron() {
  return (
    <span className="t-acc-chevron text-label-2" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  )
}

function RoleRow({ role, open, onToggle }: { role: Role; open: boolean; onToggle: () => void }) {
  const panelId = `role-${role.id}`
  return (
    <li className="t-acc border-b border-hairline last:border-b-0" data-open={open}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-x-10 md:py-8"
        >
          <span className="tabular order-2 col-span-2 text-[0.9375rem] text-label-2 md:order-none md:col-span-1 md:pt-2">
            {role.period}
          </span>
          <span className="order-1 md:order-none">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-label">
                {role.role}
              </span>
              {role.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-raised-3 px-2.5 py-0.5 text-[0.8125rem] font-semibold text-label">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
                  Now
                </span>
              )}
            </span>
            <span className="mt-1 block text-label-2">
              {role.org} · {role.location}
            </span>
          </span>
          <span className="order-1 pt-1.5 md:order-none md:pt-2">
            <Chevron />
          </span>
        </button>
      </h3>
      <div id={panelId} className="t-acc-panel">
        <div className="t-acc-panel-inner">
          <div className="pb-8 md:pl-[13.5rem]">
            <ul className="max-w-[68ch] space-y-3">
              {role.points.map((p) => (
                <li key={p} className="relative pl-5 text-label before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-label-3">
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Skills used">
              {role.tags.map((t) => (
                <li key={t} className="rounded-full bg-raised-2 px-2.5 py-0.5 text-[0.8125rem] text-label-2">
                  {t}
                </li>
              ))}
            </ul>
            {role.link && (
              <ArrowLink href={asset(role.link.href)} target="_blank" rel="noopener" className="mt-3">
                {role.link.label}
              </ArrowLink>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

/** Chapter "Experience": hairline accordion rows (transitions.dev accordion), honours, toolkit. */
export default function Experience() {
  const [open, setOpen] = useState<Set<string>>(() => new Set(['ucd', 'ericsson']))
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section id="experience" className="mx-auto max-w-[1240px] px-5 py-[clamp(6rem,12vw,10rem)] md:px-8">
      <ChapterHeading
        title="Experience."
        muted="Research labs, an investment bank and a product with 100K+ users."
      />

      <div className="mt-14 rounded-stage bg-raised px-5 py-2 md:mt-20 md:px-10 md:py-4">
        <ol>
          {roles.map((r) => (
            <RoleRow key={r.id} role={r} open={open.has(r.id)} onToggle={() => toggle(r.id)} />
          ))}
        </ol>
      </div>

      <div className="mt-24 grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h3 className="text-title font-bold tracking-[-0.02em]">Honours</h3>
          <ul className="mt-8">
            {honours.map((h) => (
              <li key={h} className="border-t border-hairline py-5 text-[1.125rem] text-label">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-title font-bold tracking-[-0.02em]">Toolkit</h3>
          <div className="mt-8 space-y-7">
            {toolkit.map((g) => (
              <div key={g.group}>
                <p className="mb-3 text-[0.9375rem] font-semibold text-label-2">{g.group}</p>
                <ChipRow items={g.items} />
              </div>
            ))}
            <div>
              <p className="mb-3 text-[0.9375rem] font-semibold text-label-2">Spoken</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {spokenLanguages.map((l) => (
                  <li key={l.name}>
                    <span className="text-label">{l.name}</span>
                    <span className="text-label-2"> · {l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
