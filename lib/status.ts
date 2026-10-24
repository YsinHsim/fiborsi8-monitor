export type BotStatus = {
  ts: number;
  symbols: string[];
  timeframes: string[];
  interval_minutes: number;
  alerted: Record<string, number>;
  errors: string[];
};

export async function getStatus(): Promise<BotStatus | null> {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/status`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
