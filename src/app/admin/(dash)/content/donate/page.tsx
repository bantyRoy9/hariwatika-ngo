import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const tierFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Scheme Name", type: "bilingual" },
  { name: "eligibilityEn", nameHi: "eligibilityHi", label: "Eligibility", type: "bilingual" },
  { name: "amount", label: "Amount (e.g. ₹3,000 or As required)", type: "text" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminDonatePricingPage() {
  const tiers = await prisma.serviceTier.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <PageTitle
        title="Registration Fees & Eligibility"
        subtitle="Scheme-wise contribution amounts shown on the /donate page (marriage, plantation, education, medical, volunteer)."
      />
      <CrudManager
        model="serviceTier"
        singularName="Scheme"
        titleField="titleEn"
        fields={tierFields}
        rows={tiers as unknown as Row[]}
        media={[]}
      />
    </div>
  );
}
