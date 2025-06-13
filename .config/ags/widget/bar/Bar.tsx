import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import Mpris from "gi://AstalMpris";
import Tray from "gi://AstalTray";

function SysTray() {
  const tray = Tray.get_default();

  return (
    <box className="SysTray Widget">
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
            menuModel={bind(item, "menuModel")}>
            <icon gicon={bind(item, "gicon")} />
          </menubutton>
        ))
      )}
    </box>
  );
}

function Media() {
  const mpris = Mpris.get_default();

  return (
    <box className="Media Widget">
      {bind(mpris, "players").as((ps) =>
        ps[0] ? (
          <box>
            <box
              className="Cover"
              valign={Gtk.Align.CENTER}
              css={bind(ps[0], "coverArt").as(
                (cover) => `background-image: url('${cover}');`
              )}
            />
            <label
              label={bind(ps[0], "metadata").as(
                () => `${ps[0].title} - ${ps[0].artist}`
              )}
            />
          </box>
        ) : (
          <label label="Nothing Playing" />
        )
      )}
    </box>
  );
}

function Workspaces() {
  const hypr = Hyprland.get_default();
  const workspaceIds = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <box className="Workspaces Widget">
      {workspaceIds.map((id) => (
        <button
          key={id}
          className={`workspace-${id} ${bind(hypr, "focusedWorkspace").as((fw) =>
            fw?.id === id ? "focused" : ""
          )}`}
          onClicked={() => {
            const workspace = hypr.workspaces.find(ws => ws.id === id);
            if (workspace) workspace.focus();
          }}>
          <box className="workspace-indicator" />
        </button>
      ))}
    </box>
  );
}

function Time({ format }: { format: string }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!
  );

  return (
    <label
      className="Time Widget"
      onDestroy={() => time.drop()}
      label={time()}
    />
  );
}

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      margin={10}
      marginBottom={0}>
      <centerbox>
        <box halign={Gtk.Align.START}>
          <Workspaces />
        </box>
        <box halign={Gtk.Align.CENTER}>
          <Media />
          <Time format="%-I:%M:%S ⬝ %a, %d %b" />
        </box>
        <box halign={Gtk.Align.END}>
          <SysTray />
        </box>
      </centerbox>
    </window>
  );
}
