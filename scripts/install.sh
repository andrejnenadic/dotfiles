# ags
echo "Setting up ags..."

cd /tmp
git clone https://github.com/aylur/astal.git

sudo pacman --needed -S meson vala valadoc wireplumber gobject-introspection glib2 glib2-devel json-glib gobject-introspection

cd astal/lib/wireplumber
meson setup build --prefix /usr
meson install -C build

cd ../hyprland
meson setup build --prefix /usr
meson install -C build

cd ../battery
meson setup build --prefix /usr
meson install -C build

cd /tmp
rm -rf astal

# nvim lsp servers
echo "Installing nvim lsp servers..."

sudo pacman --needed -S clang
cargo install neocmakelsp
cargo install stylua
sudo npm install -g typescript@latest vscode-langservers-extracted@latest @tailwindcss/language-server@latest

echo "The following servers were not installed automatically and need to be installed manually:"
echo "glsl_analyzer"
