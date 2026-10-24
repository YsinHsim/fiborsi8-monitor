import { kv } from "@vercel/kv";

export type BotStatus = {
  ts: number;
  symbols: string[];
  timeframes: string[];
  interval_minutes: number;
  alerted: Record<string, number>;
  errors: string[];
};

const KEY = "fiborsi8:status";

export async function getStatus(): Promise<BotStatus | null> {
  try {
    return await kv.get<BotStatus>(KEY);
  } catch {
    return null;
  }
}
