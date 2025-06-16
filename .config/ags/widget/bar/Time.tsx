import { Variable } from "astal";
import GLib from "gi://GLib";

export default function Time({ format }: { format: string }) {
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
