# Ticket 08 — Final polish pass

Status: needs-triage
Blocked by: 07

## Goal
Accessibility audit, scroll offsets, keyboard navigation, and build verification.

## Files
- All component files in `src/components/`
- `src/index.css`
- `src/App.jsx`

## Spec

### Accessibility
- Every `<button>` must have an `aria-label`
- Every `<a>` with only an icon (no text) must have `aria-label`
- Form inputs must have associated `<label>` elements (not just placeholder text)
- Add `role="form"` or `aria-label` to the contact form container
- Verify all images have meaningful `alt` text
- Ensure `:focus-visible` outline is visible on all interactive elements

### Scroll Offsets
- Each section should have `className="scroll-mt-20"` (or appropriate value) so clicking nav links scrolls to the right position below the fixed navbar
- Test by clicking each nav link and verifying the section heading is visible

### Keyboard Navigation
- Tab through the page: all interactive elements (links, buttons, form fields) must be reachable
- Modal (resume) must trap focus when open
- Escape key closes the resume modal (already implemented, verify)

### Build Verification
- Run `npm run lint` — 0 errors
- Run `npm run build` — succeeds with 0 errors
- Run `npm run preview` — verify the built site renders correctly

## Acceptance Criteria
- [ ] All buttons/links have aria-labels
- [ ] Form inputs have associated labels
- [ ] All sections have scroll-mt offset
- [ ] Tab navigation works through entire page
- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run build` succeeds
