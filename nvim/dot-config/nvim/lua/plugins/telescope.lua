local telescope = require("telescope.builtin")
vim.keymap.set("n", "<leader>ff", telescope.find_files, {
    desc = "Telescope find files"
})
vim.keymap.set("n", "<leader>fg", telescope.live_grep, {
    desc = "Telescope live grep"
})

return {{
    'nvim-telescope/telescope.nvim',
    version = '*',
    dependencies = {'nvim-lua/plenary.nvim', {
        'nvim-telescope/telescope-fzf-native.nvim',
        build = 'make'
    }}
}}
