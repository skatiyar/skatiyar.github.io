# SvelteKit Static Site Generator

Static site with markdown thoughts, dark/light theme, SEO, and RSS — deployed to GitHub Pages.

## Setup

```bash
npm install
npm run dev      # dev server at localhost:5173
npm run build    # build to /build
npm run preview  # preview the build
```

## Configuration

**Before deploying**, update these:

1. **`src/lib/config.js`** — Set your site URL, title, author.
2. **`.github/workflows/deploy.yml`** — The `BASE_PATH` env var is auto-set to `/${{ github.event.repository.name }}`. If deploying to a user site (`username.github.io`), set it to empty string.

## Adding content

Drop `.md` files into `src/thoughts/` with frontmatter:

```markdown
---
title: My Thought
date: '2025-03-01'
description: A short description.
---

Content here.
```

## Deploying to GitHub Pages

1. Push to GitHub.
2. Go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Push to `main`. The workflow builds and deploys automatically.

Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Project structure

```
src/
  lib/
    components/       # Header, Footer, ThemeToggle, SEO
    config.js         # Site metadata
    utils/thoughts.js # Markdown loader
    utils/projects.js # Project loader
  thoughts/           # Markdown thoughts
  projects/           # Markdown project pages
  routes/
    +page.svelte           # Homepage
    projects/+page.svelte  # Projects listing
    thoughts/+page.svelte  # Thoughts listing
    thoughts/[slug]/       # Individual thoughts
    rss.xml/+server.js     # RSS feed
```
