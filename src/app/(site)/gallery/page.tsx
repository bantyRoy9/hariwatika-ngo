"use client";

import HexagonalGallery from "@/components/HexagonalGallery";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";

// Sample gallery images - replace with your actual images
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", alt: "Community gathering for education program" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80", alt: "Tree plantation drive" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80", alt: "Healthcare camp in rural area" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80", alt: "Children receiving educational materials" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80", alt: "Food distribution program" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80", alt: "Women empowerment workshop" },
  { src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80", alt: "Disaster relief operation" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Marriage assistance ceremony" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", alt: "Community health checkup" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", alt: "Scholarship distribution event" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80", alt: "Environmental awareness program" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80", alt: "Volunteers planting trees" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80", alt: "Children in classroom" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80", alt: "Community kitchen service" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80", alt: "Women skill training program" },
  { src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80", alt: "Medical camp setup" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Flood relief distribution" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", alt: "Eye checkup camp" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", alt: "Students with books" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80", alt: "Sapling distribution" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80", alt: "Community meeting" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80", alt: "Children playing" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80", alt: "Food packet distribution" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80", alt: "Womens group discussion" },
  { src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80", alt: "Doctor examining patient" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Relief camp" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", alt: "Vaccination drive" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", alt: "Award ceremony" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80", alt: "Tree plantation team" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80", alt: "Village outreach program" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80", alt: "Happy children" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80", alt: "Food serving" },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80", alt: "Skill development class" },
  { src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80", alt: "Health awareness session" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Emergency response team" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", alt: "Blood donation camp" },
];

export default function GalleryPage() {
  const { t } = useLang();

  return (
    <AdminEditProvider>
      {/* Hero Section */}
      <PremiumHero
        title={t("Gallery of Change", "परिवर्तन की गैलरी")}
        subtitle={t("Our Impact", "हमारा प्रभाव")}
        description={t(
          "25 years of service captured in moments. Each image tells a story of hope, compassion, and community transformation.",
          "25 वर्षों की सेवा क्षणों में कैद। प्रत्येक छवि आशा, करुणा और समुदाय परिवर्तन की कहानी बताती है।"
        )}
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
        stats={[
          { value: "1000+", label: t("Events Organized", "आयोजित कार्यक्रम") },
          { value: "10K+", label: t("Photos Captured", "तस्वीरें ली गईं") },
          { value: "50+", label: t("Villages Covered", "गांव शामिल") },
          { value: "25+", label: t("Years Documented", "वर्षों के दस्तावेज") },
        ]}
        breadcrumbs={[
          { label: t("Home", "होम"), href: "/" },
          { label: t("Gallery", "गैलरी") },
        ]}
        overlay="pattern"
        height="medium"
      />

      {/* Hexagonal Gallery */}
      <section className="py-12 md:py-16" style={{ background: LENITY.bg }}>
        <HexagonalGallery
          images={galleryImages}
          title={t("Moments That Matter", "महत्वपूर्ण पल")}
          description={t("Click on any image to view it in detail", "विस्तार से देखने के लिए किसी भी छवि पर क्लिक करें")}
        />
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20" style={{ background: LENITY.yellow }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText as="h2" settingKey="gallery.cta.h2" label="Gallery CTA Heading"
            en="Be Part of Our Story" hi="हमारी कहानी का हिस्सा बनें"
            className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
          />
          <EditableText as="p" settingKey="gallery.cta.desc" label="Gallery CTA Description" multiline
            en="Join us in creating more moments of joy, hope, and transformation in communities across West Champaran."
            hi="पश्चिम चम्पारण के समुदायों में खुशी, आशा और परिवर्तन के और पलों को बनाने में हमारे साथ जुड़ें।"
            className="text-lg mb-8" style={{ color: LENITY.ink, opacity: 0.9 }}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm transition-all hover:scale-105 shadow-lg"
              style={{ background: LENITY.accent, color: "#fff" }}
            >
              {t("Donate Now", "अभी दान करें")}
            </a>
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all hover:scale-105 bg-white"
              style={{ borderColor: LENITY.ink, color: LENITY.ink }}
            >
              {t("Volunteer With Us", "हमारे साथ स्वयंसेवक बनें")}
            </a>
          </div>
        </div>
      </section>

    </AdminEditProvider>
  );
}
