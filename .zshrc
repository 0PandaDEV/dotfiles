clear

source ~/.config/zsh/arch.zsh-theme

echo "\e[38;2;255;93;0m██████╗  █████╗ ███╗   ██╗██████╗  █████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝██║   ██║
██████╔╝███████║██╔██╗ ██║██║  ██║███████║██║  ██║█████╗  ██║   ██║
██╔═══╝ ██╔══██║██║╚██╗██║██║  ██║██╔══██║██║  ██║██╔══╝  ╚██╗ ██╔╝
██║     ██║  ██║██║ ╚████║██████╔╝██║  ██║██████╔╝███████╗ ╚████╔╝ 
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝\n"

fastfetch

echo "\n"

######################################################################################

export ZSH="$HOME/.oh-my-zsh"
plugins=(git zsh-autosuggestions fast-syntax-highlighting)
source $ZSH/oh-my-zsh.sh

source ~/.config/zsh/aliases.zsh

######################################################################################

export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"

export GPG_TTY=$(tty)
eval "$(zoxide init --cmd cd zsh)"

if [[ -z "$SSH_CONNECTION" && -z "$DISPLAY" && "$(tty)" == /dev/tty1 ]]; then
  if uwsm check may-start; then
    exec uwsm start hyprland.desktop
  fi
fi

[ -s "/home/pandadev/.bun/_bun" ] && source "/home/pandadev/.bun/_bun"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

if [[ "$ARGV0" == "/opt/cursor-bin/cursor-bin.AppImage" ]]; then
  unset ARGV0
fi
