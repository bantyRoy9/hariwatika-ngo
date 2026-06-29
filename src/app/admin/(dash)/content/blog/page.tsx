import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "excerptEn", nameHi: "excerptHi", label: "Excerpt", type: "bilingual-area" },
  { name: "category", label: "Category", type: "text" },
  { name: "date", label: "Date (e.g. 15 Dec 2024)", type: "text" },
  { name: "tags", label: "Tags", type: "tags" },
  { name: "img", label: "Image", type: "image" },
  { name: "published", label: "Published", type: "checkbox" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminBlogPage() {
  const [rows, media] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  return (
    <div>
      <PageTitle title="Blog Posts" subtitle="Manage the /blog page. All text is bilingual (EN + HI)." />
      <CrudManager
        model="blogPost"
        singularName="Post"
        titleField="titleEn"
        fields={fields}
        rows={rows as unknown as Row[]}
        media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))}
      />
    </div>
  );
}
