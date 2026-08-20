return {
    "neovim/nvim-lspconfig",

    config = function()
        vim.lsp.config("clangd", {})
        vim.lsp.enable("clangd")

        vim.lsp.config("glsl_analyzer", {})
        vim.lsp.enable("glsl_analyzer")

        vim.lsp.config("neocmake", {})
        vim.lsp.enable("neocmake")
    end
}
