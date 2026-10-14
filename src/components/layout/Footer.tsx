import { scrollToId } from '@/lib/smooth'
import { ArrowButton } from '@/components/ui/ArrowLink'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-5 pb-[max(env(safe-area-inset-bottom),2.5rem)] md:px-8">
      <div className="flex flex-col gap-4 border-t border-hairline pt-8 text-[0.9375rem] text-label-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Dániel Sajben. Built with React and GSAP.</p>
        <ArrowButton onClick={() => scrollToId('hello')} className="self-start sm:self-auto">
          Back to top
        </ArrowButton>
      </div>
    </footer>
  )
}
