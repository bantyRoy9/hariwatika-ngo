import { getSettings } from "@/lib/content";
import GalleryContent from "./GalleryContent";

import HexagonalGallery from "@/components/HexagonalGallery";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";

export default async function GalleryPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["gallery"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

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
