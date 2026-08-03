hl.on("hyprland.start", function()
    hl.exec_cmd("hyprpaper")
    hl.exec_cmd("hypridle")
    hl.exec_cmd("eww daemon && eww open top-bar")
    hl.exec_cmd("playerctld daemon")
    hl.exec_cmd("wl-paste --type text --watch cliphist store ") -- for text history
    hl.exec_cmd("wl-paste --type image --watch cliphist store") -- for images history

    hl.exec_cmd("gsettings set org.gnome.desktop.interface cursor-theme BreezeX-RosePine-Linux")
    hl.exec_cmd("gsettings set org.gnome.desktop.interface cursor-size 28")
end)
