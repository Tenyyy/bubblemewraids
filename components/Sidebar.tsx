"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavEntry, NavLink } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar({ nav }: { nav: NavEntry[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile drawer

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-bubble-border bg-bubble-panel/70 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.png" alt="" width={28} height={28} className="rounded-full" />
          Bubble Mew
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-11 rounded-lg border border-bubble-border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bubble-pink"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <aside
        className={[
          "w-full shrink-0 border-bubble-border bg-bubble-panel/40 md:block md:w-64 md:border-r",
          open ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="flex h-full flex-col gap-5 p-4 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
          <div className="hidden items-center justify-between px-2 py-2 md:flex">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full" />
              <div>
                <div className="font-semibold leading-tight">Bubble Mew</div>
                <div className="text-xs text-bubble-muted">UMAD Strats</div>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          <nav className="flex flex-col gap-1" onClick={() => setOpen(false)}>
            <NavItemLink href="/" title="Home" pathname={pathname} />
            {nav.map((entry) =>
              entry.kind === "link" ? (
                <NavItemLink
                  key={entry.href}
                  href={entry.href}
                  title={entry.title}
                  pathname={pathname}
                />
              ) : (
                <NavGroup key={entry.title} title={entry.title} items={entry.items} pathname={pathname} />
              ),
            )}
          </nav>

          <a
            href="https://www.fflogs.com/guild/id/139493"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto rounded-lg border border-bubble-border px-3 py-2 text-center text-xs text-bubble-muted hover:text-bubble-cyan"
          >
            FFLogs ↗
          </a>
        </div>
      </aside>
    </>
  );
}

function itemClass(active: boolean) {
  return [
    "block rounded-lg px-3 py-2 text-sm transition-colors",
    active
      ? "bg-bubble-pink/15 text-bubble-pink font-medium"
      : "text-bubble-muted hover:bg-bubble-panel hover:text-bubble-text",
  ].join(" ");
}

function NavItemLink({
  href,
  title,
  pathname,
}: {
  href: string;
  title: string;
  pathname: string;
}) {
  return (
    <Link href={href} className={itemClass(pathname === href)}>
      {title}
    </Link>
  );
}

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavLink[];
  pathname: string;
}) {
  const containsActive = items.some((i) => i.href === pathname);
  const [expanded, setExpanded] = useState(containsActive);

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-bubble-violet transition-colors hover:text-bubble-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bubble-pink"
      >
        <span>{title}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-0.5 flex flex-col gap-0.5 border-l border-bubble-border pl-2">
          {items.map((item) => (
            <NavItemLink
              key={item.href}
              href={item.href}
              title={item.title}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
