"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Award, Clock, CheckCircle, Users, Briefcase } from "lucide-react";

const internships = [
  {
    id: 1,
    title: "Social Work Intern",
    department: "Community Outreach",
    duration: "3 months",
    stipend: "Voluntary (Certificate + LOR)",
    seats: 5,
    skills: ["Communication", "Empathy", "Field Work"],
    description:
      "Work directly with families in need, assist in marriage ceremonies, conduct household surveys, and support relief distribution drives.",
  },
  {
    id: 2,
    title: "Digital Media Intern",
    department: "Communications",
    duration: "2 months",
    stipend: "Voluntary (Certificate + LOR)",
    seats: 2,
    skills: ["Photography", "Social Media", "Content Writing"],
    description:
      "Document events, manage social media profiles, create content about our programs, and help with digital outreach campaigns.",
  },
  {
    id: 3,
    title: "Events Management Intern",
    department: "Events & Logistics",
    duration: "1–3 months",
    stipend: "Voluntary (Certificate + LOR)",
    seats: 3,
    skills: ["Planning", "Coordination", "Teamwork"],
    description:
      "Assist in planning and executing mass marriage ceremonies, health camps, tree plantation drives, and annual functions.",
  },
  {
    id: 4,
    title: "Finance & Accounts Intern",
    department: "Administration",
    duration: "3 months",
    stipend: "Voluntary (Certificate + LOR)",
    seats: 1,
    skills: ["Tally / Excel", "Bookkeeping", "Audit Support"],
    description:
      "Assist the Auditor and Treasurer with accounts, donor records, expense tracking, and preparation of financial statements.",
  },
];

interface AppForm {
  name: string;
  age: string;
  qualification: string;
  institute: string;
  mobile: string;
  email: string;
  role: string;
  startDate: string;
  duration: string;
  motivation: string;
}

export default function InternshipPage() {
  const [form, setForm] = useState<AppForm>({
    name: "", age: "", qualification: "", institute: "",
    mobile: "", email: "", role: "", startDate: "", duration: "", motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [certId] = useState(`HW-CERT-${Date.now().toString().slice(-5)}`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handlePrintCert = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Internship Certificate</title>
          <link href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; background: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .cert { width: 8.5in; height: 6in; border: 8px double #855300; padding: 48px 60px; box-sizing: border-box; background: linear-gradient(135deg, #fff8f0 0%, #ffffff 100%); text-align: center; position: relative; }
            .corner { position: absolute; width: 40px; height: 40px; border-color: #F4A433; border-style: solid; }
            .tl { top: 16px; left: 16px; border-width: 3px 0 0 3px; }
            .tr { top: 16px; right: 16px; border-width: 3px 3px 0 0; }
            .bl { bottom: 16px; left: 16px; border-width: 0 0 3px 3px; }
            .br { bottom: 16px; right: 16px; border-width: 0 3px 3px 0; }
            h1 { font-family: 'Literata', serif; color: #855300; font-size: 36px; margin: 0 0 4px; }
            .sub { color: #524435; font-size: 14px; margin-bottom: 24px; }
            .divider { height: 2px; background: linear-gradient(to right, transparent, #855300, transparent); margin: 16px auto; width: 60%; }
            .certify { color: #524435; font-size: 14px; margin-bottom: 16px; }
            .name { font-family: 'Literata', serif; font-size: 28px; color: #1b1c19; font-weight: 700; margin: 8px 0; }
            .desc { color: #524435; font-size: 13px; line-height: 1.6; max-width: 500px; margin: 0 auto 24px; }
            .meta { display: flex; justify-content: center; gap: 40px; margin-bottom: 32px; }
            .meta-item label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #857463; margin-bottom: 4px; }
            .meta-item span { font-weight: 600; color: #1b1c19; font-size: 13px; }
            .sig-area { display: flex; justify-content: space-around; margin-top: 32px; }
            .sig-block { text-align: center; }
            .sig-line { width: 120px; height: 1px; background: #857463; margin: 0 auto 4px; }
            .sig-name { font-size: 11px; color: #524435; }
            .org-footer { margin-top: 20px; font-size: 10px; color: #857463; }
          </style>
        </head>
        <body>
          <div class="cert">
            <div class="corner tl"></div><div class="corner tr"></div>
            <div class="corner bl"></div><div class="corner br"></div>
            <h1>Certificate of Internship</h1>
            <p class="sub">Hariwatika Shiv Mandir Vivah Sewa Samiti</p>
            <div class="divider"></div>
            <p class="certify">This is to certify that</p>
            <p class="name">${form.name}</p>
            <p class="desc">
              has successfully completed an internship as <strong>${form.role}</strong>
              at <strong>Hariwatika Shiv Mandir Vivah Sewa Samiti</strong>, Bettiah, West Champaran, Bihar.
              Their dedication and contribution to our community programs is hereby recognized and appreciated.
            </p>
            <div class="meta">
              <div class="meta-item"><label>Certificate No.</label><span>${certId}</span></div>
              <div class="meta-item"><label>Duration</label><span>${form.duration}</span></div>
              <div class="meta-item"><label>Year</label><span>${new Date().getFullYear()}</span></div>
            </div>
            <div class="sig-area">
              <div class="sig-block"><div class="sig-line"></div><p class="sig-name">Ramanand Yadav<br>Director</p></div>
              <div class="sig-block"><div class="sig-line"></div><p class="sig-name">Jitendra Kumar Mishra<br>Secretary</p></div>
            </div>
            <p class="org-footer">Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, Bihar 845438 | hariwatikaseva@gmail.com</p>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

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
            <BookOpen className="w-12 h-12 text-[#F4A433] mx-auto mb-4" />
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              Internship Program
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Gain real-world social work experience and receive an official certificate upon completion.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        {/* Opportunities */}
        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2
                className="text-2xl font-bold text-[#1b1c19]"
                style={{ fontFamily: "'Literata', serif" }}
              >
                Current Openings
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {internships.map((intern) => (
                <div key={intern.id} className="bg-white rounded-2xl border border-[#e4e2dd] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="font-semibold text-[#1b1c19] text-base"
                        style={{ fontFamily: "'Literata', serif" }}
                      >
                        {intern.title}
                      </h3>
                      <p className="text-xs text-[#855300] font-medium">{intern.department}</p>
                    </div>
                    <span className="text-xs bg-green-50 text-[#006d3e] font-semibold rounded-full px-2.5 py-1">
                      {intern.seats} seats
                    </span>
                  </div>
                  <p className="text-[#524435] text-sm leading-relaxed mb-4">{intern.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {intern.skills.map((s) => (
                      <span key={s} className="bg-orange-50 text-[#855300] text-xs rounded-full px-2.5 py-1 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#524435]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#855300]" />
                      Duration: {intern.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#855300]" />
                      {intern.stipend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-[#e4e2dd] shadow-lg overflow-hidden">
                  <div className="bg-[#006d3e] text-white p-6 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-lg font-bold" style={{ fontFamily: "'Literata', serif" }}>
                      Application Submitted!
                    </h3>
                    <p className="text-white/80 text-sm">We will contact you within 3–5 working days.</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-[#524435] text-sm mb-4">
                      A certificate preview is ready for your role: <strong>{form.role}</strong>
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <button
                        onClick={handlePrintCert}
                        className="flex items-center gap-2 bg-[#855300] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#653e00] transition-colors"
                      >
                        <Award className="w-4 h-4" /> Preview Certificate
                      </button>
                      <a
                        href={`https://wa.me/919473331919?text=नमस्ते%2C%20मेरा%20नाम%20${encodeURIComponent(form.name)}%20है।%20मैंने%20${encodeURIComponent(form.role)}%20के%20लिए%20internship%20apply%20किया%20है।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 sm:p-8">
                  <h3
                    className="text-xl font-bold text-[#1b1c19] mb-6"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Apply for Internship
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: "name", label: "Full Name *", type: "text", placeholder: "Your name", required: true },
                        { key: "age", label: "Age *", type: "number", placeholder: "18–30", required: true },
                        { key: "qualification", label: "Qualification *", type: "text", placeholder: "e.g. B.Sc, MBA", required: true },
                        { key: "institute", label: "Institute/College *", type: "text", placeholder: "Name of college", required: true },
                        { key: "mobile", label: "Mobile *", type: "tel", placeholder: "10-digit mobile", required: true },
                        { key: "email", label: "Email *", type: "email", placeholder: "your@email.com", required: true },
                      ].map(({ key, label, type, placeholder, required }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">{label}</label>
                          <input
                            required={required}
                            type={type}
                            value={form[key as keyof AppForm]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300]"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Role Applying For *</label>
                      <select
                        required
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300] bg-white"
                      >
                        <option value="">Select a role</option>
                        {internships.map((i) => <option key={i.id}>{i.title}</option>)}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Preferred Start Date *</label>
                        <input
                          required
                          type="date"
                          value={form.startDate}
                          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Duration *</label>
                        <select
                          required
                          value={form.duration}
                          onChange={(e) => setForm({ ...form, duration: e.target.value })}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300] bg-white"
                        >
                          <option value="">Select duration</option>
                          <option>1 month</option>
                          <option>2 months</option>
                          <option>3 months</option>
                          <option>6 months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Motivation / Statement</label>
                      <textarea
                        value={form.motivation}
                        onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                        placeholder="Tell us why you want to intern with us..."
                        rows={3}
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                      ) : (
                        <>
                          <Briefcase className="w-4 h-4" /> Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
