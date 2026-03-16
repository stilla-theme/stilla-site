# stilla / nvim

> `Still` :: A quiet, introverted theme that stays out of your way.

Neovim color theme for Stilla.

## Installation

```lua
-- lazy.nvim (pointing at monorepo subdirectory)
{ "stilla-theme/stilla-site", config = function() require("stilla").set() end }
```

## Configuration

```lua
vim.g.stilla_contrast = true
vim.g.stilla_borders = false
vim.g.stilla_disable_background = false
vim.g.stilla_italic = false

require("stilla").set()
```

## Supported Plugins

TreeSitter, LSP Diagnostics, Lsp Saga, LSP Trouble, Git Gutter, Git Signs, Telescope, NvimTree, WhichKey, BufferLine, Lualine, Neogit, vim-sneak, lightspeed.nvim, and more.

## Credits

Uses a framework established by [shaunsingh/nord.nvim](https://github.com/shaunsingh/nord.nvim).
