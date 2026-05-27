import Link from "next/link";
import Image from "next/image";
import { getNav, type NavLink } from "@/lib/content";

export default function Home() {
  const nav = getNav();
  const groupItems = (title: string): NavLink[] => {
    const entry = nav.find((e) => e.kind === "group" && e.title === title);
    return entry && entry.kind === "group" ? entry.items : [];
  };
  const bubbleMew = groupItems("Bubble Mew Strats");
  const partyFinder = groupItems("Party Finder Strats");

  return (
    <div className="mx-auto max-w-3xl">
      <section className="flex flex-col items-center gap-4 py-8 text-center">
        <Image src="/logo.png" alt="Bubble Mew" width={120} height={120} className="rounded-full" />
        <h1 className="text-4xl font-bold tracking-tight">
          Dancing Mad Ultimate <span className="text-bubble-pink">(UMAD)</span>
        </h1>
        <p className="max-w-xl text-bubble-muted">
          A phase-by-phase raid guide for the upcoming Dancing Mad Ultimate, compiled from the strats
          run by the static <span className="text-bubble-cyan">Bubble Mew</span>.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/ultimate"
            className="rounded-xl bg-bubble-pink/20 px-5 py-2.5 font-medium text-bubble-pink ring-1 ring-bubble-pink/40 transition hover:bg-bubble-pink/30"
          >
            Start with the fundamentals →
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-bubble-border px-5 py-2.5 font-medium text-bubble-text transition hover:border-bubble-cyan hover:text-bubble-cyan"
          >
            About the team
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card href="/ultimate" title="Guides" body="What an Ultimate is, the 8-player roles, and how phases work." />
        <Card href="/about" title="About Us" body="Who Bubble Mew is — our roster and prog goals." />
        <Card href="/contribution" title="Contribution" body="How this site is built and how to edit the strats." />
      </section>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <StratColumn
          title="Bubble Mew Strats"
          accent="text-bubble-pink"
          items={bubbleMew}
        />
        <StratColumn
          title="Party Finder Strats"
          accent="text-bubble-cyan"
          items={partyFinder}
        />
      </div>

      <p className="mt-6 text-center text-sm text-bubble-muted">
        Strat pages are placeholders until UMAD releases and we lock in the fight. 🫧
      </p>
    </div>
  );
}

function Card({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-bubble-border bg-bubble-panel/40 p-5 transition hover:border-bubble-cyan/50"
    >
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-bubble-muted">{body}</p>
    </Link>
  );
}

function StratColumn({
  title,
  accent,
  items,
}: {
  title: string;
  accent: string;
  items: NavLink[];
}) {
  return (
    <section>
      <h2 className={`mb-3 text-sm font-semibold uppercase tracking-wider ${accent}`}>{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-lg border border-bubble-border bg-bubble-panel/40 px-4 py-3 text-sm transition hover:border-bubble-pink/50"
          >
            <span>{item.title}</span>
            <span className="text-bubble-muted">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
