import { Variable } from "astal";
import Network from "gi://AstalNetwork?version=0.1";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0B/s";
  if (bytes < 0) return `0B/s`;
  if (bytes < 1024) return `${bytes.toFixed(0)}B/s`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB/s`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB/s`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB/s`;
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
    return ((parseInt(parts[2]) / parseInt(parts[1])) * 100).toFixed(1);
  });

  const netDown = Variable("0B/s");
  const netUp = Variable("0B/s");

  const netStats = Variable("⇣ 0B/s ⬝ ⇡ 0B/s");

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
      console.log("Network stats poll - timestamp:", now);

      const lines = out.split("\n");
      const interfaceLines = lines.filter(
        (line) =>
          line.includes(":") && !line.includes("lo:") && line.trim().length > 0
      );
      console.log("Found network interfaces:", interfaceLines.length);

      if (interfaceLines.length > 0) {
        let interfaceLine =
          interfaceLines.find((line) => line.includes("enp4s0:")) ||
          interfaceLines[0];
        console.log("Using interface:", interfaceLine.trim().split(":")[0]);

        const parts = interfaceLine.trim().split(/\s+/);

        const rx = parseInt(parts[1]);
        const tx = parseInt(parts[9]);
        console.log("Raw values - RX:", rx, "TX:", tx);

        if (lastTime > 0) {
          const timeDiff = now - lastTime;
          console.log("Time difference:", timeDiff, "seconds");

          if (timeDiff > 0) {
            const rxRate = (rx - lastRx) / timeDiff;
            const txRate = (tx - lastTx) / timeDiff;
            console.log("Calculated rates - RX:", rxRate, "TX:", txRate);

            netDown.set(formatBytes(rxRate));
            netUp.set(formatBytes(txRate));
            console.log("Formatted - Down:", netDown.get(), "Up:", netUp.get());
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

  const network = Network.get_default();
  const netState = Variable("disconnected");

  const updateNetState = () => {
    try {
      const state = network.state;

      netState.set(state.toString());
    } catch (e) {
      console.error("Error getting network state:", e);
    }
  };

  updateNetState();
  const stateInterval = setInterval(updateNetState, 2000);

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
        clearInterval(stateInterval);
      }}>
      {[
        <box className="stat">
          {[<label label={cpu((val) => ` ${val}%`)} />]}
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
