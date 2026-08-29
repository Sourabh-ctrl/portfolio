# Spec: Personal Portfolio Website

```
Status: ready-for-agent
Feature: portfolio
```

## Problem Statement

The user wants a personal website that presents them as a developer to visitors (recruiters, peers, clients). They've picked gazijarin.com v2 (the `Gazi-V2` repo) as the look-and-feel target: a dark-navy single-page site with a full-screen ASCII-art portrait hero. The reference repo ships no LICENSE, so its code can't be copied safely. The current workspace holds only agent-engineering scaffolding (`AGENTS.md`, `docs/agents/`): there is no app, no git repo, and no personal content (copy, photo, projects) to publish yet.

## Solution

A fresh single-page Vite + React site that visually echoes Gazi-V2 — same palette, typography, ASCII-portrait hero, section rhythm — but is entirely our own code and data-driven content. All copy, links, jobs, projects, and image paths live in one content module, so placeholder content can be swapped for the owner's real material without touching components. The site ships as a static build to GitHub Pages, mirrored from Gazi-V2's deploy workflow, free of charge and without a custom domain.

## User Stories

1. As a site visitor, I want the page to load fast, so that I don't wait for content (small static build, no framework bloat).
2. As a recruiter, I want to see the owner's name and role within seconds, so that I immediately know who this is.
3. As a visitor, I want a memorable hero, so that the site stands out (ASCII-art portrait background).
4. As a visitor, I want a typed tagline, so that the owner's positioning reads naturally as it animates.
5. As a visitor, I want a sticky top navigation, so that I can jump between sections from anywhere on the page.
6. As a mobile visitor, I want the navigation to collapse into a toggle, so that the layout stays clean on small screens.
7. As a visitor, I want smooth scrolling to each section, so that navigation feels polished.
8. As a recruiter, I want an About section, so that I can gauge who the owner is and what they value.
9. As a recruiter, I want a chronological Experience timeline, so that I can scan roles, orgs, and dates quickly.
10. As a visitor, I want Projects, so that I can see concrete work with descriptions, tech, and links.
11. As a visitor, I want project links (live demo and/or repository) to open in new tabs, so that I can dig deeper.
12. As a visitor, I want social/contact links in the footer, so that I can reach the owner beyond the site.
13. As a visitor, I want the layout to stay readable on phone, tablet, and desktop, so that it looks good wherever I browse.
14. As a visitor, I want proper page title, favicon, and meta description, so that tabs and search results look intentional.
15. As the owner, I want all copy, jobs, projects, links, and image paths in one data module, so that I can rewrite the whole site without touching components.
16. As the owner, I want to replace my placeholder portrait by dropping one file, so that the ASCII hero shows my face.
17. As the owner, I want placeholder content that is clearly branded placeholder, so that I never mistake it for real copy.
18. As the owner, I want a documented assets folder, so that I know where photos and project images go.
19. As the owner, I want ESLint and a production build as quality gates, so that I catch errors before shipping.
20. As the owner, I want a one-commit deploy pipeline, so that a push to main publishes the site automatically.
21. As the owner, I want the site hosted on GitHub Pages under a predictable URL, so that I can share it for free.
22. As the owner, I want a README covering setup, content replacement, and deployment, so that a future me (or anyone) can maintain it.
23. As the owner, I want attribution to gazijarin.com as the design inspiration, so that credit is given despite no license.
24. As a visitor, I don't want heavy runtime gimmicks (embedded game, art carousel, service worker), so that the page stays lean and focused.

## Implementation Decisions

1. **Fresh Vite + React scaffold, JSX (no TypeScript).** Gazi-V2 is referenced visually, never copied — it ships no LICENSE.
2. **Dependency set** — include: `react`, `react-dom`, `@mui/material` + `@mui/icons-material` + `@emotion/react` + `@emotion/styled`, `bootstrap` + `react-bootstrap`, `react-type-animation`; dev: `vite`, `@vitejs/plugin-react`, `eslint` (+ react-hooks/refresh plugins). **Dropped** vs. reference: `react-router-dom` (single-page anchor navigation needs no router), `react-responsive-carousel` (no art gallery), `react-transition-group` (scroll reveal uses IntersectionObserver toggling a CSS class), service worker/manifest (no PWA).
3. **Single content module** — every piece of site content (identity name/tagline, about paragraphs, jobs, projects, social links, image paths) lives in one data module with placeholder values; components consume it and never hardcode copy.
4. **Theme module** — MUI `createTheme` and a global stylesheet tokenizing Gazi-V2's palette: `#0a192f`, `#112240`, `#233554`, `#8892b0`, `#a8b2d1`, `#ccd6f6`, `#e6f1ff`, accent `#64ffda`. Fonts **NTR** and **Source Serif Pro** load from Google Fonts (the reference bundles sharefonts TTFs with murky licensing; Google Fonts is legitimate).
5. **ASCII portrait hero** — a reusable component takes an image path, converts it to a grayscale/threshold character grid, and renders it full-screen as the hero background at monospace width, scaled to fit. **Static** — no drag reveal interaction. The placeholder portrait ships under the public assets folder and is referenced from the content module, so replacing it later is a file drop plus a path edit.
6. **Sections & navigation** — one scrolling page; a top sticky navbar (collapsing to a mobile toggle) with anchor links. Section order: **Intro (ASCII hero + typing tagline) · About · Experience · Projects · Footer**.
7. **Experience** — a vertical timeline (roles, org, period, bullet points) rendered from the content module's jobs list.
8. **Projects** — responsive grid of cards (image, description, tech list, live/repo links) from the content module.
9. **Footer** — external social links from the content module plus an attribution line: "Design inspired by gazijarin.com".
10. **Deployment** — `git init` with repo name `portfolio`; `vite.config` sets `base: '/portfolio/'`; `.github/workflows/deploy.yml` mirrors Gazi-V2's (checks out main, `npm ci`, `npm run build`, publishes `dist` to the `gh-pages` branch via a Pages-action). No custom domain. Live URL: `https://<github-username>.github.io/portfolio/` — README uses an explicit placeholder until the username is known.

## Testing Decisions

- **Deliberately no automated test suite** (explicit user decision: "lint + build, lean"). The external-behavior seam is the **production build gate**: `npm run lint` (ESLint with react-hooks/refresh rules) and `npm run build` must pass, plus a manual smoke pass through `npm run dev` and `npm run preview` (every section renders from the content module, nav anchors navigate, responsive breakpoints behave, font/palette applied).
- The **highest potential seam** for future tests, should any ever be added, is a render-from-data smoke test: assert that all sections render given the content-module contract. Reference prior art: Gazi-V2 wires Playwright and a `setupTests.jsx`, though it never activates real test runs. **No new test seam is introduced now.**

## Out of Scope

- TypeScript migration.
- Real, non-placeholder content — biography, photo, project screenshots, resume/experience data. Swapping placeholders for the owner's material is a follow-up exercise (design: file drop + content-module edits).
- Anything fork-derived from Gazi-V2 source; the embedded RobotGame; the art gallery/lightbox carousel; ASCII drag-reveal interaction.
- Multi-page routing, left sidebar nav, custom domain/DNS, HTTPS beyond GitHub Pages' default, PWA/service worker, contact form, analytics, dark/light toggle, i18n.

## Further Notes

- Attribution to gazijarin.com is included in the footer; this is the safe stance given the reference has no LICENSE.
- The ASCII hero is the only component expected to need tuning after a real portrait lands; its rendering parameters (char set, scale, contrast threshold) will be constants near its top so they're easy to tweak.
- Open fact for this spec: the owner's **GitHub username** — required only for the README's live URL. `@github-user` is used as a stand-in until provided.
- Where this feature introduces site terminology (e.g. *ASCII hero*, *content module*, *Project card*), that vocabulary has not yet been registered in `CONTEXT.md` — a `/domain-modeling` follow-up can capture it once the site exists.