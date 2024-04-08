clear

source ~/.config/zsh/aditya.zsh-theme

COLOR='\e[38;2;255;93;0m'
RESET='\e[0m'
current_datetime=$(date '+%Y-%m-%d %H:%M:%S')

title="${COLOR}

██████╗  █████╗ ███╗   ██╗██████╗  █████╗        ██████╗  ██╗
██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔══██╗      ██╔═████╗███║
██████╔╝███████║██╔██╗ ██║██║  ██║███████║█████╗██║██╔██║╚██║
██╔═══╝ ██╔══██║██║╚██╗██║██║  ██║██╔══██║╚════╝████╔╝██║ ██║
██║     ██║  ██║██║ ╚████║██████╔╝██║  ██║      ╚██████╔╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝       ╚═════╝  ╚═╝ 

                    $current_datetime\n		
  ${RESET}===================== System Info =====================\n"

echo $title

export PF_ASCII="openbsd"

export PF_INFO="ascii os host kernel uptime pkgs memory palette"
export PF_ALIGN="8"
export PF_COL1=3
export PF_COL3=3
export PF_COL2=7

# pfetch
neofetch

######################################################################################

export ZSH="$HOME/.oh-my-zsh"
# ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions fast-syntax-highlighting)
source $ZSH/oh-my-zsh.sh

######################

alias python=python3
alias ls="eza -lh"
alias btop="btop --utf-force"

export PATH="$HOME/.local/bin:$PATH"
export GPG_TTY=$(tty)
eval "$(zoxide init --cmd cd zsh)"
eval "$(atuin init zsh)"
