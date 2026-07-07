import { prisma } from "@/lib/db";
import { getHeader, getOptions, getSettings } from "@/lib/content";
import ProjectsContent, { ProjectData, FuturePlanData } from "./ProjectsContent";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  try {
    const [projectRows, planRows, header, cats, settings] = await Promise.all([
      prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.futurePlan.findMany({ orderBy: { sortOrder: "asc" } }),
      getHeader("projects"),
      getOptions("project_category"),
      getSettings(["projects"]),
    ]);

    const projects: ProjectData[] = projectRows.map((p) => ({
      id: p.id,
      category: p.category,
      iconName: p.iconName,
      img: p.img,
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

    return <ProjectsContent projects={projects} futurePlans={futurePlans} categories={categories} header={header} settings={settings} />;
  } catch (error) {
    console.error("Failed to load projects page data:", error);
    
    // Return page with default data
    const defaultHeader = {
      title: { en: "Our Projects", hi: "हमारी परियोजनाएं" },
      subtitle: { en: "Making a difference through impactful initiatives", hi: "प्रभावशाली पहलों के माध्यम से बदलाव लाना" },
      tag: { en: "What We Do", hi: "हम क्या करते हैं" },
      img: null
    };
    
    return <ProjectsContent 
      projects={[]} 
      futurePlans={[]} 
      categories={[]} 
      header={defaultHeader} 
      settings={{}} 
    />;
  }
}
