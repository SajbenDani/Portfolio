export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 text-center">
      <p className="text-white/30 text-sm font-mono">
        © {new Date().getFullYear()} Dániel Sajben — Built with React, Framer Motion & Tailwind
      </p>
    </footer>
  )
}
