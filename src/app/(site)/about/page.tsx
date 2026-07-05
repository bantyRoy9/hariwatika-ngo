import { prisma } from "@/lib/db";
import { getHeader } from "@/lib/content";
import AboutContent, { TimelineData, LegalDocData, TeamMemberData, JourneyCardData, HeroStatData } from "./AboutContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  try {
    const [timelineRows, legalRows, teamRows, journeyRows, heroStatRows, header] = await Promise.all([
      prisma.timelineItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.legalDoc.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.teamMember.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }),
      prisma.journeyCard.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.heroStat.findMany({ where: { page: "about" }, orderBy: { sortOrder: "asc" } }),
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

    const journeyCards: JourneyCardData[] = journeyRows.map((r) => ({
      id: r.id,
      number: r.number,
      titleEn: r.titleEn,
      titleHi: r.titleHi,
      descEn: r.descEn,
      descHi: r.descHi,
      image: r.image,
      stat: r.stat,
      statLabelEn: r.statLabelEn,
      statLabelHi: r.statLabelHi,
    }));

    const heroStats: HeroStatData[] = heroStatRows.map((r) => ({
      id: r.id,
      value: r.value,
      labelEn: r.labelEn,
      labelHi: r.labelHi,
    }));

    // If no data in database, use defaults
    const defaultJourneyCards: JourneyCardData[] = journeyCards.length > 0 ? journeyCards : [
      {
        id: 0,
        number: "01",
        titleEn: "Foundation & Early Years",
        titleHi: "स्थापना और प्रारंभिक वर्ष",
        descEn: "Established in 2000 at the sacred Hariwatika Shiv Mandir with a vision to help families conduct dignified marriages. What started as a small community initiative has grown into a comprehensive welfare organization serving the entire region.",
        descHi: "2000 में पवित्र हरिवाटिका शिव मंदिर में स्थापित, परिवारों को सम्मानजनक विवाह कराने में मदद करने के दृष्टिकोण के साथ। एक छोटी सामुदायिक पहल से शुरू होकर पूरे क्षेत्र की सेवा करने वाले व्यापक कल्याण संगठन में विकसित हुआ।",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop",
        stat: "2000",
        statLabelEn: "Year Founded",
        statLabelHi: "स्थापना वर्ष",
      },
      {
        id: 0,
        number: "02",
        titleEn: "Growth & Expansion",
        titleHi: "विकास और विस्तार",
        descEn: "Expanded services to include tree plantation, poverty relief, healthcare camps, and educational support. Registered as a recognized welfare organization with transparent operations.",
        descHi: "सेवाओं का विस्तार वृक्षारोपण, गरीबी राहत, स्वास्थ्य शिविर और शैक्षिक सहायता शामिल करने के लिए किया गया। पारदर्शी संचालन के साथ मान्यता प्राप्त कल्याण संगठन के रूप में पंजीकृत।",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop",
        stat: "100+",
        statLabelEn: "Villages Reached",
        statLabelHi: "गांव पहुंचे",
      },
      {
        id: 0,
        number: "03",
        titleEn: "Today & Tomorrow",
        titleHi: "आज और कल",
        descEn: "Serving thousands of families annually with 200+ trained volunteers and a network of dedicated partners. Our commitment to seva continues to grow stronger with each passing year.",
        descHi: "200+ प्रशिक्षित स्वयंसेवकों और समर्पित साझेदारों के नेटवर्क के साथ सालाना हजारों परिवारों की सेवा। सेवा के प्रति हमारी प्रतिबद्धता हर गुजरते साल के साथ मजबूत होती जा रही है।",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80&auto=format&fit=crop",
        stat: "5K+",
        statLabelEn: "Annual Beneficiaries",
        statLabelHi: "वार्षिक लाभार्थी",
      },
    ];

    const defaultHeroStats: HeroStatData[] = heroStats.length > 0 ? heroStats : [
      { id: 0, value: "25+", labelEn: "Years of Service", labelHi: "वर्षों की सेवा" },
      { id: 0, value: "5000+", labelEn: "Families Helped", labelHi: "परिवारों की मदद" },
      { id: 0, value: "100+", labelEn: "Villages Reached", labelHi: "गांव पहुंचे" },
      { id: 0, value: "200+", labelEn: "Volunteers", labelHi: "स्वयंसेवक" },
    ];

    return <AboutContent 
      timeline={timeline} 
      legalDocs={legalDocs} 
      members={members} 
      journeyCards={defaultJourneyCards}
      heroStats={defaultHeroStats}
      header={header} 
    />;
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
      journeyCards={[]}
      heroStats={[]}
      header={defaultHeader}
      settings={{}}
    />;
  }
}
