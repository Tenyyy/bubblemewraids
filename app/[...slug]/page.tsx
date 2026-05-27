import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "@/components/Markdown";
import { getAllDocs, getDocBySlug } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  return { title: doc?.title ?? "Not found" };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return <Markdown content={doc.content} slug={doc.slug} />;
}
