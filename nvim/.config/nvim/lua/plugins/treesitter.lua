return {{
    'nvim-treesitter/nvim-treesitter',
    build = ':TSUpdate',

    opts = {
        ensure_installed = {"c", "cpp", "lua", "glsl", "cmake"}
    }
}}
