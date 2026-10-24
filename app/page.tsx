import { getStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

function ago(ms: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default async function Page() {
  const st = await getStatus();

  if (!st) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">FiboRSI8 Monitor</h1>
        <p className="text-gray-400">No data yet. The bot has not reported in.</p>
      </main>
    );
  }

  const deadAfterMs = st.interval_minutes * 60_000 * 2;
  const alive = Date.now() - st.ts < deadAfterMs;

  const alerts = Object.entries(st.alerted)
    .sort((a, b) => b[1] - a[1])
    .map(([key, t]) => ({ key, t }));

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <meta httpEquiv="refresh" content="60" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FiboRSI8 Monitor</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            alive ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
          }`}
        >
          {alive ? "● LIVE" : "● DEAD"}
        </span>
      </div>

      <section className="bg-gray-900 rounded-lg p-4 space-y-1 text-sm">
        <p><span className="text-gray-400">Last check:</span> {ago(st.ts)} ({new Date(st.ts).toLocaleString("en-MY")})</p>
        <p><span className="text-gray-400">Watching:</span> {st.symbols.join(", ")}</p>
        <p><span className="text-gray-400">Timeframes:</span> {st.timeframes.join(", ")} — every {st.interval_minutes} min</p>
      </section>

      <section className="bg-gray-900 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Last signal per chart</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-400 text-sm">No signals sent yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {alerts.map(({ key, t }) => (
                <tr key={key} className="border-t border-gray-800">
                  <td className="py-1.5 font-mono">{key}</td>
                  <td className="py-1.5 text-right text-gray-400">{ago(t)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="bg-gray-900 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Recent errors</h2>
        {st.errors.length === 0 ? (
          <p className="text-gray-400 text-sm">None.</p>
        ) : (
          <ul className="text-sm text-red-300 space-y-1 font-mono">
            {st.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs text-gray-500">Auto-refreshes every 60s.</p>
    </main>
  );
}
