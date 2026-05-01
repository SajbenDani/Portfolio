import ShaderBackground from '@/components/ui/shader-background'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Publications from '@/components/sections/Publications'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white font-body overflow-x-hidden">
      {/* Fixed WebGL plasma background — subtle, behind everything */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-[0.18] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Publications />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
