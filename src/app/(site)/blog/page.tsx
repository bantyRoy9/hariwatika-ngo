import { prisma } from "@/lib/db";
import { getHeader, getOptions } from "@/lib/content";
import BlogContent, { BlogPostData } from "./BlogContent";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [rows, header, cats] = await Promise.all([
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    getHeader("blog"),
    getOptions("blog_category"),
  ]);

  const posts: BlogPostData[] = rows.map((p) => ({
    id: p.id,
    category: p.category,
    date: p.date,
    titleEn: p.titleEn,
    titleHi: p.titleHi,
    excerptEn: p.excerptEn,
    excerptHi: p.excerptHi,
    tags: (() => { try { return JSON.parse(p.tags) as string[]; } catch { return []; } })(),
    img: p.img,
  }));

  const categories = cats.map((c) => c.value || c.labelEn).filter((c) => c !== "All");

  return <BlogContent posts={posts} categories={categories} header={header} />;
}
