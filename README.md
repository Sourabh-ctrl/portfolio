# Portfolio

A single-page personal portfolio for **Sourabh Lathi** — warm paper, ink, serif display type and hand-drawn marginalia. A vertical hero leads into selected work, experience, live activity, skills, about, testimonials and contact, with today's WakaTime coding time under the hero actions.

The design language is inspired by [SomehowLiving/portfolio-template](https://github.com/SomehowLiving/portfolio-template) (paper palette, editorial type, blur-to-sharp reveals, speaking cursor), but all code and content here are this repo's own.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) (JSX)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev) + [react-icons](https://react-icons.github.io/react-icons) icons

## Setup

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

Production:

```bash
npm run build    # static bundle in dist/
npm run preview  # serve the production build locally
```

Quality gates (no test suite — deliberate): `npm run lint` and `npm run build` must both pass.

## How the page is put together

| Section | Component | Notes |
| --- | --- | --- |
| Hero | `src/components/Hero.jsx` | Vertical hero, draw-string doodle, live WakaTime coding time. |
| Work | `src/components/Work.jsx` | Selected projects, tag filters, hover notes, screenshot cards. |
| Experience | `src/components/Experience.jsx` | Roles and highlights. |
| Activity | `src/components/Activity.jsx` | Live GitHub heatmap (`GitHubContributions.jsx`) and LeetCode stats (`StatCards.jsx`). |
| Skills / About | `src/components/Skills.jsx`, `About.jsx` | Stack grid and the personal note. |
| Testimonials | `src/components/Testimonials.jsx` | Paused-on-hover marquee (`Marquee.jsx`). |
| Contact | `src/components/Contact.jsx` | Contact copy, email and social links. |

Motion is progressive: `Reveal.jsx` and `FadeInSection.jsx` reveal on scroll, the testimonial marquee pauses on hover or focus, and `CursorComment.jsx` types a note beside anything carrying `data-cursor`. Everything respects `prefers-reduced-motion`, and the page only ever scrolls vertically.

## Replace the placeholder content

**Every piece of site copy lives in one file: `src/data.js`.** Rewriting the site is a `data.js` edit — components never hardcode content.

### Images

- Project screenshots live in `src/assets/` (Quick Chat: `quick-chat.png`, Tube Roast: `tube-roast.webp`) and are imported by `data.js`.
- The nav/brand image is `src/assets/logo.jpeg`.

### Projects

- Add/remove objects in `data.projects` (image, description, tags, `liveUrl`, `repoUrl`).
- Drop each project image into `src/assets/` and import it in `data.js`, then reference it from the matching object.

### Jobs

- Update `data.jobs` (role, org, period, summary, highlights).

### Socials / contact

- Update `data.socials` and `data.identity.email`.

### Page title & meta

- Update `data.meta.title` and `data.meta.description`.

## Live data

- **GitHub contributions** — `GitHubContributions.jsx` reads the public `github-contributions-api.jogruber.de` endpoint, caches the result in `localStorage`, and shows an offline copy with a retry button if the API fails.
- **LeetCode stats** — `StatCards.jsx` tries two public mirror APIs in turn and shows the profile's solved counts, acceptance rate, ranking and recent accepted submissions.
- **WakaTime coding time** — `api/wakatime/today.js` reads `WAKATIME_API_KEY` server-side and returns today's total, editor and online state. The Vite dev server proxies the same shape through `vite.config.js`; the key never reaches the browser. Set `WAKATIME_API_KEY` in `.env.local` for local development and in the Vercel project for production.
- All blocks load independently; a failure in one never blocks the page.

## Deploy to GitHub Pages

The live URL is:

```
https://sourabh-ctrl.github.io/portfolio/
```

`vite.config.js` uses `base: '/portfolio/'` for static hosts, so the production build outputs to `dist/` with `/portfolio/`-prefixed asset paths — deploy the contents of `dist/` to the Pages root of the `portfolio` repository.

GitHub Pages cannot run the WakaTime function. On Vercel, `base` switches to `/` and `api/wakatime/today.js` serves the live stat; on GitHub Pages the stat stays hidden.
