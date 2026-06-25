"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Tag, ArrowRight, HandHeart } from "lucide-react";
import { LENITY, SERIF, IMG } from "@/theme/lenity";

const categories = ["All", "Events", "Environment", "Relief Work", "Health", "Education", "Announcement"];

const posts = [
  {
    id: 1,
    category: "Events",
    date: "15 Dec 2024",
    title: "Successful Saptapadi Vivah Mahotsav — 12 Couples Blessed",
    excerpt:
      "This year's mass marriage ceremony witnessed 12 families unite under one roof with the blessings of Shiv Mandir. The grand event was attended by over 500 community members at Sukanya Utsav Bhawan, Hariwatika Chowk.",
    tags: ["vivah", "ceremony", "community"],
    img: IMG.community,
  },
  {
    id: 2,
    category: "Environment",
    date: "05 Nov 2024",
    title: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    excerpt:
      "Volunteers and community members came together to plant 2000 saplings across Bettiah and surrounding villages. School children, teachers, and local officials participated in this green initiative.",
    tags: ["environment", "trees", "campaign"],
    img: IMG.trees,
  },
  {
    id: 3,
    category: "Relief Work",
    date: "20 Oct 2024",
    title: "Winter Blanket Distribution Drive Reaches 500 Families",
    excerpt:
      "As winter approached, our team distributed warm blankets and essentials to 500 underprivileged families across 8 villages in West Champaran. Priority was given to the elderly and children.",
    tags: ["relief", "winter", "garib-sahayata"],
    img: IMG.relief,
  },
  {
    id: 4,
    category: "Health",
    date: "10 Oct 2024",
    title: "Free Health Camp — 300 Patients Examined at Bettiah",
    excerpt:
      "Our quarterly free health camp provided consultations to 300+ patients. Services included blood pressure check, diabetes screening, eye examination, and free distribution of essential medicines.",
    tags: ["health", "camp", "free-medical"],
    img: IMG.children,
  },
  {
    id: 5,
    category: "Education",
    date: "25 Sep 2024",
    title: "Scholarship Distribution Ceremony for 50 Girl Students",
    excerpt:
      "Fifty deserving girl students from economically weak backgrounds received scholarship awards to support their higher education. The ceremony was presided over by Director Ramanand Yadav.",
    tags: ["education", "girls", "scholarship"],
    img: IMG.about1,
  },
  {
    id: 6,
    category: "Announcement",
    date: "01 Sep 2024",
    title: "Annual General Meeting 2024 — Key Decisions Announced",
    excerpt:
      "The Annual General Meeting of Hariwatika Shiv Mandir Vivah Sewa Samiti was held at Sukanya Utsav Bhawan. New office-bearers were elected, financial reports were presented, and future plans discussed.",
    tags: ["agm", "announcement", "meeting"],
    img: IMG.whatWeDo,
  },
  {
    id: 7,
    category: "Events",
    date: "15 Aug 2024",
    title: "Independence Day Celebration — Flag Hoisting & Cultural Program",
    excerpt:
      "Hariwatika Samiti celebrated Independence Day with flag hoisting, patriotic songs, and a cultural program by local school students. Sweets were distributed to over 200 attendees.",
    tags: ["independence-day", "celebration", "patriotic"],
    img: IMG.about2,
  },
  {
    id: 8,
    category: "Relief Work",
    date: "20 Jul 2024",
    title: "Flood Relief Camp for Flood-Affected Families",
    excerpt:
      "Heavy rainfall and floods in parts of West Champaran displaced numerous families. Our team set up a relief camp providing food, water, and essential supplies to affected households.",
    tags: ["flood", "relief", "emergency"],
    img: IMG.relief,
  },
  {
    id: 9,
    category: "Environment",
    date: "05 Jun 2024",
    title: "World Environment Day: Oath-Taking and Plantation Drive",
    excerpt:
      "On World Environment Day, members pledged to plant at least 10 trees each and participate in community clean-up drives. Over 500 saplings were planted across Bettiah.",
    tags: ["environment-day", "plantation", "awareness"],
    img: IMG.trees,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main>
        {/* ════════════ HERO ════════════ */}
        <section className="relative overflow-hidden pt-36 pb-24" style={{ background: LENITY.soft }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: LENITY.accent }}
            >
              <span
                className="inline-flex w-5 h-5 rounded-full items-center justify-center"
                style={{ background: `${LENITY.accent}1a` }}
              >
                <HandHeart className="w-3 h-3" />
              </span>
              News &amp; Updates
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5 leading-[1.1]"
              style={{ fontFamily: SERIF, color: LENITY.ink }}
            >
              समाचार और अपडेट
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: LENITY.muted }}>
              Stay updated with our latest activities, events, and community programs.
            </p>
          </div>
        </section>

        {/* ════════════ FILTER ════════════ */}
        <section className="py-6 bg-white border-b" style={{ borderColor: LENITY.line }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={
                      active
                        ? { background: LENITY.accent, color: "#ffffff" }
                        : { background: "#ffffff", color: LENITY.muted, border: `1px solid ${LENITY.line}` }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════ POSTS ════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border overflow-hidden h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ borderColor: LENITY.line }}
                >
                  {/* Card image */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1 text-white"
                      style={{ background: LENITY.accent }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-1 text-[11px] mb-2" style={{ color: LENITY.muted }}>
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>

                    <h3
                      className="font-bold text-base leading-snug mb-2"
                      style={{ fontFamily: SERIF, color: LENITY.ink }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className={`text-xs leading-relaxed ${expandedId === post.id ? "" : "line-clamp-3"}`}
                      style={{ color: LENITY.muted }}
                    >
                      {post.excerpt}
                    </p>

                    <button
                      onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold transition-colors"
                      style={{ color: LENITY.accent }}
                    >
                      {expandedId === post.id ? "Show less" : "Read more"}
                      <ArrowRight className={`w-3 h-3 transition-transform ${expandedId === post.id ? "rotate-90" : ""}`} />
                    </button>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: LENITY.line }}>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-0.5 text-[9px] rounded-full px-2 py-0.5"
                          style={{ color: LENITY.accent, background: `${LENITY.accent}14` }}
                        >
                          <Tag className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p style={{ color: LENITY.muted }}>No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
