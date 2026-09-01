# Ticket 02 — Polish existing sections

Status: needs-triage
Blocked by: 01

## Goal
Unify visual rhythm, animations, and responsive behavior across all existing components.

## Files
- `src/components/NavBar.jsx`
- `src/components/Intro.jsx`
- `src/components/Experience.jsx`
- `src/components/Projects.jsx`
- `src/components/About.jsx`
- `src/components/GitHubContributions.jsx`
- `src/components/Footer.jsx`
- `src/components/FadeInSection.jsx`
- `src/index.css`

## Spec

### Section Padding Rhythm
- Every `<section>` should use consistent vertical padding: `pt-16 pb-12` (or `py-16` equivalent)
- First section (Intro) keeps its own top padding for navbar clearance (`pt-24 sm:pt-28 md:pt-32`)
- Sections that currently use `pt-8 pb-12` should be updated to `pt-16 pb-12` for breathing room

### Section Headings
- All section headings must follow the pattern: `<span className="text-accent font-sans mr-0.5">/</span> <span>Section Name</span>`
- Heading classes: `text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading`
- Subtitle: `text-sm font-sans text-slate mt-1`

### FadeInSection Coverage
- Verify every section (except Intro) is wrapped in `FadeInSection`
- Add wrapper to any section missing it (Experience, GitHub heading currently may lack it)

### Hover Transitions
- All interactive cards (Projects, Experience, About badges): ensure `transition-all duration-300` on hover states
- Nav links: consistent `hover:text-accent hover:bg-light-navy/70` with `transition-all`

### Responsive Breakpoints
- Mobile (≤640px): single column, `text-sm` for body, `text-base` for headings
- Tablet (640-1024px): 2-column grids where applicable
- Desktop (≥1024px): full layout, nav links visible
- Verify no horizontal overflow on any screen size

### CSS
- Add `scroll-mt-20` utility class usage on each section for fixed navbar scroll offset
- Ensure `::selection` and `:focus-visible` styles still apply

## Acceptance Criteria
- [ ] All sections use consistent `pt-16 pb-12` padding
- [ ] All headings follow the `/ Section Name` pattern
- [ ] All sections wrapped in FadeInSection
- [ ] Hover transitions smooth on all interactive elements
- [ ] No horizontal overflow on mobile (375px width)
- [ ] `npm run lint` passes
