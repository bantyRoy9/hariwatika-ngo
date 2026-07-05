"use client";

import { useState } from "react";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";
import { Heart, User, CheckCircle, Printer } from "lucide-react";
import { submitRegistration } from "@/app/actions/submissions";

type TabType = "boy" | "girl";

interface RegistrationForm {
  fullName: string;
  dob: string;
  gotra: string;
  caste: string;
  religion: string;
  education: string;
  occupation: string;
  income: string;
  height: string;
  complexion: string;
  address: string;
  district: string;
  state: string;
  contactName: string;
  contactMobile: string;
  contactRelation: string;
  fatherName: string;
  motherName: string;
  siblings: string;
  hobbies: string;
}

const defaultForm: RegistrationForm = {
  fullName: "", dob: "", gotra: "", caste: "", religion: "Hindu",
  education: "", occupation: "", income: "", height: "", complexion: "",
  address: "", district: "West Champaran", state: "Bihar",
  contactName: "", contactMobile: "", contactRelation: "",
  fatherName: "", motherName: "", siblings: "", hobbies: "",
};

export default function RegistrationContent({ settings = {}, header }: { settings?: Record<string, { en: string; hi: string }>; header?: { tag: { en: string; hi: string }; title: { en: string; hi: string }; subtitle: { en: string; hi: string }; img: string | null } }) {
  const [tab, setTab] = useState<TabType>("boy");
  const { t } = useLang();
  const [boyForm, setBoyForm] = useState<RegistrationForm>({ ...defaultForm });
  const [girlForm, setGirlForm] = useState<RegistrationForm>({ ...defaultForm });
  const [submitted, setSubmitted] = useState<Record<TabType, boolean>>({ boy: false, girl: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regId, setRegId] = useState<Record<TabType, string>>({ boy: "", girl: "" });

  const form = tab === "boy" ? boyForm : girlForm;
  const setForm = tab === "boy" ? setBoyForm : setGirlForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { hobbies, ...rest } = form as RegistrationForm & { hobbies?: string };
    void hobbies;
    const res = await submitRegistration({ ...rest, side: tab });
    setLoading(false);
    if (res.success) {
      setRegId((prev) => ({ ...prev, [tab]: res.data.regId }));
      setSubmitted((prev) => ({ ...prev, [tab]: true }));
    } else {
      setError(res.error);
    }
  };

  const handlePrint = () => {
    const content = document.getElementById("reg-print");
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Registration Form - ${form.fullName}</title>
          <link href="https://fonts.googleapis.com/css2?family=Literata:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif; background: white; color: ${LENITY.ink}; }
            .header { text-align: center; border-bottom: 2px solid ${LENITY.accent}; padding-bottom: 12px; margin-bottom: 20px; }
            h1 { font-family: 'Literata', serif; color: ${LENITY.ink}; margin: 0 0 4px; font-size: 22px; }
            .sub { color: ${LENITY.muted}; font-size: 12px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
            .field { border: 1px solid ${LENITY.line}; border-radius: 8px; padding: 8px; }
            .label { font-size: 9px; text-transform: uppercase; color: ${LENITY.muted}; letter-spacing: 0.5px; }
            .value { font-size: 13px; font-weight: 600; margin-top: 2px; }
            .avatar { width: 80px; height: 80px; border: 2px solid ${LENITY.accent}; border-radius: 8px; background: ${LENITY.yellowSoft}; display: flex; align-items: center; justify-content: center; color: ${LENITY.ink}; font-size: 24px; font-weight: bold; float: right; margin-left: 12px; font-family: 'Literata', serif; }
            .section-title { font-family: 'Literata', serif; font-size: 14px; font-weight: 700; color: ${LENITY.ink}; margin: 14px 0 8px; border-left: 3px solid ${LENITY.accent}; padding-left: 8px; }
            .reg-id { font-size: 10px; font-weight: bold; color: ${LENITY.ink}; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="avatar">${form.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??"}</div>
            <h1>Hariwatika Vivah Registration</h1>
            <p class="sub">${tab === "boy" ? "Varaniya (Boy)" : "Kanya (Girl)"} Registration | ID: ${regId[tab]}</p>
          </div>
          ${content.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const inputClass = "w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E84523] transition-colors";
  const inputStyle = { borderColor: LENITY.line, color: LENITY.ink } as React.CSSProperties;
  const labelClass = "block text-sm font-medium mb-1";
  const labelStyle = { color: LENITY.ink } as React.CSSProperties;
  const sectionHeadingClass = "font-bold text-xs uppercase tracking-[0.18em] pb-2 border-b";

  return (
    <AdminEditProvider initialValues={settings}>
    <>
      <main>
        {/* ════════════ HERO ════════════ */}
        <PremiumHero
          title={header?.title?.en ? t(header.title.en, header.title.hi) : "विवाह पंजीकरण"}
          subtitle={header?.tag?.en ? t(header.tag.en, header.tag.hi) : "Marriage Registration"}
          description={header?.subtitle?.en ? t(header.subtitle.en, header.subtitle.hi) : "Register for marriage assistance from Hariwatika Shiv Mandir Vivah Sewa Samiti."}
          image={header?.img ?? "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"}
          stats={[
            { value: "500+", label: "Marriages Assisted" },
            { value: "Free", label: "Registration" },
            { value: "24hrs", label: "Response Time" },
            { value: "100%", label: "Privacy" },
          ]}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Registration" },
          ]}
          overlay="gradient"
          height="medium"
        />

        <section className="py-16" style={{ background: LENITY.soft }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Tabs */}
            <div
              className="flex gap-2 mb-8 bg-white rounded-2xl border p-1.5"
              style={{ borderColor: LENITY.line }}
            >
              {([["boy", "वर पंजीकरण (Boy)"], ["girl", "कन्या पंजीकरण (Girl)"]] as [TabType, string][]).map(
                ([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setTab(value)}
                    className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    style={
                      tab === value
                        ? { background: LENITY.yellow, color: LENITY.ink }
                        : { color: LENITY.muted, background: "transparent" }
                    }
                  >
                    <User className="w-4 h-4" />
                    {label}
                  </button>
                )
              )}
            </div>

            {submitted[tab] ? (
              <div
                className="bg-white rounded-3xl border shadow-lg overflow-hidden"
                style={{ borderColor: LENITY.line }}
              >
                <div className="p-6 text-center" style={{ background: LENITY.yellow, color: LENITY.ink }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <h2 className="text-xl font-bold" style={{ fontFamily: SERIF }}>
                    Registration Successful!
                  </h2>
                  <p className="text-sm" style={{ color: LENITY.ink }}>ID: {regId[tab]}</p>
                </div>
                <div className="p-6">
                  {/* Print-ready content */}
                  <div id="reg-print" className="grid grid-cols-2 gap-3 text-xs mb-6">
                    {[
                      ["Full Name", form.fullName],
                      ["Date of Birth", form.dob],
                      ["Gotra", form.gotra],
                      ["Caste", form.caste],
                      ["Education", form.education],
                      ["Occupation", form.occupation],
                      ["Annual Income", `₹${form.income}`],
                      ["Height", form.height],
                      ["Father's Name", form.fatherName],
                      ["Mother's Name", form.motherName],
                      ["Contact Mobile", form.contactMobile],
                      ["Address", form.address],
                    ].map(([label, val]) => (
                      <div key={label} className="border rounded-xl p-2.5" style={{ borderColor: LENITY.line }}>
                        <p className="text-[9px] uppercase tracking-wide" style={{ color: LENITY.muted }}>{label}</p>
                        <p className="font-semibold mt-0.5" style={{ color: LENITY.ink }}>{val || "—"}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap justify-center items-center">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
                      style={{ background: LENITY.yellow, color: LENITY.ink }}
                    >
                      <Printer className="w-4 h-4" /> Print Form
                    </button>
                    <a
                      href={`https://wa.me/919473331919?text=नमस्ते%2C%20${encodeURIComponent(form.fullName)}%20का%20विवाह%20पंजीकरण%20ID%20${regId[tab]}%20से%20हुआ%20है।%20कृपया%20आगे%20की%20जानकारी%20दें।`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105 text-white"
                      style={{ background: "#25D366" }}
                    >
                      WhatsApp Confirm
                    </a>
                    <button
                      onClick={() => setSubmitted((p) => ({ ...p, [tab]: false }))}
                      className="text-xs font-semibold transition-colors"
                      style={{ color: LENITY.muted }}
                    >
                      Edit Registration
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="bg-white rounded-3xl border p-6 sm:p-8"
                style={{ borderColor: LENITY.line }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className={sectionHeadingClass} style={{ color: LENITY.ink, borderColor: LENITY.line }}>
                    <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{ background: LENITY.yellow }} />
                    <EditableText as="span" settingKey="registration.section.personal" label="Personal Information Heading"
                      en="Personal Information" hi="व्यक्तिगत जानकारी" />
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle}>Full Name *</label>
                      <input required type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name as per documents" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Date of Birth *</label>
                      <input required type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Gotra *</label>
                      <input required type="text" value={form.gotra} onChange={(e) => setForm({ ...form, gotra: e.target.value })} placeholder="Family gotra" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Caste *</label>
                      <input required type="text" value={form.caste} onChange={(e) => setForm({ ...form, caste: e.target.value })} placeholder="Caste / sub-caste" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Education *</label>
                      <input required type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="e.g. B.A., 10th, M.Sc." className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Occupation *</label>
                      <input required type="text" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="Job / Business / Student" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Annual Income (₹)</label>
                      <input type="text" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} placeholder="Approx. annual income" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Height</label>
                      <input type="text" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} placeholder="e.g. 5&apos;6&quot;" className={inputClass} style={inputStyle} />
                    </div>
                  </div>

                  <h3 className={`${sectionHeadingClass} pt-2`} style={{ color: LENITY.ink, borderColor: LENITY.line }}>
                    <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{ background: LENITY.yellow }} />
                    <EditableText as="span" settingKey="registration.section.family" label="Family Information Heading"
                      en="Family Information" hi="पारिवारिक जानकारी" />
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle}>Father's Name *</label>
                      <input required type="text" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} placeholder="Father's full name" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Mother's Name *</label>
                      <input required type="text" value={form.motherName} onChange={(e) => setForm({ ...form, motherName: e.target.value })} placeholder="Mother's full name" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Siblings</label>
                      <input type="text" value={form.siblings} onChange={(e) => setForm({ ...form, siblings: e.target.value })} placeholder="e.g. 2 brothers, 1 sister" className={inputClass} style={inputStyle} />
                    </div>
                  </div>

                  <h3 className={`${sectionHeadingClass} pt-2`} style={{ color: LENITY.ink, borderColor: LENITY.line }}>
                    <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{ background: LENITY.yellow }} />
                    <EditableText as="span" settingKey="registration.section.contact" label="Contact Information Heading"
                      en="Contact Information" hi="संपर्क जानकारी" />
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass} style={labelStyle}>Full Address *</label>
                      <textarea required rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Village/Town, Block" className={`${inputClass} resize-none`} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Contact Person Name *</label>
                      <input required type="text" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="Parent/Guardian name" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Contact Mobile *</label>
                      <input required type="tel" pattern="[0-9]{10}" value={form.contactMobile} onChange={(e) => setForm({ ...form, contactMobile: e.target.value })} placeholder="10-digit mobile" className={inputClass} style={inputStyle} />
                    </div>
                  </div>

                  {/* Photo Placeholder */}
                  <div>
                    <label className={labelClass} style={labelStyle}>Photo (Optional)</label>
                    <div
                      className="border-2 border-dashed rounded-2xl p-6 text-center"
                      style={{ borderColor: LENITY.line }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2"
                        style={{ background: LENITY.yellowSoft }}
                      >
                        <User className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </span>
                      <p className="text-xs" style={{ color: LENITY.ink }}>Upload photo (JPG, PNG up to 2MB)</p>
                      <p className="text-[10px] mt-1" style={{ color: LENITY.muted }}>Feature coming soon</p>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm font-medium mb-3" style={{ color: LENITY.red }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full py-4 font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    style={{ background: LENITY.yellow, color: LENITY.ink }}
                  >
                    {loading ? (
                      <span className="animate-spin border-2 rounded-full w-5 h-5" style={{ borderColor: LENITY.ink, borderTopColor: "transparent" }} />
                    ) : (
                      <>
                        <Heart className="w-4 h-4" style={{ color: LENITY.ink }} />
                        Submit {tab === "boy" ? "Varaniya" : "Kanya"} Registration
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
    </AdminEditProvider>
  );
}
