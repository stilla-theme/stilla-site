local colors = require("stilla.colors")

local stilla = {}

stilla.normal = {
	a = { fg = colors.stilla1_gui, bg = colors.stilla9_gui },
	b = { fg = colors.stilla5_gui, bg = colors.stilla2_gui },
	c = { fg = colors.stilla4_gui, bg = colors.stilla1_gui },
}

stilla.insert = {
	a = { fg = colors.stilla1_gui, bg = colors.stilla4_gui },
	b = { fg = colors.stilla6_gui, bg = colors.stilla3_gui_bright },
}

stilla.visual = {
	a = { fg = colors.stilla0_gui, bg = colors.stilla9_gui },
	b = { fg = colors.stilla4_gui, bg = colors.stilla10_gui },
}

stilla.replace = {
	a = { fg = colors.stilla0_gui, bg = colors.stilla11_gui },
	b = { fg = colors.stilla4_gui, bg = colors.stilla10_gui },
}

stilla.command = {
	a = { fg = colors.stilla0_gui, bg = colors.stilla15_gui, gui = "bold" },
	b = { fg = colors.stilla4_gui, bg = colors.stilla10_gui },
}

stilla.inactive = {
	a = { fg = colors.stilla4_gui, bg = colors.stilla0_gui, gui = "bold" },
	b = { fg = colors.stilla4_gui, bg = colors.stilla0_gui },
	c = { fg = colors.stilla4_gui, bg = colors.stilla1_gui },
}

return stilla
