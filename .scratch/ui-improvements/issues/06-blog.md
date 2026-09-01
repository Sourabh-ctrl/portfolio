# Ticket 06 — Build Blog component

Status: needs-triage
Blocked by: 02, 03

## Goal
Create a blog section displaying article cards with metadata.

## Files
- `src/components/Blog.jsx` (NEW)

## Spec

### Data
- Import `data` from `../data.js`
- Read `data.blog` array

### Layout
- Wrap in `FadeInSection`
- Section id: `#blog`
- Section heading: `/ Blog` with subtitle `Thoughts on development, architecture, and learning`
- Responsive grid: `grid grid-cols-1 sm:grid-cols-2 gap-5`

### Card Design
Each blog card:
```
rounded-2xl border border-lightest-navy/60 bg-light-navy/60 p-5
transition-all duration-300 hover:border-accent/60 hover:shadow-xl
group
```
- Title: `text-lg font-serif font-semibold text-heading group-hover:text-accent transition-colors`
- Date + Read time: `text-xs font-mono text-slate`
- Description: `text-sm font-sans text-slate leading-relaxed line-clamp-2`
- Tags: flex-wrap row of pills, each `text-xs font-mono bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-md`
- External link icon (Lucide `ExternalLink`) in top-right corner, visible on hover

### Imports
- `import data from '../data.js'`
- `import FadeInSection from './FadeInSection.jsx'`
- `import { ExternalLink } from 'lucide-react'`

## Acceptance Criteria
- [ ] Renders all blog posts from data.js in a responsive grid
- [ ] Each card has title, date, description, tags, read time
- [ ] External link icon appears on hover
- [ ] Cards have hover border/shadow transition
- [ ] FadeInSection animation on scroll
- [ ] Responsive: 1 col mobile, 2 col desktop
- [ ] `npm run lint` passes
