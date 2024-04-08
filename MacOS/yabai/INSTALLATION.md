# Installation

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
