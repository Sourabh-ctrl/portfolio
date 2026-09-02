# 01: Deepen the light-mode accent for AA

**What to build:** In light mode, every accent-colored element — links and CTAs,
technology tags, the "Open to work" badge, section-heading slash marks, navbar
hover states, the text-selection highlight and the accent glow/page pattern —
shifts to a deeper blue that passes WCAG AA contrast on white backgrounds and on
the blue-tinted chip backgrounds. Dark mode keeps its caribbean accent.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Accent-colored text measures ≥ 4.5:1 contrast against white backgrounds
- [ ] Accent text and badges on accent-tinted (10%-alpha) chip backgrounds measure ≥ 4.5:1 (previously below AA)
- [ ] Text selection highlight and the focus-visible outline remain clearly visible on the new accent
- [ ] The light-mode accent glow and page pattern hue match the new accent color
- [ ] Dark mode accent value/behavior is unchanged
- [ ] `npm run lint` and `npm run build` pass