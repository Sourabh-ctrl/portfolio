# 01: Scaffold the Vite/React app

**What to build:** A running empty portfolio app — Vite + React 19 in JSX with the dependency set from the spec (MUI, emotion, bootstrap, react-bootstrap, react-type-animation; ESLint dev tooling). The project root is the repo root (like Gazi-V2). A content-module stub and a theme-module shell exist so later tickets have somewhere to plug in. `git init` creates a `portfolio` repo. `npm run lint` and `npm run build` both pass.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `npm install` completes with the spec's dependency set
- [ ] App boots from `src/main.jsx`; a placeholder page renders
- [ ] `npm run lint` passes with react-hooks/refresh rules
- [ ] `npm run build` produces a static bundle in `dist/`
- [ ] Repo is `git init`-ed; `.gitignore` excludes `node_modules` and `dist`
- [ ] Stub content module and theme shell exist in `src/`