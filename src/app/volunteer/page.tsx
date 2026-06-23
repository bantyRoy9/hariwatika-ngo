"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Heart, CheckCircle, Printer, Award, Clock, MapPin } from "lucide-react";

interface VolunteerForm {
  name: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  skills: string[];
  availability: string;
  motivation: string;
}

const skillOptions = [
  "Event Management", "Social Work", "Medical / Health",
  "Teaching / Tutoring", "Photography", "Driving",
  "Cooking", "Legal / Documentation", "IT / Tech",
  "Construction / Labour", "Music / Arts", "Other",
];

let volunteerCounter = 1001;

export default function VolunteerPage() {
  const [form, setForm] = useState<VolunteerForm>({
    name: "", age: "", gender: "", mobile: "",
    email: "", address: "", skills: [], availability: "", motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volunteerId] = useState(`HW-VOL-${volunteerCounter++}`);
  const [joinYear] = useState(new Date().getFullYear());

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handlePrintCard = () => {
    const content = document.getElementById("id-card-print");
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Volunteer ID Card - ${form.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Literata:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; background: white; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; justify-content: center; }
            .card { width: 3.375in; height: 2.125in; border: 3px solid #855300; border-radius: 16px; overflow: hidden; background: linear-gradient(135deg, #fff8f0, #ffffff); display: flex; flex-direction: column; }
            .header { background: #855300; color: white; padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
            .org-name { font-family: 'Literata', serif; font-size: 11px; font-weight: 700; }
            .org-sub { font-size: 8px; opacity: 0.8; }
            .body { display: flex; padding: 10px 12px; flex: 1; gap: 10px; }
            .avatar { width: 56px; height: 56px; border-radius: 50%; background: #855300; color: white; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; flex-shrink: 0; border: 2px solid #F4A433; }
            .info { flex: 1; }
            .name { font-family: 'Literata', serif; font-size: 14px; font-weight: 700; color: #1b1c19; line-height: 1.2; }
            .role { font-size: 10px; font-weight: 600; color: #855300; margin: 2px 0; }
            .meta { font-size: 8px; color: #524435; }
            .meta-item { margin: 1px 0; }
            .footer { background: #855300/10; padding: 4px 12px; border-top: 1px solid #e4e2dd; display: flex; justify-content: space-between; align-items: center; }
            .id-num { font-size: 9px; font-weight: 700; color: #855300; font-family: monospace; }
            .validity { font-size: 8px; color: #524435; }
          </style>
        </head>
        <body>${content.outerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const initials = form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "VL";

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
            <Users className="w-12 h-12 text-[#F4A433] mx-auto mb-4" />
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              स्वयंसेवक बनें
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Join our volunteer family and make a meaningful impact in your community.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden shadow-lg">
                  <div className="bg-[#006d3e] text-white p-6 text-center">
                    <CheckCircle className="w-14 h-14 mx-auto mb-2" />
                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Literata', serif" }}>
                      Welcome to the Team!
                    </h2>
                    <p className="text-white/80 text-sm mt-1">Your volunteer registration is confirmed.</p>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-[#1b1c19] mb-4 text-center">Your Volunteer ID Card</h3>

                    {/* ID Card */}
                    <div
                      id="id-card-print"
                      className="max-w-xs mx-auto border-[3px] border-[#855300] rounded-2xl overflow-hidden shadow-md"
                      style={{ background: "linear-gradient(135deg, #fff8f0, #ffffff)" }}
                    >
                      {/* Header */}
                      <div className="bg-[#855300] text-white px-4 py-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-white flex-shrink-0" />
                        <div>
                          <div className="text-[10px] font-bold" style={{ fontFamily: "'Literata', serif" }}>
                            Hariwatika Shiv Mandir
                          </div>
                          <div className="text-[8px] opacity-80">Vivah Sewa Samiti · Bettiah, Bihar</div>
                        </div>
                        <span className="ml-auto text-[9px] bg-white/20 rounded px-1.5 py-0.5">VOLUNTEER</span>
                      </div>

                      {/* Body */}
                      <div className="flex gap-3 p-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-[#855300] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 border-2 border-[#F4A433]">
                          {initials}
                        </div>
                        <div className="flex-1">
                          <div
                            className="font-bold text-[#1b1c19] text-sm leading-tight"
                            style={{ fontFamily: "'Literata', serif" }}
                          >
                            {form.name}
                          </div>
                          <div className="text-[10px] font-semibold text-[#855300] mt-0.5">
                            Community Volunteer
                          </div>
                          <div className="mt-1 space-y-0.5">
                            <div className="flex items-center gap-1 text-[9px] text-[#524435]">
                              <Clock className="w-2.5 h-2.5 text-[#855300]" />
                              Availability: {form.availability}
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-[#524435]">
                              <MapPin className="w-2.5 h-2.5 text-[#855300]" />
                              {form.address.split(",")[0] || "West Champaran"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-orange-50 px-4 py-2 flex items-center justify-between border-t border-[#e4e2dd]">
                        <span className="font-mono text-xs font-bold text-[#855300]">{volunteerId}</span>
                        <span className="text-[9px] text-[#524435]">
                          Valid: {joinYear}–{joinYear + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={handlePrintCard}
                        className="flex items-center gap-2 bg-[#855300] text-white hover:bg-[#653e00] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        Print ID Card
                      </button>
                      <a
                        href={`https://wa.me/919473331919?text=नमस्ते%2C%20मेरा%20नाम%20${encodeURIComponent(form.name)}%20है।%20मैंने%20स्वयंसेवक%20के%20रूप%20में%20पंजीकरण%20किया%20है।%20ID:%20${volunteerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                      >
                        WhatsApp Confirm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Benefits */}
                <div className="space-y-4">
                  <h2
                    className="text-xl font-bold text-[#1b1c19]"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Why Volunteer?
                  </h2>
                  {[
                    { icon: Award, title: "Certificate of Service", desc: "Get official recognition for your volunteer work" },
                    { icon: Users, title: "Community Impact", desc: "Directly help hundreds of families in need" },
                    { icon: Heart, title: "Volunteer ID Card", desc: "Receive a printed ID card upon registration" },
                    { icon: Clock, title: "Flexible Timing", desc: "Volunteer on weekends or whenever you're free" },
                  ].map((b) => (
                    <div key={b.title} className="bg-white rounded-xl border border-[#e4e2dd] p-4 flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <b.icon className="w-5 h-5 text-[#855300]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1b1c19] text-sm">{b.title}</h4>
                        <p className="text-[#524435] text-xs mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 sm:p-8">
                    <h2
                      className="text-xl font-bold text-[#1b1c19] mb-6"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      Volunteer Registration
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Name *</label>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">Age *</label>
                          <input
                            required
                            type="number"
                            min="16"
                            max="80"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                            placeholder="Your age"
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">Gender *</label>
                          <select
                            required
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] bg-white"
                          >
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">Mobile *</label>
                          <input
                            required
                            type="tel"
                            pattern="[0-9]{10}"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            placeholder="10-digit mobile"
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Optional"
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Address *</label>
                        <textarea
                          required
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          placeholder="Village/Town, Block, District"
                          rows={2}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] resize-none"
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-2">Skills *</label>
                        <div className="flex flex-wrap gap-2">
                          {skillOptions.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                form.skills.includes(skill)
                                  ? "bg-[#855300] text-white border-[#855300]"
                                  : "border-[#e4e2dd] text-[#524435] hover:border-[#855300]"
                              }`}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Availability *</label>
                        <select
                          required
                          value={form.availability}
                          onChange={(e) => setForm({ ...form, availability: e.target.value })}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] bg-white"
                        >
                          <option value="">Select availability</option>
                          <option>Weekends only</option>
                          <option>Weekdays only</option>
                          <option>Full time</option>
                          <option>Event basis only</option>
                          <option>As needed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Motivation</label>
                        <textarea
                          value={form.motivation}
                          onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                          placeholder="Why do you want to volunteer with us?"
                          rows={3}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                        ) : (
                          <>
                            <Users className="w-4 h-4" />
                            Register as Volunteer
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
