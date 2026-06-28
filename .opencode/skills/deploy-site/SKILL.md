---
name: deploy-site
description: Build and deploy the portfolio site to Netlify — run npm run build, verify RSS feed, confirm netlify.toml
---

## Build command
```sh
npm run build
```

This runs two steps sequentially:
1. `node scripts/generate-feed.js` — reads `src/posts/*.md` → writes `public/feed.xml`
2. `vite build` — produces `dist/`

## Preview
```sh
npm run preview
```
Serves the `dist/` folder locally.

## RSS feed
Generated from `scripts/generate-feed.js`. Uses `gray-matter` to parse post frontmatter. Domain controlled by `VITE_SITE_URL` env var (defaults to `https://karllouiserito.netlify.app`).

## Netlify config (`netlify.toml`)
- Publish directory: `dist/`
- SPA redirect: `/* → /index.html` (status 200)
- Node version: 20

## Deployment
- Netlify auto-deploys from the Git repo (connected via Netlify dashboard)
- Environment variables set in Netlify dashboard (Site settings → Environment variables), NOT in `.env` (which is for local dev only):
  - `ADMIN_PASSWORD`
  - `VITE_SITE_URL`
  - `VITE_EMAILJS_*`
  - `VITE_GITHUB_OWNER` / `VITE_GITHUB_REPO`
- For local Netlify Functions dev: `netlify dev` (not `npm run dev`)

## Gotchas
- `vite-plugin-vue-devtools` is listed as devDependency but NOT enabled in `vite.config.js`
- `nodePolyfills()` plugin is enabled (needed for `gray-matter`)
