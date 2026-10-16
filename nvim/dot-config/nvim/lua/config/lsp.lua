-- navigation
vim.keymap.set("n", "K", vim.lsp.buf.hover)
vim.keymap.set("n", "gd", vim.lsp.buf.definition)
vim.keymap.set("n", "gr", vim.lsp.buf.references)
vim.keymap.set("n", "gi", vim.lsp.buf.implementation)

-- configs
vim.lsp.enable("clangd")
vim.lsp.enable("glsl_analyzer")
vim.lsp.enable("neocmake")
vim.lsp.enable("stylua")
vim.lsp.enable("cssls")
vim.lsp.enable("tailwindcss")
vim.lsp.enable("jdtls")

vim.lsp.config("phpantom_lsp", {
	root_markers = {
		"composer.json",
		".git",
	},
})
vim.lsp.enable("phpantom_lsp")

local vue_language_server_path = vim.fn.expand("~/.nvm/versions/node/v20.20.0/lib/node_modules/@vue/language-server")

local vue_plugin = {
	name = "@vue/typescript-plugin",
	location = vue_language_server_path,
	languages = { "vue" },
	configNamespace = "typescript",
}

vim.lsp.config("ts_ls", {
	init_options = {
		plugins = {
			vue_plugin,
		},
	},
	filetypes = {
		"typescript",
		"javascript",
		"javascriptreact",
		"typescriptreact",
		"vue",
	},
})

vim.lsp.enable("ts_ls")
