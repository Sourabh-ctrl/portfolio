# 02: Darken the light-mode text ramp

**What to build:** In light mode, the secondary and muted text tiers step one shade
deeper across every section — job summaries, highlights, timestamps and org names,
project descriptions, section subtitles, footer caption — so body and supporting
text is clearly legible. The four-step hierarchy (heading > primary > secondary >
muted) is preserved, and dark mode is unchanged.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Muted/slate body text measures ≥ 4.5:1 contrast against white
- [ ] Secondary text (summaries, highlights) is darker than before and ≥ 4.5:1 against white
- [ ] Heading and primary tiers are unchanged and remain the darkest steps of the hierarchy
- [ ] Dark mode text ramp is unchanged
- [ ] `npm run lint` and `npm run build` pass