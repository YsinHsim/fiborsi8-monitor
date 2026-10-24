import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KEY = "fiborsi8:status";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.MONITOR_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body || typeof body.ts !== "number") {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }
  await kv.set(KEY, body);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const status = await kv.get(KEY);
  if (!status) {
    return NextResponse.json({ error: "no data yet" }, { status: 404 });
  }
  return NextResponse.json(status);
}
