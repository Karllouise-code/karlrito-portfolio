# SCSS Structure Documentation

This directory contains all centralized SCSS styles for the portfolio application.

## Directory Structure

```
scss/
├── _variables.scss          # Global variables (colors, fonts, spacing, breakpoints)
├── _layout.scss             # Layout structure (main wrapper, overflow handling, navigation)
├── main.scss                # Main entry point that imports all modules
└── pages/
    └── _all-projects.scss   # All Projects page specific styles
```

## Files Overview

### `_variables.scss`
Contains all global SCSS variables:
- **Font Families**: Default, heading, navigation, monospace fonts
- **Brand Colors**: Primary, accent colors with variations
- **Neutral Colors**: Gray scale palette
- **Spacing**: Consistent spacing scale (xs to 2xl)
- **Breakpoints**: Responsive breakpoint values
- **Transitions**: Standard animation timings
- **Shadows**: Consistent shadow definitions

### `_layout.scss`
Global layout and structure styles:
- Overflow handling for preventing horizontal scroll
- `.main` class for content area with sidebar offset (300px)
- Responsive adjustments for mobile/tablet views
- Navigation active states

### `pages/_all-projects.scss`
All Projects page specific styles:
- Page title section with gradient background
- Filter pills (Company/Personal toggle)
- Project card styling with hover effects
- Breadcrumb navigation
- Responsive mobile layouts

### `main.scss`
Main entry point that imports all modules in the correct order:
1. Variables (must be first)
2. Layout and structure
3. Page-specific styles

## Usage

### In App.vue
```scss
<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
```

### In Component Files
Components can use the global styles automatically, or import specific modules:

```scss
<style scoped lang="scss">
@import '@/assets/scss/variables';

.my-component {
  color: $primary-color;
  padding: $spacing-lg;
}
</style>
```

## Key Variables Reference

### Colors
- `$primary-color`: #0563bb
- `$primary-dark`: #044a94
- `$accent-color`: #149ddd
- `$gray-100` to `$gray-900`: Gray scale
- `$text-default`, `$text-heading`, `$text-light`

### Spacing
- `$spacing-xs`: 0.5rem
- `$spacing-sm`: 1rem
- `$spacing-md`: 1.5rem
- `$spacing-lg`: 2rem
- `$spacing-xl`: 3rem
- `$spacing-2xl`: 4rem

### Breakpoints
- `$breakpoint-xs`: 576px
- `$breakpoint-sm`: 768px
- `$breakpoint-md`: 992px
- `$breakpoint-lg`: 1200px
- `$breakpoint-xl`: 1400px

### Layout
- `$sidebar-width`: 300px

## Adding New Styles

### For a new page
1. Create `_page-name.scss` in `pages/` directory
2. Import it in `main.scss`
3. Use existing variables for consistency

### For new variables
Add them to `_variables.scss` with clear naming and comments.

### For new layout components
Add them to `_layout.scss` or create a new `_components.scss` file.

## Best Practices

1. **Always use variables** instead of hardcoded values
2. **Use SCSS nesting** for better organization
3. **Keep specificity low** - avoid deep nesting (max 3 levels)
4. **Mobile-first** - write base styles, then add media queries
5. **BEM naming** - Use Block-Element-Modifier when appropriate
6. **Comments** - Document complex styles or calculations

## Migration Notes

All inline styles from components are being migrated to this centralized SCSS structure for:
- Better maintainability
- Easier theme customization
- Consistent design system
- Better code organization
