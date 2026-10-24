# FiboRSI8 Monitor

Web dashboard for the [fiborsi8](https://github.com/YsinHsim/fiborsi8) Telegram signal bot. Next.js + Vercel KV.

The bot POSTs a status JSON after every scan cycle; this app stores it in Vercel KV and renders it. Status is as fresh as the bot's scan interval (default 5 min).

## Setup

1. Create a KV store: [Vercel dashboard](https://vercel.com) → Storage → Create Database → KV.
2. Link it to this project (`vercel link` then `vercel env pull`, or connect in the dashboard).
3. Set env var `MONITOR_SECRET` (any random string) in Vercel project settings.
4. Deploy: `vercel deploy --prod`.
5. In the bot's `config.json` on the phone:

```json
"monitor_url": "https://<your-app>.vercel.app/api/status",
"monitor_secret": "<same random string>"
```

6. `./stop.sh && ./start.sh` on the phone.

## Local dev

```bash
npm install
vercel env pull .env.local   # needs vercel link first
npm run dev
```

## Dashboard

- **LIVE/DEAD**: dead if no report for 2× the scan interval.
- Last signal time per chart (from the bot's dedupe store).
- Recent fetch errors (last 20).
- Auto-refreshes every 60s.

## Notes

- No login: the page is read-only and shows no secrets. Add Vercel Authentication (project settings) if you want it private.
- KV free tier (30k requests/month) fits: bot writes ~8.6k/month at 5-min intervals.
