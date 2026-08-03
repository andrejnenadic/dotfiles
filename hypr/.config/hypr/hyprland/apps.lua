return {
    terminal = 'kitty',
    codeEditor = 'code --password-store="kwallet5"',
    menu = 'rofi -show drun',
    clipboardHistory = 'cliphist list | rofi -dmenu | cliphist decode | wl-copy',
    colorPicker = 'hyprpicker | wl-copy',
    browser = 'zen-browser',
    browserPrivate = 'zen-browser -private-window',
    regionScreenshot = 'hyprshot -m region',
    lockScreen = 'hyprlock',
    ocr = 'ocr'
}
