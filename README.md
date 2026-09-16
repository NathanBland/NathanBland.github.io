# nathanbland.dev

My personal portfolio and writing archive, built as a static Astro site with no page-loaded client JavaScript.

## Stack

- Astro content collections for archived writing
- Static GitHub Pages deployment
- RSS and sitemap endpoints generated at build time
- Zero page-loaded client JavaScript in the production output

## Local development

Requires Node.js 22.12 or newer and npm. CI runs on Node.js 24. If you use `nvm`, run `nvm use` from the project root.

```sh
npm ci
npm run dev
```

The development server runs at `http://localhost:4321`.
Run `npm run build` before opening a pull request. It type-checks the site, builds static output, and verifies generated routes and local links.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Validate Astro and TypeScript files |
| `npm run build` | Validate, build, and verify routes and local links in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run resume` | Regenerate the downloadable resume PDF |

`src/data/resume.json` is the source for the homepage work history, the full experience page, and the downloadable PDF. `npm run dev` and `npm run build` regenerate the PDF before Astro starts.

## Writing

Articles live in `src/content/blog`. Each Markdown file provides validated frontmatter:

```yaml
---
slug: Article-URL-Slug
title: Article title
description: A concise summary for listings and social cards.
pubDate: 2026-07-06
tags: [example]
draft: false
---
```

The `slug` field is the public URL. Existing mixed-case slugs are intentionally preserved so historical links continue to work.

## Deployment

Pull requests run a clean type-check and production build. Pushes to `main` or `master` deploy through GitHub Actions using GitHub Pages. Generated output is not committed to the repository.
