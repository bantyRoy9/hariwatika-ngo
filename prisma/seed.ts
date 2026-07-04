// Prisma seed — transcribes hardcoded page content into the DB verbatim.
// Run: tsx prisma/seed.ts  (after adding to package.json: "prisma": { "seed": "tsx prisma/seed.ts" })
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ── Image constants (mirror src/theme/lenity.ts IMG) ──
const IMG = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  about1: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
  about2: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
  avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80&auto=format&fit=crop",
  whatWeDo: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80&auto=format&fit=crop",
  community: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop",
  children: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80&auto=format&fit=crop",
  trees: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=80&auto=format&fit=crop",
  relief: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80&auto=format&fit=crop",
};

// Home page IMG block (page.tsx) — distinct keys
const HOME_IMG = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  portrait1: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
  portrait2: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
  portrait3: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=700&q=80&auto=format&fit=crop",
  quote: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80&auto=format&fit=crop",
  svc0: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&auto=format&fit=crop",
  svc1: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
  svc2: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
};

async function main() {
  // ── Idempotent reset ──
  await prisma.$transaction([
    prisma.donationSubmission.deleteMany(),
    prisma.blogPost.deleteMany(),
    prisma.project.deleteMany(),
    prisma.futurePlan.deleteMany(),
    prisma.teamMember.deleteMany(),
    prisma.timelineItem.deleteMany(),
    prisma.legalDoc.deleteMany(),
    prisma.financialReport.deleteMany(),
    prisma.expenseCategory.deleteMany(),
    prisma.reportDocument.deleteMany(),
    prisma.internshipListing.deleteMany(),
    prisma.homeService.deleteMany(),
    prisma.homeStat.deleteMany(),
    prisma.homeCampaign.deleteMany(),
    prisma.homePillar.deleteMany(),
    prisma.navLink.deleteMany(),
    prisma.socialLink.deleteMany(),
    prisma.volunteerBenefit.deleteMany(),
    prisma.optionItem.deleteMany(),
    prisma.notificationDelivery.deleteMany(),
    prisma.notificationCampaign.deleteMany(),
    prisma.notificationTemplate.deleteMany(),
    prisma.siteSetting.deleteMany(),
    prisma.translation.deleteMany(),
    prisma.mediaAsset.deleteMany(),
    prisma.adminUser.deleteMany(),
  ]);

  // ════════════════════════════════════════════════
  // ADMIN
  // ════════════════════════════════════════════════
  await prisma.adminUser.create({
    data: { username: "admin", passwordHash: bcrypt.hashSync("hariwatika123", 10) },
  });

  await prisma.notificationTemplate.createMany({
    data: [
      {
        key: "volunteer_hi_event_invite",
        displayName: "Volunteer Event Invite (Hindi)",
        language: "hi",
        providerContentSid: "HX_HARIWATIKA_VOLUNTEER_HI",
        variables: JSON.stringify(["programName", "eventDate", "contactName"]),
      },
      {
        key: "volunteer_en_event_invite",
        displayName: "Volunteer Event Invite (English)",
        language: "en",
        providerContentSid: "HX_HARIWATIKA_VOLUNTEER_EN",
        variables: JSON.stringify(["programName", "eventDate", "contactName"]),
      },
    ],
  });

  // ════════════════════════════════════════════════
  // HOME — repeatables
  // ════════════════════════════════════════════════
  await prisma.homeService.createMany({
    data: [
      { iconName: "Heart", titleEn: "Vivah Seva", titleHi: "विवाह सेवा", descEn: "Facilitating marriages for underprivileged families with complete ceremony arrangements.", descHi: "गरीब परिवारों के लिए पूर्ण विवाह व्यवस्था।", sortOrder: 0 },
      { iconName: "TreePine", titleEn: "Vrikshaaropan", titleHi: "वृक्षारोपण", descEn: "Large-scale tree plantation drives to green the region across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने हेतु वृक्षारोपण अभियान।", sortOrder: 1 },
      { iconName: "Users", titleEn: "Garib Sahayata", titleHi: "गरीब सहायता", descEn: "Food, clothing, and essentials to underprivileged and disaster-affected families.", descHi: "जरूरतमंद परिवारों को भोजन, वस्त्र और आवश्यक सामान।", sortOrder: 2 },
      { iconName: "Stethoscope", titleEn: "Swasthya Seva", titleHi: "स्वास्थ्य सेवा", descEn: "Free health camps and medical assistance for rural low-income communities.", descHi: "ग्रामीण समुदायों हेतु नि:शुल्क स्वास्थ्य शिविर।", sortOrder: 3 },
    ],
  });

  await prisma.homeStat.createMany({
    data: [
      { value: "25+", labelEn: "Years of Service", labelHi: "सेवा के वर्ष", sortOrder: 0 },
      { value: "5000+", labelEn: "Families Helped", labelHi: "परिवारों की मदद", sortOrder: 1 },
      { value: "10000+", labelEn: "Trees Planted", labelHi: "वृक्ष लगाए", sortOrder: 2 },
      { value: "200+", labelEn: "Marriages Facilitated", labelHi: "विवाह सम्पन्न", sortOrder: 3 },
    ],
  });

  await prisma.homeCampaign.createMany({
    data: [
      { titleEn: "Mass Marriage Ceremony 2025", titleHi: "सामूहिक विवाह समारोह 2025", raised: 85000, goal: 100000, backers: 42, sortOrder: 0 },
      { titleEn: "10,000 Trees This Monsoon", titleHi: "इस मानसून 10,000 पेड़", raised: 32000, goal: 50000, backers: 118, sortOrder: 1 },
      { titleEn: "Winter Relief Drive", titleHi: "शीतकालीन राहत अभियान", raised: 18500, goal: 30000, backers: 67, sortOrder: 2 },
    ],
  });

  await prisma.homePillar.createMany({
    data: [
      { iconName: "BookOpen", titleEn: "Education", titleHi: "शिक्षा", descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग", sortOrder: 0 },
      { iconName: "Droplets", titleEn: "Water", titleHi: "जल", descEn: "Clean water access for all", descHi: "सभी के लिए स्वच्छ जल", sortOrder: 1 },
      { iconName: "Wheat", titleEn: "Food", titleHi: "अन्न", descEn: "No one sleeps hungry", descHi: "कोई भूखा न सोए", sortOrder: 2 },
      { iconName: "Stethoscope", titleEn: "Healthcare", titleHi: "स्वास्थ्य", descEn: "Free medical assistance", descHi: "नि:शुल्क चिकित्सा सहायता", sortOrder: 3 },
    ],
  });

  // ════════════════════════════════════════════════
  // SITE SETTINGS — home singleton strings + per-page headers + contact/bank + logo + IMG keys
  // ════════════════════════════════════════════════
  const settings: { key: string; en: string; hi: string; img?: string | null; group?: string }[] = [
    // Home hero
    { key: "home.hero.eyebrow", en: "Hariwatika Vivah Sewa Samiti", hi: "हरिवाटिका विवाह सेवा समिति", group: "home" },
    { key: "home.hero.line1", en: "A Relentless", hi: "अटूट", group: "home" },
    { key: "home.hero.line2", en: "Pursuit.", hi: "सेवा।", group: "home" },
    { key: "home.hero.tagline", en: "To bring dignity, marriage, and lasting change to families across Bihar.", hi: "बिहार के परिवारों को सम्मान, विवाह और स्थायी बदलाव देने का संकल्प।", group: "home" },
    { key: "home.hero.sub", en: "For over 25 years Hariwatika Shiv Mandir Vivah Sewa Samiti has facilitated marriages, planted forests, and stood with the poor across West Champaran — funded by a network of donors and volunteers who believe in this work.", hi: "25 वर्षों से हरिवाटिका शिव मंदिर विवाह सेवा समिति ने पश्चिम चम्पारण में विवाह, वृक्षारोपण और गरीब सहायता की है — दानदाताओं और स्वयंसेवकों के सहयोग से।", group: "home" },
    { key: "home.hero.cta1", en: "Donate Now", hi: "दान करें", group: "home" },
    { key: "home.hero.cta2", en: "Our Work", hi: "हमारा काम", group: "home" },
    { key: "home.hero.scroll", en: "Learn More", hi: "और जानें", group: "home" },
    // Home about
    { key: "home.about.h2", en: "Consistent Service", hi: "निरंतर सेवा", group: "home" },
    { key: "home.about.lead", en: "A quarter-century of compassion. What does it mean to you?", hi: "एक चौथाई सदी की करुणा। आपके लिए इसका क्या अर्थ है?", group: "home" },
    { key: "home.about.p1", en: "For more than 25 years, Hariwatika has been resolute in our goal to expand dignity and opportunity to families who need it most. As a community rooted in seva, we've moved with every step of the way and, together, we've achieved a lot.", hi: "25 वर्षों से हरिवाटिका उन परिवारों तक सम्मान और अवसर पहुँचाने में दृढ़ रहा है जिन्हें इसकी सबसे अधिक आवश्यकता है। सेवा में निहित समुदाय के रूप में, हमने हर कदम साथ चलकर बहुत कुछ हासिल किया है।", group: "home" },
    { key: "home.about.p2", en: "That means more families than ever have access to marriage assistance, healthcare, and relief. We know that access to dignity is critically important — but too often it is not enough. What about the quality of that care?", hi: "इसका अर्थ है कि पहले से कहीं अधिक परिवारों को विवाह सहायता, स्वास्थ्य और राहत तक पहुँच है। हम जानते हैं कि सम्मान तक पहुँच महत्वपूर्ण है — पर अक्सर पर्याप्त नहीं। उस सेवा की गुणवत्ता का क्या?", group: "home" },
    { key: "home.about.more", en: "Read More", hi: "और पढ़ें", group: "home" },
    // Home pull-quote
    { key: "home.quote.text", en: "“Together with our partners, we are working toward a community where no family is denied a dignified marriage, and where high-quality, effective and affordable care reaches everyone.”", hi: "“अपने सहयोगियों के साथ, हम ऐसे समाज की ओर काम कर रहे हैं जहाँ किसी परिवार को सम्मानजनक विवाह से वंचित न किया जाए।”", group: "home" },
    { key: "home.quote.who", en: "— Samiti Patron, Hariwatika Shiv Mandir", hi: "— संरक्षक, हरिवाटिका शिव मंदिर समिति", group: "home" },
    { key: "home.quote.donate", en: "Donate Today", hi: "आज दान करें", group: "home" },
    // Home challenges
    { key: "home.challenges.h2", en: "Challenges & Solutions", hi: "चुनौतियाँ और समाधान", group: "home" },
    { key: "home.challenges.lead", en: "A relentless drive to expand dignity and care across West Champaran.", hi: "पश्चिम चम्पारण में सम्मान और सेवा बढ़ाने का अटूट प्रयास।", group: "home" },
    // Home services section headings
    { key: "home.services.h2", en: "What We Do", hi: "हम क्या करते हैं", group: "home" },
    { key: "home.services.lead", en: "Four pillars of seva that have changed thousands of lives.", hi: "सेवा के चार स्तम्भ जिन्होंने हज़ारों जीवन बदले।", group: "home" },
    { key: "home.services.more", en: "Read More", hi: "और पढ़ें", group: "home" },
    // Home campaigns
    { key: "home.campaigns.h2", en: "Active Campaigns", hi: "सक्रिय अभियान", group: "home" },
    { key: "home.campaigns.lead", en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें।", group: "home" },
    { key: "home.campaigns.btn", en: "Support This Campaign", hi: "इस अभियान का साथ दें", group: "home" },
    // Home blog
    { key: "home.blog.h2", en: "News & Updates", hi: "समाचार और अपडेट", group: "home" },
    { key: "home.blog.lead", en: "Stories of impact and hope from the field.", hi: "क्षेत्र से प्रभाव और आशा की कहानियाँ।", group: "home" },
    { key: "home.blog.all", en: "View All", hi: "सब देखें", group: "home" },
    { key: "home.blog.more", en: "Read More", hi: "और पढ़ें", group: "home" },

    // Per-page headers
    { key: "header.about.tag", en: "Established 2000", hi: "Established 2000", group: "header" },
    { key: "header.about.title", en: "हमारे बारे में", hi: "हमारे बारे में", group: "header" },
    { key: "header.about.subtitle", en: "A community-driven charitable organization serving underprivileged families in West Champaran, Bihar for over 25 years.", hi: "A community-driven charitable organization serving underprivileged families in West Champaran, Bihar for over 25 years.", group: "header" },

    { key: "header.blog.tag", en: "News & Updates", hi: "समाचार और अपडेट", group: "header" },
    { key: "header.blog.title", en: "समाचार और अपडेट", hi: "समाचार और अपडेट", group: "header" },
    { key: "header.blog.subtitle", en: "Stories of impact and hope from the field.", hi: "Stories of impact and hope from the field.", group: "header" },
    { key: "header.blog.intro", en: "Stay updated with our latest activities, events, and community programs.", hi: "Stay updated with our latest activities, events, and community programs.", group: "header" },

    { key: "header.projects.tag", en: "Our Work", hi: "Our Work", group: "header" },
    { key: "header.projects.title", en: "हमारे प्रोजेक्ट्स", hi: "हमारे प्रोजेक्ट्स", group: "header" },
    { key: "header.projects.subtitle", en: "Ongoing and completed projects making a real difference in West Champaran communities.", hi: "Ongoing and completed projects making a real difference in West Champaran communities.", group: "header" },

    { key: "header.transparency.tag", en: "Transparency", hi: "Transparency", group: "header" },
    { key: "header.transparency.title", en: "वार्षिक रिपोर्ट", hi: "वार्षिक रिपोर्ट", group: "header" },
    { key: "header.transparency.subtitle", en: "We believe in full financial transparency. Here are our audited annual reports and financial statements.", hi: "We believe in full financial transparency. Here are our audited annual reports and financial statements.", group: "header" },

    { key: "header.internship.tag", en: "Internship Program", hi: "Internship Program", group: "header" },
    { key: "header.internship.title", en: "Internship Program", hi: "Internship Program", group: "header" },
    { key: "header.internship.subtitle", en: "Gain real-world social work experience and receive an official certificate upon completion.", hi: "Gain real-world social work experience and receive an official certificate upon completion.", group: "header" },

    { key: "header.donate.tag", en: "Support Our Mission", hi: "Support Our Mission", group: "header" },
    { key: "header.donate.title", en: "दान करें", hi: "दान करें", group: "header" },
    { key: "header.donate.subtitle", en: "Your donation directly supports marriages, tree plantation, poverty relief, and community health in Bihar.", hi: "Your donation directly supports marriages, tree plantation, poverty relief, and community health in Bihar.", group: "header" },

    { key: "header.contact.tag", en: "Get in Touch", hi: "Get in Touch", group: "header" },
    { key: "header.contact.title", en: "संपर्क करें", hi: "संपर्क करें", group: "header" },
    { key: "header.contact.subtitle", en: "Reach out to us for any queries, volunteering, or assistance. We respond within 24 hours.", hi: "Reach out to us for any queries, volunteering, or assistance. We respond within 24 hours.", group: "header" },

    { key: "header.volunteer.tag", en: "Get Involved", hi: "Get Involved", group: "header" },
    { key: "header.volunteer.title", en: "स्वयंसेवक बनें", hi: "स्वयंसेवक बनें", group: "header" },
    { key: "header.volunteer.subtitle", en: "Join our volunteer family and make a meaningful impact in your community.", hi: "Join our volunteer family and make a meaningful impact in your community.", group: "header" },

    { key: "header.registration.tag", en: "Marriage Registration", hi: "विवाह पंजीकरण", group: "header" },
    { key: "header.registration.title", en: "विवाह पंजीकरण", hi: "विवाह पंजीकरण", group: "header" },
    { key: "header.registration.subtitle", en: "Register for marriage assistance from Hariwatika Shiv Mandir Vivah Sewa Samiti.", hi: "Register for marriage assistance from Hariwatika Shiv Mandir Vivah Sewa Samiti.", group: "header" },

    // Contact / office (lenity CONTACT + contact page)
    { key: "contact.address", en: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar", hi: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar", group: "contact" },
    { key: "contact.address.full", en: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar — 845438", hi: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar — 845438", group: "contact" },
    { key: "contact.phone", en: "+91 94733 31919", hi: "+91 94733 31919", group: "contact" },
    { key: "contact.phone1", en: "+91 9473331919", hi: "+91 9473331919", group: "contact" },
    { key: "contact.phone2", en: "+91 9288390016", hi: "+91 9288390016", group: "contact" },
    { key: "contact.email", en: "hariwatikaseva@gmail.com", hi: "hariwatikaseva@gmail.com", group: "contact" },
    { key: "contact.hours", en: "Mon–Sat: 9:00–18:00", hi: "Mon–Sat: 9:00–18:00", group: "contact" },
    { key: "contact.hours.display", en: "Mon–Sat: 10:00 AM – 5:00 PM", hi: "Mon–Sat: 10:00 AM – 5:00 PM", group: "contact" },
    { key: "contact.hours.note", en: "Sunday by appointment", hi: "Sunday by appointment", group: "contact" },
    { key: "contact.whatsapp", en: "919473331919", hi: "919473331919", group: "contact" },

    // Bank + UPI + tax (donate page)
    { key: "bank.accountName", en: "Hariwatika Shiv Mandir Vivah Sewa Samiti", hi: "Hariwatika Shiv Mandir Vivah Sewa Samiti", group: "bank" },
    { key: "bank.accountNo", en: "XXXX XXXX XXXX 1234", hi: "XXXX XXXX XXXX 1234", group: "bank" },
    { key: "bank.ifsc", en: "SBIN0XXXXXX", hi: "SBIN0XXXXXX", group: "bank" },
    { key: "bank.name", en: "State Bank of India", hi: "State Bank of India", group: "bank" },
    { key: "bank.branch", en: "Bettiah, Bihar", hi: "Bettiah, Bihar", group: "bank" },
    { key: "upi.id", en: "hariwatikaseva@upi", hi: "hariwatikaseva@upi", group: "bank" },
    { key: "donate.taxBenefit", en: "Donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.", hi: "Donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.", group: "donate" },

    // Logo / brand
    { key: "logo.text", en: "Hariwatika", hi: "Hariwatika", group: "brand" },
    { key: "logo.subtext", en: "Shiv Mandir Vivah Sewa Samiti", hi: "Shiv Mandir Vivah Sewa Samiti", group: "brand" },
    { key: "footer.motto", en: "सेवा ही धर्म है", hi: "सेवा ही धर्म है", group: "footer" },
    { key: "footer.bio", en: "हरिवाटिका शिव मंदिर विवाह सेवा समिति — गरीब परिवारों की विवाह सेवा, वृक्षारोपण और समाज उत्थान के लिए समर्पित।", hi: "हरिवाटिका शिव मंदिर विवाह सेवा समिति — गरीब परिवारों की विवाह सेवा, वृक्षारोपण और समाज उत्थान के लिए समर्पित।", group: "footer" },
    { key: "footer.copyright", en: "© 2024 Hariwatika Shiv Mandir Vivah Sewa Samiti. All rights reserved.", hi: "© 2024 Hariwatika Shiv Mandir Vivah Sewa Samiti. All rights reserved.", group: "footer" },
    { key: "footer.madeWith", en: "Made with ♥ for community service", hi: "Made with ♥ for community service", group: "footer" },

    // Image keys (IMG.* with img column)
    { key: "IMG.hero", en: "", hi: "", img: IMG.hero, group: "image" },
    { key: "IMG.about1", en: "", hi: "", img: IMG.about1, group: "image" },
    { key: "IMG.about2", en: "", hi: "", img: IMG.about2, group: "image" },
    { key: "IMG.avatar", en: "", hi: "", img: IMG.avatar, group: "image" },
    { key: "IMG.whatWeDo", en: "", hi: "", img: IMG.whatWeDo, group: "image" },
    { key: "IMG.community", en: "", hi: "", img: IMG.community, group: "image" },
    { key: "IMG.children", en: "", hi: "", img: IMG.children, group: "image" },
    { key: "IMG.trees", en: "", hi: "", img: IMG.trees, group: "image" },
    { key: "IMG.relief", en: "", hi: "", img: IMG.relief, group: "image" },
    // Home-page IMG block (page.tsx uses its own IMG)
    { key: "IMG.home.hero", en: "", hi: "", img: HOME_IMG.hero, group: "image" },
    { key: "IMG.home.portrait1", en: "", hi: "", img: HOME_IMG.portrait1, group: "image" },
    { key: "IMG.home.portrait2", en: "", hi: "", img: HOME_IMG.portrait2, group: "image" },
    { key: "IMG.home.portrait3", en: "", hi: "", img: HOME_IMG.portrait3, group: "image" },
    { key: "IMG.home.quote", en: "", hi: "", img: HOME_IMG.quote, group: "image" },
    { key: "IMG.home.svc0", en: "", hi: "", img: HOME_IMG.svc0, group: "image" },
    { key: "IMG.home.svc1", en: "", hi: "", img: HOME_IMG.svc1, group: "image" },
    { key: "IMG.home.svc2", en: "", hi: "", img: HOME_IMG.svc2, group: "image" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.create({
      data: { key: s.key, en: s.en, hi: s.hi, img: s.img ?? null, group: s.group ?? "general" },
    });
  }

  // ════════════════════════════════════════════════
  // MEDIA ASSETS — one per IMG (lenity.ts)
  // ════════════════════════════════════════════════
  await prisma.mediaAsset.createMany({
    data: [
      { url: IMG.hero, alt: "hero", category: "general" },
      { url: IMG.about1, alt: "about1", category: "general" },
      { url: IMG.about2, alt: "about2", category: "general" },
      { url: IMG.avatar, alt: "avatar", category: "general" },
      { url: IMG.whatWeDo, alt: "whatWeDo", category: "general" },
      { url: IMG.community, alt: "community", category: "general" },
      { url: IMG.children, alt: "children", category: "general" },
      { url: IMG.trees, alt: "trees", category: "general" },
      { url: IMG.relief, alt: "relief", category: "general" },
    ],
  });

  // ════════════════════════════════════════════════
  // BLOG POSTS (blog/page.tsx posts — 9)
  // ════════════════════════════════════════════════
  const blogPosts = [
    { category: "Events", date: "15 Dec 2024", title: "Successful Saptapadi Vivah Mahotsav — 12 Couples Blessed", excerpt: "This year's mass marriage ceremony witnessed 12 families unite under one roof with the blessings of Shiv Mandir. The grand event was attended by over 500 community members at Sukanya Utsav Bhawan, Hariwatika Chowk.", tags: ["vivah", "ceremony", "community"], img: IMG.community },
    { category: "Environment", date: "05 Nov 2024", title: "Van Mahotsav: 2000 Saplings Planted in West Champaran", excerpt: "Volunteers and community members came together to plant 2000 saplings across Bettiah and surrounding villages. School children, teachers, and local officials participated in this green initiative.", tags: ["environment", "trees", "campaign"], img: IMG.trees },
    { category: "Relief Work", date: "20 Oct 2024", title: "Winter Blanket Distribution Drive Reaches 500 Families", excerpt: "As winter approached, our team distributed warm blankets and essentials to 500 underprivileged families across 8 villages in West Champaran. Priority was given to the elderly and children.", tags: ["relief", "winter", "garib-sahayata"], img: IMG.relief },
    { category: "Health", date: "10 Oct 2024", title: "Free Health Camp — 300 Patients Examined at Bettiah", excerpt: "Our quarterly free health camp provided consultations to 300+ patients. Services included blood pressure check, diabetes screening, eye examination, and free distribution of essential medicines.", tags: ["health", "camp", "free-medical"], img: IMG.children },
    { category: "Education", date: "25 Sep 2024", title: "Scholarship Distribution Ceremony for 50 Girl Students", excerpt: "Fifty deserving girl students from economically weak backgrounds received scholarship awards to support their higher education. The ceremony was presided over by Director Ramanand Yadav.", tags: ["education", "girls", "scholarship"], img: IMG.about1 },
    { category: "Announcement", date: "01 Sep 2024", title: "Annual General Meeting 2024 — Key Decisions Announced", excerpt: "The Annual General Meeting of Hariwatika Shiv Mandir Vivah Sewa Samiti was held at Sukanya Utsav Bhawan. New office-bearers were elected, financial reports were presented, and future plans discussed.", tags: ["agm", "announcement", "meeting"], img: IMG.whatWeDo },
    { category: "Events", date: "15 Aug 2024", title: "Independence Day Celebration — Flag Hoisting & Cultural Program", excerpt: "Hariwatika Samiti celebrated Independence Day with flag hoisting, patriotic songs, and a cultural program by local school students. Sweets were distributed to over 200 attendees.", tags: ["independence-day", "celebration", "patriotic"], img: IMG.about2 },
    { category: "Relief Work", date: "20 Jul 2024", title: "Flood Relief Camp for Flood-Affected Families", excerpt: "Heavy rainfall and floods in parts of West Champaran displaced numerous families. Our team set up a relief camp providing food, water, and essential supplies to affected households.", tags: ["flood", "relief", "emergency"], img: IMG.relief },
    { category: "Environment", date: "05 Jun 2024", title: "World Environment Day: Oath-Taking and Plantation Drive", excerpt: "On World Environment Day, members pledged to plant at least 10 trees each and participate in community clean-up drives. Over 500 saplings were planted across Bettiah.", tags: ["environment-day", "plantation", "awareness"], img: IMG.trees },
  ];
  await prisma.blogPost.createMany({
    data: blogPosts.map((p, i) => ({
      category: p.category,
      date: p.date,
      titleEn: p.title,
      titleHi: p.title, // ponytail: no Hindi in source; duplicate EN as placeholder
      excerptEn: p.excerpt,
      excerptHi: p.excerpt,
      tags: JSON.stringify(p.tags),
      img: p.img,
      published: true,
      sortOrder: i,
    })),
  });

  // ════════════════════════════════════════════════
  // PROJECTS (projects/page.tsx — 6)
  // ════════════════════════════════════════════════
  const projects = [
    { category: "Vivah Seva", iconName: "Heart", status: "ongoing", title: "Saptapadi Vivah Mahotsav 2025", desc: "Annual mass marriage ceremony to facilitate dignified weddings for 20+ underprivileged families, covering all ceremony needs including venue, priest, meals, gifts, and legal registration.", raised: 85000, goal: 100000, location: "Sukanya Utsav Bhawan, Bettiah", date: "February 2025", beneficiaries: "20+ families" },
    { category: "Vrikshaaropan", iconName: "TreePine", status: "ongoing", title: "Hariyali Abhiyan — 10,000 Trees 2024-25", desc: "Planting 10,000 trees across West Champaran during the monsoon season. Species include neem, peepal, mango, and fruit trees. Local school children and youth volunteers participate.", raised: 32000, goal: 50000, location: "West Champaran blocks", date: "June–Sep 2025", beneficiaries: "Entire region" },
    { category: "Garib Sahayata", iconName: "Users", status: "ongoing", title: "Winter Relief Drive 2024", desc: "Distributing warm blankets, sweaters, and essential food items to 500+ underprivileged families before winter arrives. Priority given to elderly, widows, and families with young children.", raised: 18500, goal: 30000, location: "Bettiah & surrounding villages", date: "Nov–Jan 2024-25", beneficiaries: "500+ families" },
    { category: "Swasthya Seva", iconName: "Stethoscope", status: "ongoing", title: "Free Health Camp — Quarterly Drive", desc: "Quarterly free health camps in partnership with local doctors and NGOs. Services include general checkup, blood sugar, BP testing, eye care, and free medicines distribution.", raised: 12000, goal: 20000, location: "Hariwatika Chowk & 3 villages", date: "Every Quarter", beneficiaries: "200+ per camp" },
    { category: "Education", iconName: "BookOpen", status: "ongoing", title: "Scholarship Program for Girls 2024-25", desc: "Providing scholarships to 50 deserving girl students from poor families for higher education. ₹5,000 per student per year for books, school fees, and stationery.", raised: 45000, goal: 250000, location: "West Champaran", date: "Academic Year 2024-25", beneficiaries: "50 girls" },
    { category: "Vrikshaaropan", iconName: "TreePine", status: "completed", title: "Van Mahotsav 2024 — 2000 Trees Planted", desc: "Successfully planted 2000 saplings across Bettiah with participation from 200+ volunteers, school students, and government officials.", raised: 25000, goal: 25000, location: "Bettiah, West Champaran", date: "Jul 2024", beneficiaries: "Entire Bettiah region" },
  ];
  await prisma.project.createMany({
    data: projects.map((p, i) => ({
      category: p.category,
      iconName: p.iconName,
      status: p.status,
      titleEn: p.title,
      titleHi: p.title,
      descEn: p.desc,
      descHi: p.desc,
      raised: p.raised,
      goal: p.goal,
      location: p.location,
      date: p.date,
      beneficiaries: p.beneficiaries,
      sortOrder: i,
    })),
  });

  // FUTURE PLANS
  const futurePlans = [
    { title: "Community Library & Reading Room", year: "2025", desc: "Setting up a free library with 500+ books for youth and children." },
    { title: "Digital Literacy Program", year: "2025", desc: "Teaching basic computer skills and internet usage to rural women." },
    { title: "Organic Farming Initiative", year: "2026", desc: "Helping farmers adopt organic practices for better yield and health." },
    { title: "Ambulance Service for Villages", year: "2026", desc: "Dedicated ambulance service for emergency medical transport." },
    { title: "Drinking Water Purification Units", year: "2027", desc: "Installing water purification plants in 10 villages." },
  ];
  await prisma.futurePlan.createMany({
    data: futurePlans.map((p, i) => ({ titleEn: p.title, titleHi: p.title, year: p.year, descEn: p.desc, descHi: p.desc, sortOrder: i })),
  });

  // ════════════════════════════════════════════════
  // ABOUT — timeline + legal docs
  // ════════════════════════════════════════════════
  const timeline = [
    { year: "2000", event: "Foundation established at Hariwatika Chowk, Bettiah" },
    { year: "2002", event: "First mass marriage ceremony — 5 couples blessed" },
    { year: "2005", event: "Vrikshaaropan program launched — 1000 trees planted" },
    { year: "2010", event: "Garib Sahayata expanded to 5 blocks of West Champaran" },
    { year: "2015", event: "Health camps introduced — free medical checkups for 1000+ families" },
    { year: "2020", event: "Digital outreach and e-invitation services started" },
    { year: "2024", event: "25+ years milestone — 5000+ families served" },
  ];
  await prisma.timelineItem.createMany({
    data: timeline.map((t, i) => ({ year: t.year, eventEn: t.event, eventHi: t.event, sortOrder: i })),
  });

  const legalDocs = [
    { iconName: "FileText", title: "Trust Registration", number: "Reg. No. XXXXX/2000", desc: "Registered under the Bihar Trust Act" },
    { iconName: "ShieldCheck", title: "PAN Card", number: "AAATH1234X", desc: "Permanent Account Number — Income Tax Dept." },
    { iconName: "Award", title: "80G Certificate", number: "80G/2024-25", desc: "Donations eligible for 50% tax deduction" },
    { iconName: "Award", title: "12A Certificate", number: "12A/2001", desc: "Exemption under Income Tax Act, 1961" },
  ];
  await prisma.legalDoc.createMany({
    data: legalDocs.map((d, i) => ({ iconName: d.iconName, titleEn: d.title, titleHi: d.title, number: d.number, descEn: d.desc, descHi: d.desc, sortOrder: i })),
  });

  // ════════════════════════════════════════════════
  // TRANSPARENCY — reports, expense categories, documents
  // ════════════════════════════════════════════════
  const reports = [
    { year: "2023–24", totalIncome: 850000, totalExpense: 720000, beneficiaries: 480, surplus: 130000 },
    { year: "2022–23", totalIncome: 640000, totalExpense: 580000, beneficiaries: 350, surplus: 60000 },
    { year: "2021–22", totalIncome: 520000, totalExpense: 490000, beneficiaries: 290, surplus: 30000 },
    { year: "2020–21", totalIncome: 380000, totalExpense: 360000, beneficiaries: 210, surplus: 20000 },
    { year: "2019–20", totalIncome: 310000, totalExpense: 295000, beneficiaries: 180, surplus: 15000 },
  ];
  await prisma.financialReport.createMany({
    data: reports.map((r, i) => ({ year: r.year, totalIncome: r.totalIncome, totalExpense: r.totalExpense, beneficiaries: r.beneficiaries, surplus: r.surplus, sortOrder: i })),
  });

  // expenseBreakdown — colors from lenity (accent #F2C200, accentHover #d9ae00, muted #5f5f5a, ink #1d1d1b)
  const expenseBreakdown = [
    { label: "Vivah Seva", percent: 45, color: "#F2C200" },
    { label: "Garib Sahayata", percent: 25, color: "#d9ae00" },
    { label: "Vrikshaaropan", percent: 15, color: "#a98a00" },
    { label: "Swasthya Seva", percent: 10, color: "#5f5f5a" },
    { label: "Admin / Misc", percent: 5, color: "#1d1d1b" },
  ];
  await prisma.expenseCategory.createMany({
    data: expenseBreakdown.map((e, i) => ({ labelEn: e.label, labelHi: e.label, percent: e.percent, color: e.color, sortOrder: i })),
  });

  const reportDocs = [
    { title: "Balance Sheet 2023-24", type: "PDF", size: "245 KB" },
    { title: "Income & Expenditure Statement 2023-24", type: "PDF", size: "180 KB" },
    { title: "Audit Report 2023-24", type: "PDF", size: "320 KB" },
    { title: "Utilisation Certificate 2023-24", type: "PDF", size: "95 KB" },
    { title: "Annual Report 2022-23", type: "PDF", size: "1.2 MB" },
    { title: "Annual Report 2021-22", type: "PDF", size: "980 KB" },
  ];
  await prisma.reportDocument.createMany({
    data: reportDocs.map((d, i) => ({ titleEn: d.title, titleHi: d.title, fileType: d.type, size: d.size, sortOrder: i })),
  });

  // ════════════════════════════════════════════════
  // INTERNSHIP LISTINGS (internship/page.tsx — 4)
  // ════════════════════════════════════════════════
  const internships = [
    { title: "Social Work Intern", department: "Community Outreach", duration: "3 months", stipend: "Voluntary (Certificate + LOR)", seats: "5", skills: ["Communication", "Empathy", "Field Work"], description: "Work directly with families in need, assist in marriage ceremonies, conduct household surveys, and support relief distribution drives." },
    { title: "Digital Media Intern", department: "Communications", duration: "2 months", stipend: "Voluntary (Certificate + LOR)", seats: "2", skills: ["Photography", "Social Media", "Content Writing"], description: "Document events, manage social media profiles, create content about our programs, and help with digital outreach campaigns." },
    { title: "Events Management Intern", department: "Events & Logistics", duration: "1–3 months", stipend: "Voluntary (Certificate + LOR)", seats: "3", skills: ["Planning", "Coordination", "Teamwork"], description: "Assist in planning and executing mass marriage ceremonies, health camps, tree plantation drives, and annual functions." },
    { title: "Finance & Accounts Intern", department: "Administration", duration: "3 months", stipend: "Voluntary (Certificate + LOR)", seats: "1", skills: ["Tally / Excel", "Bookkeeping", "Audit Support"], description: "Assist the Auditor and Treasurer with accounts, donor records, expense tracking, and preparation of financial statements." },
  ];
  await prisma.internshipListing.createMany({
    data: internships.map((it, i) => ({
      titleEn: it.title,
      titleHi: it.title,
      department: it.department,
      duration: it.duration,
      stipend: it.stipend,
      seats: it.seats,
      skills: JSON.stringify(it.skills),
      descEn: it.description,
      descHi: it.description,
      sortOrder: i,
    })),
  });

  // ════════════════════════════════════════════════
  // VOLUNTEER BENEFITS (volunteer/page.tsx)
  // ════════════════════════════════════════════════
  const benefits = [
    { iconName: "Award", title: "Certificate of Service", desc: "Get official recognition for your volunteer work" },
    { iconName: "Users", title: "Community Impact", desc: "Directly help hundreds of families in need" },
    { iconName: "Heart", title: "Volunteer ID Card", desc: "Receive a printed ID card upon registration" },
    { iconName: "Clock", title: "Flexible Timing", desc: "Volunteer on weekends or whenever you're free" },
  ];
  await prisma.volunteerBenefit.createMany({
    data: benefits.map((b, i) => ({ iconName: b.iconName, titleEn: b.title, titleHi: b.title, descEn: b.desc, descHi: b.desc, sortOrder: i })),
  });

  // ════════════════════════════════════════════════
  // OPTION ITEMS — all dropdown / filter lists
  // ════════════════════════════════════════════════
  type Opt = { group: string; labels: string[] };
  const optionGroups: Opt[] = [
    // blog/page.tsx categories
    { group: "blog_category", labels: ["All", "Events", "Environment", "Relief Work", "Health", "Education", "Announcement"] },
    // projects/page.tsx categories
    { group: "project_category", labels: ["All", "Vivah Seva", "Vrikshaaropan", "Garib Sahayata", "Swasthya Seva", "Education"] },
    // volunteer skills (12)
    { group: "volunteer_skill", labels: ["Event Management", "Social Work", "Medical / Health", "Teaching / Tutoring", "Photography", "Driving", "Cooking", "Legal / Documentation", "IT / Tech", "Construction / Labour", "Music / Arts", "Other"] },
    // volunteer availability
    { group: "availability", labels: ["Weekends only", "Weekdays only", "Full time", "Event basis only", "As needed"] },
    // donate purposes
    { group: "donation_purpose", labels: ["Vivah Seva", "Vrikshaaropan", "Garib Sahayata", "Swasthya Seva", "Education Support", "General Fund"] },
    // contact subjects
    { group: "contact_subject", labels: ["Vivah Seva Inquiry", "Donation Query", "Volunteer Registration", "Tree Plantation", "Health Camp", "Media / Press Inquiry", "General Inquiry"] },
    // internship duration
    { group: "internship_duration", labels: ["1 month", "2 months", "3 months", "6 months"] },
    // gender (volunteer)
    { group: "gender", labels: ["Male", "Female", "Other"] },
    // marriage registration religion default
    { group: "religion", labels: ["Hindu"] },
  ];
  for (const g of optionGroups) {
    await prisma.optionItem.createMany({
      data: g.labels.map((label, i) => ({ group: g.group, labelEn: label, labelHi: label, value: label, sortOrder: i })),
    });
  }

  // ════════════════════════════════════════════════
  // NAV LINKS
  // ════════════════════════════════════════════════
  const navbar = [
    { en: "Home", hi: "होम", href: "/" },
    { en: "About", hi: "हमारे बारे में", href: "/about" },
    { en: "Projects", hi: "परियोजनाएं", href: "/projects" },
    { en: "Get Involved", hi: "जुड़ें", href: "/volunteer" },
    { en: "Blog", hi: "समाचार", href: "/blog" },
    { en: "Contact", hi: "संपर्क", href: "/contact" },
  ];
  const footerQuick = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Projects", href: "/projects" },
    { label: "Donate", href: "/donate" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Marriage Registration", href: "/registration" },
    { label: "News & Updates", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];
  const footerLegal = [
    { label: "Annual Reports", href: "/transparency" },
    { label: "Audited Financials", href: "/transparency" },
    { label: "Trust Registration", href: "#" },
    { label: "PAN Card Details", href: "#" },
    { label: "80G Certificate", href: "#" },
    { label: "12A Certificate", href: "#" },
    { label: "Internship", href: "/internship" },
    { label: "Admin Portal", href: "/admin" },
  ];
  await prisma.navLink.createMany({
    data: [
      ...navbar.map((l, i) => ({ labelEn: l.en, labelHi: l.hi, href: l.href, location: "navbar", sortOrder: i })),
      ...footerQuick.map((l, i) => ({ labelEn: l.label, labelHi: l.label, href: l.href, location: "footer-quick", sortOrder: i })),
      ...footerLegal.map((l, i) => ({ labelEn: l.label, labelHi: l.label, href: l.href, location: "footer-legal", sortOrder: i })),
    ],
  });

  // ════════════════════════════════════════════════
  // SOCIAL LINKS (navbar utility bar + footer)
  // ════════════════════════════════════════════════
  await prisma.socialLink.createMany({
    data: [
      { platform: "Facebook", url: "https://facebook.com", sortOrder: 0 },
      { platform: "Instagram", url: "https://instagram.com", sortOrder: 1 },
      { platform: "YouTube", url: "https://youtube.com", sortOrder: 2 },
      { platform: "WhatsApp", url: "https://wa.me/919473331919", sortOrder: 3 },
    ],
  });

  // ════════════════════════════════════════════════
  // TEAM MEMBERS (data/members.ts — 18)
  // ════════════════════════════════════════════════
  const members = [
    { name: "Ramanand Yadav", designation: "Director", initials: "RY" },
    { name: "Nandlal Yadav", designation: "Chairman", initials: "NY" },
    { name: "Jitendra Kumar Mishra", designation: "Secretary", initials: "JM" },
    { name: "Ram Vinay Pandey", designation: "Coordinator", initials: "RP" },
    { name: "Nand Kishor", designation: "Treasurer", initials: "NK" },
    { name: "Pintu Srivastava", designation: "Executive President", initials: "PS" },
    { name: "Bhikhari Sah", designation: "Vice Treasurer", initials: "BS" },
    { name: "Madhusudan Shrivastava", designation: "Auditor", initials: "MS" },
    { name: "Ramakant Mahto", designation: "General Secretary", initials: "RM" },
    { name: "Adarsh Srivastava", designation: "Legal Advisor", initials: "AS" },
    { name: "Ajay Srivastava", designation: "Media Reporter", initials: "AJ" },
    { name: "Piyush Yadav", designation: "Member", initials: "PY" },
    { name: "Vikas Yadav", designation: "Member", initials: "VY" },
    { name: "Umesh Prasad", designation: "Member", initials: "UP" },
    { name: "Binod Prasad", designation: "Member", initials: "BP" },
    { name: "Sandip Kumar", designation: "Member", initials: "SK" },
    { name: "Masum Raja", designation: "Member", initials: "MR" },
    { name: "Shambhu Pandit", designation: "Member", initials: "SP" },
  ];
  await prisma.teamMember.createMany({
    data: members.map((m, i) => ({ name: m.name, designation: m.designation, initials: m.initials, sortOrder: i })),
  });

  // ════════════════════════════════════════════════
  // DONATION SUBMISSIONS (data/donations.ts — 8)
  // ════════════════════════════════════════════════
  const donations = [
    { id: 1, name: "Ramesh Kumar Singh", mobile: "9876543210", email: "ramesh@example.com", address: "Bettiah, West Champaran, Bihar", amount: 5000, purpose: "Vivah Seva", status: "confirmed" },
    { id: 2, name: "Sunita Devi", mobile: "9765432109", email: "", address: "Motihari, East Champaran, Bihar", amount: 1000, purpose: "Vrikshaaropan", status: "confirmed" },
    { id: 3, name: "Arvind Prasad", mobile: "9654321098", email: "arvind@example.com", address: "Muzaffarpur, Bihar", amount: 2000, purpose: "Garib Sahayata", status: "confirmed" },
    { id: 4, name: "Kavita Sharma", mobile: "9543210987", email: "kavita@example.com", address: "Patna, Bihar", amount: 500, purpose: "Education Support", status: "confirmed" },
    { id: 5, name: "Manoj Kumar", mobile: "9432109876", email: "", address: "Bettiah, West Champaran", amount: 10000, purpose: "Annual Fund", status: "confirmed" },
    { id: 6, name: "Priya Gupta", mobile: "9321098765", email: "priya@example.com", address: "Sitamarhi, Bihar", amount: 2000, purpose: "Swasthya Seva", status: "confirmed" },
    { id: 7, name: "Deepak Mishra", mobile: "9210987654", email: "deepak@example.com", address: "Gopalganj, Bihar", amount: 1500, purpose: "Vivah Seva", status: "confirmed" },
    { id: 8, name: "Anita Singh", mobile: "9109876543", email: "", address: "Bagaha, West Champaran", amount: 500, purpose: "Vrikshaaropan", status: "pending" },
  ];
  await prisma.donationSubmission.createMany({
    data: donations.map((d) => ({
      ref: `HW-${String(d.id).padStart(6, "0")}`,
      name: d.name,
      mobile: d.mobile,
      email: d.email || null,
      address: d.address,
      amount: d.amount,
      purpose: d.purpose,
      status: d.status,
    })),
  });

  // ════════════════════════════════════════════════
  // TRANSLATIONS — form labels / buttons / messages (5 forms + DonationModal)
  // ════════════════════════════════════════════════
  const translations: { key: string; en: string; hi?: string; group: string }[] = [
    // ── Contact form ──
    { key: "contact.section.office", en: "Office Details", group: "contact" },
    { key: "contact.section.map", en: "Find Us on Map", group: "contact" },
    { key: "contact.label.address", en: "Address", group: "contact" },
    { key: "contact.label.phone", en: "Phone", group: "contact" },
    { key: "contact.label.email", en: "Email", group: "contact" },
    { key: "contact.label.hours", en: "Office Hours", group: "contact" },
    { key: "contact.button.chatWhatsapp", en: "Chat on WhatsApp", group: "contact" },
    { key: "contact.form.title", en: "Send us a Message", group: "contact" },
    { key: "contact.form.lead", en: "Tell us how we can help — we read every word.", group: "contact" },
    { key: "contact.field.name.label", en: "Full Name *", group: "contact" },
    { key: "contact.field.name.placeholder", en: "Your name", group: "contact" },
    { key: "contact.field.mobile.label", en: "Mobile *", group: "contact" },
    { key: "contact.field.mobile.placeholder", en: "10-digit mobile", group: "contact" },
    { key: "contact.field.email.label", en: "Email", group: "contact" },
    { key: "contact.field.email.placeholder", en: "Optional", group: "contact" },
    { key: "contact.field.subject.label", en: "Subject *", group: "contact" },
    { key: "contact.field.subject.placeholder", en: "Select subject", group: "contact" },
    { key: "contact.field.message.label", en: "Message *", group: "contact" },
    { key: "contact.field.message.placeholder", en: "Type your message here...", group: "contact" },
    { key: "contact.button.send", en: "Send Message", group: "contact" },
    { key: "contact.button.whatsapp", en: "WhatsApp", group: "contact" },
    { key: "contact.success.title", en: "Message Received!", group: "contact" },
    { key: "contact.success.body", en: "Thank you, {name}! We will get back to you within 24 hours.", group: "contact" },
    { key: "contact.success.whatsapp", en: "Also send via WhatsApp", group: "contact" },
    { key: "contact.success.again", en: "Send Another", group: "contact" },

    // ── Donate page form ──
    { key: "donate.form.title", en: "Donation Details", group: "donate" },
    { key: "donate.field.amount.label", en: "Select Amount *", group: "donate" },
    { key: "donate.field.customAmount.placeholder", en: "Enter custom amount (₹)", group: "donate" },
    { key: "donate.field.name.label", en: "Full Name *", group: "donate" },
    { key: "donate.field.name.placeholder", en: "Your full name", group: "donate" },
    { key: "donate.field.mobile.label", en: "Mobile *", group: "donate" },
    { key: "donate.field.mobile.placeholder", en: "10-digit mobile", group: "donate" },
    { key: "donate.field.email.label", en: "Email (Optional)", group: "donate" },
    { key: "donate.field.email.placeholder", en: "your@email.com", group: "donate" },
    { key: "donate.field.address.label", en: "Address *", group: "donate" },
    { key: "donate.field.address.placeholder", en: "Your full address", group: "donate" },
    { key: "donate.field.purpose.label", en: "Purpose", group: "donate" },
    { key: "donate.button.submit", en: "Donate", group: "donate" },
    { key: "donate.sidebar.upi.title", en: "Pay via UPI", group: "donate" },
    { key: "donate.sidebar.upi.scan", en: "Scan QR Code", group: "donate" },
    { key: "donate.sidebar.upi.copied", en: "Copied!", group: "donate" },
    { key: "donate.sidebar.bank.title", en: "Bank Transfer", group: "donate" },
    { key: "donate.sidebar.bank.accountName", en: "Account Name", group: "donate" },
    { key: "donate.sidebar.bank.accountNo", en: "Account No.", group: "donate" },
    { key: "donate.sidebar.bank.ifsc", en: "IFSC Code", group: "donate" },
    { key: "donate.sidebar.bank.bank", en: "Bank", group: "donate" },
    { key: "donate.sidebar.bank.branch", en: "Branch", group: "donate" },
    { key: "donate.sidebar.tax.title", en: "🎉 Tax Benefit", group: "donate" },
    { key: "donate.success.title", en: "Donation Registered!", group: "donate" },
    { key: "donate.success.reference", en: "Reference: {ref}", group: "donate" },
    { key: "donate.receipt.org", en: "Hariwatika Vivah Sewa Samiti", group: "donate" },
    { key: "donate.receipt.address", en: "Sukanya Utsav Bhawan, Bettiah, Bihar 845438", group: "donate" },
    { key: "donate.receipt.heading", en: "DONATION RECEIPT", group: "donate" },
    { key: "donate.receipt.refNo", en: "Reference No.", group: "donate" },
    { key: "donate.receipt.donorName", en: "Donor Name", group: "donate" },
    { key: "donate.receipt.mobile", en: "Mobile", group: "donate" },
    { key: "donate.receipt.amount", en: "Amount", group: "donate" },
    { key: "donate.receipt.purpose", en: "Purpose", group: "donate" },
    { key: "donate.receipt.date", en: "Date", group: "donate" },
    { key: "donate.receipt.footer", en: "This is a system-generated receipt. For official receipt, contact us at hariwatikaseva@gmail.com", group: "donate" },
    { key: "donate.success.smsNote", en: "SMS notification will be sent to {mobile}", group: "donate" },
    { key: "donate.button.printReceipt", en: "Print Receipt", group: "donate" },
    { key: "donate.button.shareWhatsapp", en: "Share on WhatsApp", group: "donate" },
    { key: "donate.button.another", en: "Make another donation", group: "donate" },

    // ── DonationModal ──
    { key: "donateModal.title", en: "Make a Donation", group: "donateModal" },
    { key: "donateModal.field.amount.label", en: "Select Amount", group: "donateModal" },
    { key: "donateModal.field.customAmount.placeholder", en: "Custom amount", group: "donateModal" },
    { key: "donateModal.field.name.label", en: "Full Name *", group: "donateModal" },
    { key: "donateModal.field.name.placeholder", en: "Your full name", group: "donateModal" },
    { key: "donateModal.field.mobile.label", en: "Mobile *", group: "donateModal" },
    { key: "donateModal.field.mobile.placeholder", en: "10-digit mobile number", group: "donateModal" },
    { key: "donateModal.field.purpose.label", en: "Purpose", group: "donateModal" },
    { key: "donateModal.button.submit", en: "Donate", group: "donateModal" },
    { key: "donateModal.button.processing", en: "Processing...", group: "donateModal" },
    { key: "donateModal.success.title", en: "Thank You, {name}!", group: "donateModal" },
    { key: "donateModal.success.registered", en: "Your donation of ₹{amount} has been registered.", group: "donateModal" },
    { key: "donateModal.success.smsNote", en: "SMS notification will be sent to your mobile number.", group: "donateModal" },
    { key: "donateModal.button.shareWhatsapp", en: "Share on WhatsApp", group: "donateModal" },
    { key: "donateModal.button.close", en: "Close", group: "donateModal" },

    // ── Volunteer form ──
    { key: "volunteer.benefits.title", en: "Why Volunteer?", group: "volunteer" },
    { key: "volunteer.form.title", en: "Volunteer Registration", group: "volunteer" },
    { key: "volunteer.field.name.label", en: "Full Name *", group: "volunteer" },
    { key: "volunteer.field.name.placeholder", en: "Your full name", group: "volunteer" },
    { key: "volunteer.field.age.label", en: "Age *", group: "volunteer" },
    { key: "volunteer.field.age.placeholder", en: "Your age", group: "volunteer" },
    { key: "volunteer.field.gender.label", en: "Gender *", group: "volunteer" },
    { key: "volunteer.field.gender.placeholder", en: "Select Gender", group: "volunteer" },
    { key: "volunteer.field.mobile.label", en: "Mobile *", group: "volunteer" },
    { key: "volunteer.field.mobile.placeholder", en: "10-digit mobile", group: "volunteer" },
    { key: "volunteer.field.email.label", en: "Email", group: "volunteer" },
    { key: "volunteer.field.email.placeholder", en: "Optional", group: "volunteer" },
    { key: "volunteer.field.address.label", en: "Address *", group: "volunteer" },
    { key: "volunteer.field.address.placeholder", en: "Village/Town, Block, District", group: "volunteer" },
    { key: "volunteer.field.skills.label", en: "Skills *", group: "volunteer" },
    { key: "volunteer.field.availability.label", en: "Availability *", group: "volunteer" },
    { key: "volunteer.field.availability.placeholder", en: "Select availability", group: "volunteer" },
    { key: "volunteer.field.motivation.label", en: "Motivation", group: "volunteer" },
    { key: "volunteer.field.motivation.placeholder", en: "Why do you want to volunteer with us?", group: "volunteer" },
    { key: "volunteer.button.submit", en: "Register as Volunteer", group: "volunteer" },
    { key: "volunteer.success.title", en: "Welcome to the Team!", group: "volunteer" },
    { key: "volunteer.success.body", en: "Your volunteer registration is confirmed.", group: "volunteer" },
    { key: "volunteer.idcard.title", en: "Your Volunteer ID Card", group: "volunteer" },
    { key: "volunteer.idcard.role", en: "Community Volunteer", group: "volunteer" },
    { key: "volunteer.button.print", en: "Print ID Card", group: "volunteer" },
    { key: "volunteer.button.whatsapp", en: "WhatsApp Confirm", group: "volunteer" },

    // ── Internship form ──
    { key: "internship.section.opportunities", en: "Opportunities", group: "internship" },
    { key: "internship.section.openings", en: "Current Openings", group: "internship" },
    { key: "internship.form.title", en: "Apply for Internship", group: "internship" },
    { key: "internship.field.name.label", en: "Full Name *", group: "internship" },
    { key: "internship.field.name.placeholder", en: "Your name", group: "internship" },
    { key: "internship.field.age.label", en: "Age *", group: "internship" },
    { key: "internship.field.age.placeholder", en: "18–30", group: "internship" },
    { key: "internship.field.qualification.label", en: "Qualification *", group: "internship" },
    { key: "internship.field.qualification.placeholder", en: "e.g. B.Sc, MBA", group: "internship" },
    { key: "internship.field.institute.label", en: "Institute/College *", group: "internship" },
    { key: "internship.field.institute.placeholder", en: "Name of college", group: "internship" },
    { key: "internship.field.mobile.label", en: "Mobile *", group: "internship" },
    { key: "internship.field.mobile.placeholder", en: "10-digit mobile", group: "internship" },
    { key: "internship.field.email.label", en: "Email *", group: "internship" },
    { key: "internship.field.email.placeholder", en: "your@email.com", group: "internship" },
    { key: "internship.field.role.label", en: "Role Applying For *", group: "internship" },
    { key: "internship.field.role.placeholder", en: "Select a role", group: "internship" },
    { key: "internship.field.startDate.label", en: "Preferred Start Date *", group: "internship" },
    { key: "internship.field.duration.label", en: "Duration *", group: "internship" },
    { key: "internship.field.duration.placeholder", en: "Select duration", group: "internship" },
    { key: "internship.field.motivation.label", en: "Motivation / Statement", group: "internship" },
    { key: "internship.field.motivation.placeholder", en: "Tell us why you want to intern with us...", group: "internship" },
    { key: "internship.button.submit", en: "Submit Application", group: "internship" },
    { key: "internship.success.title", en: "Application Submitted!", group: "internship" },
    { key: "internship.success.body", en: "We will contact you within 3–5 working days.", group: "internship" },
    { key: "internship.button.previewCert", en: "Preview Certificate", group: "internship" },
    { key: "internship.button.whatsapp", en: "WhatsApp Us", group: "internship" },
    { key: "internship.field.seats.suffix", en: "seats", group: "internship" },

    // ── Marriage Registration form ──
    { key: "registration.tab.boy", en: "वर पंजीकरण (Boy)", group: "registration" },
    { key: "registration.tab.girl", en: "कन्या पंजीकरण (Girl)", group: "registration" },
    { key: "registration.section.personal", en: "Personal Information", group: "registration" },
    { key: "registration.section.family", en: "Family Information", group: "registration" },
    { key: "registration.section.contact", en: "Contact Information", group: "registration" },
    { key: "registration.field.fullName.label", en: "Full Name *", group: "registration" },
    { key: "registration.field.fullName.placeholder", en: "Full name as per documents", group: "registration" },
    { key: "registration.field.dob.label", en: "Date of Birth *", group: "registration" },
    { key: "registration.field.gotra.label", en: "Gotra *", group: "registration" },
    { key: "registration.field.gotra.placeholder", en: "Family gotra", group: "registration" },
    { key: "registration.field.caste.label", en: "Caste *", group: "registration" },
    { key: "registration.field.caste.placeholder", en: "Caste / sub-caste", group: "registration" },
    { key: "registration.field.education.label", en: "Education *", group: "registration" },
    { key: "registration.field.education.placeholder", en: "e.g. B.A., 10th, M.Sc.", group: "registration" },
    { key: "registration.field.occupation.label", en: "Occupation *", group: "registration" },
    { key: "registration.field.occupation.placeholder", en: "Job / Business / Student", group: "registration" },
    { key: "registration.field.income.label", en: "Annual Income (₹)", group: "registration" },
    { key: "registration.field.income.placeholder", en: "Approx. annual income", group: "registration" },
    { key: "registration.field.height.label", en: "Height", group: "registration" },
    { key: "registration.field.height.placeholder", en: "e.g. 5'6\"", group: "registration" },
    { key: "registration.field.fatherName.label", en: "Father's Name *", group: "registration" },
    { key: "registration.field.fatherName.placeholder", en: "Father's full name", group: "registration" },
    { key: "registration.field.motherName.label", en: "Mother's Name *", group: "registration" },
    { key: "registration.field.motherName.placeholder", en: "Mother's full name", group: "registration" },
    { key: "registration.field.siblings.label", en: "Siblings", group: "registration" },
    { key: "registration.field.siblings.placeholder", en: "e.g. 2 brothers, 1 sister", group: "registration" },
    { key: "registration.field.address.label", en: "Full Address *", group: "registration" },
    { key: "registration.field.address.placeholder", en: "Village/Town, Block", group: "registration" },
    { key: "registration.field.contactName.label", en: "Contact Person Name *", group: "registration" },
    { key: "registration.field.contactName.placeholder", en: "Parent/Guardian name", group: "registration" },
    { key: "registration.field.contactMobile.label", en: "Contact Mobile *", group: "registration" },
    { key: "registration.field.contactMobile.placeholder", en: "10-digit mobile", group: "registration" },
    { key: "registration.field.photo.label", en: "Photo (Optional)", group: "registration" },
    { key: "registration.field.photo.upload", en: "Upload photo (JPG, PNG up to 2MB)", group: "registration" },
    { key: "registration.field.photo.note", en: "Feature coming soon", group: "registration" },
    { key: "registration.button.submit", en: "Submit Registration", group: "registration" },
    { key: "registration.success.title", en: "Registration Successful!", group: "registration" },
    { key: "registration.button.print", en: "Print Form", group: "registration" },
    { key: "registration.button.whatsapp", en: "WhatsApp Confirm", group: "registration" },
    { key: "registration.button.edit", en: "Edit Registration", group: "registration" },

    // ── Common loading ──
    { key: "common.loading", en: "Processing...", group: "common" },
  ];
  for (const t of translations) {
    await prisma.translation.create({
      data: { key: t.key, en: t.en, hi: t.hi ?? t.en, group: t.group },
    });
  }

  console.log("Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
