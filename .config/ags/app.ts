import { App } from "astal/gtk3";
import style from "./styles/main.scss";
import Bar from "./widget/bar/Bar";
import Launcher, { LauncherWindowName } from "./widget/launcher/Launcher";
import { toggleWindow } from "./utils/windows";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);

    Launcher();
  },
  requestHandler(request: string, res: (response: any) => void) {
    if (request === "launcher") {
      toggleWindow(LauncherWindowName);
      res("app launcher toggled");
    }
  },
});
