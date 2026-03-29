local util = {}
local stilla = require("stilla.theme")

-- Parse a legacy comma-separated style string into nvim_set_hl boolean keys.
local function parse_style(style)
	local opts = {}
	if not style or style == "NONE" then return opts end
	for part in style:gmatch("[^,]+") do
		opts[part] = true
	end
	return opts
end

-- Highlight a group using the native nvim API (no vim.cmd string building).
util.highlight = function(group, color)
	if color.link then
		vim.api.nvim_set_hl(0, group, { link = color.link })
		return
	end

	local opts = parse_style(color.style)
	if color.fg and color.fg ~= "NONE" then opts.fg = color.fg end
	if color.bg and color.bg ~= "NONE" then opts.bg = color.bg end
	if color.sp then opts.sp = color.sp end

	vim.api.nvim_set_hl(0, group, opts)
end

-- Clear stilla autocmds when another colorscheme takes over.
function util.onColorScheme()
	if vim.g.colors_name ~= "stilla" then
		pcall(vim.api.nvim_del_augroup_by_name, "stilla")
	end
end

-- Apply contrast winhighlight to terminal/packer/qf windows.
util.contrast = function()
	local group = vim.api.nvim_create_augroup("stilla", { clear = true })
	vim.api.nvim_create_autocmd("ColorScheme", {
		group = group,
		callback = function() require("stilla.util").onColorScheme() end,
	})
	local float_hl = "Normal:NormalFloat,SignColumn:NormalFloat"
	vim.api.nvim_create_autocmd("TermOpen", {
		group = group,
		command = "setlocal winhighlight=" .. float_hl,
	})
	vim.api.nvim_create_autocmd("FileType", {
		group = group,
		pattern = { "packer", "qf" },
		command = "setlocal winhighlight=" .. float_hl,
	})
end

-- Load the theme
function util.load()
	-- Set the theme environment
	vim.cmd("hi clear")
	if vim.fn.exists("syntax_on") then
		vim.cmd("syntax reset")
	end
	-- vim.o.background = "dark"
	vim.o.termguicolors = true
	vim.g.colors_name = "stilla"

	-- load the most important parts of the theme
	local editor = stilla.loadEditor()
	local syntax = stilla.loadSyntax()
	local treesitter = stilla.loadTreeSitter()

	-- load editor highlights
	for group, colors in pairs(editor) do
		util.highlight(group, colors)
	end

	-- load syntax highlights
	for group, colors in pairs(syntax) do
		util.highlight(group, colors)
	end

	-- loop trough the treesitter table and highlight every member
	for group, colors in pairs(treesitter) do
		util.highlight(group, colors)
	end

	stilla.loadTerminal()

	-- imort tables for plugins and lsp
	local plugins = stilla.loadPlugins()
	local lsp = stilla.loadLSP()

	-- loop trough the plugins table and highlight every member
	for group, colors in pairs(plugins) do
		util.highlight(group, colors)
	end

	-- loop trough the lsp table and highlight every member
	for group, colors in pairs(lsp) do
		util.highlight(group, colors)
	end

	-- if contrast is enabled, apply it to sidebars and floating windows
	-- if vim.g.stilla_contrast == true then
	util.contrast()
	-- end
end

return util
