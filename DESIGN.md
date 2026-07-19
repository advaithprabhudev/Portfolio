---
name: Advaith Prabhu — Portfolio
description: A quant researcher's field notebook resting on a dark desk — bold black editorial type, cream grid-paper index cards, and a hand-drawn math/CS margin rail
colors:
  ink: "#0E0D0C"
  inkText: "#F3EAD9"
  paper: "#F3EAD9"
  paperText: "#17140F"
  marker: "#FF4B2E"
  markerDeep: "#C23A22"
  gridLine: "rgba(76,96,245,0.16)"
  ruleLine: "rgba(23,20,15,0.14)"
typography:
  display:
    fontFamily: "Archivo Black, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 10.5rem)"
    fontWeight: 900
    lineHeight: 0.82
    textTransform: uppercase
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(0.85rem, 1.3vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.15em"
    textTransform: uppercase
spacing:
  section-x: "6vw"
  section-y: "10vh"
rounded:
  none: "0px"
components:
  notebook-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paperText}"
    border: "1.5px solid {colors.paperText}"
    boxShadow: "6px 6px 0 rgba(14,13,12,0.9)"
  chip:
    border: "1.5px solid currentColor"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  tag-marker:
    backgroundColor: "{colors.marker}"
    textColor: "{colors.ink}"
    padding: "4px 12px"
---

# Design System: Advaith Prabhu — Portfolio

## 1. Overview

**Creative North Star: "The Research Notebook"**

The whole page is a black desk with a physical object on it — a cream, grid-paper field notebook where a quant/CS student jots milestones, sketches project cards, and tapes down a photo. It fuses three references into one coherent world rather than alternating between them: bold black editorial type (giant Archivo Black headlines) carries the page's structure and pacing; cream, ruled or grid-paper "index cards" (About, Milestones, Projects, Contact) are physical objects resting on that black canvas, complete with washi tape, pushpins, and a torn/tilted lean; and a signature hand-drawn margin rail of math/CS glyphs (Σ, ∫, λ, git-branch, trending-up, binary, ∞, `{}`) replaces the generic scrapbook doodles (hearts, cats, flowers) the mood-board references used, tying the borrowed visual language directly to the subject's actual world.

**Key Characteristics:**
- Single black canvas (`--ink`) for the entire page — cream paper never becomes a full-bleed section background, it only ever appears as a tilted "object" (card, polaroid, index card, tape) on top of the canvas.
- Archivo Black, uppercase, at poster scale for every headline — the loudest and only display voice.
- IBM Plex Mono for everything else — body copy, labels, tags, nav — a typewriter/terminal register that matches the quant-CS subject.
- Exactly one accent color (`--marker`, a warm vermillion) used for emphasis text, tags, tape, and pin color — never a second accent.
- A margin doodle rail (`MarginDoodles`) built from `lucide-react` icons + literal glyph characters, muted and decorative, present on every section for continuity.

## 2. Colors

- **Ink** (`#0E0D0C`): The base canvas. Also the text/border color used on paper objects.
- **Paper** (`#F3EAD9`): Every notebook/index-card surface. Warm cream, never pure white.
- **Marker** (`#FF4B2E`) / **Marker Deep** (`#C23A22`): The single accent. Used for emphasis words in body copy, section eyebrows, skill-group tags, tape, and pushpins. Never introduce a second saturated accent color.
- **Grid line** / **Rule line**: Low-opacity texture only, not a visible "color" — the faint blue engineering-grid on `.bg-grid-paper` and the faint ink rule lines on `.bg-rule-dark` / ruled cards.

### Named Rules
**The One-Object-One-Material Rule.** A section's background is always the black canvas; paper only appears as a bounded, rotated object (card/polaroid/tape) — never as a full section background. This is what keeps the "notebook on a desk" concept legible instead of reading as arbitrary alternating color blocks.

**The Single-Accent Rule.** Marker red is the only saturated color in the system. If a new element needs emphasis, reach for marker red, weight, or size — not a new hue.

## 3. Typography

**Display Font:** Archivo Black (900 only), uppercase, tight leading (0.82–0.85).
**Body/Label Font:** IBM Plex Mono (400–700).

### Hierarchy
- **Display** (`clamp(2.6rem, 9–13vw, 10.5rem)`): Hero name, section headlines only.
- **Body** (`text-sm`/`text-base`, mono, 1.6 line-height): Bio copy, project/milestone descriptions.
- **Label** (`text-[10–11px]`, mono, 700, uppercase, wide tracking): Tags, section eyebrows (`№ 0X`), skill-group headers, chip text.

### Named Rules
**The Shout/Typewriter Split.** Archivo Black is reserved for the hero name and section headlines. IBM Plex Mono is everything else — narrative and data-shaped alike. Never swap the two roles, and never introduce a third typeface (no cursive/marker script — the hand-drawn feel comes from the SVG doodles and paper materiality, not from lettering).

## 4. Elevation & Materiality

No blur, no soft drop shadows, no glassmorphism. Paper objects use a **hard offset shadow** (`6px 6px 0 rgba(14,13,12,0.9)`) like a die-cut sticker, not a blurred box-shadow — this is what sells the "physical object on a desk" read. The one grain texture (`.paper-grain`, SVG `feTurbulence`, multiply-blended) is reserved for the hero so the flat ink background doesn't read as a digital fill.

### Named Rules
**The Hard-Shadow Rule.** Every paper object (`NotebookCard`, milestone rows, project cards) uses a solid offset shadow, never `blur()`. A fixed/sticky UI element (e.g. the header) needs a solid or near-solid background behind any `backdrop-blur` — blur over a fully transparent layer produces visible smearing artifacts against high-contrast scrolling content.

## 5. Components

### NotebookCard (`src/components/ui/notebook-card.tsx`)
Cream, grid-paper or ruled-paper surface, 1.5px ink border, hard offset shadow, slight static rotation (`-1.5°` to `1°`). Used for About and Contact.

### Tape (`src/components/ui/tape.tsx`)
Small rotated translucent strip pinned at a card corner. Rotation and color vary per instance for an unposed, hand-placed feel.

### Pin (`src/components/ui/pin.tsx`)
Marker-red pushpin SVG, used on milestone cards only — implies "pinned to a board," distinct from tape (implies "stuck to a page").

### Polaroid (`src/components/ui/polaroid.tsx`)
White/cream photo frame with thick bottom caption border, grayscale image treatment, slight rotation.

### MarginDoodles (`src/components/ui/margin-doodles.tsx`)
The signature element. A vertical rail of math/CS glyphs (lucide icons + literal characters) in the section's side gutter, hidden below `md`. Always low-opacity (`onDark`/`onLight` tone), decorative, `aria-hidden`.

### Chips / Skill Tags
1.5px border, no fill, ink-text/cream-text depending on canvas — square corners, never a pill (paper doesn't die-cut circles).

## 6. Motion

`Reveal` (in `App.tsx`) fades + rises content into view on scroll (`opacity 0→1`, `y 28→0`), once per element, respecting `useReducedMotion()` (renders statically, no animation, when the user has reduced motion enabled). No page-load choreography beyond this — the paper tilt/rotation is static CSS, not animated, so it doesn't fight the scroll-reveal.

`Floating` / `FloatingElement` (`src/components/ui/parallax-floating.tsx`) drives the Projects gallery on `md:` and up — project note-cards drift toward the cursor at different depths, like index cards loosely pinned to a corkboard. Desktop-only: absolute-positioned scattered layouts need room to spread without colliding, so mobile falls back to a plain stacked list using the same `ProjectCard`.

## 7. Do's and Don'ts

### Do:
- **Do** keep the canvas black everywhere; let paper objects carry all the "light" surfaces.
- **Do** use hard offset shadows on paper objects, never blurred box-shadows.
- **Do** back any `backdrop-blur` element with a solid/near-solid background.
- **Do** keep marker red as the only accent color.
- **Do** use the `№ 0X` section eyebrow — it mirrors the notebook's own page numbering, not generic template scaffolding.

### Don't:
- **Don't** make a full section background cream — paper is always a bounded object, never the canvas.
- **Don't** introduce a second accent hue or a cursive/script font.
- **Don't** round paper-object corners or use pill-shaped chips.
- **Don't** duplicate copy between a placeholder image and the real heading beside it (project preview blocks say "preview", not the project title).
