const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/** Static film-grain texture over the whole page — single repeated SVG tile, no animation. */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[55] pointer-events-none opacity-[0.03]"
      style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
    />
  )
}
