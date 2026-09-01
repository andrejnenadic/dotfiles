local apps = require("hyprland/apps")

hl.bind("SUPER + Q", hl.dsp.exec_cmd(apps.terminal))
hl.bind("SUPER + B", hl.dsp.exec_cmd(apps.browser))
hl.bind("SUPER + SHIFT + B", hl.dsp.exec_cmd(apps.browserPrivate))

hl.bind("SUPER + SHIFT + L", hl.dsp.exec_cmd(apps.lockScreen))
hl.bind("SUPER + SHIFT + C", hl.dsp.exec_cmd(apps.colorPicker))
hl.bind("SUPER + SHIFT + S", hl.dsp.exec_cmd(apps.regionScreenshot))
hl.bind("SUPER + ALT + S", hl.dsp.exec_cmd(apps.ocr))

hl.bind("SUPER + SPACE", hl.dsp.exec_cmd(apps.menu))
hl.bind("SUPER + V", hl.dsp.exec_cmd(apps.clipboardHistory))

hl.bind("SUPER + W", hl.dsp.window.close())
hl.bind("SUPER + F", hl.dsp.window.fullscreen({
    action = "toggle"
}))
hl.bind("SUPER + SHIFT + F", hl.dsp.window.float({
    action = "toggle"
}))
hl.bind("SUPER + S", hl.dsp.layout("togglesplit"))
hl.bind("SUPER + E", hl.dsp.exec_cmd("ags request toggle-expanded"))

-- focus
hl.bind("SUPER + H", hl.dsp.focus({
    direction = "left"
}))
hl.bind("SUPER + L", hl.dsp.focus({
    direction = "right"
}))
hl.bind("SUPER + K", hl.dsp.focus({
    direction = "up"
}))
hl.bind("SUPER + J", hl.dsp.focus({
    direction = "down"
}))

-- switch workspaces
for i = 0, 5 do
    hl.bind("SUPER + " .. i, hl.dsp.focus({
        workspace = i
    }))
    hl.bind("SUPER + SHIFT + " .. i, hl.dsp.window.move({
        workspace = i
    }))

    hl.bind("SUPER + ALT + " .. i, hl.dsp.focus({
        workspace = i + 5
    }))
    hl.bind("SUPER + ALT + SHIFT + " .. i, hl.dsp.window.move({
        workspace = i + 5
    }))
end

hl.bind("SUPER + CTRL + L", hl.dsp.focus({
    workspace = "e+1"
}))
hl.bind("SUPER + CTRL + H", hl.dsp.focus({
    workspace = "e-1"
}))

-- move/resize windows
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), {
    mouse = true
})
hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), {
    mouse = true
})

-- media
hl.bind("XF86AudioRaiseVolume",
    hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ 0 && wpctl set-volume -l 1.4 @DEFAULT_AUDIO_SINK@ 2.5%+"))
hl.bind("XF86AudioLowerVolume",
    hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ 0 && wpctl set-volume -l 1.4 @DEFAULT_AUDIO_SINK@ 2.5%-"))
hl.bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"))
hl.bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"))

hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl set +5%"))
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("sh -c 'b=$(brightnessctl g); m=$(brightnessctl m); new=$((b - m / 20)); if [ $new -lt $((m / 20)) ]; then new=$((m / 20)); fi; brightnessctl set $new'"))

