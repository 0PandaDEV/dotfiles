import { Astal, Gtk, Gdk } from "astal/gtk3";
import SysTray from "./SysTray";
import Media from "./Media";
import Workspaces from "./Workspaces";
import Time from "./Time";
import CurrentWindow from "./CurrentWindow";
import SysStats from "./SysStats";

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      margin={10}
      marginBottom={0}
      child={
        <centerbox>
          <box
            halign={Gtk.Align.START}
            spacing={4}
            children={[
              <Workspaces monitor={monitor} />,
              <CurrentWindow monitor={monitor} />,
            ]}
          />
          <box
            halign={Gtk.Align.CENTER}
            spacing={4}
            children={[
              <SysStats />,
              <Media />,
              <Time format="%-I:%M:%S ⬝ %a, %d %b" />,
            ]}
          />
          <box halign={Gtk.Align.END} spacing={4} children={[<SysTray />]} />
        </centerbox>
      }
    />
  );
}
