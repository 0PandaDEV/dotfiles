clear

source ~/.config/zsh/aditya.zsh-theme

COLOR='\e[38;2;255;93;0m'
RESET='\e[0m'
current_datetime=$(date '+%Y-%m-%d %H:%M:%S')

title="${COLOR}██████╗  █████╗ ███╗   ██╗██████╗  █████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝██║   ██║
██████╔╝███████║██╔██╗ ██║██║  ██║███████║██║  ██║█████╗  ██║   ██║
██╔═══╝ ██╔══██║██║╚██╗██║██║  ██║██╔══██║██║  ██║██╔══╝  ╚██╗ ██╔╝
██║     ██║  ██║██║ ╚████║██████╔╝██║  ██║██████╔╝███████╗ ╚████╔╝ 
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝  

                       $current_datetime\n		
  ${RESET}======================== System Info ========================\n"

echo $title

export PF_ASCII="openbsd"

export PF_INFO="ascii os host kernel uptime pkgs memory palette"
export PF_ALIGN="8"
export PF_COL1=3
export PF_COL3=3
export PF_COL2=7

neofetch

######################################################################################

export ZSH="$HOME/.oh-my-zsh"
plugins=(git zsh-autosuggestions fast-syntax-highlighting)
source $ZSH/oh-my-zsh.sh
source ~/.config/zsh/aliases.zsh

######################################################################################

export PATH="$HOME/.local/bin:$PATH"
export GPG_TTY=$(tty)
eval "$(zoxide init --cmd cd zsh)"

if [[ -z "$SSH_CONNECTION" && -z "$DISPLAY" && "$(tty)" == /dev/tty1 ]]; then
  if uwsm check may-start; then
    exec uwsm start hyprland.desktop
  fi
fi

# bun completions
[ -s "/home/pandadev/.bun/_bun" ] && source "/home/pandadev/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
