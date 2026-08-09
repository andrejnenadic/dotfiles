require("config.lazy")

vim.opt.expandtab = true
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2

vim.g.mapleader = " "

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.cursorline = true
vim.opt.wrap = false

vim.api.nvim_create_autocmd('FileType', {
    pattern = {'c'},
    callback = function()
        vim.treesitter.start()
    end
})

require("oil").setup()
vim.keymap.set("n", "-", "<CMD>Oil<CR>")

vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float)
vim.keymap.set("n", "[d", vim.diagnostic.goto_prev)
vim.keymap.set("n", "]d", vim.diagnostic.goto_next)
