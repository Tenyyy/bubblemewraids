# Contributing & Project Structure

How this site is built and how to add or edit strats. If you can edit a text file, you can
contribute — no web-development experience required.

---

## Want to Contribute?

Got a better strat, a fix, or a suggestion? We'd love your help. Reach out to get added to the
GitHub repo:

- **Email:** [xuebi@bubblemewraid.com](mailto:xuebi@bubblemewraid.com)
- ![Discord](/discord.svg) **Discord:** `thefeelingsblue`

Whether you want to contribute directly or just float an idea, drop a message and we'll get you set
up. 🫧

---

## What This Site Is

A [Next.js](https://nextjs.org/) website that renders **Markdown** files into pages. Every strat
page is just a `.md` file in the `content/` folder — those files are the single source of truth.
You write Markdown, the site turns it into a styled page automatically.

- Hosted on **Vercel**, with a **Cloudflare** domain.
- Light/dark theme, sidebar navigation, and mobile layout are handled for you.

---

## Project Structure

```text
bubblemew/
├─ content/                ← all strat content (edit these)
│  ├─ ultimate.md          → /ultimate          (Guides: fundamentals)
│  ├─ about.md             → /about             (About Us)
│  ├─ contribution.md      → /contribution      (this page)
│  ├─ party-finder.md      → /party-finder      (PF overview)
│  ├─ bubble-mew/          → Bubble Mew Strats
│  │  ├─ p1.md  p2.md  p3.md
│  │  ├─ transitions.md
│  │  └─ enrage.md
│  └─ party-finder/        → Party Finder Strats
│     ├─ p1.md  p2.md  p3.md
│     ├─ transitions.md
│     └─ enrage.md
├─ app/                    ← Next.js pages & layout (rarely touched)
├─ components/             ← Sidebar, Markdown renderer, theme toggle
├─ lib/content.ts          ← reads content/ and builds the sidebar nav
└─ public/logo.png
```

**The rule of thumb:** the file path under `content/` becomes the URL. For example
`content/bubble-mew/p1.md` is served at `/bubble-mew/p1`.

---

## Editing a Page

1. Open the relevant `.md` file under `content/`.
2. Edit the Markdown. The **first `# Heading`** in the file becomes the page title shown in the
   sidebar.
3. Save. Locally the page hot-reloads; on the live site it updates after the change is pushed.

### Linking between pages

Link to other content files with a relative Markdown link to the `.md` file — the site rewrites it
into the right URL automatically:

```markdown
See [the fundamentals](../ultimate.md) for role spots.
[PF strat](../party-finder/p1.md)
```

### Strat conventions

- Use the role abbreviations **MT · OT · H1 · H2 · D1 · D2 · D3 · D4** consistently.
- Note clock spots (N, NE, E, …) and waymarks (A/B/C/D, 1/2/3/4) the way we set them in-game.
- Keep callouts short and unambiguous — they get read at a glance during prog.

---

## Adding a New Page

1. Create a new `.md` file in the right `content/` subfolder (e.g. a new phase in `bubble-mew/`).
2. To make it appear in the sidebar, add it to the nav in **`lib/content.ts`** (`getNav()`).
   Pages not listed there still work via their URL — they just won't show in the sidebar.

---

## Running Locally

```bash
npm install      # first time only
npm run dev      # dev server with live reload (default http://localhost:3000)
```

To use a different port: `npm run dev -- -p 3002`.

## Deploying

Pushes to the `main` branch deploy automatically via Vercel; pull requests get their own preview
URL. See the repo `README.md` for the Cloudflare domain setup.
