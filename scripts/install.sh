cd /tmp
git clone https://github.com/aylur/astal.git

# ags wireplumber
sudo pacman --needed -S meson vala valadoc wireplumber gobject-introspection glib2 glib2-devel
cd astal/lib/wireplumber
meson setup build
meson install -C build
