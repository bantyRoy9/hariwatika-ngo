"use client";

import { useState } from "react";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";
import { useLang } from "@/context/LanguageContext";

export type BlogPostData = {
  id: number;
  category: string;
  date: string;
  titleEn: string;
  titleHi: string;
  excerptEn: string;
  excerptHi: string;
  tags: string[];
  img: string | null;
};

export type Header = { tag: { en: string; hi: string }; title: { en: string; hi: string }; subtitle: { en: string; hi: string } };

export default function BlogContent({
  posts,
  categories,
  header,
  settings = {},
}: {
  posts: BlogPostData[];
  categories: string[];
  header: Header;
  settings?: Record<string, { en: string; hi: string }>;
}) {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const allCats = ["All", ...categories];
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <AdminEditProvider initialValues={settings}>
      <main>
        <PremiumHero
          title={t(header.title.en, header.title.hi)}
          subtitle={t(header.tag.en, header.tag.hi)}
          description={t(header.subtitle.en, header.subtitle.hi)}
          image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&q=80"
          stats={[
            { value: "50+", label: t("Stories", "कहानियां") },
            { value: "10K+", label: t("Readers", "पाठक") },
            { value: "25+", label: t("Years", "वर्ष") },
            { value: "100+", label: t("Updates", "अपडेट") },
          ]}
          breadcrumbs={[
            { label: t("Home", "होम"), href: "/" },
            { label: t("Blog", "ब्लॉग") },
          ]}
          overlay="gradient"
          height="medium"
        />

        <section className="py-6 bg-white border-b" style={{ borderColor: LENITY.line }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {allCats.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={active ? { background: LENITY.yellow, color: LENITY.ink } : { background: LENITY.soft, color: LENITY.muted, border: `1px solid ${LENITY.line}` }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <EditableText as="h2" settingKey="blog.section.h2" label="Blog Section Heading"
                en="Latest Stories & News" hi="ताज़ी कहानियाँ और समाचार"
                className="text-3xl font-bold mb-2" style={{ fontFamily: SERIF, color: LENITY.ink }}
              />
              <EditableText as="p" settingKey="blog.section.sub" label="Blog Section Subtext"
                en="Read about our impact and community work from the field."
                hi="क्षेत्र से हमारे प्रभाव और सामुदायिक कार्य के बारे में पढ़ें।"
                className="text-sm italic" style={{ fontFamily: SERIF, color: LENITY.muted }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post) => {
                const title = t(post.titleEn, post.titleHi);
                return (
                  <div key={post.id} className="bg-white rounded-3xl border overflow-hidden h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                    <div className="h-48 relative overflow-hidden">
                      {post.img && <img src={post.img} alt={title} className="w-full h-full object-cover" loading="lazy" />}
                      <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1" style={{ background: LENITY.yellow, color: LENITY.ink }}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-[11px] mb-2" style={{ color: LENITY.muted }}>
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <h3 className="font-bold text-base leading-snug mb-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{title}</h3>
                      <p className={`text-xs leading-relaxed ${expandedId === post.id ? "" : "line-clamp-3"}`} style={{ color: LENITY.muted }}>
                        {t(post.excerptEn, post.excerptHi)}
                      </p>
                      <button onClick={() => setExpandedId(expandedId === post.id ? null : post.id)} className="mt-3 inline-flex items-center gap-1 text-xs font-bold transition-colors" style={{ color: LENITY.ink }}>
                        {expandedId === post.id ? "Show less" : "Read more"}
                        <ArrowRight className={`w-3 h-3 transition-transform ${expandedId === post.id ? "rotate-90" : ""}`} />
                      </button>
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: LENITY.line }}>
                        {post.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-0.5 text-[9px] rounded-full px-2 py-0.5" style={{ color: LENITY.ink, background: LENITY.yellowSoft }}>
                            <Tag className="w-2 h-2" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p style={{ color: LENITY.muted }}>No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </AdminEditProvider>
  );
}
