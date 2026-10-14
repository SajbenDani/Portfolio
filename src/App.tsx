import { useState } from 'react'
import { chapters, type ChapterId } from '@/data/chapters'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ToastProvider } from '@/components/ui/Toast'
import TopBar from '@/components/layout/TopBar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Credentials from '@/components/sections/Credentials'
import Research from '@/components/sections/Research'
import Work from '@/components/sections/Work'
import Milestones from '@/components/sections/Milestones'
import Experience from '@/components/sections/Experience'
import Life from '@/components/sections/Life'
import Contact from '@/components/sections/Contact'

export default function App() {
  const [active, setActive] = useState<ChapterId>('hello')

  // The active chapter is whichever section spans a line 45% down the viewport,
  // read from live layout on every scroll update. Per-chapter triggers would
  // measure their ends before the pins below them add spacing.
  useGSAP(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el)
    let current = ''
    const update = () => {
      const line = window.innerHeight * 0.45
      const hit = els.find((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= line && r.bottom > line
      })
      if (hit && hit.id !== current) {
        current = hit.id
        setActive(hit.id as ChapterId)
      }
    }
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update })
    update()
  })

  return (
    <ToastProvider>
      <TopBar active={active} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Credentials />
        <Research />
        <Work />
        <Milestones />
        <Experience />
        <Life />
        <Contact />
      </main>
      <Footer />
    </ToastProvider>
  )
}
