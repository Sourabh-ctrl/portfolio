# Ticket 05 — Build Testimonials component

Status: needs-triage
Blocked by: 02, 03

## Goal
Create a testimonials section displaying recommendations from colleagues.

## Files
- `src/components/Testimonials.jsx` (NEW)

## Spec

### Data
- Import `data` from `../data.js`
- Read `data.testimonials` array

### Layout
- Wrap in `FadeInSection`
- Section id: `#testimonials`
- Section heading: `/ What People Say` with subtitle `What colleagues and collaborators say about working with me`
- Responsive grid: `grid grid-cols-1 sm:grid-cols-2 gap-5`

### Card Design
Each testimonial card:
```
rounded-2xl border border-lightest-navy/60 bg-light-navy/60 p-6
transition-all duration-300 hover:border-accent/60 hover:shadow-xl
```
- Quote text: `text-sm font-sans text-lightest-slate leading-relaxed` with a large opening quote mark (use a decorative `" ` or Lucide `Quote` icon in accent color)
- Avatar: 48px circle with `ring-2 ring-lightest-navy`
- Name: `text-sm font-semibold text-heading`
- Role + Company: `text-xs font-mono text-slate`

### Imports
- `import data from '../data.js'`
- `import FadeInSection from './FadeInSection.jsx'`

## Acceptance Criteria
- [ ] Renders all testimonials from data.js in a responsive grid
- [ ] Each card has quote, avatar, name, role+company
- [ ] Cards have hover border/shadow transition
- [ ] FadeInSection animation on scroll
- [ ] Responsive: 1 col mobile, 2 col desktop
- [ ] `npm run lint` passes
