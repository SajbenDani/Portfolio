import { Github, Linkedin, Mail } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com/SajbenDani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A1nielsajben/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sajben.dani@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-copper font-bold font-mono tracking-widest text-lg">DS</span>
          <span className="h-4 w-px bg-white/10" />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Dániel Sajben
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-white/35 hover:text-copper transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-[0.7rem] text-white/20 font-mono pb-8 tracking-wide">
        Designed &amp; built with React · Three.js · Framer Motion · Tailwind
      </p>
    </footer>
  )
}
