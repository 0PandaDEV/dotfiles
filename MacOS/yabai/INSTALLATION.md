# Installation

```zsh
# ohmyzsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```zsh
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```zsh
# fast-syntax-highlighting
git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting
```

```zsh
# install sketchybar
brew tap FelixKratz/formulae
brew install sketchybar

mkdir -p ~/.config/sketchybar/plugins
cp $(brew --prefix)/share/sketchybar/examples/sketchybarrc ~/.config/sketchybar/sketchybarrc
cp -r $(brew --prefix)/share/sketchybar/examples/plugins/ ~/.config/sketchybar/plugins/

brew services start sketchybar
```

```zsh
# install yabai
brew install koekeishiya/formulae/yabai
yabai --start-service
```

```zsh
# install skhd
brew install koekeishiya/formulae/skhd
skhd --start-service
```

Generator for ascii art
<https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow>
