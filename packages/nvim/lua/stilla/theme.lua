local stilla = require("stilla.colors")

local theme = {}

theme.loadSyntax = function()
	-- Syntax highlight groups
	local syntax = {
		Type = { fg = stilla.stilla9_gui }, -- int, long, char, etc.
		StorageClass = { fg = stilla.stilla9_gui }, -- static, register, volatile, etc.
		Structure = { fg = stilla.stilla9_gui }, -- struct, union, enum, etc.
		Constant = { fg = stilla.stilla4_gui }, -- any constant
		Character = { fg = stilla.stilla14_gui }, -- any character constant: 'c', '\n'
		Number = { fg = stilla.stilla15_gui }, -- a number constant: 5
		Boolean = { fg = stilla.stilla9_gui }, -- a boolean constant: TRUE, false
		Float = { fg = stilla.stilla15_gui }, -- a floating point constant: 2.3e10
		Statement = { fg = stilla.stilla9_gui }, -- any statement
		Label = { fg = stilla.stilla9_gui }, -- case, default, etc.
		Operator = { fg = stilla.stilla9_gui }, -- sizeof", "+", "*", etc.
		Exception = { fg = stilla.stilla9_gui }, -- try, catch, throw
		PreProc = { fg = stilla.stilla9_gui }, -- generic Preprocessor
		Include = { fg = stilla.stilla9_gui }, -- preprocessor #include
		Define = { fg = stilla.stilla9_gui }, -- preprocessor #define
		Macro = { fg = stilla.stilla9_gui }, -- same as Define
		Typedef = { fg = stilla.stilla9_gui }, -- A typedef
		PreCondit = { fg = stilla.stilla13_gui }, -- preprocessor #if, #else, #endif, etc.
		Special = { fg = stilla.stilla4_gui }, -- any special symbol
		SpecialChar = { fg = stilla.stilla13_gui }, -- special character in a constant
		Tag = { fg = stilla.stilla4_gui }, -- you can use CTRL-] on this
		Delimiter = { fg = stilla.stilla6_gui }, -- character that needs attention like , or .
		SpecialComment = { fg = stilla.stilla8_gui }, -- special things inside a comment
		Debug = { fg = stilla.stilla11_gui }, -- debugging statements
		Underlined = { fg = stilla.stilla14_gui, bg = stilla.none, style = "underline" }, -- text that stands out, HTML links
		Ignore = { fg = stilla.stilla1_gui }, -- left blank, hidden
		Error = { fg = stilla.stilla11_gui, bg = stilla.none, style = "bold,underline" }, -- any erroneous construct
		Todo = { fg = stilla.stilla13_gui, bg = stilla.none, style = "bold,italic" }, -- anything that needs extra attention; mostly the keywords TODO FIXME and XXX
		Conceal = { fg = stilla.none, bg = stilla.stilla0_gui },

		htmlLink = { fg = stilla.stilla14_gui, style = "underline" },
		htmlH1 = { fg = stilla.stilla8_gui, style = "bold" },
		htmlH2 = { fg = stilla.stilla11_gui, style = "bold" },
		htmlH3 = { fg = stilla.stilla14_gui, style = "bold" },
		htmlH4 = { fg = stilla.stilla15_gui, style = "bold" },
		htmlH5 = { fg = stilla.stilla9_gui, style = "bold" },
		markdownH1 = { fg = stilla.stilla8_gui, style = "bold" },
		markdownH2 = { fg = stilla.stilla11_gui, style = "bold" },
		markdownH3 = { fg = stilla.stilla14_gui, style = "bold" },
		markdownH1Delimiter = { fg = stilla.stilla8_gui },
		markdownH2Delimiter = { fg = stilla.stilla11_gui },
		markdownH3Delimiter = { fg = stilla.stilla14_gui },
	}

	-- Italic comments
	if vim.g.stilla_italic == false then
		syntax.Comment = { fg = stilla.stilla3_gui_bright } -- normal comments
		syntax.Conditional = { fg = stilla.stilla9_gui } -- normal if, then, else, endif, switch, etc.
		syntax.Function = { fg = stilla.stilla8_gui } -- normal function names
		syntax.Identifier = { fg = stilla.stilla9_gui } -- any variable name
		syntax.Keyword = { fg = stilla.stilla9_gui } -- normal for, do, while, etc.
		syntax.Repeat = { fg = stilla.stilla9_gui } -- normal any other keyword
		syntax.String = { fg = stilla.stilla14_gui } -- any string
	else
		syntax.Comment = { fg = stilla.stilla3_gui_bright, bg = stilla.none, style = "italic" } -- italic comments
		syntax.Conditional = { fg = stilla.stilla9_gui, bg = stilla.none, style = "italic" } -- italic if, then, else, endif, switch, etc.
		syntax.Function = { fg = stilla.stilla8_gui, bg = stilla.none, style = "italic" } -- italic funtion names
		syntax.Identifier = { fg = stilla.stilla9_gui, bg = stilla.none, style = "italic" } -- any variable name
		syntax.Keyword = { fg = stilla.stilla9_gui, bg = stilla.none, style = "italic" } -- italic for, do, while, etc.
		syntax.Repeat = { fg = stilla.stilla9_gui, bg = stilla.none, style = "italic" } -- italic any other keyword
		syntax.String = { fg = stilla.stilla14_gui, bg = stilla.none, style = "italic" } -- any string
	end

	return syntax
end

theme.loadEditor = function()
	-- Editor highlight groups

	local editor = {
		NormalFloat = { fg = stilla.stilla4_gui, bg = stilla.float }, -- normal text and background color
		FloatBorder = { fg = stilla.stilla4_gui, bg = stilla.float }, -- normal text and background color
		ColorColumn = { fg = stilla.none, bg = stilla.stilla1_gui }, --  used for the columns set with 'colorcolumn'
		Conceal = { fg = stilla.stilla1_gui }, -- placeholder characters substituted for concealed text (see 'conceallevel')
		Cursor = { fg = stilla.stilla4_gui, bg = stilla.none, style = "reverse" }, -- the character under the cursor
		CursorIM = { fg = stilla.stilla5_gui, bg = stilla.none, style = "reverse" }, -- like Cursor, but used when in IME mode
		Directory = { fg = stilla.stilla7_gui, bg = stilla.none }, -- directory names (and other special names in listings)
		DiffAdd = { fg = stilla.stilla14_gui, bg = stilla.none, style = "reverse" }, -- diff mode: Added line
		DiffChange = { fg = stilla.stilla13_gui, bg = stilla.none, style = "reverse" }, --  diff mode: Changed line
		DiffDelete = { fg = stilla.stilla11_gui, bg = stilla.none, style = "reverse" }, -- diff mode: Deleted line
		DiffText = { fg = stilla.stilla15_gui, bg = stilla.none, style = "reverse" }, -- diff mode: Changed text within a changed line
		EndOfBuffer = { fg = stilla.stilla1_gui },
		ErrorMsg = { fg = stilla.none },
		Folded = { fg = stilla.stilla3_gui_bright, bg = stilla.none, style = "italic" },
		FoldColumn = { fg = stilla.stilla7_gui },
		IncSearch = { fg = stilla.stilla6_gui, bg = stilla.stilla10_gui },
		LineNr = { fg = stilla.stilla3_gui_bright },
		CursorLineNr = { fg = stilla.stilla4_gui },
		MatchParen = { fg = stilla.stilla15_gui, bg = stilla.none, style = "bold" },
		ModeMsg = { fg = stilla.stilla4_gui },
		MoreMsg = { fg = stilla.stilla4_gui },
		NonText = { fg = stilla.stilla1_gui },
		Pmenu = { fg = stilla.stilla4_gui, bg = stilla.stilla2_gui },
		PmenuSel = { fg = stilla.stilla4_gui, bg = stilla.stilla10_gui },
		PmenuSbar = { fg = stilla.stilla4_gui, bg = stilla.stilla2_gui },
		PmenuThumb = { fg = stilla.stilla4_gui, bg = stilla.stilla4_gui },
		Question = { fg = stilla.stilla14_gui },
		QuickFixLine = { fg = stilla.stilla4_gui, bg = stilla.none, style = "reverse" },
		qfLineNr = { fg = stilla.stilla4_gui, bg = stilla.none, style = "reverse" },
		Search = { fg = stilla.stilla10_gui, bg = stilla.stilla6_gui, style = "reverse" },
		SpecialKey = { fg = stilla.stilla9_gui },
		SpellBad = { fg = stilla.stilla11_gui, bg = stilla.none, style = "italic,undercurl" },
		SpellCap = { fg = stilla.stilla7_gui, bg = stilla.none, style = "italic,undercurl" },
		SpellLocal = { fg = stilla.stilla8_gui, bg = stilla.none, style = "italic,undercurl" },
		SpellRare = { fg = stilla.stilla9_gui, bg = stilla.none, style = "italic,undercurl" },
		StatusLine = { fg = stilla.stilla4_gui, bg = stilla.stilla2_gui },
		StatusLineNC = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui },
		StatusLineTerm = { fg = stilla.stilla4_gui, bg = stilla.stilla2_gui },
		StatusLineTermNC = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui },
		TabLineFill = { fg = stilla.stilla4_gui, bg = stilla.none },
		TablineSel = { fg = stilla.stilla1_gui, bg = stilla.stilla9_gui },
		Tabline = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui },
		Title = { fg = stilla.stilla14_gui, bg = stilla.none, style = "bold" },
		Visual = { fg = stilla.none, bg = stilla.stilla2_gui },
		VisualNOS = { fg = stilla.none, bg = stilla.stilla2_gui },
		WarningMsg = { fg = stilla.stilla15_gui },
		WildMenu = { fg = stilla.stilla12_gui, bg = stilla.none, style = "bold" },
		CursorColumn = { fg = stilla.none, bg = stilla.cursorlinefg },
		CursorLine = { fg = stilla.none, bg = stilla.cursorlinefg },
		ToolbarLine = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui },
		ToolbarButton = { fg = stilla.stilla4_gui, bg = stilla.none, style = "bold" },
		NormalMode = { fg = stilla.stilla4_gui, bg = stilla.none, style = "reverse" },
		InsertMode = { fg = stilla.stilla14_gui, bg = stilla.none, style = "reverse" },
		ReplacelMode = { fg = stilla.stilla11_gui, bg = stilla.none, style = "reverse" },
		VisualMode = { fg = stilla.stilla9_gui, bg = stilla.none, style = "reverse" },
		CommandMode = { fg = stilla.stilla4_gui, bg = stilla.none, style = "reverse" },
		Warnings = { fg = stilla.stilla15_gui },

		healthError = { fg = stilla.stilla11_gui },
		healthSuccess = { fg = stilla.stilla14_gui },
		healthWarning = { fg = stilla.stilla15_gui },

		-- dashboard
		DashboardShortCut = { fg = stilla.stilla7_gui },
		DashboardHeader = { fg = stilla.stilla9_gui },
		DashboardCenter = { fg = stilla.stilla8_gui },
		DashboardFooter = { fg = stilla.stilla14_gui, style = "italic" },

		-- BufferLine
		BufferLineIndicatorSelected = { fg = stilla.stilla0_gui },
		BufferLineFill = { bg = stilla.stilla0_gui },
	}

	-- Options:

	--Set transparent background
	if vim.g.stilla_disable_background then
		editor.Normal = { fg = stilla.stilla4_gui, bg = stilla.none } -- normal text and background color
		editor.SignColumn = { fg = stilla.stilla4_gui, bg = stilla.none }
	else
		editor.Normal = { fg = stilla.stilla4_gui, bg = stilla.stilla0_gui } -- normal text and background color
		editor.SignColumn = { fg = stilla.stilla4_gui, bg = stilla.stilla0_gui }
	end

	-- Remove window split borders
	if vim.g.stilla_borders then
		editor.VertSplit = { fg = stilla.stilla2_gui }
	else
		editor.VertSplit = { fg = stilla.stilla0_gui }
	end

	return editor
end

theme.loadTerminal = function()
	vim.g.terminal_color_0 = stilla.stilla1_gui
	vim.g.terminal_color_1 = stilla.stilla11_gui
	vim.g.terminal_color_2 = stilla.stilla14_gui
	vim.g.terminal_color_3 = stilla.stilla13_gui
	vim.g.terminal_color_4 = stilla.stilla9_gui
	vim.g.terminal_color_5 = stilla.stilla15_gui
	vim.g.terminal_color_6 = stilla.stilla8_gui
	vim.g.terminal_color_7 = stilla.stilla5_gui
	vim.g.terminal_color_8 = stilla.stilla3_gui
	vim.g.terminal_color_9 = stilla.stilla11_gui
	vim.g.terminal_color_10 = stilla.stilla14_gui
	vim.g.terminal_color_11 = stilla.stilla13_gui
	vim.g.terminal_color_12 = stilla.stilla9_gui
	vim.g.terminal_color_13 = stilla.stilla15_gui
	vim.g.terminal_color_14 = stilla.stilla7_gui
	vim.g.terminal_color_15 = stilla.stilla6_gui
end

theme.loadTreeSitter = function()
	-- TreeSitter highlight groups

	local treesitter = {
		TSAnnotation = { fg = stilla.stilla12_gui }, -- For C++/Dart attributes, annotations thatcan be attached to the code to denote some kind of meta information.
		TSConstructor = { fg = stilla.stilla9_gui }, -- For constructor calls and definitions: `= { }` in Lua, and Java constructors.
		TSConstant = { fg = stilla.stilla13_gui }, -- For constants
		TSFloat = { fg = stilla.stilla15_gui }, -- For floats
		TSNumber = { fg = stilla.stilla15_gui }, -- For all number

		TSAttribute = { fg = stilla.stilla15_gui }, -- (unstable) TODO: docs
		TSVariable = { fg = stilla.stilla4_gui, style = "bold" }, -- Any variable name that does not have another highlight.
		TSVariableBuiltin = { fg = stilla.stilla4_gui, style = "bold" },
		TSBoolean = { fg = stilla.stilla9_gui, style = "bold" }, -- For booleans.
		TSConstBuiltin = { fg = stilla.stilla7_gui, style = "bold" }, -- For constant that are built in the language: `nil` in Lua.
		TSConstMacro = { fg = stilla.stilla7_gui, style = "bold" }, -- For constants that are defined by macros: `NULL` in C.
		TSError = { fg = stilla.stilla11_gui }, -- For syntax/parser errors.
		TSException = { fg = stilla.stilla15_gui }, -- For exception related keywords.
		TSFuncMacro = { fg = stilla.stilla7_gui }, -- For macro defined fuctions (calls and definitions): each `macro_rules` in Rust.
		TSInclude = { fg = stilla.stilla9_gui }, -- For includes: `#include` in C, `use` or `extern crate` in Rust, or `require` in Lua.
		TSLabel = { fg = stilla.stilla15_gui }, -- For labels: `label:` in C and `:label:` in Lua.
		TSOperator = { fg = stilla.stilla9_gui }, -- For any operator: `+`, but also `->` and `*` in C.
		TSParameter = { fg = stilla.stilla10_gui }, -- For parameters of a function.
		TSParameterReference = { fg = stilla.stilla10_gui }, -- For references to parameters of a function.
		TSPunctDelimiter = { fg = stilla.stilla8_gui }, -- For delimiters ie: `.`
		TSPunctBracket = { fg = stilla.stilla8_gui }, -- For brackets and parens.
		TSPunctSpecial = { fg = stilla.stilla8_gui }, -- For special punctutation that does not fall in the catagories before.
		TSSymbol = { fg = stilla.stilla15_gui }, -- For identifiers referring to symbols or atoms.
		TSType = { fg = stilla.stilla9_gui }, -- For types.
		TSTypeBuiltin = { fg = stilla.stilla9_gui }, -- For builtin types.
		TSTag = { fg = stilla.stilla4_gui }, -- Tags like html tag names.
		TSTagDelimiter = { fg = stilla.stilla15_gui }, -- Tag delimiter like `<` `>` `/`
		TSText = { fg = stilla.stilla4_gui }, -- For strings considestilla11_gui text in a markup language.
		TSTextReference = { fg = stilla.stilla15_gui }, -- FIXME
		TSEmphasis = { fg = stilla.stilla10_gui }, -- For text to be represented with emphasis.
		TSUnderline = { fg = stilla.stilla4_gui, bg = stilla.none, style = "underline" }, -- For text to be represented with an underline.
		TSTitle = { fg = stilla.stilla10_gui, bg = stilla.none, style = "bold" }, -- Text that is part of a title.
		TSLiteral = { fg = stilla.stilla4_gui }, -- Literal text.
		TSURI = { fg = stilla.stilla14_gui }, -- Any URI like a link or email.
		TSAnnotation = { fg = stilla.stilla11_gui }, -- For C++/Dart attributes, annotations that can be attached to the code to denote some kind of meta information.
	}

	if vim.g.stilla_italic == false then
		-- Comments
		treesitter.TSComment = { fg = stilla.stilla3_gui_bright }
		-- Conditionals
		treesitter.TSConditional = { fg = stilla.stilla9_gui } -- For keywords related to conditionnals.
		-- Function names
		treesitter.TSFunction = { fg = stilla.stilla8_gui } -- For fuction (calls and definitions).
		treesitter.TSMethod = { fg = stilla.stilla7_gui } -- For method calls and definitions.
		treesitter.TSFuncBuiltin = { fg = stilla.stilla8_gui }
		-- Namespaces and property accessors
		treesitter.TSNamespace = { fg = stilla.stilla4_gui } -- For identifiers referring to modules and namespaces.
		treesitter.TSField = { fg = stilla.stilla4_gui } -- For fields in literals
		treesitter.TSProperty = { fg = stilla.stilla10_gui } -- Same as `TSField`
		-- Language keywords
		treesitter.TSKeyword = { fg = stilla.stilla9_gui } -- For keywords that don't fall in other categories.
		treesitter.TSKeywordFunction = { fg = stilla.stilla8_gui }
		treesitter.TSKeywordReturn = { fg = stilla.stilla8_gui }
		treesitter.TSKeywordOperator = { fg = stilla.stilla8_gui }
		treesitter.TSRepeat = { fg = stilla.stilla9_gui } -- For keywords related to loops.
		-- Strings
		treesitter.TSString = { fg = stilla.stilla14_gui } -- For strings.
		treesitter.TSStringRegex = { fg = stilla.stilla7_gui } -- For regexes.
		treesitter.TSStringEscape = { fg = stilla.stilla15_gui } -- For escape characters within a string.
		treesitter.TSCharacter = { fg = stilla.stilla14_gui } -- For characters.
	else
		-- Comments
		treesitter.TSComment = { fg = stilla.stilla3_gui_bright, style = "italic" }
		-- Conditionals
		treesitter.TSConditional = { fg = stilla.stilla9_gui, style = "italic" } -- For keywords related to conditionnals.
		-- Function names
		treesitter.TSFunction = { fg = stilla.stilla8_gui, style = "italic" } -- For fuction (calls and definitions).
		treesitter.TSMethod = { fg = stilla.stilla7_gui, style = "italic" } -- For method calls and definitions.
		treesitter.TSFuncBuiltin = { fg = stilla.stilla8_gui, style = "italic" }
		-- Namespaces and property accessors
		treesitter.TSNamespace = { fg = stilla.stilla4_gui, style = "italic" } -- For identifiers referring to modules and namespaces.
		treesitter.TSField = { fg = stilla.stilla4_gui, style = "italic" } -- For fields.
		treesitter.TSProperty = { fg = stilla.stilla10_gui, style = "italic" } -- Same as `TSField`, but when accessing, not declaring.
		-- Language keywords
		treesitter.TSKeyword = { fg = stilla.stilla9_gui, style = "italic" } -- For keywords that don't fall in other categories.
		treesitter.TSKeywordFunction = { fg = stilla.stilla8_gui, style = "italic" }
		treesitter.TSKeywordReturn = { fg = stilla.stilla8_gui, style = "italic" }
		treesitter.TSKeywordOperator = { fg = stilla.stilla8_gui, style = "italic" }
		treesitter.TSRepeat = { fg = stilla.stilla9_gui, style = "italic" } -- For keywords related to loops.
		-- Strings
		treesitter.TSString = { fg = stilla.stilla14_gui, style = "italic" } -- For strings.
		treesitter.TSStringRegex = { fg = stilla.stilla7_gui, style = "italic" } -- For regexes.
		treesitter.TSStringEscape = { fg = stilla.stilla15_gui, style = "italic" } -- For escape characters within a string.
		treesitter.TSCharacter = { fg = stilla.stilla14_gui, style = "italic" } -- For characters.
	end

	return treesitter
end

theme.loadLSP = function()
	-- Lsp highlight groups

	local lsp = {
		LspDiagnosticsDefaultError = { fg = stilla.stilla11_gui }, -- used for "Error" diagnostic virtual text
		LspDiagnosticsSignError = { fg = stilla.stilla11_gui }, -- used for "Error" diagnostic signs in sign column
		LspDiagnosticsFloatingError = { fg = stilla.stilla11_gui }, -- used for "Error" diagnostic messages in the diagnostics float
		LspDiagnosticsVirtualTextError = { fg = stilla.stilla11_gui }, -- Virtual text "Error"
		LspDiagnosticsUnderlineError = { style = "undercurl", sp = stilla.stilla11_gui }, -- used to underline "Error" diagnostics.
		LspDiagnosticsDefaultWarning = { fg = stilla.stilla15_gui }, -- used for "Warning" diagnostic signs in sign column
		LspDiagnosticsSignWarning = { fg = stilla.stilla15_gui }, -- used for "Warning" diagnostic signs in sign column
		LspDiagnosticsFloatingWarning = { fg = stilla.stilla15_gui }, -- used for "Warning" diagnostic messages in the diagnostics float
		LspDiagnosticsVirtualTextWarning = { fg = stilla.stilla15_gui }, -- Virtual text "Warning"
		LspDiagnosticsUnderlineWarning = { style = "undercurl", sp = stilla.stilla15_gui }, -- used to underline "Warning" diagnostics.
		LspDiagnosticsDefaultInformation = { fg = stilla.stilla10_gui }, -- used for "Information" diagnostic virtual text
		LspDiagnosticsSignInformation = { fg = stilla.stilla10_gui }, -- used for "Information" diagnostic signs in sign column
		LspDiagnosticsFloatingInformation = { fg = stilla.stilla10_gui }, -- used for "Information" diagnostic messages in the diagnostics float
		LspDiagnosticsVirtualTextInformation = { fg = stilla.stilla10_gui }, -- Virtual text "Information"
		LspDiagnosticsUnderlineInformation = { style = "undercurl", sp = stilla.stilla10_gui }, -- used to underline "Information" diagnostics.
		LspDiagnosticsDefaultHint = { fg = stilla.stilla9_gui }, -- used for "Hint" diagnostic virtual text
		LspDiagnosticsSignHint = { fg = stilla.stilla9_gui }, -- used for "Hint" diagnostic signs in sign column
		LspDiagnosticsFloatingHint = { fg = stilla.stilla9_gui }, -- used for "Hint" diagnostic messages in the diagnostics float
		LspDiagnosticsVirtualTextHint = { fg = stilla.stilla9_gui }, -- Virtual text "Hint"
		LspDiagnosticsUnderlineHint = { style = "undercurl", sp = stilla.stilla10_gui }, -- used to underline "Hint" diagnostics.
		LspReferenceText = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui }, -- used for highlighting "text" references
		LspReferenceRead = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui }, -- used for highlighting "read" references
		LspReferenceWrite = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui }, -- used for highlighting "write" references

		DiagnosticError = { link = "LspDiagnosticsDefaultError" },
		DiagnosticWarn = { link = "LspDiagnosticsDefaultWarning" },
		DiagnosticInfo = { link = "LspDiagnosticsDefaultInformation" },
		DiagnosticHint = { link = "LspDiagnosticsDefaultHint" },
		DiagnosticVirtualTextWarn = { link = "LspDiagnosticsVirtualTextWarning" },
		DiagnosticUnderlineWarn = { link = "LspDiagnosticsUnderlineWarning" },
		DiagnosticFloatingWarn = { link = "LspDiagnosticsFloatingWarning" },
		DiagnosticSignWarn = { link = "LspDiagnosticsSignWarning" },
		DiagnosticVirtualTextError = { link = "LspDiagnosticsVirtualTextError" },
		DiagnosticUnderlineError = { link = "LspDiagnosticsUnderlineError" },
		DiagnosticFloatingError = { link = "LspDiagnosticsFloatingError" },
		DiagnosticSignError = { link = "LspDiagnosticsSignError" },
		DiagnosticVirtualTextInfo = { link = "LspDiagnosticsVirtualTextInformation" },
		DiagnosticUnderlineInfo = { link = "LspDiagnosticsUnderlineInformation" },
		DiagnosticFloatingInfo = { link = "LspDiagnosticsFloatingInformation" },
		DiagnosticSignInfo = { link = "LspDiagnosticsSignInformation" },
		DiagnosticVirtualTextHint = { link = "LspDiagnosticsVirtualTextHint" },
		DiagnosticUnderlineHint = { link = "LspDiagnosticsUnderlineHint" },
		DiagnosticFloatingHint = { link = "LspDiagnosticsFloatingHint" },
		DiagnosticSignHint = { link = "LspDiagnosticsSignHint" },
	}

	return lsp
end

theme.loadPlugins = function()
	-- Plugins highlight groups

	local plugins = {

		-- LspTrouble
		LspTroubleText = { fg = stilla.stilla4_gui },
		LspTroubleCount = { fg = stilla.stilla9_gui, bg = stilla.stilla10_gui },
		LspTroubleNormal = { fg = stilla.stilla4_gui, bg = stilla.sidebar },

		-- Diff
		diffAdded = { fg = stilla.stilla14_gui },
		diffRemoved = { fg = stilla.stilla11_gui },
		diffChanged = { fg = stilla.stilla15_gui },
		diffOldFile = { fg = stilla.yelow },
		diffNewFile = { fg = stilla.stilla12_gui },
		diffFile = { fg = stilla.stilla7_gui },
		diffLine = { fg = stilla.stilla3_gui },
		diffIndexLine = { fg = stilla.stilla9_gui },

		-- Neogit
		NeogitBranch = { fg = stilla.stilla10_gui },
		NeogitRemote = { fg = stilla.stilla9_gui },
		NeogitHunkHeader = { fg = stilla.stilla8_gui },
		NeogitHunkHeaderHighlight = { fg = stilla.stilla8_gui, bg = stilla.stilla1_gui },
		NeogitDiffContextHighlight = { bg = stilla.stilla1_gui },
		NeogitDiffDeleteHighlight = { fg = stilla.stilla11_gui, style = "reverse" },
		NeogitDiffAddHighlight = { fg = stilla.stilla14_gui, style = "reverse" },

		-- GitGutter
		GitGutterAdd = { fg = stilla.stilla14_gui }, -- diff mode: Added line |diff.txt|
		GitGutterChange = { fg = stilla.stilla15_gui }, -- diff mode: Changed line |diff.txt|
		GitGutterDelete = { fg = stilla.stilla11_gui }, -- diff mode: Deleted line |diff.txt|

		-- GitSigns
		GitSignsAdd = { fg = stilla.stilla14_gui }, -- diff mode: Added line |diff.txt|
		GitSignsAddNr = { fg = stilla.stilla14_gui }, -- diff mode: Added line |diff.txt|
		GitSignsAddLn = { fg = stilla.stilla14_gui }, -- diff mode: Added line |diff.txt|
		GitSignsChange = { fg = stilla.stilla15_gui }, -- diff mode: Changed line |diff.txt|
		GitSignsChangeNr = { fg = stilla.stilla15_gui }, -- diff mode: Changed line |diff.txt|
		GitSignsChangeLn = { fg = stilla.stilla15_gui }, -- diff mode: Changed line |diff.txt|
		GitSignsDelete = { fg = stilla.stilla11_gui }, -- diff mode: Deleted line |diff.txt|
		GitSignsDeleteNr = { fg = stilla.stilla11_gui }, -- diff mode: Deleted line |diff.txt|
		GitSignsDeleteLn = { fg = stilla.stilla11_gui }, -- diff mode: Deleted line |diff.txt|

		-- Telescope
		TelescopePromptBorder = { fg = stilla.stilla8_gui },
		TelescopeResultsBorder = { fg = stilla.stilla9_gui },
		TelescopePreviewBorder = { fg = stilla.stilla14_gui },
		TelescopeSelectionCaret = { fg = stilla.stilla9_gui },
		TelescopeSelection = { fg = stilla.stilla9_gui },
		TelescopeMatching = { fg = stilla.stilla8_gui },

		-- NvimTree
		NvimTreeRootFolder = { fg = stilla.stilla7_gui, style = "bold" },
		NvimTreeGitDirty = { fg = stilla.stilla15_gui },
		NvimTreeGitNew = { fg = stilla.stilla14_gui },
		NvimTreeImageFile = { fg = stilla.stilla15_gui },
		NvimTreeExecFile = { fg = stilla.stilla14_gui },
		NvimTreeSpecialFile = { fg = stilla.stilla9_gui, style = "underline" },
		NvimTreeFolderName = { fg = stilla.stilla10_gui },
		NvimTreeEmptyFolderName = { fg = stilla.stilla1_gui },
		NvimTreeFolderIcon = { fg = stilla.stilla4_gui },
		NvimTreeIndentMarker = { fg = stilla.stilla1_gui },
		LspDiagnosticsError = { fg = stilla.stilla11_gui },
		LspDiagnosticsWarning = { fg = stilla.stilla15_gui },
		LspDiagnosticsInformation = { fg = stilla.stilla10_gui },
		LspDiagnosticsHint = { fg = stilla.stilla9_gui },

		-- WhichKey
		WhichKey = { fg = stilla.stilla4_gui, style = "bold" },
		WhichKeyGroup = { fg = stilla.stilla4_gui },
		WhichKeyDesc = { fg = stilla.stilla7_gui, style = "italic" },
		WhichKeySeperator = { fg = stilla.stilla4_gui },
		WhichKeyFloating = { bg = stilla.float },
		WhichKeyFloat = { bg = stilla.float },

		-- LspSaga
		DiagnosticError = { fg = stilla.stilla11_gui },
		DiagnosticWarning = { fg = stilla.stilla15_gui },
		DiagnosticInformation = { fg = stilla.stilla10_gui },
		DiagnosticHint = { fg = stilla.stilla9_gui },
		DiagnosticTruncateLine = { fg = stilla.stilla4_gui },
		LspFloatWinNormal = { bg = stilla.stilla2_gui },
		LspFloatWinBorder = { fg = stilla.stilla9_gui },
		LspSagaBorderTitle = { fg = stilla.stilla8_gui },
		LspSagaHoverBorder = { fg = stilla.stilla10_gui },
		LspSagaRenameBorder = { fg = stilla.stilla14_gui },
		LspSagaDefPreviewBorder = { fg = stilla.stilla14_gui },
		LspSagaCodeActionBorder = { fg = stilla.stilla7_gui },
		LspSagaFinderSelection = { fg = stilla.stilla14_gui },
		LspSagaCodeActionTitle = { fg = stilla.stilla10_gui },
		LspSagaCodeActionContent = { fg = stilla.stilla9_gui },
		LspSagaSignatureHelpBorder = { fg = stilla.stilla13_gui },
		ReferencesCount = { fg = stilla.stilla9_gui },
		DefinitionCount = { fg = stilla.stilla9_gui },
		DefinitionIcon = { fg = stilla.stilla7_gui },
		ReferencesIcon = { fg = stilla.stilla7_gui },
		TargetWord = { fg = stilla.stilla8_gui },

		-- Sneak
		Sneak = { fg = stilla.stilla0_gui, bg = stilla.stilla4_gui },
		SneakScope = { bg = stilla.stilla1_gui },

		-- Cmp
		CmpItemKind = { fg = stilla.stilla15_gui },
		CmpItemAbbrMatch = { fg = stilla.stilla5_gui, style = "bold" },
		CmpItemAbbrMatchFuzzy = { fg = stilla.stilla5_gui, style = "bold" },
		CmpItemAbbr = { fg = stilla.stilla4_gui },
		CmpItemMenu = { fg = stilla.stilla14_gui },

		-- Indent Blankline
		IndentBlanklineChar = { fg = stilla.stilla3_gui },
		IndentBlanklineContextChar = { fg = stilla.stilla10_gui },

		-- Illuminate
		illuminatedWord = { bg = stilla.stilla3_gui },
		illuminatedCurWord = { bg = stilla.stilla3_gui },

		-- nvim-dap
		DapBreakpoint = { fg = stilla.stilla14_gui },
		DapStopped = { fg = stilla.stilla15_gui },

		-- Hop
		HopNextKey = { fg = stilla.stilla4_gui, style = "bold" },
		HopNextKey1 = { fg = stilla.stilla8_gui, style = "bold" },
		HopNextKey2 = { fg = stilla.stilla4_gui },
		HopUnmatched = { fg = stilla.stilla3_gui },

		-- Fern
		FernBranchText = { fg = stilla.stilla3_gui_bright },

		-- nvim-ts-rainbow
		rainbowcol1 = { fg = stilla.stilla15_gui },
		rainbowcol2 = { fg = stilla.stilla13_gui },
		rainbowcol3 = { fg = stilla.stilla11_gui },
		rainbowcol4 = { fg = stilla.stilla7_gui },
		rainbowcol5 = { fg = stilla.stilla8_gui },
		rainbowcol6 = { fg = stilla.stilla15_gui },
		rainbowcol7 = { fg = stilla.stilla13_gui },

		-- lightspeed
		LightspeedLabel = { fg = stilla.stilla8_gui, style = "bold" },
		LightspeedLabelOverlapped = { fg = stilla.stilla8_gui, style = "bold,underline" },
		LightspeedLabelDistant = { fg = stilla.stilla15_gui, style = "bold" },
		LightspeedLabelDistantOverlapped = { fg = stilla.stilla15_gui, style = "bold,underline" },
		LightspeedShortcut = { fg = stilla.stilla10_gui, style = "bold" },
		LightspeedShortcutOverlapped = { fg = stilla.stilla10_gui, style = "bold,underline" },
		LightspeedMaskedChar = { fg = stilla.stilla4_gui, bg = stilla.stilla2_gui, style = "bold" },
		LightspeedGreyWash = { fg = stilla.stilla3_gui_bright },
		LightspeedUnlabeledMatch = { fg = stilla.stilla4_gui, bg = stilla.stilla1_gui },
		LightspeedOneCharMatch = { fg = stilla.stilla8_gui, style = "bold,reverse" },
		LightspeedUniqueChar = { style = "bold,underline" },

		-- copilot
		CopilotLabel = { fg = stilla.stilla3_gui, bg = stilla.none },

		-- Statusline
		StatusLineDull = { fg = stilla.stilla3_gui, bg = stilla.stilla1_gui },
		StatusLineAccent = { fg = stilla.stilla0_gui, bg = stilla.stilla13_gui },
	}
	-- Options:

	-- Disable nvim-tree background
	if vim.g.stilla_disable_background then
		plugins.NvimTreeNormal = { fg = stilla.stilla4_gui, bg = stilla.none }
	else
		plugins.NvimTreeNormal = { fg = stilla.stilla4_gui, bg = stilla.sidebar }
	end

	if vim.g.stilla_enable_sidebar_background then
		plugins.NvimTreeNormal = { fg = stilla.stilla4_gui, bg = stilla.sidebar }
	else
		plugins.NvimTreeNormal = { fg = stilla.stilla4_gui, bg = stilla.none }
	end

	return plugins
end

return theme
