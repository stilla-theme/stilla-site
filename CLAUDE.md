# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Monorepo for color theme showcase sites, managed with bun workspaces. Each theme lives in `packages/<theme-name>/` as its own Vite static site with Tailwind CSS 4.

## Structure

```
packages/
  stilla/     — "a quiet, introverted theme that stays out of your way"
```

## Commands

Run from a package directory (e.g. `packages/stilla/`):

```sh
bun run dev      # Start Vite dev server
bun run build    # Build to dist/
bun run preview  # Preview production build
```

## Adding a New Theme

1. Create `packages/<name>/` with `index.html`, `src/style.css`, `vite.config.ts`, and `package.json`
2. Follow the same Vite + Tailwind CSS 4 setup as existing themes

## Deployment

Cloudflare Pages, auto-deploys from `main`. Each package builds independently.
