import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk3";

interface CurrentWindowProps {
  monitor: Gdk.Monitor;
}

export default function CurrentWindow({ monitor }: CurrentWindowProps) {
  const hypr = Hyprland.get_default();

  const monitorIndex =
    monitor.get_display().get_monitor_at_point(0, 0) === monitor ? 1 : 0;

  return (
    <box 
      className="CurrentWindow Widget"
      visible={bind(hypr, "focusedClient").as((client) => {
        if (!client) return false;
        
        const workspace = client.workspace;
        if (!workspace) return false;
        
        const wsMonitor = workspace.monitor;
        if (!wsMonitor) return false;
        
        return wsMonitor.id === monitorIndex;
      })}
      child={
        <label 
          className="window-title" 
          label={bind(hypr, "focusedClient").as((client) => 
            client?.class || ""
          )} 
        />
      }
    />
  );
}
