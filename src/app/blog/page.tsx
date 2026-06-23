"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Tag, Heart, ArrowRight } from "lucide-react";

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
    color: "#855300",
  },
  {
    id: 2,
    category: "Environment",
    date: "05 Nov 2024",
    title: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    excerpt:
      "Volunteers and community members came together to plant 2000 saplings across Bettiah and surrounding villages. School children, teachers, and local officials participated in this green initiative.",
    tags: ["environment", "trees", "campaign"],
    color: "#006d3e",
  },
  {
    id: 3,
    category: "Relief Work",
    date: "20 Oct 2024",
    title: "Winter Blanket Distribution Drive Reaches 500 Families",
    excerpt:
      "As winter approached, our team distributed warm blankets and essentials to 500 underprivileged families across 8 villages in West Champaran. Priority was given to the elderly and children.",
    tags: ["relief", "winter", "garib-sahayata"],
    color: "#855300",
  },
  {
    id: 4,
    category: "Health",
    date: "10 Oct 2024",
    title: "Free Health Camp — 300 Patients Examined at Bettiah",
    excerpt:
      "Our quarterly free health camp provided consultations to 300+ patients. Services included blood pressure check, diabetes screening, eye examination, and free distribution of essential medicines.",
    tags: ["health", "camp", "free-medical"],
    color: "#006d3e",
  },
  {
    id: 5,
    category: "Education",
    date: "25 Sep 2024",
    title: "Scholarship Distribution Ceremony for 50 Girl Students",
    excerpt:
      "Fifty deserving girl students from economically weak backgrounds received scholarship awards to support their higher education. The ceremony was presided over by Director Ramanand Yadav.",
    tags: ["education", "girls", "scholarship"],
    color: "#855300",
  },
  {
    id: 6,
    category: "Announcement",
    date: "01 Sep 2024",
    title: "Annual General Meeting 2024 — Key Decisions Announced",
    excerpt:
      "The Annual General Meeting of Hariwatika Shiv Mandir Vivah Sewa Samiti was held at Sukanya Utsav Bhawan. New office-bearers were elected, financial reports were presented, and future plans discussed.",
    tags: ["agm", "announcement", "meeting"],
    color: "#006d3e",
  },
  {
    id: 7,
    category: "Events",
    date: "15 Aug 2024",
    title: "Independence Day Celebration — Flag Hoisting & Cultural Program",
    excerpt:
      "Hariwatika Samiti celebrated Independence Day with flag hoisting, patriotic songs, and a cultural program by local school students. Sweets were distributed to over 200 attendees.",
    tags: ["independence-day", "celebration", "patriotic"],
    color: "#855300",
  },
  {
    id: 8,
    category: "Relief Work",
    date: "20 Jul 2024",
    title: "Flood Relief Camp for Flood-Affected Families",
    excerpt:
      "Heavy rainfall and floods in parts of West Champaran displaced numerous families. Our team set up a relief camp providing food, water, and essential supplies to affected households.",
    tags: ["flood", "relief", "emergency"],
    color: "#006d3e",
  },
  {
    id: 9,
    category: "Environment",
    date: "05 Jun 2024",
    title: "World Environment Day: Oath-Taking and Plantation Drive",
    excerpt:
      "On World Environment Day, members pledged to plant at least 10 trees each and participate in community clean-up drives. Over 500 saplings were planted across Bettiah.",
    tags: ["environment-day", "plantation", "awareness"],
    color: "#006d3e",
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
        {/* Hero */}
        <section
          className="pt-28 pb-16 relative"
          style={{ background: "linear-gradient(135deg, #1b0d00 0%, #3d1f00 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-white/10 text-[#F4A433] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
              News & Updates
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              समाचार और अपडेट
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Stay updated with our latest activities, events, and community programs.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        {/* Filter */}
        <section className="py-6 bg-[#fbf9f4] border-b border-[#e4e2dd]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#855300] text-white"
                      : "bg-white border border-[#e4e2dd] text-[#524435] hover:border-[#855300] hover:text-[#855300]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Card image placeholder */}
                  <div
                    className="h-40 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${post.color}15, ${post.color}08)` }}
                  >
                    <Heart
                      className="w-14 h-14"
                      style={{ color: post.color, opacity: 0.25 }}
                    />
                  </div>

                  <div className="p-5">
                    {/* Meta */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-bold rounded-full px-2.5 py-0.5"
                        style={{ background: `${post.color}15`, color: post.color }}
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#524435] text-[10px]">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>

                    <h3
                      className="font-semibold text-[#1b1c19] text-base leading-snug mb-2"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className={`text-[#524435] text-xs leading-relaxed ${expandedId === post.id ? "" : "line-clamp-3"}`}>
                      {post.excerpt}
                    </p>

                    <button
                      onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                      className="mt-2 flex items-center gap-1 text-xs font-semibold transition-colors"
                      style={{ color: post.color }}
                    >
                      {expandedId === post.id ? "Show less" : "Read more"}
                      <ArrowRight className={`w-3 h-3 transition-transform ${expandedId === post.id ? "rotate-90" : ""}`} />
                    </button>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-0.5 text-[9px] text-[#524435] bg-gray-50 rounded-full px-2 py-0.5">
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
                <p className="text-[#524435]">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
