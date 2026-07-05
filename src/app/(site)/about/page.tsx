import { prisma } from "@/lib/db";
import { getHeader, getSettings } from "@/lib/content";
import AboutContent, { TimelineData, LegalDocData, TeamMemberData } from "./AboutContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  try {
    const [timelineRows, legalRows, teamRows, header, settings] = await Promise.all([
      prisma.timelineItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.legalDoc.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.teamMember.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }),
      getHeader("about"),
      getSettings(["about"]),
    ]);

    const timeline: TimelineData[] = timelineRows.map((r) => ({
      id: r.id,
      year: r.year,
      eventEn: r.eventEn,
      eventHi: r.eventHi,
    }));

    const legalDocs: LegalDocData[] = legalRows.map((r) => ({
      id: r.id,
      iconName: r.iconName,
      titleEn: r.titleEn,
      titleHi: r.titleHi,
      number: r.number,
      descEn: r.descEn,
      descHi: r.descHi,
    }));

    const members: TeamMemberData[] = teamRows.map((r) => ({
      id: r.id,
      name: r.name,
      designation: r.designation,
      initials: r.initials,
      phone: r.phone,
    }));

    return <AboutContent timeline={timeline} legalDocs={legalDocs} members={members} header={header} settings={settings} />;
  } catch (error) {
    console.error("Failed to load about page data:", error);

    // Return page with default/fallback data
    const defaultHeader = {
      title: { en: "About Us", hi: "हमारे बारे में" },
      subtitle: { en: "Learn about our mission and journey", hi: "हमारे मिशन और यात्रा के बारे में जानें" },
      tag: { en: "Who We Are", hi: "हम कौन हैं" },
      img: null
    };

    return <AboutContent
      timeline={[]}
      legalDocs={[]}
      members={[]}
      header={defaultHeader}
      settings={{}}
    />;
  }
}
