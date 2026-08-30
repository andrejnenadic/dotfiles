#!/bin/bash

stow -vR --dotfiles -t ~ bin
stow -vR --dotfiles -t ~ wallpapers
stow -vR --dotfiles -t ~ hypr
stow -vR --dotfiles -t ~ kitty
stow -vR --dotfiles -t ~ rofi
stow -vR --dotfiles -t ~ nvim

read -p "Do you want to configure keyd (requires root)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo stow -t / keyd
    sudo keyd reload
fi
