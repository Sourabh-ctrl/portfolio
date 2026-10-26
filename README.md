# Portfolio

A dual-design personal portfolio built as a Vite + React app. The classic dark-navy design lives at `/`; the cream editorial redesign lives at `/inspired/`.

## Two designs

- `/` — classic dark-navy portfolio. Entered from `src/main.jsx`.
- `/inspired/` — cream editorial portfolio. Entered from `src/inspired/main.jsx`.
- The tiny dot after the classic footer copyright opens `/inspired/`.
- A low-contrast `classic` link at the bottom of the inspired contact section returns to `/`.

Both pages have isolated HTML, CSS, data, and assets. Shared assets such as `public/logo.jpeg`, `public/resume.pdf`, and `public/tech-icons/` remain at the site root.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) (JSX)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev) icons
- [react-type-animation](https://www.npmjs.com/package/react-type-animation)

## Setup

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
                 # http://localhost:5173/portfolio/inspired/
```

Production:

```bash
npm run build    # static bundle in dist/ with both pages
npm run preview  # serve the production build locally
```

Quality gates (no test suite — deliberate): `npm run lint` and `npm run build` must both pass.

## Replace the placeholder content

Site copy is data-driven but split by design:

- Classic: `src/data.js`
- Inspired: `src/inspired/data.js`

### Hero avatar

The classic avatar is read from `src/assets/logo.jpeg` (imported by `src/data.js` and rendered by `src/components/Intro.jsx` and `src/components/NavBar.jsx`). The inspired design uses its own copy in `src/inspired/assets/`. Replace the relevant image — no code change needed.

### Projects

- Classic projects: edit `data.projects` in `src/data.js`; images live in `src/assets/`.
- Inspired projects: edit the project entries in `src/inspired/data.js`; images live in `src/inspired/assets/`.

### Jobs

- Classic: update `data.jobs` in `src/data.js`.
- Inspired: update the matching experience data in `src/inspired/data.js`.

### Socials / contact

- Update `data.socials` and `data.identity.email` in the relevant data file.

### Page title & meta

- Classic: `index.html` and `src/data.js`.
- Inspired: `inspired/index.html` and `src/inspired/data.js`.

## Deploy

The primary URL is:

```
https://sourabh-ctrl.github.io/portfolio/
```

The redesign is at:

```
https://sourabh-ctrl.github.io/portfolio/inspired/
```

`vite.config.js` uses `base: '/portfolio/'` outside Vercel, so the production build outputs both pages to `dist/` with `/portfolio/`-prefixed asset paths. Deploy the contents of `dist/` to the Pages root of the `portfolio` repository. On Vercel, the base becomes `/` and the same two pages are served at `/` and `/inspired/`.

WakaTime endpoints remain separate: the classic design uses `/api/wakatime`; the inspired design uses `/api/wakatime/today`.

