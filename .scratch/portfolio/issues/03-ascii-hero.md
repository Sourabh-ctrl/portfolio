# 03: ASCII hero & Intro

**What to build:** The signature landing section — a component converts the placeholder portrait into a full-screen monospace character-grid background (static, no interaction), with the owner's name and a typed tagline overlaid via the type-animation library. The portrait is referenced through the content module so it can be swapped later. Rendering parameters (character set, scale, contrast threshold) are constants near the top of the component for easy tuning.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Full-screen ASCII character grid renders from the placeholder portrait
- [ ] Name and typed tagline overlay the grid and are readable over it
- [ ] Portrait path comes from the content module, not from component code
- [ ] Rendering parameters are tunable constants at the top of the component
- [ ] `npm run lint` and `npm run build` pass