---
name: add-blog-post
description: Scaffold new blog posts with YAML frontmatter (title, date, author, slug, description, category) in src/posts/
---

## Frontmatter rules
Every post in `src/posts/*.md` must start with YAML frontmatter:

```yaml
---
title: My Post Title
date: 2026-06-29
author: Karl Louise Rito
slug: my-post-title
description: A short description for previews and RSS
category: tech
---
```

- `slug` must match the filename (e.g. `my-post-title.md` → slug `my-post-title`)
- `category` is free-text (e.g. `tech`, `design`, `life`)
- Optional: add `isExternal: true` + `url: https://...` for external-link posts
- `date` format: `YYYY-MM-DD`

## Location
Create the file at `src/posts/<slug>.md`.

## Listing mechanism
`BlogPage.vue` and `AdminDashboard.vue` load posts via `import.meta.glob('../posts/*.md', { as: 'raw' })` + `gray-matter`. The `gray-matter` import is from npm. Use:

```js
import matter from 'gray-matter'
const { data, content } = matter(raw)
```

## Single post mechanism
`BlogPost.vue` does `import(../posts/${slug}.md?raw)` + `gray-matter` + `marked` to render HTML.

## After creation
A new `.md` file is automatically picked up on next dev server restart or build. No registry file to update.

## Images
Store post images in `src/assets/` or `public/`. Use relative paths if in `src/assets/` (Vite resolves them).
