<div align="center">

<img src="logo.png" alt="Bubble Mew" width="160" />

# Bubble Mew — Dancing Mad Ultimate (UMAD) Strategy Site

**A phase-by-phase raid guide for the upcoming Dancing Mad Ultimate, compiled from the
strats run by the static [Bubble Mew](https://www.fflogs.com/guild/id/139493).**

</div>

---

## What This Is

This site documents how **Bubble Mew** clears **Dancing Mad Ultimate (UMAD)** — the upcoming
Ultimate-tier encounter in *Final Fantasy XIV*. It is not a generic guide: it captures **our
team's specific strategies**, positions, and callouts, written down so we can learn them, refine
them, and reference them mid-prog.

Think of it as our living prog document. As the fight releases and we work through it, these pages
will grow from rough notes into a polished, reviewed strat sheet.

> New to Ultimates? Start with **[the fundamentals](content/ultimate.md)** — what an
> Ultimate fight is, the 8-player role structure, and how multi-phase encounters work. The rest of
> this site assumes you know those basics.

---

## Not in the Static? Read This First

You don't need to be in Bubble Mew to use this site. Most of these pages document **our team's
strats**, but the fight resolves the same mechanics no matter who you run it with — so the timelines
and mechanic breakdowns are useful to everyone.

If you're prepping to clear UMAD in **Party Finder (PF)**, start here:

- **[Party Finder Guide](content/party-finder.md)** — the *generic, community-standard* strats most
  PF parties expect, written for pick-up groups rather than a coordinated static.

The difference at a glance:

| | Bubble Mew strats | Party Finder guide |
|---|---|---|
| **Audience** | Our static, in voice comms | Anyone, pick-up groups |
| **Goal** | Optimized for our comp & callouts | Match the common PF convention |
| **Flexibility** | Tailored, sometimes non-standard | Widely recognized, low-coordination |

When our strat differs from the PF standard, the phase pages call it out so you know which one
you're reading.

---

## How the Strats Are Organized

Each phase of UMAD gets its own page. Within every phase you'll find:

- **Boss overview** — the form being fought and its theme.
- **Mechanic timeline** — major mechanics in the order they happen.
- **Bubble Mew strat** — our specific resolution: positions, partners, and movement.
- **Role responsibilities** — what each of the 8 players does (see role legend below).
- **Cooldown / mitigation plan** — our assigned defensives and healing per mechanic.
- **Common mistakes** — what wipes us, and how to avoid it.

### Planned Pages

> Content lives in `content/` and is rendered by the site. Phase pages are placeholders until the
> fight releases — update once the timeline is known.

Sidebar sections map to content as follows:

- **About Us** — `content/about.md` → `/about` *(team roster — TBD)*
- **Guides** — `content/ultimate.md` — Ultimate fundamentals & roles ✅ → `/ultimate`
- **Bubble Mew Strats** — `content/bubble-mew/*.md` → `/bubble-mew/{p1,p2,p3,transitions,enrage}` *(TBD)*
- **Party Finder Strats** — `content/party-finder.md` (overview) + `content/party-finder/*.md` → `/party-finder/...` *(TBD)*
- **Contribution** — `content/contribution.md` → `/contribution` ✅

---

## Role Legend

Strats reference players by role abbreviation. UMAD runs the standard 8-player **2-2-4**
composition:

| Abbrev | Role | Notes |
|--------|------|-------|
| **MT** | Main Tank | Holds the boss, faces it away from the party |
| **OT** | Off-Tank | Tank swaps, adds, shared tankbusters |
| **H1** | Pure / Regen Healer | Raw healing & recovery (WHM / AST) |
| **H2** | Shield / Barrier Healer | Mitigation & barriers (SCH / SGE) |
| **D1 / D2** | Melee DPS | Close-range, positional uptime |
| **D3**  | Ranged Physical DPS | Mobile damage + raid utility |
| **D4**  | Caster DPS | Burst damage, manages cast times |

Standard light-party split: **MT · H1 · D1 · D3** and **OT · H2 · D2 · D4** (adjust per mechanic).

---

## For the Static

- **Logs:** [fflogs.com/guild/id/139493](https://www.fflogs.com/guild/id/139493)
- **Editing strats:** Each phase lives in its own markdown file under `content/bubble-mew/` (our
  strats) or `content/party-finder/` (the PF-standard versions). Edit the markdown — the website
  re-renders it automatically. Keep callouts short and unambiguous; they get read at a glance during
  prog. See `content/contribution.md` for the full contributor guide.
- **Conventions:** Use the role abbreviations above consistently. Note clock spots (N, NE, E, …)
  and waymarks (A/B/C/D, 1/2/3/4) the way we set them in-game.

---

## Development

This is a [Next.js](https://nextjs.org/) (App Router) site. The markdown files in `content/` are the
single source of truth — they're rendered to pages whose URLs mirror the file paths
(`content/phases/p1.md` → `/phases/p1`). To add a page, just drop a new `.md` file in `content/`;
to add it to the sidebar, update `getNav()` in `lib/content.ts`.

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (static export of every content page)
npm start        # serve the production build
```

**Tech:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, `react-markdown` (+ `remark-gfm` for
tables) for rendering.

## Deployment

Hosted on **[Vercel](https://vercel.com/)** with a **Cloudflare** domain.

1. **Vercel** — import the GitHub repo (`Tenyyy/bubblemewraids`). Vercel auto-detects Next.js; no
   config needed. Every push to `main` deploys to production; PRs get preview URLs.
2. **Cloudflare domain** — in Vercel, add your domain under **Project → Settings → Domains**. Vercel
   shows the DNS records to create. In the Cloudflare dashboard add them:
   - Apex (`bubblemewraid.com`): `A` record → Vercel's IP `76.76.21.21`.
   - `www`: `CNAME` → `cname.vercel-dns.com`.
   - Set these records to **DNS only** (grey cloud, proxy off) so Vercel can issue the TLS cert.
     Once verified, you may re-enable Cloudflare's proxy if you set SSL/TLS mode to **Full
     (strict)**.

---

<div align="center">

*Bubble Mew — see you in the cleared logs. 🫧*

</div>
