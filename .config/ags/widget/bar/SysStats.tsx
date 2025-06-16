import { Variable } from "astal";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(0)}B/s`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB/s`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB/s`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB/s`;
}

export default function SysStats() {
  let lastRx = 0;
  let lastTx = 0;

  const cpu = Variable("0.0").poll(1000, ["top", "-bn1"], (out: string) => {
    const match = out.match(/%Cpu.*?(\d+\.\d+)/);
    return match ? match[1] : "0.0";
  });

  const ram = Variable("0.0").poll(2000, ["free", "-m"], (out: string) => {
    const line = out.split("\n").find((l) => l.includes("Mem"));
    if (!line) return "0.0";
    const parts = line.split(/\s+/);
    return ((parseInt(parts[2]) / parseInt(parts[1])) * 100).toFixed(1);
  });

  const netDown = Variable("0B/s");
  const netUp = Variable("0B/s");

  const networkPoll = Variable("").poll(
    1000,
    ["cat", "/proc/net/dev"],
    (out: string) => {
      let rx = 0;
      let tx = 0;

      out
        .split("\n")
        .slice(2)
        .forEach((line) => {
          if (line.trim()) {
            const parts = line.trim().split(/\s+/);
            rx += parseInt(parts[1]);
            tx += parseInt(parts[9]);
          }
        });

      if (lastRx > 0) {
        const rxDiff = rx - lastRx;
        const txDiff = tx - lastTx;
        netDown.set(formatBytes(rxDiff));
        netUp.set(formatBytes(txDiff));
      }

      lastRx = rx;
      lastTx = tx;

      return `${rx} ${tx}`;
    }
  );

  return (
    <box
      className="SysStats Widget"
      spacing={2}
      onDestroy={() => {
        cpu.drop();
        ram.drop();
        networkPoll.drop();
      }}>
      {[
        <box className="stat">
          {[<label label={cpu((val) => ` ${val}%`)} />]}
        </box>,

        <box className="stat">
          {[<label label={ram((val) => `☰ ${val}%`)} />]}
        </box>,

        <box className="stat">
          {[<label label={`⇣ ${netDown.get()} ⬝ ⇡ ${netUp.get()}`} />]}
        </box>,
      ]}
    </box>
  );
}
