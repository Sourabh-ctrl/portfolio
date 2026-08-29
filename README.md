# Portfolio

A single-page personal portfolio inspired by [gazijarin.com](https://gazijarin.com) (the `Gazi-V2` repo) — same dark-navy palette, typography, and ASCII-portrait hero, but built as a fresh Vite + React app with fully own code and data-driven content.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) (JSX)
- [MUI](https://mui.com) v9 + Emotion
- [Bootstrap 5](https://getbootstrap.com) + react-bootstrap
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

**Every piece of site copy lives in one file: `src/data.js`.** Rewriting the site is a `data.js` edit — components never hardcode content. All placeholder values are prefixed `[PLACEHOLDER]` so you can search for any that slip through before going live.

### Portrait (the ASCII hero)

Your photo must be placed at `public/assets/portrait.png` (or update `data.hero.portrait` in `src/data.js`). A high-contrast, head-and-shoulders portrait works best — ASCII conversion is lossy. Tune the conversion in `src/components/Intro.jsx` (constants `CHAR_SET`, `COLUMNS`, `CONTRAST`).

### Projects

- Add/remove objects in `data.projects` (image, description, tech, `liveUrl`, `repoUrl`).
- Drop each project image into `public/assets/` and reference it from the matching object.

### Jobs

- Update `data.jobs` (role, org, period, summary, highlights).

### Socials / contact

- Update `data.socials` and `data.identity.email`.

### Page title & meta

- Update `data.meta.title` and `data.meta.description`.

## Deploy to GitHub Pages

The live URL is:

```
https://<github-username>.github.io/portfolio/
```

> Replace `<github-username>` with your actual GitHub username, and confirm `vite.config.js` uses `base: '/portfolio/'`.

To publish:

1. Create a new GitHub repository named `portfolio` (public).
2. Push this repo to it:
   ```bash
   git remote add origin https://github.com/<github-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Source: GitHub Actions**.
4. The `deploy.yml` workflow builds and publishes `dist/` to Pages automatically on every push to `main`. You can also trigger it manually from the **Actions** tab.

## Credits

Visual design inspired by [gazijarin.com](https://github.com/gazijarin/Gazi-V2). Gazi-V2 ships no LICENSE, so this project is an original implementation, not a fork.