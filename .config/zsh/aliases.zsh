# SSH Aliases
alias 01="ssh 192.168.1.103"
alias 02="ssh 192.168.1.109"
alias 03="ssh 209.25.141.65"

# Faster movement
alias ..='cd ..'
alias .2='cd ../..'
alias .3='cd ../../..'
alias .4='cd ../../../..'
alias .5='cd ../../../../..'

# Package Managment
alias upd='yay -Syu --noconfirm --quiet'
alias inst='yay -S --noconfirm'
alias uninst='yay -Rns --noconfirm'
alias rem='sudo pacman -Rns $(pacman -Qq | fzf)'
alias cleanup='sudo pacman -Rns $(pacman -Qtdq)'

# Replacing ls with eza
alias ls='eza --icons=always --color=always --hyperlink --group-directories-first -la --no-time'
