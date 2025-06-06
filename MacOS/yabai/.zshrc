source ~/.config/zsh/aditya.zsh-theme

COLOR='\e[38;2;255;93;0m'
RESET='\e[0m'
current_datetime=$(date '+%Y-%m-%d %H:%M:%S')

title="${COLOR}

██████╗  █████╗ ███╗   ██╗██████╗  █████╗ ███╗   ███╗ █████╗  ██████╗
██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔════╝
██████╔╝███████║██╔██╗ ██║██║  ██║███████║██╔████╔██║███████║██║     
██╔═══╝ ██╔══██║██║╚██╗██║██║  ██║██╔══██║██║╚██╔╝██║██╔══██║██║     
██║     ██║  ██║██║ ╚████║██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║╚██████╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ 

                        $current_datetime\n		
  ${RESET}========================= System Info =========================\n"

echo $title

neofetch

################################

# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

export ZSH="$HOME/.oh-my-zsh"

plugins=(git zsh-autosuggestions fast-syntax-highlighting)
source $ZSH/oh-my-zsh.sh

################################

alias python=python3

export PNPM_HOME="/Users/pandadev/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

export PATH=$PATH:/Users/pandadev/.spicetify

[ -s "/Users/pandadev/.bun/_bun" ] && source "/Users/pandadev/.bun/_bun"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

export PATH="/Users/pandadev/Library/Application Support/fnm:$PATH"
eval "`fnm env`"

alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"

export GPG_TTY=$(tty)
export PATH="$PATH:$HOME/.local/bin"
