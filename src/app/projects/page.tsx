"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
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
        <PageHero
          tag="Our Work"
          title="हमारे प्रोजेक्ट्स"
          subtitle="Ongoing and completed projects making a real difference in West Champaran communities."
        />

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
        <section className="py-16 bg-[#fbf9f4] dot-grid relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-80 rounded-full bg-[#855300]/5 blur-3xl hero-blob-2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => {
                const pct = Math.round((project.raised / project.goal) * 100);
                return (
                  <Reveal key={project.id} delay={i * 70} animation="slide-up">
                    <Card3D className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden flex flex-col h-full">
                      <div className="h-24 flex items-center justify-center relative" style={{ background: project.bg }}>
                        <project.icon className="w-12 h-12 opacity-30" style={{ color: project.color }} />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className={`text-[10px] font-bold rounded-full px-2.5 py-0.5 ${
                            project.status === "completed" ? "bg-green-100 text-[#006d3e]" : "bg-orange-100 text-[#855300]"
                          }`}>
                            {project.status === "completed" ? "✓ Completed" : "● Ongoing"}
                          </span>
                        </div>
                        <span className="absolute bottom-3 left-3 text-[10px] font-semibold rounded-full px-2.5 py-0.5 bg-white/80 backdrop-blur-sm" style={{ color: project.color }}>
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold text-[#1b1c19] text-base leading-snug mb-2" style={{ fontFamily: "'Literata', serif" }}>
                          {project.title}
                        </h3>
                        <p className="text-[#524435] text-xs leading-relaxed mb-4 flex-1">{project.desc}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-[#524435]">
                          <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#855300]" /><span className="truncate">{project.location}</span></div>
                          <div className="flex items-center gap-1"><CalendarDays className="w-3 h-3 text-[#855300]" /><span>{project.date}</span></div>
                          <div className="flex items-center gap-1"><Users className="w-3 h-3 text-[#855300]" /><span>{project.beneficiaries}</span></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#524435]">₹{project.raised.toLocaleString("en-IN")} raised</span>
                            <span className="font-semibold text-[#855300]">{pct}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                            <div className="h-full rounded-full progress-glow" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#6b3500,#F4A433)" }} />
                          </div>
                          <div className="text-xs text-[#524435]">Goal: ₹{project.goal.toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                    </Card3D>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Future Plans */}
        <section className="py-20 bg-white line-grid relative overflow-hidden">
          <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-[#F4A433]/5 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span className="section-tag mb-3 block w-fit mx-auto">Future Plans</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>भविष्य की योजनाएं</h2>
              <div className="section-divider" />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {futurePlans.map((plan, i) => (
                <Reveal key={plan.title} delay={i * 80} animation="slide-up">
                  <Card3D className="bg-[#fbf9f4] rounded-2xl border border-[#e4e2dd] p-6 h-full shine-sweep">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white rounded-full px-3 py-1 shine-sweep" style={{ background: "linear-gradient(135deg,#855300,#F4A433)" }}>
                        {plan.year}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1b1c19] mb-2" style={{ fontFamily: "'Literata', serif" }}>{plan.title}</h3>
                    <p className="text-[#524435] text-sm">{plan.desc}</p>
                  </Card3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
