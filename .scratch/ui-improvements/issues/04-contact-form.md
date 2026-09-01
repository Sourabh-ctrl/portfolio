# Ticket 04 — Build Contact form component

Status: needs-triage
Blocked by: 02, 03

## Goal
Create a styled contact form that opens the user's email client with pre-filled fields.

## Files
- `src/components/ContactForm.jsx` (NEW)

## Spec

### Behavior
- Form fields: Name (text), Email (email), Subject (text), Message (textarea)
- "Send Message" button constructs a `mailto:lathisaurav@gmail.com` URL:
  - Subject: form subject field (URL-encoded)
  - Body: form message field + name + email signature (URL-encoded)
- Open via `window.location.href = mailtoUrl`
- Validate before sending: all fields required, email must match basic regex pattern
- Show inline validation errors (red text below field)
- Play `sound.playClick()` on submit

### Styling
- Wrap in `FadeInSection`
- Section id: `#contact` (this replaces Footer's CTA role)
- Section heading: `/ Get In Touch` following the standard pattern
- Form container: `max-w-2xl mx-auto`, rounded-2xl border, bg-light-navy/60
- Input fields: `bg-navy border border-lightest-navy rounded-lg px-4 py-3 text-sm text-lightest-slate placeholder-slate focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors`
- Submit button: `bg-accent/10 border border-accent text-accent hover:bg-accent/20 rounded-lg px-6 py-3 font-semibold transition-all active:scale-95`
- Responsive: single column, full width on mobile

### Imports
- `import data from '../data.js'`
- `import { sound } from '../utils/sound.js'`
- `import FadeInSection from './FadeInSection.jsx'`
- `import { Send } from 'lucide-react'`

## Acceptance Criteria
- [ ] Form renders with 4 fields + submit button
- [ ] Validation shows errors for empty fields and invalid email
- [ ] Submit opens mailto: with correct pre-filled subject/body
- [ ] Sound plays on submit
- [ ] Responsive on mobile (375px) and desktop
- [ ] `npm run lint` passes
