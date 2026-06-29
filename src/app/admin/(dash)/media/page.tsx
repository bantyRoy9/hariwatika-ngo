import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../_components/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "url", label: "Image / File", type: "image" },
  { name: "alt", label: "Alt text / name", type: "text" },
  { name: "category", label: "Category", type: "text" },
];

export default async function AdminMediaPage() {
  const media = await prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } });
  const mediaList = media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));

  return (
    <div>
      <PageTitle title="Media Library" subtitle="Upload, browse, and manage images & PDFs used across the site." />
      <CrudManager model="mediaAsset" singularName="Asset" titleField="alt" fields={fields} rows={media as unknown as Row[]} media={mediaList} />
    </div>
  );
}
