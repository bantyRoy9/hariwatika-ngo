import { prisma } from "@/lib/db";
import { getHeader, getOptions } from "@/lib/content";
import ProjectsContent, { ProjectData, FuturePlanData } from "./ProjectsContent";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projectRows, planRows, header, cats] = await Promise.all([
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.futurePlan.findMany({ orderBy: { sortOrder: "asc" } }),
    getHeader("projects"),
    getOptions("project_category"),
  ]);

  const projects: ProjectData[] = projectRows.map((p) => ({
    id: p.id,
    category: p.category,
    iconName: p.iconName,
    status: p.status,
    titleEn: p.titleEn,
    titleHi: p.titleHi,
    descEn: p.descEn,
    descHi: p.descHi,
    raised: p.raised,
    goal: p.goal,
    location: p.location,
    date: p.date,
    beneficiaries: p.beneficiaries,
  }));

  const futurePlans: FuturePlanData[] = planRows.map((p) => ({
    id: p.id,
    titleEn: p.titleEn,
    titleHi: p.titleHi,
    year: p.year,
    descEn: p.descEn,
    descHi: p.descHi,
  }));

  const categories = cats.map((c) => c.value || c.labelEn).filter((c) => c !== "All");

  return <ProjectsContent projects={projects} futurePlans={futurePlans} categories={categories} header={header} />;
}
