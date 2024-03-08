# Dotfiles
I use Arch btw

## Commands
```zsh
# ohmyzsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
```zsh
# powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
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
# pfetch
git clone https://github.com/Un1q32/pfetch
sudo apt install make
cd pfetch/
sudo make install
cd ..
rm -rf pfetch
```

## Links
Generator for ascii art
https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow
