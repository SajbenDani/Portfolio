# Portfolio Upgrade — Todo

## Phase 7 — Real banner images in the showcase (user follow-up 2026-06-10)
User: generated artwork looks too similar between projects on the laptop screen → replace with professional, clean, modern, topic-matched banner photos.
- [x] Downloaded 22 candidates; visually reviewed EVERY one; rejected off-topic hits (plastic anatomy models, hand X-ray, surgeons, coffee roaster — the original repo's "self-driving" Unsplash ID was actually a coffee roaster). Final picks: fMRI activation figure (Wikimedia/PLoS, CC BY 4.0, Miller et al. 2014), night wildfire, b&w stethoscope, Earth at night, plexus network, white Tesla on mountain road, fluorescence microscopy cells, barbell lift, circuit macro — all Unsplash License except the fMRI one
- [x] ffmpeg → public/projects/<id>.jpg, 1200×750 cover-crop, 72–178 KB each (~946 KB total, served locally, no hotlinks)
- [x] projects.ts: required `image` field + source/license attribution comment
- [x] ShowcaseScreenLayer: photo over ProjectArtwork underlay (instant paint while photo streams) + unifying vignette; private blur+lock preserved; first 2 eager, rest lazy
- [x] Build passes; preview verified beats 01 (fMRI scan), 02 (wildfire), 06 (Tesla) — distinct + on-topic; all 9 images load; rail jump works; graph updated

## Phase 6 — Cinematic project showcase (user follow-up 2026-06-10)
User: helix "too simple with these cards" → wants Apple-product-page scrollytelling (MacBook opening/shifting/closing vibe), unique + stylish, portfolio-aligned.

Design: pinned full-viewport stage (~735vh track). A stylized CSS-3D laptop in the site's glass/copper language: lid (back face = copper DS monogram) opens via scroll at section entry, screen "powers on", each project takes the screen one at a time — artwork + faux window chrome inside the display, copy column (ghost index numeral, title, description, tags, link chips) crossfades/parallaxes per project, progress rail with click-to-jump on the right. Lid closes as you leave. All scroll-driven via motion values (no rAF loops, no three.js in this path — lighter than the helix it replaces). Grid stays for mobile/reduced-motion.

- [x] NEW src/components/sections/ProjectShowcase.tsx (laptop stage + screen layers + copy layers + rail + VideoModal)
- [x] Projects.tsx: lazy-load ProjectShowcase instead of ProjectHelix
- [x] DELETE ProjectHelix.tsx + StarPole.tsx (verified: no other importers)
- [x] Build + preview scrub-through verified at 1280×800: open beat (lid rises, screen powers on), project beats (01 fMRI, 05 survey, 09 Game of Life), copy falloff steepened 1.4→2.2 so titles never overlap mid-swap, close beat (lid folds), rail click-to-jump lands exactly (y=4039 for project 4) + active pill + chrome path update; zero console errors. jumpTo uses two-arg scrollTo — CSS scroll-behavior supplies smooth easing (embedded preview drops the options form). Graph updated.

Plan: `C:\Users\sajbe\.claude\plans\lets-take-this-portfolio-reactive-noodle.md` (approved 2026-06-10)

## Phase 0 — CLAUDE.md workflow compliance
- [x] Create tasks/lessons.md + tasks/todo.md
- [x] Run `code-review-graph update` (104 rows indexed); MCP tools unavailable this session → CLI fallback (`detect-changes`), manual analysis verified by grep/read

## Phase 1 — Foundation
- [x] index.css: text-hierarchy tokens, copper-text, tracking tokens, :focus-visible, .skip-link; drop tw-animate-css import + float keyframe
- [x] NEW src/lib/motion.ts (EASE_OUT, DURATION, VIEWPORT_ONCE, fadeUp, fadeIn, staggerContainer)
- [x] useScrollDirection.ts → useNavHidden(threshold) boolean hook; Navbar updated (with !mobileOpen guard)
- [x] Delete dead ui components (shader-background, animated-shader-background, shape-landing-hero)
- [x] projects.ts: `image` field removed; WiDS achievement + "Top 50" claim removed
- [x] package.json: tw-animate-css removed (npm uninstall)
- [x] uploads thesis → public/thesis.pdf (2 MB); git rm --cached uploads CV; uploads/ gitignored
- [x] App.tsx: skip link + main#main

## Phase 2 — Professional baseline
- [x] index.html: favicon %BASE_URL%, font trim (Inter 700 / SS3 400;500;600 / JBM 400;500), canonical, theme-color, og:/twitter:, JSON-LD Person
- [x] NEW public/favicon.svg (copper DS monogram)
- [x] VideoModal: dialog role, focus trap+return, scroll lock, muted/playsInline/preload="metadata"
- [x] Text-hierarchy sweep across all sections/layout/shared (remaining text-white uses are intentional: ui-kit internals, play-overlay icon, CPU SVG stroke)
- [x] Typography: SectionHeading + ProjectHelix heading sizes/tracking; Hero tracking-display + font-light dropped; monograms font-bold→font-medium
- [x] Mobile: hero avatar scale, Experience spine/node responsive, navbar drawer active state

## Phase 3 — Dynamics
- [x] Hero spotlight (pointer:fine + !reduced) + NEW Magnetic.tsx wrapping CTAs
- [x] NEW StatStrip + useCountUp + data/stats.ts (2 yrs · 9 projects · 3 papers · 3 universities); mounted in App
- [x] GlassCard `lift` prop; Publications lift + under-review pulse dot; variants → lib/motion
- [x] Skills row hover cascade (CSS-only, outer-div scale to avoid framer transform conflict) + variants migration
- [x] Experience cards lift
- [x] Contact copy-email with check feedback + aria-live
- [x] Footer rebuild (3-zone, hairline, back-to-top) + NEW data/nav.ts shared with Navbar
- [x] NEW GrainOverlay + ScrollToTop; third SectionDivider before Contact; helix flat-card border hover

## Phase 4 — Video re-encode
- [x] ffmpeg installed (winget, --source winget due to msstore cert issue); audio track measured silent (−91 dB) → stripped; 18.39 MB → 1.67 MB (1228×720 H.264 CRF 28 +faststart); original backed up to uploads/demo-original.mp4

## Phase 5 — Verification
- [x] npm run build passes (tsc strict + vite; CSS 71.7→65.7 KB)
- [x] Preview: zero failed network requests (favicon/thesis resolve); only pre-existing dev-only framer useScroll warnings
- [x] Desktop pass: stats count-up lands 2/9/3/3, divider draws, publications + pulse dot, footer 3-zone, helix intact at ≥1024 (sticky + star pole + depth fog), grid + filter tabs <1024
- [x] FAB: appears >600px, hides near page bottom (fixed footer "Back to top" overlap found during verification)
- [x] Mobile 375: no horizontal overflow; timeline spine/node geometry settled correct (node 32px flush to card, 16px right margin); drawer active indicator (copper, no layout jump); 320: no overflow, avatar 80px
- [x] Keyboard: skip link present + off-screen until focus, main#main tabindex=-1; copy-email aria-live wired (clipboard blocked in preview sandbox by design — works on real user gesture)
- [x] Reduced-motion: verified by code path review — all new motion gated via useReducedMotion (spotlight, magnetic, count-up instant, scroll behavior auto) + existing CSS kill-switch covers pulses/cascades (preview cannot emulate the OS media query)
- [x] og-image: 1200×630 headless-Chrome shot of settled hero → JPEG 40 KB; index.html meta updated to .jpg; in dist
- [x] Close-out: `code-review-graph detect-changes` (risk 0.00; needed PYTHONUTF8=1 on Windows) + `code-review-graph update` run; lessons.md reviewed (no user corrections during implementation)
