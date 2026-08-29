vim.keymap.set({ "n", "v" }, "<leader>fd", function()
	require("conform").format({
		lsp_fallback = true,
		async = false,
		timeout_ms = 500,
	})
end, {
	desc = "Format file or range (in visual mode)",
})

return {
	{
		"stevearc/conform.nvim",
		opts = {
			formatters_by_ft = {
				c = { "clang-format" },
				typescript = { "prettierd" },
				typescriptreact = { "prettierd" },
				javascript = { "prettierd" },
				javascriptreact = { "prettierd" },
				json = { "prettierd" },
			},
			default_format_opts = {
				lsp_format = "fallback",
				timeout_ms = 5000,
			},
		},
	},
}
