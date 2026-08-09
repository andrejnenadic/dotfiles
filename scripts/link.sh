#!/bin/bash

stow -vR -t ~ bin
stow -vR -t ~ wallpapers
stow -vR -t ~ hypr
stow -vR -t ~ kitty
stow -vR -t ~ rofi
stow -vR -t ~ nvim

read -p "Do you want to configure keyd (requires root)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo stow -t / keyd
    sudo keyd reload
fi
