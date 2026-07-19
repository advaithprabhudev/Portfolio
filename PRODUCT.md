# Product

## Register

brand

## Users

Professors and research collaborators, general professional network (LinkedIn/GitHub visitors, peers, competition organizers), and other students — evaluating Advaith Prabhu's technical work as a quantitative CS student. Visitors are scanning for credibility signals (competitions, projects, skills) and a way to make contact, not making a purchase decision.

## Product Purpose

A single-page scrolling portfolio that establishes Advaith as a serious quant/CS student: showcasing career milestones, selected projects, technical skill stack, and contact channels. Success looks like a visitor quickly forming an impression of technical depth and following through to LinkedIn/GitHub/email/résumé.

## Brand Personality

Keep the current design direction as the baseline (bold uppercase display type, hard-cut color-blocked full-bleed sections, glitch/scramble text reveal, GSAP pinned-scroll transitions). Changes should build on this identity rather than replace it — the user wants additions/refinements, not a personality pivot.

## Anti-references

None specified — no explicit sites to avoid. Judge against general best practice for portfolio/brand sites (avoid generic SaaS/AI-slop patterns: gradient text, tiny uppercase eyebrows on every section, numbered section markers as default scaffolding, identical card grids).

## Design Principles

- Preserve the existing bold, editorial, color-blocked identity — refine and extend, don't rebuild.
- Every section should read fast: visitors are scanning for signal, not reading prose.
- Motion should reinforce the scroll narrative (pinned transitions, reveal text) without becoming a distraction or hurting performance.
- Real contact info and real project links matter more than visual polish — placeholder/TODO content is a credibility risk for this audience.

## Accessibility & Inclusion

No explicit requirements given. Default to WCAG AA: verify color contrast on all color-blocked sections (especially the orange #fd5200 and blue #1A3DE8 blocks), respect `prefers-reduced-motion` (already partially handled in story-scroll.tsx), and ensure interactive elements (links, socials) have visible focus states.
