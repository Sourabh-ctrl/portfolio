# 08: Deploy to GitHub Pages

**What to build:** The finished site ships the way Gazi-V2 does. `vite.config` sets the `portfolio` base path; a GitHub Actions workflow builds on push to main and publishes `dist` to the `gh-pages` branch; a README documents setup, replacing placeholder content, and deployment — using an explicit placeholder for the GitHub username in the live URL. The first commit is made and the repo is ready to push.

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** ready-for-agent

- [ ] Production bundle is emitted under the `/portfolio/` base path
- [ ] `deploy.yml` runs on push to main: install, build, publish `dist` to `gh-pages`
- [ ] README covers setup, content replacement (content module + portraits), and deployment
- [ ] README's live URL uses `<github-username>` placeholder
- [ ] `.gitignore` present; first commit made on `main`
- [ ] `npm run lint` and `npm run build` pass