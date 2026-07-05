"use client";

import { useState } from "react";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import { BookOpen, Award, Clock, CheckCircle, Briefcase } from "lucide-react";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { submitInternship } from "@/app/actions/submissions";

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

export default function InternshipContent({ settings = {}, header }: { settings?: Record<string, { en: string; hi: string }>; header?: { tag: { en: string; hi: string }; title: { en: string; hi: string }; subtitle: { en: string; hi: string }; img: string | null } }) {
  const [form, setForm] = useState<AppForm>({
    name: "", age: "", qualification: "", institute: "",
    mobile: "", email: "", role: "", startDate: "", duration: "", motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [certId, setCertId] = useState("");
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await submitInternship(form);
    setLoading(false);
    if (res.success) {
      setCertId(res.data.certId);
      setSubmitted(true);
    } else {
      setError(res.error);
    }
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
            .cert { width: 8.5in; height: 6in; border: 8px double #F2C200; padding: 48px 60px; box-sizing: border-box; background: linear-gradient(135deg, #fbfaf6 0%, #ffffff 100%); text-align: center; position: relative; }
            .corner { position: absolute; width: 40px; height: 40px; border-color: #F2C200; border-style: solid; }
            .tl { top: 16px; left: 16px; border-width: 3px 0 0 3px; }
            .tr { top: 16px; right: 16px; border-width: 3px 3px 0 0; }
            .bl { bottom: 16px; left: 16px; border-width: 0 0 3px 3px; }
            .br { bottom: 16px; right: 16px; border-width: 0 3px 3px 0; }
            h1 { font-family: 'Literata', serif; color: #1d1d1b; font-size: 36px; margin: 0 0 4px; }
            .sub { color: #5f5f5a; font-size: 14px; margin-bottom: 24px; }
            .divider { height: 2px; background: linear-gradient(to right, transparent, #F2C200, transparent); margin: 16px auto; width: 60%; }
            .certify { color: #5f5f5a; font-size: 14px; margin-bottom: 16px; }
            .name { font-family: 'Literata', serif; font-size: 28px; color: #1d1d1b; font-weight: 700; margin: 8px 0; }
            .desc { color: #5f5f5a; font-size: 13px; line-height: 1.6; max-width: 500px; margin: 0 auto 24px; }
            .meta { display: flex; justify-content: center; gap: 40px; margin-bottom: 32px; }
            .meta-item label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #5f5f5a; margin-bottom: 4px; }
            .meta-item span { font-weight: 600; color: #1d1d1b; font-size: 13px; }
            .sig-area { display: flex; justify-content: space-around; margin-top: 32px; }
            .sig-block { text-align: center; }
            .sig-line { width: 120px; height: 1px; background: #5f5f5a; margin: 0 auto 4px; }
            .sig-name { font-size: 11px; color: #5f5f5a; }
            .org-footer { margin-top: 20px; font-size: 10px; color: #5f5f5a; }
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
    <AdminEditProvider initialValues={settings}>
    <>
      <main>
        {/* Hero */}
        <PremiumHero
          title={header?.title?.en ? t(header.title.en, header.title.hi) : "Internship Program"}
          subtitle={header?.tag?.en ? t(header.tag.en, header.tag.hi) : "Join Our Team"}
          description={header?.subtitle?.en ? t(header.subtitle.en, header.subtitle.hi) : "Gain hands-on experience in social work, community development, and NGO operations. Learn while making a real difference."}
          image={header?.img ?? "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80"}
          stats={[
            { value: "4", label: "Roles Available" },
            { value: "3mo", label: "Duration" },
            { value: "Free", label: "Certificate" },
            { value: "LOR", label: "Provided" },
          ]}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Internship" },
          ]}
          overlay="pattern"
          height="medium"
        />

        {/* Opportunities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: LENITY.ink }}>
                <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
                <EditableText as="span" settingKey="internship.openings.eyebrow" label="Openings Eyebrow"
                  en="Opportunities" hi="अवसर" />
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: SERIF, color: LENITY.ink }}
              >
                <EditableText as="span" settingKey="internship.openings.h2" label="Openings Heading"
                  en="Current Openings" hi="वर्तमान रिक्तियां" />
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {internships.map((intern) => (
                <div
                  key={intern.id}
                  className="bg-white rounded-3xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ borderColor: LENITY.line }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="font-bold text-base"
                        style={{ fontFamily: SERIF, color: LENITY.ink }}
                      >
                        {intern.title}
                      </h3>
                      <p className="text-xs font-semibold" style={{ color: LENITY.muted }}>{intern.department}</p>
                    </div>
                    <span
                      className="text-xs font-bold rounded-full px-2.5 py-1"
                      style={{ color: LENITY.ink, background: LENITY.yellowSoft }}
                    >
                      {intern.seats} seats
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: LENITY.muted }}>{intern.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {intern.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs rounded-full px-2.5 py-1 font-semibold"
                        style={{ color: LENITY.ink, background: LENITY.yellowSoft }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs" style={{ color: LENITY.muted }}>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" style={{ color: LENITY.accent }} />
                      Duration: {intern.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" style={{ color: LENITY.accent }} />
                      {intern.stipend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="bg-white rounded-3xl border shadow-lg overflow-hidden" style={{ borderColor: LENITY.line }}>
                  <div className="p-6 text-center" style={{ background: LENITY.accent, color: LENITY.ink }}>
                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-lg font-bold" style={{ fontFamily: SERIF }}>
                      Application Submitted!
                    </h3>
                    <p className="text-sm" style={{ color: LENITY.ink, opacity: 0.8 }}>We will contact you within 3–5 working days.</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-sm mb-4" style={{ color: LENITY.muted }}>
                      A certificate preview is ready for your role:{" "}
                      <strong style={{ color: LENITY.ink }}>{form.role}</strong>
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <button
                        onClick={handlePrintCert}
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
                        style={{ background: LENITY.accent, color: LENITY.ink }}
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
                <div className="bg-white rounded-3xl border p-6 sm:p-8" style={{ borderColor: LENITY.line }}>
                  <h3
                    className="text-xl font-bold mb-6"
                    style={{ fontFamily: SERIF, color: LENITY.ink }}
                  >
                    <EditableText as="span" settingKey="internship.apply.h3" label="Apply Heading"
                      en="Apply for Internship" hi="इंटर्नशिप के लिए आवेदन करें" />
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
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{label}</label>
                          <input
                            required={required}
                            type={type}
                            value={form[key as keyof AppForm]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:ring-2"
                            style={{ borderColor: LENITY.line, color: LENITY.ink, ["--tw-ring-color" as string]: LENITY.accent }}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Role Applying For *</label>
                      <select
                        required
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-800 border focus:outline-none focus:ring-2"
                        style={{ borderColor: LENITY.line, color: LENITY.ink, ["--tw-ring-color" as string]: LENITY.accent }}
                      >
                        <option value="">Select a role</option>
                        {internships.map((i) => <option key={i.id}>{i.title}</option>)}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Preferred Start Date *</label>
                        <input
                          required
                          type="date"
                          value={form.startDate}
                          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                          className="w-full rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:ring-2"
                          style={{ borderColor: LENITY.line, color: LENITY.ink, ["--tw-ring-color" as string]: LENITY.accent }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Duration *</label>
                        <select
                          required
                          value={form.duration}
                          onChange={(e) => setForm({ ...form, duration: e.target.value })}
                          className="w-full rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-800 border focus:outline-none focus:ring-2"
                          style={{ borderColor: LENITY.line, color: LENITY.ink, ["--tw-ring-color" as string]: LENITY.accent }}
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
                      <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Motivation / Statement</label>
                      <textarea
                        value={form.motivation}
                        onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                        placeholder="Tell us why you want to intern with us..."
                        rows={3}
                        className="w-full rounded-xl px-4 py-2.5 text-sm resize-none border focus:outline-none focus:ring-2"
                        style={{ borderColor: LENITY.line, color: LENITY.ink, ["--tw-ring-color" as string]: LENITY.accent }}
                      />
                    </div>

                    {error && (
                      <p className="text-sm font-medium" style={{ color: LENITY.red }}>{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full py-3.5 font-bold transition-all hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ background: LENITY.accent, color: LENITY.ink }}
                    >
                      {loading ? (
                        <span className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5" style={{ borderColor: LENITY.ink, borderTopColor: "transparent" }} />
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
    </>
    </AdminEditProvider>
  );
}
