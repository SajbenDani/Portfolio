import { useRef, useState } from 'react'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { CV, EMAIL, GITHUB, LINKEDIN } from '@/data/links'
import { asset } from '@/lib/utils'
import ChapterHeading from '@/components/ui/ChapterHeading'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { useToast } from '@/components/ui/Toast'

/** Copy the address; the icon swaps (transitions.dev icon swap) and a toast confirms. */
function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const toast = useToast()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      toast.show('Email address copied')
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or permissions): the mailto link still works.
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className="press grid h-11 w-11 shrink-0 place-items-center rounded-full bg-raised-2 text-label hover:bg-raised-3"
    >
      <span className="t-icon-swap" data-state={copied ? 'b' : 'a'} aria-hidden="true">
        <Copy className="t-icon" data-icon="a" size={18} strokeWidth={1.75} />
        <Check className="t-icon text-live" data-icon="b" size={18} strokeWidth={2.25} />
      </span>
    </button>
  )
}

/** Chapter "Contact": the closing stage. */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-16 pt-[clamp(4rem,8vw,6rem)] md:px-8">
      <div className="rounded-stage bg-raised px-6 py-16 text-center md:px-16 md:py-24">
        <ChapterHeading
          align="center"
          title="Let’s talk."
          muted="Open to roles in AI research and engineering."
          lead="Based in Dublin and an EU citizen. Happy to work in Dublin, London, Munich, Budapest or remotely."
        />

        <div className="mx-auto mt-12 flex max-w-full flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-semibold tracking-[-0.02em] text-label underline-offset-[0.18em] hover:underline"
          >
            {EMAIL}
          </a>
          <CopyEmail />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`mailto:${EMAIL}`} size="lg" icon={<Mail size={18} strokeWidth={1.75} aria-hidden="true" />}>
            Write to me
          </ButtonLink>
          <ButtonLink
            href={asset(CV)}
            download
            size="lg"
            variant="secondary"
            icon={<Download size={18} strokeWidth={1.75} aria-hidden="true" />}
          >
            Download CV
          </ButtonLink>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8">
          <ArrowLink href={LINKEDIN}>LinkedIn</ArrowLink>
          <ArrowLink href={GITHUB}>GitHub</ArrowLink>
        </div>
      </div>
    </section>
  )
}
