---
name: admin-setup
description: Configure admin auth, EmailJS contact form, and GitHub publishing token for the admin panel
---

## Env vars (`.env` for local dev)
Copy `.env.example` → `.env` and fill in:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=
VITE_SITE_URL=
ADMIN_PASSWORD=
VITE_GITHUB_OWNER=
VITE_GITHUB_REPO=
```

## Admin password
- Validated server-side via `netlify/functions/auth.js`
- Set `ADMIN_PASSWORD` in Netlify dashboard (Site settings → Environment variables) for production
- For local dev: add to `.env` and run `netlify dev`
- NEVER exposed to the client bundle

## Contact form (EmailJS)
Uses `@emailjs/browser` v4. See `EMAILJS_SETUP.md` for full setup guide.

## Admin panel
- Route: `/admin/login` → `/admin` → `/admin/editor/:slug?`
- Auth: `sessionStorage.getItem('admin_auth') === 'true'`
- Drafts: stored in `localStorage` under keys `draft_<slug>`
- "Publish to GitHub" button commits `src/posts/{slug}.md` via GitHub API
  - Requires `VITE_GITHUB_OWNER` + `VITE_GITHUB_REPO` in `.env`
  - GitHub personal access token (`repo` scope) entered once in browser, stored in `localStorage`
- Fallback "Export Markdown" downloads a `.md` file

## Admin routes (router)
Defined in `src/router/index.js`. Uses `router.beforeEach` guard to check `sessionStorage`.
