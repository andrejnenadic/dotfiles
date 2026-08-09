vim.keymap.set({"n", "v"}, "<leader>f", function()
    require("conform").format({
        lsp_fallback = true,
        async = false,
        timeout_ms = 500
    })
end, {
    desc = "Format file or range (in visual mode)"
})

return {{
    'stevearc/conform.nvim',
    opts = {
        formatters_by_ft = {
            c = {"clang-format"}
        },
        default_format_opts = {
            lsp_format = "fallback"
        }
    }
}}

