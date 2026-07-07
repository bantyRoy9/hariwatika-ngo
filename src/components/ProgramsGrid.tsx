"use client";

import HoverExpandCard from "./HoverExpandCard";
import EditableText from "./EditableText";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";

type HomeSettings = Record<string, { en: string; hi: string }>;

/** Resolve a setting key from DB, falling back to a hardcoded default. */
function s(settings: HomeSettings, key: string, fallbackEn: string, fallbackHi: string) {
  const row = settings[key];
  return { en: row?.en || fallbackEn, hi: row?.hi || fallbackHi };
}

interface Program {
  key: string;
  number: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  image: string;
  link?: string;
}

const programs: Program[] = [
  {
    key: "campus",
    number: "01",
    titleEn: "Hariwatika Campus",
    titleHi: "हरिवाटिका परिसर",
    descriptionEn:
      "Our main campus serves as the heart of our operations, providing education and community services to thousands of families across West Champaran.",
    descriptionHi:
      "हमारा मुख्य परिसर हमारे संचालन का केंद्र है, जो पश्चिम चम्पारण में हजारों परिवारों को शिक्षा और सामुदायिक सेवाएं प्रदान करता है।",
    image: "/images/marriage/marriage6.jpeg",
    link: "/about",
  },
  {
    key: "education",
    number: "02",
    titleEn: "Hariwatika Education",
    titleHi: "हरिवाटिका शिक्षा",
    descriptionEn:
      "Education allows us to live a meaningful life and make a positive contribution to society. We provide scholarships and learning materials to underprivileged children.",
    descriptionHi:
      "शिक्षा हमें सार्थक जीवन जीने और समाज में सकारात्मक योगदान देने की अनुमति देती है। हम जरूरतमंद बच्चों को छात्रवृत्ति और शिक्षण सामग्री प्रदान करते हैं।",
    image: "/images/marriage/marriage1.jpeg",
    link: "/programs",
  },
  {
    key: "social-service",
    number: "03",
    titleEn: "Hariwatika Social Service",
    titleHi: "हरिवाटिका सामाजिक सेवा",
    descriptionEn:
      "Dedicated to serving the underprivileged through healthcare camps, food distribution, disaster relief, and women & child welfare programs.",
    descriptionHi:
      "स्वास्थ्य शिविर, खाद्य वितरण, आपदा राहत और महिला एवं बाल कल्याण कार्यक्रमों के माध्यम से वंचितों की सेवा के लिए समर्पित।",
    image: "/images/marriage/marriage3.jpeg",
    link: "/services",
  },
  {
    key: "environment",
    number: "04",
    titleEn: "Hariwatika Environment",
    titleHi: "हरिवाटिका पर्यावरण",
    descriptionEn:
      "Large-scale tree plantation drives to green the region. We've planted over 10,000+ trees across West Champaran, creating a sustainable future.",
    descriptionHi:
      "क्षेत्र को हरा-भरा बनाने के लिए बड़े पैमाने पर वृक्षारोपण अभियान। हमने पश्चिम चम्पारण में 10,000+ से अधिक पेड़ लगाए हैं, एक स्थायी भविष्य बनाते हुए।",
    image: "/images/marriage/marriage5.jpeg",
    link: "/programs",
  },
];

export default function ProgramsGrid({ settings = {} }: { settings?: HomeSettings }) {
  const { t } = useLang();

  return (
    <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-4"
            style={{ color: LENITY.ink }}
          >
            <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
            <EditableText settingKey="home.programs.eyebrow" label="Programs Eyebrow" en={s(settings,"home.programs.eyebrow","Our Programs","हमारे कार्यक्रम").en} hi={s(settings,"home.programs.eyebrow","Our Programs","हमारे कार्यक्रम").hi} />
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: SERIF, color: LENITY.ink }}
          >
            <EditableText settingKey="home.programs.h2" label="Programs Heading" en={s(settings,"home.programs.h2","Transforming Lives Through Service","सेवा के माध्यम से जीवन बदलना").en} hi={s(settings,"home.programs.h2","Transforming Lives Through Service","सेवा के माध्यम से जीवन बदलना").hi} />
          </h2>
          <p
            className="text-base md:text-lg italic max-w-2xl mx-auto"
            style={{ fontFamily: SERIF, color: LENITY.muted }}
          >
            <EditableText settingKey="home.programs.lead" label="Programs Lead" multiline
              en={s(settings,"home.programs.lead","Discover our key programs that are making a difference in communities","हमारे प्रमुख कार्यक्रमों की खोज करें जो समुदायों में बदलाव ला रहे हैं").en}
              hi={s(settings,"home.programs.lead","Discover our key programs that are making a difference in communities","हमारे प्रमुख कार्यक्रमों की खोज करें जो समुदायों में बदलाव ला रहे हैं").hi} />
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program) => (
            <HoverExpandCard
              key={program.number}
              number={program.number}
              title={<EditableText settingKey={`home.programs.${program.key}.title`} label={`Program — ${program.titleEn} — Title`} en={s(settings,`home.programs.${program.key}.title`,program.titleEn,program.titleHi).en} hi={s(settings,`home.programs.${program.key}.title`,program.titleEn,program.titleHi).hi} />}
              description={<EditableText settingKey={`home.programs.${program.key}.desc`} label={`Program — ${program.titleEn} — Description`} multiline en={s(settings,`home.programs.${program.key}.desc`,program.descriptionEn,program.descriptionHi).en} hi={s(settings,`home.programs.${program.key}.desc`,program.descriptionEn,program.descriptionHi).hi} />}
              image={program.image}
              link={program.link}
              linkText={t("Read More", "और पढ़ें")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
