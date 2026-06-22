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
| `VITE_ADMIN_PASSWORD` | Password for `/admin` panel |

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
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
public/             # Static assets (resume PDFs, favicons)
```

## Blog

Posts live in `src/posts/*.md` with YAML frontmatter (`title`, `date`, `author`, `slug`, `description`, `category`). Loaded dynamically via `import.meta.glob` + `gray-matter` + `marked`.

To add a post, create a new `.md` file in `src/posts/` with valid frontmatter.

## Admin Panel

Routes under `/admin` — login with `VITE_ADMIN_PASSWORD`. Drafts are stored in `localStorage`. The editor exports markdown files as browser downloads (no server backend — files must be manually placed into `src/posts/`).

## Deploy

Deployed on **Netlify**. Build command: `npm run build`, publish directory: `dist/`. SPA redirect: `/* → /index.html`. Node 20.
