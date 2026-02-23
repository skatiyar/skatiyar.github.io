# CLAUDE.md

Static personal site — SvelteKit 2 + Svelte 5 + Vite 7 + mdsvex + Tailwind CSS v4. Deployed to GitHub Pages via `@sveltejs/adapter-static`. All routes pre-rendered.

## Commands

```bash
npm run dev       # Dev server (localhost:5173)
npm run build     # Build static site to /build
npm run preview   # Preview production build
npm run format    # Prettier
npm run lint      # ESLint
```

## Structure

```
src/
  thoughts/          # Markdown content (*.md with YAML frontmatter)
  projects/          # Project pages (*.md with YAML frontmatter)
  routes/            # SvelteKit file-based routing
    +page.svelte     # Homepage
    projects/        # /projects — listing (sorted by ranking)
    thoughts/        # /thoughts — listing, /thoughts/[slug] — detail
    rss.xml/         # /rss.xml
    sitemap.xml/     # /sitemap.xml
  lib/
    components/      # Header, Footer, Hero, SEO
    config.js        # Site metadata (title, author, URL, GA ID, OG image)
    utils/thoughts.js  # Thought loader (import.meta.glob)
    utils/projects.js  # Project loader (import.meta.glob)
  app.html           # Shell HTML — GA4 gtag.js snippet, RSS autodiscovery, dark class
  app.css            # Tailwind v4 config (@theme tokens, @variant dark, base styles)
```

## Content Formats

**Thought** (`src/thoughts/*.md`):

```yaml
title: string
date: 'YYYY-MM-DD'
description: string
project: project-slug # optional, links to a project
```

**Project** (`src/projects/*.md`):

```yaml
title: string
description: string
type: opensource | closed
repo: https://... # optional
url: https://... # optional
date: 'YYYY-MM-DD'
ranking: number # display order (lower = first); date used as tiebreaker
```

## Design Guidelines

**Type scale** (5 sizes only — use weight and color for hierarchy, not extra sizes):

| Role       | Class       | Weight          | Used for                               |
| ---------- | ----------- | --------------- | -------------------------------------- |
| Display    | `text-4xl`  | `font-bold`     | Hero section titles (all pages)        |
| Heading    | `text-2xl`  | `font-bold`     | Page h1s, section h2s                  |
| Subheading | `text-lg`   | `font-semibold` | Card titles, intro text, project names |
| Body       | `text-base` | normal          | Descriptions, body text                |
| Caption    | `text-sm`   | normal          | Dates, badges, footer, meta            |

**Spacing scale** (consistent across all pages):

- Gaps: `gap-2` (tight inline), `gap-4` (standard), `gap-6` (section-level)
- Margins: `mb-2` (tight), `mb-4` (standard), `mb-8` (section)
- Padding: `py-8` (sections), `p-5` (cards), `py-6` (footer), `pt-8` (header)

**Color palette** — warm stone neutrals + terracotta/orange accent:

- Neutrals: cream/parchment light (`#faf6f1`), warm brown-black dark (`#191210`)
- Accent: terracotta `#c2410c` (light) / orange `#fb923c` (dark)
- All colors defined as CSS custom properties in `app.css` `@theme` + `:root.dark`
- No hardcoded colors in components — always use token classes (`text-text-primary`, `bg-bg-secondary`, etc.)

## SEO

- **robots.txt**: `static/robots.txt` — allows all crawlers, references sitemap
- **Sitemap**: `src/routes/sitemap.xml/+server.js` — static pages + thought slugs, with `lastmod`, `changefreq`, `priority`; built with `fast-xml-parser` `XMLBuilder`
- **RSS**: `src/routes/rss.xml/+server.js` — thoughts only; autodiscovery `<link>` in `app.html`; built with `fast-xml-parser` `XMLBuilder`
- **SEO component**: `src/lib/components/SEO.svelte` — canonical URL, Open Graph, Twitter Card meta tags; `image` defaults to `siteConfig.ogImage` (absolute URL derived at render)
- **JSON-LD structured data**:
  - `WebSite` schema in `+layout.svelte` (all pages)
  - `Person` schema in `+page.svelte` (homepage)
  - `Article` schema in `thoughts/[slug]/+page.svelte` (each thought)
- **OG image**: `static/og-image.png` (1200x630 recommended); referenced via `ogImage` in `config.js`

## Conventions

- Svelte 5 runes (`$props`, `$state`, `$effect`)
- Tailwind CSS v4: `@theme` tokens in `app.css`, utility classes inline (no `<style>` blocks)
- `@tailwindcss/typography` for `.prose` markdown content styling
- Dark mode: defaults dark (`class="dark"` on `<html>` in `app.html`), system-preference driven. If user prefers light, View Transitions API radial reveal (3s) removes `.dark` class on mount
- Layout: left-aligned with golden-ratio margin — `ml-[max(1.5rem,calc((100%-720px)/2.618))]`. Fixed sizes throughout (no responsive breakpoints); the `max()` clamp degrades gracefully on smaller viewports
- Links use `base` from `$app/paths` for GitHub Pages subpath compatibility
- ESM only (`"type": "module"`)
- Pre-commit hook (husky + lint-staged) runs ESLint + Prettier on staged files
- Deployment: GitHub Actions on push to `master` (`.github/workflows/deploy.yml`)
