langs = {
	"c",
	"cmake",
	"glsl",
	"lua",
	"html",
	"css",
	"javascript",
	"jsx",
	"typescript",
	"tsx",
	"json",
}

require("nvim-treesitter").install(langs)

vim.api.nvim_create_autocmd("FileType", {
	pattern = langs,
	callback = function()
		vim.treesitter.start()

		vim.wo[0][0].foldexpr = "v:lua.vim.treesitter.foldexpr()"
		vim.wo[0][0].foldmethod = "expr"

		vim.wo[0][0].foldlevel = 99 -- Start with all folds open
	end,
})
