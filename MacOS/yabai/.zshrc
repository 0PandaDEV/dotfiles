source ~/.zsh/aditya.zsh-theme
source ~/.zsh/dow.sh

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

export PF_ASCII="openbsd"

export PF_INFO="ascii os host kernel uptime pkgs memory palette"
export PF_ALIGN="8"
export PF_COL1=3
export PF_COL3=3
export PF_COL2=7

# pfetch
neofetch

################################

# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

export ZSH="$HOME/.oh-my-zsh"
# ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(git zsh-autosuggestions fast-syntax-highlighting zsh-syntax-highlighting)
source $ZSH/oh-my-zsh.sh

################################

alias python=python3
alias panda-01="ssh pandadev@100.86.67.57"
alias panda-02="ssh pandadev@100.108.185.2"
alias pandadev="ssh pandadev@100.81.202.94"

export PNPM_HOME="/Users/pandadev/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

export PATH=$PATH:/Users/pandadev/.spicetify

# bun completions
[ -s "/Users/pandadev/.bun/_bun" ] && source "/Users/pandadev/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
# fnm
export PATH="/Users/pandadev/Library/Application Support/fnm:$PATH"
eval "`fnm env`"

alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

export GPG_TTY=$(tty)

export PATH="$PATH:$HOME/.local/bin"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# CodeWhisperer post block. Keep at the bottom of this file.
[[ -f "${HOME}/Library/Application Support/codewhisperer/shell/zshrc.post.zsh" ]] && builtin source "${HOME}/Library/Application Support/codewhisperer/shell/zshrc.post.zsh"

if [[ "$USER" == "root" ]]; then
  PROMPT="%(?:%{$fg_bold[red]%}%{$fg_bold[yellow]%}%{$fg_bold[red]%} :%{$fg_bold[red]%} )"
  PROMPT+='%{$fg[cyan]%}  %c%{$reset_color%} $(git_prompt_info)'
else
  PROMPT="%(?:%{$fg_bold[red]%}%{$fg_bold[green]%}%{$fg_bold[yellow]%} :%{$fg_bold[red]%} )"
  PROMPT+='%{$fg[cyan]%}  %c%{$reset_color%} $(git_prompt_info)'
fi

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}  git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
