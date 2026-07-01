"use client";

import HoverExpandCard from "./HoverExpandCard";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";

interface Program {
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
    number: "01",
    titleEn: "Hariwatika Campus",
    titleHi: "हरिवाटिका परिसर",
    descriptionEn:
      "Our main campus serves as the heart of our operations, providing education and community services to thousands of families across West Champaran.",
    descriptionHi:
      "हमारा मुख्य परिसर हमारे संचालन का केंद्र है, जो पश्चिम चम्पारण में हजारों परिवारों को शिक्षा और सामुदायिक सेवाएं प्रदान करता है।",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80&auto=format&fit=crop",
    link: "/about",
  },
  {
    number: "02",
    titleEn: "Hariwatika Education",
    titleHi: "हरिवाटिका शिक्षा",
    descriptionEn:
      "Education allows us to live a meaningful life and make a positive contribution to society. We provide scholarships and learning materials to underprivileged children.",
    descriptionHi:
      "शिक्षा हमें सार्थक जीवन जीने और समाज में सकारात्मक योगदान देने की अनुमति देती है। हम जरूरतमंद बच्चों को छात्रवृत्ति और शिक्षण सामग्री प्रदान करते हैं।",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80&auto=format&fit=crop",
    link: "/programs",
  },
  {
    number: "03",
    titleEn: "Hariwatika Social Service",
    titleHi: "हरिवाटिका सामाजिक सेवा",
    descriptionEn:
      "Dedicated to serving the underprivileged through healthcare camps, food distribution, disaster relief, and women & child welfare programs.",
    descriptionHi:
      "स्वास्थ्य शिविर, खाद्य वितरण, आपदा राहत और महिला एवं बाल कल्याण कार्यक्रमों के माध्यम से वंचितों की सेवा के लिए समर्पित।",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80&auto=format&fit=crop",
    link: "/services",
  },
  {
    number: "04",
    titleEn: "Hariwatika Environment",
    titleHi: "हरिवाटिका पर्यावरण",
    descriptionEn:
      "Large-scale tree plantation drives to green the region. We've planted over 10,000+ trees across West Champaran, creating a sustainable future.",
    descriptionHi:
      "क्षेत्र को हरा-भरा बनाने के लिए बड़े पैमाने पर वृक्षारोपण अभियान। हमने पश्चिम चम्पारण में 10,000+ से अधिक पेड़ लगाए हैं, एक स्थायी भविष्य बनाते हुए।",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80&auto=format&fit=crop",
    link: "/programs",
  },
];

export default function ProgramsGrid() {
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
            {t("Our Programs", "हमारे कार्यक्रम")}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: SERIF, color: LENITY.ink }}
          >
            {t("Transforming Lives Through Service", "सेवा के माध्यम से जीवन बदलना")}
          </h2>
          <p
            className="text-base md:text-lg italic max-w-2xl mx-auto"
            style={{ fontFamily: SERIF, color: LENITY.muted }}
          >
            {t(
              "Discover our key programs that are making a difference in communities",
              "हमारे प्रमुख कार्यक्रमों की खोज करें जो समुदायों में बदलाव ला रहे हैं"
            )}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program) => (
            <HoverExpandCard
              key={program.number}
              number={program.number}
              title={t(program.titleEn, program.titleHi)}
              description={t(program.descriptionEn, program.descriptionHi)}
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
