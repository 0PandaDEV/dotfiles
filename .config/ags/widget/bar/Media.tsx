import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";

export default function Media() {
  const mpris = Mpris.get_default();

  return (
    <box className="Media Widget" child={
      bind(mpris, "players").as((players) => {
        const ciderPlayer = players.find(player => player.identity === "Cider");
        
        if (ciderPlayer) {
          return (
            <box>
              <box
                className="Cover"
                valign={Gtk.Align.CENTER}
                css={bind(ciderPlayer, "coverArt").as(
                  (cover) => `background-image: url('${cover}');`
                )}
              />
              <label
                label={bind(ciderPlayer, "metadata").as(
                  () => `${ciderPlayer.title} - ${ciderPlayer.artist}`
                )}
              />
            </box>
          );
        } else {
          return <label label="Nothing Playing" />;
        }
      })
    } />
  );
}
