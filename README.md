# talepuff.com

Marketing site for [Talepuff](https://talepuff.com), a screen-free bedtime story cube for
children, published by Java Mantra Corp. Same shape as the CentProof site: **Next.js 16 +
Tailwind 4**, deployed on Vercel.

```bash
npm install
cp .env.example .env.local     # optional: SMTP for the waitlist, checkout links
npm run dev                    # http://localhost:3000
npm run build && npm run lint
```

## Pages

| Route | What |
|---|---|
| `/` | Home: the promise, four touches, the six things parents care about, storytellers, plan, FAQ |
| `/how-it-works` | Setup in four steps, bedtime in four touches, what happens before a story |
| `/pricing` | The one family plan, the cube waitlist |
| `/privacy` | Privacy for parents, in plain words (retention table, COPPA consent, deletion) |
| `/support` | Fixes and FAQ |
| `/legal/*` | Terms, privacy policy, returns — **drafts for legal review** |
| `/verify`, `/reset` | Landing pages for the links in the service's emails: show the code, deep-link into the app |
| `/api/waitlist` | Emails a sign-up to the support inbox over SMTP; 503 without SMTP, and the form falls back to mailto |

Every fact the site states (prices, limits, storyteller names, FAQ) lives in
`components/site-content.ts`. The brand mark is vector, in `components/brand-mark.tsx`, and
the same drawing produces `app/icon.svg`, `app/apple-icon.png`, `public/og.png` and the
files in `public/brand/`.

## Going live

1. Import this repo in Vercel (framework preset: Next.js, no settings to change).
2. Add the domain `talepuff.com` in the Vercel project; at GoDaddy set `A @ 76.76.21.21`
   and `CNAME www cname.vercel-dns.com`.
3. Set `NEXT_PUBLIC_SITE_URL=https://talepuff.com` and, when the mailbox exists, the
   `MAIL_*` variables from `.env.example`.
4. The service's `STORYCUBE_APP_LINK_BASE=https://talepuff.com` turns the emailed codes
   into links to `/verify` and `/reset`.
