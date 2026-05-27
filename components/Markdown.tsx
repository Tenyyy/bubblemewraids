import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Rewrites a markdown href that points at another content file into a site
 * route. Relative `.md` links are resolved against the current doc's folder.
 */
function resolveRoute(href: string, currentSlug: string[]): string {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;

  const [rawPath, hash] = href.split("#");
  if (!rawPath) return href; // pure same-page anchor

  const cleaned = rawPath.replace(/\.md$/i, "");
  const dir = currentSlug.slice(0, -1); // current file's directory
  const stack = [...dir];

  for (const part of cleaned.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }

  // README / index map to the home page
  const last = stack[stack.length - 1]?.toLowerCase();
  if (last === "readme" || last === "index") {
    stack.pop();
    const root = "/" + stack.join("/");
    return root === "/" ? "/" : root;
  }

  let route = "/" + stack.join("/");
  if (route === "/") route = "/";
  if (hash) route += "#" + hash;
  return route;
}

export default function Markdown({
  content,
  slug,
}: {
  content: string;
  slug: string[];
}) {
  return (
    <article className="prose prose-headings:scroll-mt-24">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "append", properties: { className: "anchor" }, content: { type: "text", value: "#" } },
          ],
        ]}
        components={{
          a({ href, children, ...props }) {
            const target = resolveRoute(href ?? "", slug);
            if (target.startsWith("/")) {
              return (
                <Link href={target} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={target} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
