---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["src/App.tsx"]
---

## Scope

Single-page portfolio (index.html → src/App.tsx). Visitor mode: Experience. Audience: research labs and AI/ML hiring, research-first but person-first. Action: email / download CV. Proof: CAMAD 2026 paper, CV-backed numbers, own milestone photos. Constraints: Apple HIG, composer1 layouts/motion, transitions.dev recipes, GSAP, drone-style photo motion, mobile + desktop, reduced-motion path, not deployed until owner says.

## Direction contract

THESIS: A personal keynote. Dániel is presented the way Apple presents a product: one subject on a black stage, huge declarative type, chapters that pin and play as you scroll, his own photos as the hero object. Refuses the glass-card grid portfolio with a typewriter role line.

OWN-WORLD: Stage black ground; elevation by lighter graphite (#1c1c1e, #2c2c2e), never shadows; white system type (SF on Apple, Inter elsewhere), secondary labels at 60% white; one accent, system blue, only on actions and live status; photos are the only other colour. Glass only on the floating island and top bar. Chapters whose content is not already cards live on 40px-radius graphite stage panels (hero, milestones flight, experience rows, contact); Research and Work run on the bare black stage because their content is cards, and nested surfaces are banned by the craft floor (amended after finish review 1). Every project image is the owner's own photo or an artefact from the work; projects without one are listed, never illustrated with stock.

STORY: Within one screen the visitor knows the name, that he is a first-author AI researcher who ships, and where to click. Then research, the work, a drone flight through his milestones, the career, the person off the clock, contact.

FIRST VIEWPORT: Top bar: name left, Dynamic Island pill centred naming the chapter, Download CV right. Centre: two-line headline (name; muted "Enthusiastic about AI research."), credential line, Get in touch and See the research buttons (research-first per PRODUCT.md principle 2). Below, a stage panel filling the lower half of the viewport with his cut-out portrait, which grows out of its top edge as the camera pushes in; on scroll the camera pushes in and orbits (subject and backdrop at different depths).

FORM: Keynote Stage, position 1 on the ranked list (my pick, user-chosen over the roll), seed c1e05b1e.

SIGNATURE INTERACTION: Milestones drone flight — pinned 3D camera path through six event photos, captions stationary, chapter dots to jump.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
