# Ticket 07 — Integrate new sections into App.jsx + NavBar

Status: needs-triage
Blocked by: 04, 05, 06

## Goal
Wire all new components into the page layout and navigation.

## Files
- `src/App.jsx`
- `src/components/NavBar.jsx`

## Spec

### App.jsx
- Import `ContactForm` from `./components/ContactForm.jsx`
- Import `Testimonials` from `./components/Testimonials.jsx`
- Import `Import Blog` from `./components/Blog.jsx`
- Render order inside `<main>`:
  1. `<Intro />`
  2. `<GitHubContributions />`
  3. `<Experience />`
  4. `<Projects />`
  5. `<About />`
  6. `<Testimonials />`
  7. `<Blog />`
  8. `<ContactForm />`
- Move `<Footer />` outside `<main>` but inside the container div (after ContactForm)
- Remove old `<Footer />` CTA card if it duplicates ContactForm's purpose — keep only the copyright/social row in Footer

### NavBar.jsx
- Add to `navItems` array:
  ```js
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#blog', label: 'Blog' },
  ```
- Place them after `#skills` and before `#contact` in the array
- Verify desktop nav doesn't overflow on medium screens — reduce padding if needed

### Footer.jsx
- Simplify Footer to only show the copyright/social row (remove the Contact CTA card since ContactForm replaces it)
- Keep the `id="contact"` only on ContactForm, remove from Footer

## Acceptance Criteria
- [ ] All 8 sections render in correct order
- [ ] NavBar has links for all sections including Testimonials and Blog
- [ ] Mobile menu includes new links
- [ ] Footer is simplified to copyright + social links only
- [ ] No duplicate contact CTAs
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
