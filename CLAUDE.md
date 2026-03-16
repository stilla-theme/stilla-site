# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static showcase site for the **Stilla** color theme — "a quiet, introverted theme that stays out of your way." Hosted on Cloudflare Pages at `stilla.isnt.online`.

## Commands

```sh
bun run dev      # Start Vite dev server
bun run build    # Build to dist/
bun run preview  # Preview production build
```

## Architecture

Vite static site with Tailwind CSS 4. All markup lives in `index.html` at the root (Vite entry point). Styles are in `src/style.css` using `@import "tailwindcss"` with `@theme inline`.

- `colorscheme-notes.org` — design notes/TODOs for the theme across VSCode, browser, and site

## Deployment

Cloudflare Pages, auto-deploys from `main`. Build command: `bun run build`, output dir: `dist`.

## Color Palette

16 colors organized into groups:
- **Backgrounds**: `#0D0D0D`, `#121414`, `#1A1C1C`
- **Neutrals**: `#4C566A`, `#8C8C8C`, `#ADB2BA`
- **Lights**: `#F2F2F2`, `#FAFAFA`, `#FAF5EF`
- **Accents**: `#8FBCBB`, `#88B6D0`, `#5E81AC`, `#BA8082`, `#D99962`, `#E9B872`, `#A19C9A`, `#CD96B3`
