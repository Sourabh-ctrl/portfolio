# Portfolio

A single-page personal portfolio inspired by [gazijarin.com](https://gazijarin.com) (the `Gazi-V2` repo) — same dark-navy palette, typography, and ASCII-portrait hero, but built as a fresh Vite + React app with fully own code and data-driven content.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) (JSX)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev) icons
- [react-type-animation](https://www.npmjs.com/package/react-type-animation)

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

## Replace the placeholder content

**Every piece of site copy lives in one file: `src/data.js`.** Rewriting the site is a `data.js` edit — components never hardcode content.

### Hero avatar

The hero avatar and nav-brand image are read from `src/assets/logo.jpeg` (imported by `src/data.js` as `hero.portrait` / `identity.logo`, and rendered by `src/components/Intro.jsx` and `src/components/NavBar.jsx`). To swap in another photo, replace `src/assets/logo.jpeg` — no code change needed.

### Projects

- Add/remove objects in `data.projects` (image, description, tech, `liveUrl`, `repoUrl`).
- Drop each project image into `src/assets/` and import it in `data.js`, then reference it from the matching object.

### Jobs

- Update `data.jobs` (role, org, period, summary, highlights).

### Socials / contact

- Update `data.socials` and `data.identity.email`.

### Page title & meta

- Update `data.meta.title` and `data.meta.description`.

## Deploy to GitHub Pages

The live URL is:

```
https://sourabh-ctrl.github.io/portfolio/
```

`vite.config.js` uses `base: '/portfolio/'`, so the production build outputs to `dist/` with `/portfolio/`-prefixed asset paths — deploy the contents of `dist/` to the Pages root of the `portfolio` repository.

