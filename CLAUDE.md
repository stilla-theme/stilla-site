# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Monorepo for the **Stilla** color theme — all editor plugins, the showcase site, and the color source of truth. Managed with bun workspaces.

## Structure

```
packages/
  colors/     — source of truth color definitions (colors.txt)
  emacs/      — doom-emacs theme (doom-stilla-theme.el)
  nvim/       — neovim theme (lua plugin)
  site/       — showcase website (Vite + Tailwind CSS 4)
  vscode/     — VS Code extension (TypeScript)
```

## Commands

Site (from `packages/site/`):
```sh
bun run dev      # Start Vite dev server
bun run build    # Build to dist/
bun run preview  # Preview production build
```

VS Code extension (from `packages/vscode/`):
```sh
bun run build    # Generate theme JSON from TypeScript
bun run package  # Build + package .vsix
bun run check    # Biome lint/format check
```

## Deployment

Site: Cloudflare Pages, auto-deploys from `main`.

## Color Palette

16 colors organized into groups:
- **Backgrounds**: `#0D0D0D`, `#121414`, `#1A1C1C`
- **Neutrals**: `#4C566A`, `#8C8C8C`, `#ADB2BA`
- **Lights**: `#F2F2F2`, `#FAFAFA`, `#FAF5EF`
- **Accents**: `#8FBCBB`, `#88B6D0`, `#5E81AC`, `#BA8082`, `#D99962`, `#E9B872`, `#A19C9A`, `#CD96B3`
