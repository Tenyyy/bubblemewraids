import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Doc {
  /** url path segments, e.g. ["phases", "p1"] */
  slug: string[];
  /** route, e.g. "/phases/p1" */
  href: string;
  /** path relative to content dir, e.g. "phases/p1.md" */
  relPath: string;
  /** first H1 in the file, used as the page title */
  title: string;
  /** raw markdown */
  content: string;
}

/** Recursively collect every .md file under content/. */
function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.isFile() && entry.name.endsWith(".md")) return [full];
    return [];
  });
}

function extractTitle(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

export function getAllDocs(): Doc[] {
  const files = walk(CONTENT_DIR);
  return files
    .map((file) => {
      const relPath = path.relative(CONTENT_DIR, file).split(path.sep).join("/");
      const slug = relPath.replace(/\.md$/, "").split("/");
      const content = fs.readFileSync(file, "utf8");
      return {
        slug,
        href: "/" + slug.join("/"),
        relPath,
        title: extractTitle(content, slug[slug.length - 1]),
        content,
      };
    })
    .sort((a, b) => a.href.localeCompare(b.href));
}

export function getDocBySlug(slug: string[]): Doc | null {
  const target = slug.join("/");
  return getAllDocs().find((doc) => doc.slug.join("/") === target) ?? null;
}

export interface NavLink {
  title: string;
  href: string;
}

/** A sidebar entry is either a direct link or a collapsible group of links. */
export type NavEntry =
  | { kind: "link"; title: string; href: string }
  | { kind: "group"; title: string; items: NavLink[] };

/** Display order + short labels for phase pages (file slug → label). */
const PHASE_ORDER = ["p1", "p2", "p3", "transitions", "enrage"];
const PHASE_LABEL: Record<string, string> = {
  p1: "Phase 1",
  p2: "Phase 2",
  p3: "Phase 3",
  transitions: "Intermissions & Adds",
  enrage: "Final Phase / Enrage",
};

/**
 * Hand-curated sidebar structure. Anything in content/ that isn't referenced
 * here still gets a page, it just won't appear in the sidebar.
 */
export function getNav(): NavEntry[] {
  const docs = getAllDocs();
  const byHref = (href: string) => docs.find((d) => d.href === href);

  // Phase pages inside a strat folder, ordered and short-labelled.
  const phaseItems = (folder: string): NavLink[] =>
    docs
      .filter((d) => d.slug[0] === folder && d.slug.length > 1)
      .sort(
        (a, b) =>
          PHASE_ORDER.indexOf(a.slug[a.slug.length - 1]) -
          PHASE_ORDER.indexOf(b.slug[b.slug.length - 1]),
      )
      .map((d) => ({
        title: PHASE_LABEL[d.slug[d.slug.length - 1]] ?? d.title,
        href: d.href,
      }));

  const entries: NavEntry[] = [];

  const about = byHref("/about");
  if (about) entries.push({ kind: "link", title: "About Us", href: about.href });

  const fundamentals = byHref("/ultimate");
  if (fundamentals) {
    entries.push({
      kind: "group",
      title: "Guides",
      items: [{ title: "What is an Ultimate?", href: fundamentals.href }],
    });
  }

  entries.push({
    kind: "group",
    title: "Bubble Mew Strats",
    items: phaseItems("bubble-mew"),
  });

  const pfOverview = byHref("/party-finder");
  const pfItems: NavLink[] = [];
  if (pfOverview) pfItems.push({ title: "Overview", href: pfOverview.href });
  pfItems.push(...phaseItems("party-finder"));
  entries.push({ kind: "group", title: "Party Finder Strats", items: pfItems });

  const contrib = byHref("/contribution");
  if (contrib) {
    entries.push({ kind: "link", title: "Contribution", href: contrib.href });
  }

  return entries;
}
