import { Variable } from "astal";

function _formatBytes(bytes: number): string {
  if (bytes === 0) return "0B/s";
  if (bytes < 0) return `0B/s`;
  if (bytes < 1024) return `${bytes.toFixed(0)}B/s`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB/s`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB/s`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB/s`;
}

function formatBytesMB(bytes: number): string {
  if (bytes <= 0) return "0MB/s";
  return `${Math.round(bytes / (1024 * 1024))}MB/s`;
}

export default function SysStats() {
  const cpu = Variable("0.0").poll(1000, ["top", "-bn1"], (out: string) => {
    const match = out.match(/%Cpu.*?(\d+\.\d+)/);
    return match ? match[1] : "0.0";
  });

  const ram = Variable("0.0").poll(2000, ["free", "-m"], (out: string) => {
    const line = out.split("\n").find((l) => l.includes("Mem"));
    if (!line) return "0.0";
    const parts = line.split(/\s+/);
    return Math.round((parseInt(parts[2]) / parseInt(parts[1])) * 100).toString();
  });

  const netDown = Variable("0MB/s");
  const netUp = Variable("0MB/s");
  const netStats = Variable("⇣ 0MB/s ⬝ ⇡ 0MB/s");

  const updateNetStats = () => {
    netStats.set(`⇣ ${netDown.get()} ⬝ ⇡ ${netUp.get()}`);
  };

  netDown.subscribe(updateNetStats);
  netUp.subscribe(updateNetStats);

  let lastRx = 0;
  let lastTx = 0;
  let lastTime = 0;

  Variable("").poll(1000, ["cat", "/proc/net/dev"], (out: string) => {
    try {
      const now = Date.now() / 1000;
      const lines = out.split("\n");
      const interfaceLines = lines.filter(
        (line) =>
          line.includes(":") && !line.includes("lo:") && line.trim().length > 0
      );

      if (interfaceLines.length > 0) {
        const interfaceLine =
          interfaceLines.find((line) => line.includes("enp4s0:")) ||
          interfaceLines[0];

        const parts = interfaceLine.trim().split(/\s+/);
        const rx = parseInt(parts[1]);
        const tx = parseInt(parts[9]);

        if (lastTime > 0) {
          const timeDiff = now - lastTime;
          if (timeDiff > 0) {
            const rxRate = (rx - lastRx) / timeDiff;
            const txRate = (tx - lastTx) / timeDiff;
            netDown.set(formatBytesMB(rxRate));
            netUp.set(formatBytesMB(txRate));
          }
        }

        lastTime = now;
        lastRx = rx;
        lastTx = tx;
      }
    } catch (e) {
      console.error("Error parsing network stats:", e);
    }

    return "";
  });

  return (
    <box
      className="SysStats Widget"
      spacing={2}
      onDestroy={() => {
        cpu.drop();
        ram.drop();
        netDown.drop();
        netUp.drop();
        netStats.drop();
      }}>
      {[
        <box className="stat">
          {[
            <label label={cpu((val) => ` ${Math.round(parseFloat(val))}%`)} />,
          ]}
        </box>,

        <box className="stat">
          {[<label label={ram((val) => `☰ ${val}%`)} />]}
        </box>,

        <box className="stat">
          {[<label label={netStats((stats) => stats)} />]}
        </box>,
      ]}
    </box>
  );
}
