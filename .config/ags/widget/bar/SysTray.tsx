import { bind } from "astal";
import Tray from "gi://AstalTray";

export default function SysTray() {
  const tray = Tray.get_default();

  return (
    <box className="SysTray Widget" spacing={8}>
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
            menuModel={bind(item, "menuModel")}
            child={<icon gicon={bind(item, "gicon")} />}
          />
        ))
      )}
    </box>
  );
}
