/**
 * seed-home-settings.ts
 * ---------------------
 * Upserts only the home-page SiteSetting keys used by the inline editor.
 * Safe to run multiple times — uses upsert so existing custom values are preserved.
 *
 * Run: npx tsx prisma/seed-home-settings.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HOME_SETTINGS: { key: string; en: string; hi: string }[] = [
  // Hero — Slide 0
  { key: "home.hero.eyebrow.0", en: "Hariwatika Sewa Samiti",         hi: "हरिवाटिका सेवा समिति" },
  { key: "home.hero.line1.0",   en: "A Relentless",                   hi: "अटूट" },
  { key: "home.hero.line2.0",   en: "Pursuit.",                       hi: "सेवा।" },
  { key: "home.hero.tagline.0", en: "Bringing dignity, healthcare, and lasting change to families across Bihar.", hi: "बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।" },
  { key: "home.hero.desc.0",    en: "For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran.", hi: "25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है।" },
  { key: "home.hero.cta1.0",    en: "Donate Now",                     hi: "दान करें" },
  { key: "home.hero.cta2.0",    en: "Our Work",                       hi: "हमारा काम" },

  // Hero — Slide 1
  { key: "home.hero.eyebrow.1", en: "Green Initiative",               hi: "हरित पहल" },
  { key: "home.hero.line1.1",   en: "Planting",                       hi: "कल का" },
  { key: "home.hero.line2.1",   en: "Tomorrow.",                      hi: "रोपण।" },
  { key: "home.hero.tagline.1", en: "Creating a greener future through large-scale tree plantation across West Champaran.", hi: "पश्चिम चम्पारण में वृहद वृक्षारोपण के माध्यम से हरित भविष्य का निर्माण।" },
  { key: "home.hero.desc.1",    en: "Over 10,000 trees planted with participation from volunteers, students, and community members.", hi: "स्वयंसेवकों, छात्रों और समुदाय के सदस्यों की भागीदारी से 10,000 से अधिक वृक्ष रोपित किए गए।" },
  { key: "home.hero.cta1.1",    en: "Donate Now",                     hi: "दान करें" },
  { key: "home.hero.cta2.1",    en: "Our Work",                       hi: "हमारा काम" },

  // Hero — Slide 2
  { key: "home.hero.eyebrow.2", en: "Community Relief",               hi: "समुदाय राहत" },
  { key: "home.hero.line1.2",   en: "Standing",                       hi: "परिवारों" },
  { key: "home.hero.line2.2",   en: "Together.",                      hi: "के साथ।" },
  { key: "home.hero.tagline.2", en: "Supporting 5000+ families with food, clothing, and essentials throughout the year.", hi: "साल भर 5000+ परिवारों को भोजन, वस्त्र और आवश्यक सामान के साथ सहायता।" },
  { key: "home.hero.desc.2",    en: "Providing relief to underprivileged and disaster-affected families across West Champaran.", hi: "पश्चिम चम्पारण में जरूरतमंद और आपदा प्रभावित परिवारों को सम्मान और करुणा के साथ राहत।" },
  { key: "home.hero.cta1.2",    en: "Donate Now",                     hi: "दान करें" },
  { key: "home.hero.cta2.2",    en: "Our Work",                       hi: "हमारा काम" },

  // Hero — Slide 3
  { key: "home.hero.eyebrow.3", en: "Healthcare Services",            hi: "स्वास्थ्य सेवाएं" },
  { key: "home.hero.line1.3",   en: "Healing",                        hi: "सेवा में" },
  { key: "home.hero.line2.3",   en: "Communities.",                   hi: "समर्पण।" },
  { key: "home.hero.tagline.3", en: "Free health camps and medical assistance for rural low-income communities.", hi: "ग्रामीण निम्न आय समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।" },
  { key: "home.hero.desc.3",    en: "Organizing regular health camps with doctors and volunteers providing essential medical care.", hi: "जरूरतमंदों को आवश्यक चिकित्सा देखभाल और दवाएं प्रदान करने वाले डॉक्टरों के साथ नियमित स्वास्थ्य शिविर।" },
  { key: "home.hero.cta1.3",    en: "Donate Now",                     hi: "दान करें" },
  { key: "home.hero.cta2.3",    en: "Our Work",                       hi: "हमारा काम" },

  // Marquee
  { key: "home.marquee.0", en: "HARIWATIKA SEWA SAMITI",              hi: "हरिवाटिका सेवा समिति" },
  { key: "home.marquee.1", en: "25 YEARS OF SERVICE",                 hi: "25 वर्षों की सेवा" },
  { key: "home.marquee.2", en: "TRANSFORMING LIVES",                  hi: "जीवन बदलना" },
  { key: "home.marquee.3", en: "BUILDING COMMUNITIES",                hi: "समुदाय बनाना" },

  // About / Consistent Service section
  { key: "home.about.h2",   en: "Consistent Service",                 hi: "निरंतर सेवा" },
  { key: "home.about.lead", en: "A quarter-century of compassion. What does it mean to you?", hi: "एक चौथाई सदी की करुणा। आपके लिए इसका क्या अर्थ है?" },
  { key: "home.about.p1",   en: "For more than 25 years, Hariwatika has been resolute in our goal to expand dignity and opportunity to families who need it most. As a community rooted in seva, we've moved with every step of the way and, together, we've achieved a lot.", hi: "25 वर्षों से हरिवाटिका उन परिवारों तक सम्मान और अवसर पहुँचाने में दृढ़ रहा है जिन्हें इसकी सबसे अधिक आवश्यकता है। सेवा में निहित समुदाय के रूप में, हमने हर कदम साथ चलकर बहुत कुछ हासिल किया है।" },
  { key: "home.about.p2",   en: "That means more families than ever have access to healthcare, education, and relief. We know that access to dignity is critically important — but too often it is not enough. What about the quality of that care?", hi: "इसका अर्थ है कि पहले से कहीं अधिक परिवारों को स्वास्थ्य, शिक्षा और राहत तक पहुँच है। हम जानते हैं कि सम्मान तक पहुँच महत्वपूर्ण है — पर अक्सर पर्याप्त नहीं।" },
  { key: "home.about.more", en: "Read More",                          hi: "और पढ़ें" },

  // Mission & Vision cards
  { key: "home.mission.eyebrow", en: "Our Purpose",                  hi: "हमारा उद्देश्य" },
  { key: "home.mission.h2",      en: "Mission & Vision",             hi: "मिशन और विज़न" },
  { key: "home.mission.card.h3", en: "Our Mission",                  hi: "हमारा मिशन" },
  { key: "home.mission.text",    en: "At Hariwatika Sewa Samiti, our mission is simple yet profound: to provide assistance and support to those in need. We believe every person deserves the opportunity to lead a dignified life, free from the burdens of poverty and hardship. Through our comprehensive programs, we aim to create a positive impact in the lives of individuals and families, fostering a spirit of resilience and hope.", hi: "हरिवाटिका सेवा समिति में, हमारा मिशन सरल लेकिन गहरा है: जरूरतमंदों को सहायता और समर्थन प्रदान करना। हम मानते हैं कि हर व्यक्ति गरिमापूर्ण जीवन जीने का हकदार है। हमारे व्यापक कार्यक्रमों के माध्यम से, हम व्यक्तियों और परिवारों के जीवन में सकारात्मक प्रभाव डालने का लक्ष्य रखते हैं।" },
  { key: "home.vision.card.h3",  en: "Our Vision",                   hi: "हमारी विज़न" },
  { key: "home.vision.text",     en: "We envision a society where every individual has access to the resources and support they need to thrive. By bridging gaps in healthcare, education, and social welfare, we aspire to build a future where everyone can achieve their full potential and contribute meaningfully to their communities.", hi: "हम एक ऐसे समाज की कल्पना करते हैं जहाँ प्रत्येक व्यक्ति के पास वे संसाधन और समर्थन हो जो उन्हें फलने-फूलने की आवश्यकता है। स्वास्थ्य सेवा, शिक्षा और सामाजिक कल्याण में अंतराल को पाटकर, हम एक ऐसे भविष्य का निर्माण करना चाहते हैं।" },

  // Pull quote
  { key: "home.quote.text",   en: "Together with our partners, we are working toward a community where every child gets an education, every family has clean water, and high-quality, effective and affordable care reaches everyone.", hi: "अपने सहयोगियों के साथ, हम ऐसे समाज की ओर काम कर रहे हैं जहाँ हर बच्चे को शिक्षा, हर परिवार को स्वच्छ जल और उत्तम स्वास्थ्य सेवा मिले।" },
  { key: "home.quote.who",    en: "— Samiti Patron, Hariwatika Shiv Mandir", hi: "— संरक्षक, हरिवाटिका शिव मंदिर समिति" },
  { key: "home.quote.donate", en: "Donate Today",                     hi: "आज दान करें" },

  // Services section
  { key: "home.services.h2",   en: "What We Do",                      hi: "हम क्या करते हैं" },
  { key: "home.services.lead", en: "Four pillars of seva that have changed thousands of lives.", hi: "सेवा के चार स्तम्भ जिन्होंने हज़ारों जीवन बदले।" },
  { key: "home.services.more", en: "Read More",                        hi: "और पढ़ें" },

  // Challenges / Campaigns section
  { key: "home.challenges.h2",   en: "Challenges & Solutions",        hi: "चुनौतियाँ और समाधान" },
  { key: "home.challenges.lead", en: "A relentless drive to expand dignity and care across West Champaran.", hi: "पश्चिम चम्पारण में सम्मान और सेवा बढ़ाने का अटूट प्रयास।" },
  { key: "home.campaigns.h2",    en: "Active Campaigns",              hi: "सक्रिय अभियान" },
  { key: "home.campaigns.lead",  en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें।" },
  { key: "home.campaigns.btn",   en: "Support This Campaign",         hi: "इस अभियान का साथ दें" },

  // Blog section
  { key: "home.blog.h2",   en: "News & Updates",                      hi: "समाचार और अपडेट" },
  { key: "home.blog.lead", en: "Stories of impact and hope from the field.", hi: "क्षेत्र से प्रभाव और आशा की कहानियाँ।" },
  { key: "home.blog.all",  en: "View All",                            hi: "सब देखें" },
  { key: "home.blog.more", en: "Read More",                           hi: "और पढ़ें" },

  // Join Hands / Help section
  { key: "home.help.h2",   en: "Join Hands With Us",                  hi: "हमारे साथ हाथ मिलाएं" },
  { key: "home.help.lead", en: "On our amazing journey of helping others. Your support can transform lives.", hi: "दूसरों की मदद करने की हमारी अद्भुत यात्रा में। आपका समर्थन जीवन बदल सकता है।" },

  // Partners
  { key: "home.partners.h2", en: "Our Partners & Sponsors",           hi: "हमारे साझेदार और प्रायोजक" },

  // Testimonials
  { key: "home.testimonials.h2", en: "Stories of Hope & Change",      hi: "आशा और परिवर्तन की कहानियाँ" },

  // Stats (labels only — values are hardcoded counters)
  { key: "home.stat.0", en: "Years of Service",       hi: "सेवा के वर्ष" },
  { key: "home.stat.1", en: "Families Helped",        hi: "परिवारों की मदद" },
  { key: "home.stat.2", en: "Trees Planted",          hi: "वृक्ष लगाए" },
  { key: "home.stat.3", en: "Volunteers Trained",     hi: "स्वयंसेवक प्रशिक्षित" },

  // Images
  { key: "home.img.portrait1", en: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop", hi: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop" },
  { key: "home.img.quote",     en: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80&auto=format&fit=crop",    hi: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80&auto=format&fit=crop" },

  // Hero slide images
  { key: "home.hero.img.0", en: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop", hi: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop" },
  { key: "home.hero.img.1", en: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80&auto=format&fit=crop", hi: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80&auto=format&fit=crop" },
  { key: "home.hero.img.2", en: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80&auto=format&fit=crop", hi: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80&auto=format&fit=crop" },
  { key: "home.hero.img.3", en: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=80&auto=format&fit=crop", hi: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=80&auto=format&fit=crop" },
];

async function main() {
  console.log(`Upserting ${HOME_SETTINGS.length} home SiteSettings…`);

  for (const row of HOME_SETTINGS) {
    await prisma.siteSetting.upsert({
      where:  { key: row.key },
      update: {},                                          // don't overwrite existing custom edits
      create: { key: row.key, en: row.en, hi: row.hi, group: "home" },
    });
  }

  console.log("Done. All home settings are now in the database.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
