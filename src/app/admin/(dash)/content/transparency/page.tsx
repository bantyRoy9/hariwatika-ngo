import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const financialReportFields: FieldDef[] = [
  { name: "year", label: "Year", type: "text" },
  { name: "totalIncome", label: "Total income", type: "number" },
  { name: "totalExpense", label: "Total expense", type: "number" },
  { name: "beneficiaries", label: "Beneficiaries", type: "number" },
  { name: "surplus", label: "Surplus", type: "number" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const expenseCategoryFields: FieldDef[] = [
  { name: "labelEn", nameHi: "labelHi", label: "Label", type: "bilingual" },
  { name: "percent", label: "Percent", type: "number" },
  { name: "color", label: "Color", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const reportDocumentFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "fileType", label: "File type", type: "text" },
  { name: "size", label: "Size", type: "text" },
  { name: "fileUrl", label: "File", type: "image" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminTransparencyPage() {
  const [financialReports, expenseCategories, reportDocuments, media] = await Promise.all([
    prisma.financialReport.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.expenseCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.reportDocument.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  const mediaList = media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));

  return (
    <div>
      <div className="mb-10">
        <PageTitle title="Financial Reports" subtitle="Yearly figures shown on the /transparency page." />
        <CrudManager
          model="financialReport"
          singularName="Report"
          titleField="year"
          fields={financialReportFields}
          rows={financialReports as unknown as Row[]}
          media={mediaList}
        />
      </div>
      <div className="mb-10">
        <PageTitle title="Expense Categories" subtitle="Expense breakdown shown on the /transparency page. Labels are bilingual (EN + HI)." />
        <CrudManager
          model="expenseCategory"
          singularName="Category"
          titleField="labelEn"
          fields={expenseCategoryFields}
          rows={expenseCategories as unknown as Row[]}
          media={mediaList}
        />
      </div>
      <div className="mb-10">
        <PageTitle title="Report Documents" subtitle="Downloadable documents shown on the /transparency page." />
        <CrudManager
          model="reportDocument"
          singularName="Document"
          titleField="titleEn"
          fields={reportDocumentFields}
          rows={reportDocuments as unknown as Row[]}
          media={mediaList}
        />
      </div>
    </div>
  );
}
