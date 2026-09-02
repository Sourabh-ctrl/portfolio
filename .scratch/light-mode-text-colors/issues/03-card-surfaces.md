# 03: Give light-mode card surfaces a visible tint

**What to build:** In light mode, project and testimonial cards, About skill chips,
project technology tags, the WakaTime popover, the resume modal and the mobile menu
panel all read as distinct surfaces on the near-white page, instead of blending into
it. The change stays in the theme token layer — translucent card usages keep working
at their existing alpha values.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Project and testimonial cards are visually distinct from the page background while the page itself stays near-white
- [ ] The WakaTime popover, resume modal and mobile menu panel are legible and clearly defined surfaces
- [ ] Skill chips and tech tags read as filled pills, not flat text on the page
- [ ] The change is confined to the theme token layer (no component class changes)
- [ ] Dark mode surfaces are unchanged
- [ ] `npm run lint` and `npm run build` pass