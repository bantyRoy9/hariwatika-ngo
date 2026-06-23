"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, TreePine, Users, Stethoscope, BookOpen, CalendarDays, MapPin } from "lucide-react";

const categories = ["All", "Vivah Seva", "Vrikshaaropan", "Garib Sahayata", "Swasthya Seva", "Education"];

const projects = [
  {
    id: 1,
    category: "Vivah Seva",
    icon: Heart,
    color: "#855300",
    bg: "#fff8f0",
    status: "ongoing",
    title: "Saptapadi Vivah Mahotsav 2025",
    desc: "Annual mass marriage ceremony to facilitate dignified weddings for 20+ underprivileged families, covering all ceremony needs including venue, priest, meals, gifts, and legal registration.",
    raised: 85000,
    goal: 100000,
    location: "Sukanya Utsav Bhawan, Bettiah",
    date: "February 2025",
    beneficiaries: "20+ families",
  },
  {
    id: 2,
    category: "Vrikshaaropan",
    icon: TreePine,
    color: "#006d3e",
    bg: "#f0fdf4",
    status: "ongoing",
    title: "Hariyali Abhiyan — 10,000 Trees 2024-25",
    desc: "Planting 10,000 trees across West Champaran during the monsoon season. Species include neem, peepal, mango, and fruit trees. Local school children and youth volunteers participate.",
    raised: 32000,
    goal: 50000,
    location: "West Champaran blocks",
    date: "June–Sep 2025",
    beneficiaries: "Entire region",
  },
  {
    id: 3,
    category: "Garib Sahayata",
    icon: Users,
    color: "#855300",
    bg: "#fff8f0",
    status: "ongoing",
    title: "Winter Relief Drive 2024",
    desc: "Distributing warm blankets, sweaters, and essential food items to 500+ underprivileged families before winter arrives. Priority given to elderly, widows, and families with young children.",
    raised: 18500,
    goal: 30000,
    location: "Bettiah & surrounding villages",
    date: "Nov–Jan 2024-25",
    beneficiaries: "500+ families",
  },
  {
    id: 4,
    category: "Swasthya Seva",
    icon: Stethoscope,
    color: "#006d3e",
    bg: "#f0fdf4",
    status: "ongoing",
    title: "Free Health Camp — Quarterly Drive",
    desc: "Quarterly free health camps in partnership with local doctors and NGOs. Services include general checkup, blood sugar, BP testing, eye care, and free medicines distribution.",
    raised: 12000,
    goal: 20000,
    location: "Hariwatika Chowk & 3 villages",
    date: "Every Quarter",
    beneficiaries: "200+ per camp",
  },
  {
    id: 5,
    category: "Education",
    icon: BookOpen,
    color: "#855300",
    bg: "#fff8f0",
    status: "ongoing",
    title: "Scholarship Program for Girls 2024-25",
    desc: "Providing scholarships to 50 deserving girl students from poor families for higher education. ₹5,000 per student per year for books, school fees, and stationery.",
    raised: 45000,
    goal: 250000,
    location: "West Champaran",
    date: "Academic Year 2024-25",
    beneficiaries: "50 girls",
  },
  {
    id: 6,
    category: "Vrikshaaropan",
    icon: TreePine,
    color: "#006d3e",
    bg: "#f0fdf4",
    status: "completed",
    title: "Van Mahotsav 2024 — 2000 Trees Planted",
    desc: "Successfully planted 2000 saplings across Bettiah with participation from 200+ volunteers, school students, and government officials.",
    raised: 25000,
    goal: 25000,
    location: "Bettiah, West Champaran",
    date: "Jul 2024",
    beneficiaries: "Entire Bettiah region",
  },
];

const futurePlans = [
  { title: "Community Library & Reading Room", year: "2025", desc: "Setting up a free library with 500+ books for youth and children." },
  { title: "Digital Literacy Program", year: "2025", desc: "Teaching basic computer skills and internet usage to rural women." },
  { title: "Organic Farming Initiative", year: "2026", desc: "Helping farmers adopt organic practices for better yield and health." },
  { title: "Ambulance Service for Villages", year: "2026", desc: "Dedicated ambulance service for emergency medical transport." },
  { title: "Drinking Water Purification Units", year: "2027", desc: "Installing water purification plants in 10 villages." },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

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
              Our Work
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              हमारे प्रोजेक्ट्स
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Ongoing and completed projects making a real difference in West Champaran communities.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-[#fbf9f4] border-b border-[#e4e2dd]">
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

        {/* Projects Grid */}
        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => {
                const pct = Math.round((project.raised / project.goal) * 100);
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Card Header */}
                    <div
                      className="h-24 flex items-center justify-center relative"
                      style={{ background: project.bg }}
                    >
                      <project.icon className="w-12 h-12 opacity-30" style={{ color: project.color }} />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span
                          className={`text-[10px] font-bold rounded-full px-2.5 py-0.5 ${
                            project.status === "completed"
                              ? "bg-green-100 text-[#006d3e]"
                              : "bg-orange-100 text-[#855300]"
                          }`}
                        >
                          {project.status === "completed" ? "✓ Completed" : "● Ongoing"}
                        </span>
                      </div>
                      <span
                        className="absolute bottom-3 left-3 text-[10px] font-semibold rounded-full px-2.5 py-0.5 bg-white/80 backdrop-blur-sm"
                        style={{ color: project.color }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="font-semibold text-[#1b1c19] text-base leading-snug mb-2"
                        style={{ fontFamily: "'Literata', serif" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[#524435] text-xs leading-relaxed mb-4 flex-1">{project.desc}</p>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-[#524435]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#855300]" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3 text-[#855300]" />
                          <span>{project.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#855300]" />
                          <span>{project.beneficiaries}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#524435]">
                            ₹{project.raised.toLocaleString("en-IN")} raised
                          </span>
                          <span className="font-semibold text-[#855300]">{pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                          <div
                            className="h-full bg-[#855300] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-xs text-[#524435]">
                          Goal: ₹{project.goal.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Future Plans */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                Future Plans
              </span>
              <h2
                className="text-3xl font-bold text-[#1b1c19]"
                style={{ fontFamily: "'Literata', serif" }}
              >
                भविष्य की योजनाएं
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {futurePlans.map((plan) => (
                <div
                  key={plan.title}
                  className="bg-[#fbf9f4] rounded-2xl border border-[#e4e2dd] p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-[#855300] text-white rounded-full px-3 py-1">
                      {plan.year}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-[#1b1c19] mb-2"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    {plan.title}
                  </h3>
                  <p className="text-[#524435] text-sm">{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
