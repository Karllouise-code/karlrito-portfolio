---
name: manage-theme
description: Guide for SCSS dark-theme changes respecting _variables.scss, _dark-theme.scss, and useTheme.js composable
---

## Theme system
- Dark theme toggled via `composables/useTheme.js` — a singleton composable
- Persisted to `localStorage` key `theme`
- Applied via `data-theme` attribute on `<html>` element
- Toggle button lives in `Header.vue`

## SCSS structure
- `src/assets/scss/_variables.scss` — auto-injected globally via Vite `additionalData` in `vite.config.js`. No explicit `@import` needed in components.
- `src/assets/scss/_dark-theme.scss` — dark overrides. Selectors scoped under `[data-theme="dark"]`.

## Conventions
- Add dark overrides only in `_dark-theme.scss`, not scattered across components
- Use CSS variables in `_variables.scss` for runtime-switchable values
- Components use the `data-theme` attr on `<html>` via `useTheme().theme.value`
- Never hardcode colors in component `<style>` — always go through SCSS variables

## Bootstrap
Bootstrap 5.3 loaded via CDN in `index.html`, npm import in `main.js`, and `@import` in `App.vue`. JS comes from npm package.
