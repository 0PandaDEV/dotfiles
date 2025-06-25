import { App, Astal } from "astal/gtk3";
import { LauncherWindowName } from "../widget/launcher/Launcher";
const openedOneOffWindows: Astal.Window[] = [];

export function toggleWindow(windowName: string) {
  const window = App.get_windows().find((window) => window.name === windowName);
  if (window !== undefined && !window.visible) {
    window.show();
  } else if (window?.visible) {
    window?.hide();
  }
}

export function hideAllWindows() {
  const windows = App.get_windows().filter((window) => {
    return window.name === LauncherWindowName;
  });
  windows.forEach((window) => {
    window.hide();
  });
  openedOneOffWindows.forEach((window) => {
    window.close();
  });
  openedOneOffWindows.length = 0;
}

export function registerWindow(window: Astal.Window) {
  openedOneOffWindows.push(window);
}
