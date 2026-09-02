# Light-mode text & surface colors

Status: ready-for-agent

## Problem Statement

In light mode the portfolio reads as washed out and unintentionally styled. Card
surfaces use the same white as the page background, so Projects, Testimonials,
skill chips, the WakaTime popover and the resume modal visually collapse into the
page, only held in by faint borders. Accent-colored text strains to clear contrast
on white and on the blue-tinted chips. Body and secondary text feel lighter and
weak compared with the crisp dark mode.

## Solution

Tune the light theme token block — the single source of truth for every text color
and card surface in the UI. Surfaces get a subtle tint so cards read as cards,
the slate text ramp steps one shade deeper, and the accent deepens to blue-700 so
accent text meets WCAG AA on white and on tinted surfaces. Dark mode and the
always-dark GitHub contribution card are untouched. No component code changes.

## User Stories

1. As a visitor reading the site in light mode, I want section headings to be dark
   and strong, so that they anchor each section.
2. As a visitor, I want body paragraphs on the white page to be clearly legible, so
   that I can read the bio and section descriptions comfortably.
3. As a visitor, I want secondary text (job summaries, highlights, timestamps) to be
   legible without competing with body text, so that the information hierarchy reads correctly.
4. As a visitor, I want project and testimonial cards to be visibly distinct from the
   white page, so that each card reads as its own surface.
5. As a visitor, I want the About skill chips to be visibly distinct from the page,
   so that the skills list reads as a set of pills.
6. As a visitor, I want project technology tags to read as filled chips with legible
   accent text, so that tags are scannable.
7. As a visitor, I want accent-colored links and CTAs ("Say hi!", nav hover, email
   link) to meet WCAG AA against white, so that they are readable.
8. As a visitor, I want the "Open to work" badge accent text to be legible on its
   tinted background.
9. As a visitor, I want the WakaTime popover (online and offline states) to have
   legible text on its tinted surface.
10. As a visitor, I want the resume modal header and preview chrome to be legible on
    its tinted surface.
11. As a visitor, I want navbar links and the theme/sound/menu buttons to be legible
    in both the scrolled and unscrolled states.
12. As a visitor, I want mobile-menu links to be legible on the menu panel.
13. As a visitor, I want the text-selection highlight (accent background, dark text)
    to remain readable on the deepened accent.
14. As a visitor, I want the footer contact card text to be legible and the card to
    read as a surface.
15. As a returning visitor, I want dark mode to look identical to today after the
    change, so that the light-mode fix never regresses the default theme.
16. As a keyboard user, I want the accent-colored focus-visible outline to remain
    clearly visible against light surfaces.
17. As a maintainer, I want all fixes to flow from the theme token layer, so that
    there is exactly one source of truth and no per-component color patches.
18. As a maintainer, I want `npm run lint` and `npm run build` to pass, so that the
    change is mergeable.
19. As a visitor, I want the theme toggle transition between dark and light to stay
    smooth, so that switching themes feels polished.
20. As a visitor, I want the always-dark GitHub contribution card to keep its
    authentic GitHub dark look in light mode, so that the card stays recognizable.

## Implementation Decisions

- The entire fix is scoped to the light-theme token block that re-maps the named
  tokens (`navy`, `light-navy`, `lightest-navy`, `slate`, `light-slate`,
  `lightest-slate`, `heading`, `accent`, plus the accent-derived `accent-glow` and
  `pattern-fg`). The theme wiring, ThemeContext, and every component are untouched.
- Surface token (`light-navy`, the card surface consumed at 60–95% alpha across
  cards, chips, popover and modal) changes from pure white to a slate-200-scale
  tint. At the alphas the components already use, this yields a clearly visible but
  still subtle card fill on the white page. The value is chosen so the translucent
  usages stay visibly tinted while solid usages never go muddy.
- The slate text ramp steps one tier deeper for the secondary and muted roles while
  heading and primary roles stay at slate-900/slate-800: the four-step hierarchy
  (heading > primary > secondary > muted) is preserved, and the muted tier gains
  roughly double its current contrast against white.
- The accent deepens from the blue-600 tier to the blue-700 tier: contrast on white
  improves from ~5.0:1 to ~6.9:1, and on the 10%-alpha accent chip backgrounds
  improves to ~6.5:1 (previously below AA). Accent tokens that are alpha-mixed
  versions of the accent (`accent-glow`, `pattern-fg`) are re-keyed to the same hue
  so glows and the page pattern stay consistent in light mode.
- The four tokens not implicated in the complaints (border, surface, surface-hover,
  pattern) keep their current light-mode values, unless a change is required for
  card legibility.

## Testing Decisions

- The repo has no automated test harness, and none is introduced for a pure-color
  change. The seam under test is the theme token layer, exercised through the
  same verification practice the repo already uses (lint + build gates).
- A good test is purely behavioral: in light mode every surface renders visually
  distinct from the page, and every text role meets its contrast target. No
  implementation detail (specific hex, utility class) is asserted.
- Verify with `npm run lint` and `npm run build`, then a manual sweep in the dev
  server, toggling dark → light and passing through every section (Intro bio and
  CTA, WakaTime popover both states, resume modal, navbar and mobile menu,
  Experience, Projects with tech tags, About chips, Testimonials, Footer).
- Contrast acceptance (WCAG AA on white): headings ≥ 7:1, primary text ≥ 7:1,
  secondary ≥ 4.5:1, muted ≥ 4.5:1, accent ≥ 4.5:1 on white and on its tinted chips.
- Dark mode must render unchanged; the GitHub contribution card must remain
  always-dark.

## Out of Scope

- Theming the GitHub contribution card to light mode (it stays always-dark on
  purpose).
- Any change to dark-mode tokens or behavior.
- The in-progress font stack switch (working-tree change, unrelated to colors).
- Optional cosmetic extras not confirmed by the user: the Experience middot
  separator color and the navbar scrolled-state shadow in light mode.
- Refactoring card components to use a dedicated surface token instead of the
  translucent card token.
- Introducing a unit/e2e test harness for CSS tokens.

## Further Notes

- The dark mode uses the classic navy-on-caribbean palette; the light mode is being
  aligned to the same visual hierarchy, just mirrored. Card distinction in light
  mode depends on the surface token differing from the page background once the
  alpha blending applied by components is taken into account.
- Tickets: 01-accent-contrast, 02-text-ramp, 03-card-surfaces are independent
  parallel slices; 04-verification-sweep gates on all three.