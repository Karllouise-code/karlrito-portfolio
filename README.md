# Karl Louise Rito — Portfolio

Personal portfolio website built with **Vue 3** + **Vite 7**. Features a single-page landing layout, blog, resume PDF viewer, and admin blog editor.

## Tech Stack

**Vue 3** (Composition API) · **Vite 7** · **Vue Router 4** (SPA) · **Sass** (SCSS) · **Bootstrap 5.3** · **EmailJS** · **AOS** · **Typed.js**

## Setup

```sh
npm install
```

Copy `.env.example` to `.env` and fill in the values — the app won't function without them:

| Variable | Purpose |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `ADMIN_PASSWORD` | Password for `/admin` panel (server-side env var, set in Netlify dashboard) |

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server only (no serverless functions) |
| `npm run dev:netlify` | Start Netlify Dev (Vite + serverless functions for admin auth) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/     # Reusable sections (Hero, About, Skills, Resume, etc.)
├── views/          # Page-level views + admin panel
│   └── admin/      # Blog editor, dashboard, login
├── router/         # Vue Router config (SPA, lazy-loaded routes)
├── posts/          # Markdown blog posts with YAML frontmatter
├── assets/
│   ├── scss/       # SCSS variables, layout, component styles
│   └── css/        # Custom CSS
netlify/functions/  # Serverless functions (admin auth)
public/             # Static assets (resume PDFs, favicons)
```

## Blog

Posts live in `src/posts/*.md` with YAML frontmatter (`title`, `date`, `author`, `slug`, `description`, `category`). Loaded dynamically via `import.meta.glob` + `gray-matter` + `marked`.

To add a post, create a new `.md` file in `src/posts/` with valid frontmatter.

An RSS feed (`/feed.xml`) is auto-generated during `npm run build` via `scripts/generate-feed.js`. Set `VITE_SITE_URL` in `.env` to control the feed domain (defaults to `https://karllouiserito.netlify.app`).

## Admin Panel

Routes under `/admin` — login via serverless function (`netlify/functions/auth.js`) using `ADMIN_PASSWORD` env var (set in Netlify dashboard, not exposed to client). Drafts are stored in `localStorage`. The editor exports markdown files as browser downloads (no server backend — files must be manually placed into `src/posts/`).

## Deploy

Deployed on **Netlify**. Build command: `npm run build`, publish directory: `dist/`. SPA redirect: `/* → /index.html`. Node 20.
