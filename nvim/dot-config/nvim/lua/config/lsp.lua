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
vim.lsp.enable("tsc")
vim.lsp.enable("cssls")
vim.lsp.enable("tailwindcss")
