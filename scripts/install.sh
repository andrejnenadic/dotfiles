#!/bin/bash

read -p "Do you want keyd configured (requires root)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo stow -t / keyd
fi
