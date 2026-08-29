# 02: Theme & content module

**What to build:** The Gazi-V2 look and the single content source. A MUI theme and global stylesheet apply the navy palette (`#0a192f`, `#112240`, `#233554`, `#8892b0`, `#a8b2d1`, `#ccd6f6`, `#e6f1ff`, accent `#64ffda`); NTR and Source Serif Pro load from Google Fonts. The content module is populated with the full placeholder contract — identity (name, roles), typed taglines, about paragraphs, jobs, projects (image/tech/links), social links, image paths — clearly branded as placeholders. A styled page with the placeholder copy renders.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Global navy palette + accent visible on screen
- [ ] Google Fonts (NTR, Source Serif Pro) load and apply
- [ ] Content module exports structured placeholder data for every section
- [ ] Placeholder copy is visibly marked as placeholder, never confusable with real content
- [ ] `npm run lint` and `npm run build` pass