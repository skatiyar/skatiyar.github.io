# Portfolio

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

1. **`src/lib/config.js`** — Set your site URL, title, author, and GA4 measurement ID.
2. **`src/app.html`** — GA4 gtag.js snippet (update the measurement ID to match config).
3. **`.github/workflows/deploy.yml`** — The `BASE_PATH` env var is auto-set to `/${{ github.event.repository.name }}`. If deploying to a user site (`username.github.io`), set it to empty string.

## Adding content

### Thoughts

Drop `.md` files into `src/thoughts/` with frontmatter:

```markdown
---
title: My Thought
date: '2025-03-01'
description: A short description.
project: project-slug # optional, links to a project
---

Content here.
```

### Projects

Drop `.md` files into `src/projects/` with frontmatter:

```markdown
---
title: My Project
description: A short description.
type: opensource
repo: https://github.com/... # optional
url: https://... # optional
date: '2025-03-01'
ranking: 1 # display order (lower = first); date used as tiebreaker
---

Detailed description here.
```

## Deploying to GitHub Pages

1. Push to GitHub.
2. Go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Push to `master`. The workflow builds and deploys automatically.

Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Project structure

```
src/
  lib/
    components/       # Header, Footer, Hero, SEO
    config.js         # Site metadata (title, author, URL, GA ID)
    utils/thoughts.js # Thought loader (import.meta.glob)
    utils/projects.js # Project loader (import.meta.glob)
  thoughts/           # Markdown thoughts
  projects/           # Markdown project pages
  routes/
    +page.svelte           # Homepage
    projects/+page.svelte  # Projects listing (sorted by ranking)
    thoughts/+page.svelte  # Thoughts listing
    thoughts/[slug]/       # Individual thoughts
    rss.xml/+server.js     # RSS feed
    sitemap.xml/+server.js # Sitemap
  app.html            # Shell HTML — GA4 gtag.js snippet, dark class
  app.css             # Tailwind v4 config (@theme tokens, @variant dark, base styles)
```
