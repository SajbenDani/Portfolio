---
name: Dániel Sajben Portfolio
description: A personal keynote on one black stage, with huge declarative type, scroll-pinned chapters and the owner's own photographs.
colors:
  stage: "#000000"
  raised: "#1c1c1e"
  raised-2: "#2c2c2e"
  raised-3: "#3a3a3c"
  label: "#f5f5f7"
  label-2: "rgb(235 235 245 / 0.64)"
  label-3: "rgb(235 235 245 / 0.42)"
  hairline: "rgb(255 255 255 / 0.12)"
  accent: "#2997ff"
  accent-fill: "#0071e3"
  accent-fill-hover: "#0077ed"
  live: "#2997ff"
  glass: "rgb(28 28 30 / 0.72)"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(2.75rem, 1.6rem + 5.6vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(2.25rem, 1.4rem + 3.8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(1.5rem, 1.15rem + 1.4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title-card:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.55
  meta:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  stage: "2.5rem"
  stage-inner: "2rem"
  card: "1.75rem"
  card-inner: "1.25rem"
  menu: "26px"
  menu-item: "18px"
  pill: "9999px"
spacing:
  inset: "0.5rem"
  gutter: "1.25rem"
  gutter-md: "2rem"
  panel: "2.5rem"
  column-gap: "5rem"
  chapter-y: "clamp(6rem, 12vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent-fill}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    padding: "0 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-fill-hover}"
  button-primary-lg:
    backgroundColor: "{colors.accent-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: "3rem"
    padding: "0 1.5rem"
  button-secondary:
    backgroundColor: "{colors.raised-2}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    padding: "0 1.25rem"
  button-secondary-hover:
    backgroundColor: "{colors.raised-3}"
  button-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    padding: "0 1rem"
  button-glass-hover:
    backgroundColor: "{colors.raised-2}"
  button-icon:
    backgroundColor: "{colors.raised-2}"
    textColor: "{colors.label}"
    rounded: "{rounded.pill}"
    size: "2.75rem"
  link-arrow:
    textColor: "{colors.accent}"
    height: "2.75rem"
  dynamic-island:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    padding: "0 0.75rem 0 1rem"
  island-menu:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.menu}"
    padding: "0.5rem"
    width: "264px"
  island-menu-item:
    textColor: "{colors.label-2}"
    rounded: "{rounded.menu-item}"
    height: "2.75rem"
    padding: "0 1rem"
  island-menu-item-current:
    backgroundColor: "rgb(255 255 255 / 0.10)"
    textColor: "{colors.label}"
  filter-tabs:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.pill}"
    padding: "3px"
  filter-tab:
    textColor: "{colors.label-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "4px 16px"
  filter-tab-active:
    backgroundColor: "{colors.label}"
    textColor: "{colors.stage}"
  stage-panel:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.stage}"
    padding: "{spacing.panel}"
  card-project:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.card}"
    padding: "{spacing.inset}"
  card-project-media:
    backgroundColor: "{colors.stage}"
    rounded: "{rounded.card-inner}"
  chip:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.label}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
  tag:
    backgroundColor: "{colors.raised-2}"
    textColor: "{colors.label-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  badge-status:
    backgroundColor: "{colors.raised-3}"
    textColor: "{colors.label}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  toast:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.label}"
    rounded: "{rounded.pill}"
    height: "3rem"
    padding: "0 1.25rem"
---

# Design System: Dániel Sajben Portfolio

## Overview

**Creative North Star: "The Keynote Stage"**

The site presents one person the way a product keynote presents one product. A single subject stands on a black stage, the type is huge and declarative, and each chapter pins and plays as the visitor scrolls. The owner's own photographs are the hero objects. Every colour on the page other than one system blue comes from those photographs. The material language is Apple's dark-mode HIG, which the owner set as a binding commitment. Depth is a lighter graphite surface, glass appears only on controls that float, and pill buttons press in at a 44px touch target.

Density is low. A chapter opens with one headline, a muted second clause and at most a short lead, then gives its content wide margins and a long vertical run (`clamp(6rem, 12vw, 10rem)` between chapters). Motion is choreography rather than decoration. GSAP ScrollTrigger scrubs the camera moves to the scrollbar, so the visitor's own input drives them. ScrollSmoother runs only for fine pointers with motion allowed. SplitText raises chapter headings line by line. The micro-interactions (menu, modal, toast, tabs, tilt, accordion, number pop, text and icon swaps) are transitions.dev recipes running on their own duration and easing tokens. One switch, `<html data-motion="full|reduce">`, drives both the Tailwind `reduced:` / `full-motion:` variants and every `gsap.matchMedia` branch. The reduced path is a complete static layout, not a degraded animation.

The world was chosen over, and rejects, the glass-card grid portfolio with a typewriter role line.

**Key Characteristics:**
- One black stage (`#000`). Elevation comes from graphite steps, never from a shadow under a surface.
- One accent, system blue, used only for actions, links and live status.
- One sans family. System SF on Apple devices, self-hosted Inter Variable (optical-size axis) everywhere else.
- Chapter headings are a statement plus a muted second clause, with no eyebrow.
- Glass only on floating controls, with a solid graphite fallback.
- Large continuous radii (2.5rem stage, 1.75rem card) with concentric inner corners.
- Scroll-scrubbed camera moves through the owner's own photos: the hero dolly-and-orbit and the milestones drone flight.
- Every photograph is the owner's own or an artefact of the work. Never stock.

## Colors

The palette is a near-monochrome graphite ladder on pure black with a single system blue, and the photographs supply all other colour.

### Primary
- **Link Blue** (#2997ff): link text and arrow links on black (6.6:1), focus rings, the selection tint (`rgb(41 151 255 / 0.42)`), and live status, which is a separate token with the same value (`live`). Live status covers the published-paper dot, the "Now" dot, the copied-email check and the toast check.
- **Action Blue** (#0071e3): the fill of primary buttons ("Get in touch", "Write to me", "Read the paper", the island menu's Email), always with a white label (4.7:1). It lifts to **Action Blue Hover** (#0077ed) on hover.

### Neutral
- **Stage Black** (#000000): the page, `theme-color`, the scrollbar track and the backing behind project media.
- **Graphite** (#1c1c1e): the first raised step. It covers stage panels, project cards, the filter-tab track, chips that sit on the stage, icon tiles, skeleton placeholders, and the solid fallback for glass.
- **Graphite 2** (#2c2c2e): the second step. It covers secondary buttons, tags, the copy-email icon button and the island menu's CV button.
- **Graphite 3** (#3a3a3c): the third step. It is the hover state of Graphite 2 controls, the "Now" status badge, the dot separators in the credentials strip and the scrollbar thumb (`#48484a` on hover).
- **Label White** (#f5f5f7): primary text, the active filter-tab pill, the skip link and the island's progress fill (at 80%).
- **Secondary Label** (rgb(235 235 245 / 0.64)): the muted second clause of every headline, leads, summaries, meta lines and inactive tabs. It rises to 0.82 under `prefers-contrast: more`.
- **Tertiary Label** (rgb(235 235 245 / 0.42)): the dimmest legible text. It is used for the inactive credentials, idle station dots, bullet dots and the dot for unpublished papers. It rises to 0.64 under increased contrast.
- **Hairline** (rgb(255 255 255 / 0.12)): every 1px divider (list rows, accordion rows, table rules, the footer rule, the menu divider). It rises to 0.28 under increased contrast.
- **Glass Graphite** (rgb(28 28 30 / 0.72)): the tint under the 20px blur of floating controls.

### Named Rules
**The One Blue Rule.** Blue means "you can act here" or "this is live". It never colours a heading, a decorative icon, a gradient or a background wash. Link text uses #2997ff and filled buttons use #0071e3. The two are never swapped.

**The Photos Are The Colour Rule.** Apart from blue, the photographs supply every hue on the page. The interface itself stays in graphite and white.

## Typography

**Display Font:** -apple-system / BlinkMacSystemFont (SF Pro on Apple devices), with self-hosted "Inter Variable" as the cross-platform face, then Segoe UI, Roboto, Helvetica Neue, Arial
**Body Font:** the same stack
**Label/Mono Font:** none; the same stack carries labels, and figures switch to tabular numerals

**Character:** A single neutral grotesque that sets hierarchy through size, weight and tracking. `font-optical-sizing: auto` lets Inter's `opsz` axis tighten at display sizes. Headlines are bold and tightly tracked, reading text is regular at a generous 1.55 leading, and the result reads as a keynote slide rather than as an editorial page.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)`, line-height 1, tracking -0.04em): the hero headline only, as two stacked lines (name; muted clause).
- **Headline** (700, `clamp(2.25rem, 1.4rem + 3.8vw, 4.5rem)`, 1.04, -0.035em): chapter headings, capped at 18ch.
- **Title** (700, `clamp(1.5rem, 1.15rem + 1.4vw, 2.25rem)`, 1.12, -0.02em): subsection heads ("More projects", "Honours", "Toolkit"), mobile paper titles and the milestone caption title.
- **Card Title** (600, 1.375rem, 1.25, -0.015em): project-card and milestone-list titles. List rows and the research index step down to 1.25rem at the same weight and tracking. Experience role names use a fluid `clamp(1.25rem, 1rem + 1vw, 1.75rem)` at -0.02em.
- **Lead** (400, `clamp(1.125rem, 1rem + 0.45vw, 1.375rem)`, 1.45): the paragraph under a chapter heading (46ch, 42ch in the hero) and the paper summaries.
- **Body** (400, 1.0625rem / 17px, 1.55): all reading text, at the iOS base size. Prose lists run to 68ch.
- **Label** (600, 0.9375rem): buttons, the Dynamic Island, filter tabs and table captions. Large buttons and the island menu items use 1.0625rem.
- **Meta** (400, 0.9375rem): periods, captions, figure captions, chips and the footer.
- **Caption** (400, 0.8125rem): tags and table column heads (600).

Two fluid sizes sit outside the ramp and belong only to their components: the credentials strip (600, `clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)`, -0.02em) and the contact email (600, `clamp(1.25rem, 0.9rem + 1.6vw, 2rem)`, -0.02em). Result figures use 600 at 1.375rem with tabular numerals. Headings set `text-wrap: balance` and paragraphs set `text-wrap: pretty`.

### Named Rules
**The Muted Second Clause Rule.** A chapter heading is a short statement in Label White followed by a second clause in Secondary Label, in the same size and weight ("Work. From diffusion models to a car that teaches itself to drive."). Nothing sits above it: no eyebrow, no kicker, no number.

**The Tracking Follows Size Rule.** Tracking tightens as size grows: -0.04em at display, -0.035em at headline, -0.02em at title, -0.015em at card title, and normal at body. Text is never letter-spaced open and never uppercased.

## Layout

Content sits in a centred column of 1240px max width. Side padding is 1.25rem on phones and 2rem from 768px. Chapters are separated by `clamp(6rem, 12vw, 10rem)` of vertical padding, and the gap from heading to content runs 3–6rem depending on the chapter. From 1024px, two-part chapters split asymmetrically at 5:7 (`minmax(0,5fr) minmax(0,7fr)`) with a 5rem column gap. This applies to the research index and panels, honours and toolkit, and the life photo and interests. Project cards sit in a 1 / 2 / 3 column grid with a 1.25rem gap, and a project with a wide artefact spans two columns.

The breakpoints are Tailwind's 640 / 768 / 1024px. 768px switches the hero and flight camera to their desktop values, and 1024px pins the research index. The fixed chrome sits outside the smooth-scroll wrapper. It is a 44px top bar at `max(env(safe-area-inset-top), 12px)` over a 96px scroll-edge gradient (black 85% to 0), so content softens as it passes underneath. On phones the Dynamic Island is the whole navigation, because the name and CV pills appear only from 768px. Safe-area insets are respected at the top, at the bottom and on the toast.

Three things pin. The hero holds one viewport while its camera moves. The milestones flight holds one viewport across six stations. On desktop, the research index stays pinned 120px from the top while the paper panels scroll past it.

### Named Rules
**The Stage Or Cards Rule.** A chapter whose content is not already a set of cards lives on a graphite stage panel. This covers the hero, the milestones flight, the experience rows and contact. A chapter whose content is cards (research, work) runs on the bare black stage. A stage panel holds type, hairline rows, controls and photographs, never another card.

## Elevation & Depth

The system uses tonal layering. A surface comes forward by being one graphite step lighter (stage → Graphite → Graphite 2 → Graphite 3), and panels, cards, chips and tags carry no drop shadow. Real depth comes from the camera instead. The hero rig uses a perspective of 1800px on desktop and 1100px on phones, the milestones world uses 1200px and 900px, and tilt cards use 1000px. Scroll moves the viewpoint through that space. Floating controls are the one exception. They are glass, and they carry a soft drop shadow because they hover above content that is moving.

### Shadow Vocabulary
- **Floating Glass** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 8px 24px -8px rgb(0 0 0 / 0.6)`): with `backdrop-filter: blur(20px) saturate(180%)` over Glass Graphite. Used only on the top-bar pills, the Dynamic Island and its menu, the toast and the modal's close button.
- **Photo Edge** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1)`): a 1px inner line on every framed photograph so that dark images do not bleed into the black stage. It is an edge, not an elevation.

### Named Rules
**The Lighter-Is-Closer Rule.** To bring a surface forward, raise it one graphite step. Do not cast a shadow under it.

**The Glass Floats Rule.** Glass is reserved for controls that float over scrolling content. Under `prefers-reduced-transparency: reduce` or `prefers-contrast: more` it becomes solid Graphite (#1c1c1e) with no blur. Glass never sits on a content surface.

## Shapes

The form language uses large, soft, continuous corners that nest concentrically. Stage panels use 2.5rem. Cards, photo frames, the results table and the odds card use 1.75rem. The two photographic stages that run nearly edge to edge (the hero and the flight) step down to 1.75rem on phones. Media inside a card sits 0.5rem in and takes a 1.25rem corner, and a plate inside a stage panel sits 0.5rem in and takes 2rem. The island menu is 26px with 18px items inside its 8px padding. Every control (buttons, tabs, chips, tags, badges, the island, the toast, icon buttons) is a full pill or circle. The focus ring is a 2px Link Blue outline at 3px offset, and on bare text links it rounds to 6px. Borders appear only as 1px Hairline dividers between rows. Surfaces have no outline strokes, and photographs get the inner Photo Edge line instead.

### Named Rules
**The Concentric Corner Rule.** An inner radius equals the outer radius minus the gap between them (1.75rem − 0.5rem = 1.25rem; 2.5rem − 0.5rem = 2rem; 26px − 8px = 18px). Never put the same radius inside and out.

## Components

### Buttons
Buttons are calm, solid pills that press in.
- **Shape:** full pill (9999px). Medium is 44px tall with 1.25rem side padding and 15px semibold labels. Large is 48px tall with 1.5rem padding and 17px labels. The hero's large pair drops to medium below 640px.
- **Primary:** Action Blue (#0071e3) with a white label. Hover goes to #0077ed. An optional 18px Lucide icon leads the label with a 0.5rem gap.
- **Secondary:** Graphite 2 with Label White text, hovering to Graphite 3. It pairs with a primary button ("Get in touch" / "See the research", "Write to me" / "Download CV").
- **Glass:** the top-bar pills (name, Download CV) use Floating Glass with Label White text. Hover turns them solid Graphite 2.
- **Press / Focus / Disabled:** every custom button scales to 0.96 on `:active` over 160ms `cubic-bezier(0.22, 1, 0.36, 1)`. Focus is a 2px Link Blue outline at 3px offset. Disabled is 40% opacity with pointer events off.
- **Icon button:** a 44px Graphite 2 circle with an 18px icon. The copy-email button swaps Copy for a Link Blue Check (transitions.dev icon swap: 250ms, 2px blur, from scale 0.25).

### Arrow Links
Text actions ("Read the paper", "Code", "LinkedIn", "Back to top") are 17px medium Link Blue with a 44px minimum height and an underline on hover. The trailing 16px chevron opens into an arrow on hover (transitions.dev learn-more: 2px shift, arms spread 8°, 350ms). External targets open in a new tab with `noopener`.

### Chips and Tags
- **Chips** (toolkit): Graphite on the stage, Label White text at 15px, padding 0.375rem × 0.875rem. On fine pointers the hovered chip lifts 4px and scales to 1.05, and its neighbours follow with 0.45 falloff per step. The return uses a springy `cubic-bezier(0.34, 3.85, 0.64, 1)` (transitions.dev avatar-group hover). Touch devices get no lift.
- **Tags** ("Built with", "Topics", "Skills used"): Graphite 2 with Secondary Label text at 13px, padding 0.125rem × 0.625rem, 6px gap. They are static, not interactive.
- **Status badge:** the "Now" pill on the current role is Graphite 3 with 13px semibold Label White text and a 6px Link Blue dot.
- **Status dot:** a 6px circle, Link Blue for published or current work and Tertiary Label otherwise.

### Cards / Containers
- **Stage panel:** Graphite, 2.5rem corners, padding 1.25–1.5rem on phones and 2.5rem from 768px. Contact, the closing stage, uses 6rem vertical and 4rem horizontal padding from 768px. It holds the experience rows, contact, the embargoed and survey papers, and the reduced-motion milestone list.
- **Project card:** Graphite, 1.75rem corners and a 0.5rem inset. The media frame is 16:10 on a black backing with 1.25rem corners and a Photo Edge. Content below it is padded 1rem, or 1.5rem from 768px. It holds a card title, a Secondary Label summary, tags, and arrow links pinned to the bottom. Wide cards turn into a 1.15:1 media/text split from 1024px. On fine pointers the card tilts toward the cursor (6° maximum at the edge, 1000px perspective, 400ms follow and 1000ms return) under a three-ring cursor-tracked glare at 0.22 opacity.
- **Hairline row:** a project without an artefact of its own becomes a row, not a card. The title sits left, and the summary, tags and links sit right (1 : 1.3 from 768px), with Hairline rules between rows.
- **Shadow strategy:** none on any card or panel (see Elevation & Depth).
- **Imagery:** a card shows only the owner's own photograph or an artefact of the work, such as a thesis figure, a demo frame or a paper figure. Photos are served AVIF → WebP → JPEG with intrinsic dimensions and appear through a skeleton reveal (Graphite placeholder pulsing to 0.5 over 1000ms, then a 400ms cross-fade with 2px blur).

### Navigation
- **Top bar:** three floating glass pills at 44px height. The name sits left and links to the top, the Dynamic Island sits centred, and Download CV sits right. The side pills hide below 768px.
- **Dynamic Island:** a glass capsule that names the current chapter in 15px semibold. The name swaps with a 150ms blur-rise (transitions.dev text swap) while the capsule width eases over 300ms to fit it. A 2px reading-progress line along its lower edge is scrubbed to the page (a Hairline track with an 80% Label White fill). A chevron flips when the menu is open.
- **Island menu:** a 264px glass panel with 26px corners that drops from top-centre (transitions.dev menu dropdown: from 0.97 scale, 250ms open, 150ms close). The chapter rows are 44px tall with 18px corners. The current row has a 10% white fill, semibold Label White text and a 6px dot. Other rows are Secondary Label and hover to a 6% white fill. Below a Hairline divider sit a Graphite 2 CV button and an Action Blue Email button. Esc closes the menu and returns focus to the island, an outside click also closes it, and the closed menu is `inert`.
- **Research index (≥1024px):** a pinned list of papers. Each item is a 1.25rem-corner row that fills Graphite when its paper is in view. The title is Label White when active and Secondary Label at rest, with a status dot and the venue below it.
- **Milestone stations:** 44px hit targets around 6px Tertiary Label dots. The current station stretches into a 24 × 6px Label White pill, which is vertical on the right edge from 768px.

### Filter Tabs
Filter tabs use transitions.dev sliding tabs. A Graphite track (pill, 3px padding) holds 36px tabs in 15px semibold Secondary Label, and a Label White pill slides under the selected tab, which turns black. The slide takes 250ms `cubic-bezier(0.22, 1, 0.36, 1)`. Arrow keys move the selection. Changing the filter re-lays the project cards and rows with GSAP Flip (0.6s `expo.out`). Entering items scale up from 0.96, and leaving items fade out over 0.25s.

### Accordion Rows (Experience)
Accordion rows are hairline rows inside a stage panel. Each header is a full-width button on a 11rem / 1fr / auto grid (period, role, chevron). The period is tabular 15px Secondary Label, the role uses the fluid role size, and the organisation and location sit below in Secondary Label. Opening a row animates `grid-template-rows` from 0fr to 1fr over 250ms, the content un-blurs from 2px, and the 20px chevron flips vertically (transitions.dev accordion). Bullets are 4px Tertiary Label dots, and the prose is capped at 68ch.

### Chapter Heading
Every chapter opens with this component: the Headline size at 700, the muted second clause, and an optional lead in Secondary Label. The heading is focusable (`tabIndex=-1`) so chapter jumps move focus to it. When motion is allowed it rises in once at 88% of the viewport. SplitText splits it into lines, and each line rises 12px out of a 3px blur over 0.6s with a 0.06s stagger and `expo.out`.

### Modal and Toast
- **Modal** (demo video): the page and top bar go `inert` under an 80% black scrim. The dialog scales from 0.96 (250ms open, 150ms close; transitions.dev modal). A 44px glass close button sits above its top-right corner, and video corners are 1.75rem. Focus is trapped and returned on close, Esc closes the dialog, and ScrollSmoother pauses while it is open.
- **Toast:** a 48px glass pill with a 15px medium label and an 18px Link Blue check. It sits 24px above the bottom safe area, rises 16px from 0.97 scale with a 2px blur (350ms in, 250ms out), and dismisses itself after 2.4s.

### Scroll Choreography (signature)
- **Hero dolly:** the lakeside portrait (owner's choice, 2026-10-14) is split into an inpainted backdrop plate and an alpha cut-out, and the subject grows out of the panel's top edge (1.1× on phones, 1.18× from 768px). On load, the headline lines rise out of line masks (1.1s, 0.09s stagger) and the stage lifts 90px into place. On scroll the section pins. The copy fades up and away, the rig tilts from `rotateX(10°)` and 0.92 scale to flat and centred, then orbits to `rotateY(-6°)` (−4° on phones). The backdrop and subject scale in opposite directions to create parallax. The scrub value is 0.6.
- **Milestones drone flight:** six event photos hang in one CSS 3D world, 1500px apart on z (1150px on phones) and angled ±12° (±8°) off the flight path. Scroll drives the camera forward on a glide curve (35% linear, 65% `sine.inOut`) with scrub 0.8, and it snaps to each station with a 0.25–0.7s `power2.inOut` ease. Captions stay in a still 2D frame over a graphite gradient and swap with the text-swap recipe, so they never blur in 3D.
- **Credentials strip:** affiliations in Tertiary Label, with every third one in Label White and 6px Graphite 3 dots between them. The strip slides 38% left as the section passes (scrub 0.4) and follows only the visitor's own scrolling.
- **Life push-in:** the studio portrait drifts from 1.12 scale to 1 across the chapter (scrub 0.6).
- **Reduced motion:** every block above runs only inside `gsap.matchMedia` for `(prefers-reduced-motion: no-preference)`. Under reduce, the hero is static, the flight becomes a captioned two-column list in a stage panel, the credentials wrap and centre, the poker cards cross-fade instead of flipping, every transitions.dev recipe drops its transition, and scrolling stays native.

## Do's and Don'ts

### Do:
- **Do** bring a surface forward by raising it one graphite step (#000 → #1c1c1e → #2c2c2e → #3a3a3c).
- **Do** open every chapter with the Chapter Heading pattern: Headline size, 700, -0.035em, max 18ch, then a second clause in Secondary Label.
- **Do** use #2997ff for link text and live status, and #0071e3 with a white label for filled buttons.
- **Do** give every pill button a 44px target and the 0.96 press scale, and give every interactive element the 2px Link Blue focus ring at 3px offset.
- **Do** nest corners concentrically: the inner radius is the outer radius minus the gap.
- **Do** frame every photograph with the 1px Photo Edge and serve it AVIF → WebP → JPEG with intrinsic width and height.
- **Do** scrub scroll-driven camera moves to the scrollbar (scrub 0.4–0.8) and keep captions in a still 2D frame above any 3D motion.
- **Do** use the transitions.dev recipe and its own tokens for a micro-interaction (`--duration-*`, `--ease-smooth-out`, and the per-recipe tokens) rather than inventing a new timing.
- **Do** key all motion off `<html data-motion>`: the `reduced:` / `full-motion:` variants in markup and `MQ.motion` in `gsap.matchMedia`. Every reduced path must be a complete, readable static layout.
- **Do** bind hover tilt, chip lift and ScrollSmoother to fine pointers only, so touch devices keep native scrolling.

### Don't:
- **Don't** lift a panel, card, chip or tag with a drop shadow. The only drop shadow in the system belongs to floating glass.
- **Don't** put glass on a content surface, and don't ship glass without the solid Graphite fallback for reduced transparency and increased contrast.
- **Don't** put an eyebrow, kicker, number or label above a chapter heading.
- **Don't** use blue for headings, decorative icons, gradients or background washes, and don't add a second UI accent colour.
- **Don't** illustrate a project with stock or generated imagery. A project without its own photo or artefact is listed as a hairline row.
- **Don't** put a card inside a stage panel.
- **Don't** build the glass-card grid portfolio with a typewriter role line.
- **Don't** set reading prose below the 17px body size. 15px is for meta and controls, and 13px is for tags only.
- **Don't** loop ambient motion on content. The shimmer marks the under-review status line and the pulse marks a loading photo, and both stop under reduced motion.
