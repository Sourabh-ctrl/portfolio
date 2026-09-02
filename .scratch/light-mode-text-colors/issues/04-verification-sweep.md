# 04: Full light-mode verification sweep

**What to build:** End-to-end verification of the completed light-mode tuning: a
dark → light sweep over every section (Intro bio and CTA, WakaTime popover both
online/offline states, resume modal, navbar and mobile menu, Experience, Projects
with tech tags, About chips, Testimonials, Footer) confirming surfaces are distinct,
text is legible, the theme toggle transition stays smooth, and dark mode renders
identically to the baseline.

**Blocked by:** 01, 02, 03

**Status:** ready-for-agent

- [ ] Dark → light sweep over every section passes (surfaces distinct, text legible, accent legible)
- [ ] Dark mode renders identically to the pre-change baseline
- [ ] Theme toggle transition between dark and light remains smooth (no flash/flicker)
- [ ] The GitHub contribution card remains always-dark in both themes
- [ ] `npm run lint` and `npm run build` pass