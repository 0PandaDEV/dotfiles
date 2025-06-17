PROMPT='%{$reset_color%} %{$reset_color%}'
PROMPT+='%{$fg[cyan]%}%c %{$reset_color%} $(git_prompt_info) %{$FG[011]%}λ %{$reset_color%}'

ZSH_THEME_GIT_PROMPT_PREFIX='%{$fg_bold[blue]%}  git:(%{$fg[red]%} '
ZSH_THEME_GIT_PROMPT_SUFFIX='%{$reset_color%}'
ZSH_THEME_GIT_PROMPT_DIRTY='%{$fg[blue]%}) %{$fg[yellow]%}✗'
ZSH_THEME_GIT_PROMPT_CLEAN='%{$fg[blue]%})'
