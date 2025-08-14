import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";

export default function Media() {
  const mpris = Mpris.get_default();

  return (
    <box
      className="Media Widget"
      child={bind(mpris, "players").as((players) => {
        let activePlayer;

        activePlayer = players.find(
          (player) =>
            ["Feishin", "Cider"].includes(player.identity) &&
            player.playback_status === Mpris.PlaybackStatus.PLAYING
        );

        if (!activePlayer) {
          activePlayer = players.find((player) =>
            ["Feishin", "Cider"].includes(player.identity)
          );
        }

        console.log(
          activePlayer
            ? `Active Player: ${activePlayer.identity} (${activePlayer.playback_status})`
            : "No Active Player"
        );

        if (activePlayer) {
          return (
            <box>
              <box
                className="Cover"
                valign={Gtk.Align.CENTER}
                css={bind(activePlayer, "cover_art").as(
                  (cover) => `background-image: url('${cover}');`
                )}
              />
              <label
                label={bind(activePlayer, "title").as(
                  (title) => `${title} - ${activePlayer.artist}`
                )}
              />
            </box>
          );
        } else {
          return <label label="Nothing Playing" />;
        }
      })}
    />
  );
}
