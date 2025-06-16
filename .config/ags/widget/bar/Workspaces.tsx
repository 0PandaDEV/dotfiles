import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk3";

interface WorkspacesProps {
  monitor: Gdk.Monitor;
}

export default function Workspaces({ monitor }: WorkspacesProps) {
  const hypr = Hyprland.get_default();

  const monitorIndex =
    monitor.get_display().get_monitor_at_point(0, 0) === monitor ? 0 : 1;

  const workspaceIds = monitorIndex === 0 ? [1, 2, 3, 4, 5] : [6, 7, 8, 9, 10];

  return (
    <box className="Workspaces Widget" hexpand={false}>
      {workspaceIds.map((id) => (
        <button
          className={`workspace-${id}`}
          onClicked={() => {
            const workspace = hypr.workspaces.find((ws) => ws.id === id);
            if (workspace) workspace.focus();
          }}
          child={
            <label
              className={bind(hypr, "focusedWorkspace").as((fw) => {
                const isFocused = fw?.id === id;
                const workspace = hypr.workspaces.find((ws) => ws.id === id);
                const hasWindows =
                  workspace?.clients && workspace.clients.length > 0;

                return `workspace-indicator ${isFocused ? "focused" : ""} ${
                  hasWindows ? "occupied" : "empty"
                }`;
              })}
              label={bind(hypr, "focusedWorkspace").as((fw) =>
                fw?.id === id ? "⬜" : "⬝"
              )}
            />
          }
        />
      ))}
    </box>
  );
}
