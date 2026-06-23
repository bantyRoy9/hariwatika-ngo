"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, User, CheckCircle, Printer } from "lucide-react";

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

let regCounter = 1001;

export default function RegistrationPage() {
  const [tab, setTab] = useState<TabType>("boy");
  const [boyForm, setBoyForm] = useState<RegistrationForm>({ ...defaultForm });
  const [girlForm, setGirlForm] = useState<RegistrationForm>({ ...defaultForm });
  const [submitted, setSubmitted] = useState<Record<TabType, boolean>>({ boy: false, girl: false });
  const [loading, setLoading] = useState(false);
  const [regId] = useState<Record<TabType, string>>({
    boy: `HW-B-${regCounter++}`,
    girl: `HW-G-${regCounter++}`,
  });

  const form = tab === "boy" ? boyForm : girlForm;
  const setForm = tab === "boy" ? setBoyForm : setGirlForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted((prev) => ({ ...prev, [tab]: true }));
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
            body { margin: 0; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif; background: white; color: #1b1c19; }
            .header { text-align: center; border-bottom: 2px solid #855300; padding-bottom: 12px; margin-bottom: 20px; }
            h1 { font-family: 'Literata', serif; color: #855300; margin: 0 0 4px; font-size: 22px; }
            .sub { color: #524435; font-size: 12px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
            .field { border: 1px solid #e4e2dd; border-radius: 8px; padding: 8px; }
            .label { font-size: 9px; text-transform: uppercase; color: #857463; letter-spacing: 0.5px; }
            .value { font-size: 13px; font-weight: 600; margin-top: 2px; }
            .avatar { width: 80px; height: 80px; border: 2px solid #855300; border-radius: 8px; background: #fff8f0; display: flex; align-items: center; justify-content: center; color: #855300; font-size: 24px; font-weight: bold; float: right; margin-left: 12px; font-family: 'Literata', serif; }
            .section-title { font-family: 'Literata', serif; font-size: 14px; font-weight: 700; color: #855300; margin: 14px 0 8px; border-left: 3px solid #855300; padding-left: 8px; }
            .reg-id { font-size: 10px; font-weight: bold; color: #855300; }
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

  const inputClass = "w-full border border-[#e4e2dd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#855300] bg-white";

  return (
    <>
      <Navbar />
      <main>
        <section
          className="pt-28 pb-16 relative"
          style={{ background: "linear-gradient(135deg, #1b0d00 0%, #3d1f00 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-12 h-12 text-[#F4A433] fill-[#F4A433] mx-auto mb-4" />
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              विवाह पंजीकरण
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Register for marriage assistance from Hariwatika Shiv Mandir Vivah Sewa Samiti.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-white rounded-xl border border-[#e4e2dd] p-1.5">
              {([["boy", "वर पंजीकरण (Boy)"], ["girl", "कन्या पंजीकरण (Girl)"]] as [TabType, string][]).map(
                ([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setTab(value)}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      tab === value
                        ? "bg-[#855300] text-white"
                        : "text-[#524435] hover:text-[#855300]"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    {label}
                  </button>
                )
              )}
            </div>

            {submitted[tab] ? (
              <div className="bg-white rounded-2xl border border-[#e4e2dd] shadow-lg overflow-hidden">
                <div className="bg-[#006d3e] text-white p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Literata', serif" }}>
                    Registration Successful!
                  </h2>
                  <p className="text-white/80 text-sm">ID: {regId[tab]}</p>
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
                      <div key={label} className="border border-[#e4e2dd] rounded-lg p-2.5">
                        <p className="text-[9px] uppercase tracking-wide text-[#857463]">{label}</p>
                        <p className="font-semibold text-[#1b1c19] mt-0.5">{val || "—"}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap justify-center">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 bg-[#855300] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#653e00] transition-colors"
                    >
                      <Printer className="w-4 h-4" /> Print Form
                    </button>
                    <a
                      href={`https://wa.me/919473331919?text=नमस्ते%2C%20${encodeURIComponent(form.fullName)}%20का%20विवाह%20पंजीकरण%20ID%20${regId[tab]}%20से%20हुआ%20है।%20कृपया%20आगे%20की%20जानकारी%20दें।`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                    >
                      WhatsApp Confirm
                    </a>
                    <button
                      onClick={() => setSubmitted((p) => ({ ...p, [tab]: false }))}
                      className="text-xs text-[#524435] hover:text-[#855300] transition-colors"
                    >
                      Edit Registration
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="font-semibold text-[#855300] text-xs uppercase tracking-wider pb-2 border-b border-[#e4e2dd]"
                  >
                    Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Name *</label>
                      <input required type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name as per documents" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Date of Birth *</label>
                      <input required type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Gotra *</label>
                      <input required type="text" value={form.gotra} onChange={(e) => setForm({ ...form, gotra: e.target.value })} placeholder="Family gotra" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Caste *</label>
                      <input required type="text" value={form.caste} onChange={(e) => setForm({ ...form, caste: e.target.value })} placeholder="Caste / sub-caste" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Education *</label>
                      <input required type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="e.g. B.A., 10th, M.Sc." className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Occupation *</label>
                      <input required type="text" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="Job / Business / Student" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Annual Income (₹)</label>
                      <input type="text" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} placeholder="Approx. annual income" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Height</label>
                      <input type="text" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} placeholder="e.g. 5&apos;6&quot;" className={inputClass} />
                    </div>
                  </div>

                  <h3 className="font-semibold text-[#855300] text-xs uppercase tracking-wider pb-2 border-b border-[#e4e2dd] pt-2">
                    Family Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Father's Name *</label>
                      <input required type="text" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} placeholder="Father's full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Mother's Name *</label>
                      <input required type="text" value={form.motherName} onChange={(e) => setForm({ ...form, motherName: e.target.value })} placeholder="Mother's full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Siblings</label>
                      <input type="text" value={form.siblings} onChange={(e) => setForm({ ...form, siblings: e.target.value })} placeholder="e.g. 2 brothers, 1 sister" className={inputClass} />
                    </div>
                  </div>

                  <h3 className="font-semibold text-[#855300] text-xs uppercase tracking-wider pb-2 border-b border-[#e4e2dd] pt-2">
                    Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Address *</label>
                      <textarea required rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Village/Town, Block" className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Contact Person Name *</label>
                      <input required type="text" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="Parent/Guardian name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Contact Mobile *</label>
                      <input required type="tel" pattern="[0-9]{10}" value={form.contactMobile} onChange={(e) => setForm({ ...form, contactMobile: e.target.value })} placeholder="10-digit mobile" className={inputClass} />
                    </div>
                  </div>

                  {/* Photo Placeholder */}
                  <div>
                    <label className="block text-sm font-medium text-[#1b1c19] mb-1">Photo (Optional)</label>
                    <div className="border-2 border-dashed border-[#e4e2dd] rounded-xl p-6 text-center">
                      <User className="w-8 h-8 text-[#857463] mx-auto mb-2" />
                      <p className="text-xs text-[#524435]">Upload photo (JPG, PNG up to 2MB)</p>
                      <p className="text-[10px] text-[#857463] mt-1">Feature coming soon</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-4 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-white" />
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
      <Footer />
    </>
  );
}
