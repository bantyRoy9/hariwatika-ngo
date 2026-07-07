"use client";

import { submitVolunteer } from "@/app/actions/submissions";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import { translateError } from "@/lib/errorMessages";
import { IMG, LENITY, SERIF } from "@/theme/lenity";
import { Award, CheckCircle, Clock, Heart, MapPin, Printer, Users } from "lucide-react";
import { useState } from "react";

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

// [value/English, Hindi label] — value is the stable identifier stored on submit.
const skillOptions: [string, string][] = [
  ["Event Management", "कार्यक्रम प्रबंधन"], ["Social Work", "समाज सेवा"], ["Medical / Health", "चिकित्सा / स्वास्थ्य"],
  ["Teaching / Tutoring", "शिक्षण / ट्यूशन"], ["Photography", "फोटोग्राफी"], ["Driving", "ड्राइविंग"],
  ["Cooking", "खाना बनाना"], ["Legal / Documentation", "कानूनी / दस्तावेज़ीकरण"], ["IT / Tech", "आईटी / तकनीक"],
  ["Construction / Labour", "निर्माण / श्रम"], ["Music / Arts", "संगीत / कला"], ["Other", "अन्य"],
];
const availabilityOptions: [string, string][] = [
  ["Weekends only", "केवल सप्ताहांत"], ["Weekdays only", "केवल सप्ताह के दिन"], ["Full time", "पूर्णकालिक"],
  ["Event basis only", "केवल कार्यक्रम आधार पर"], ["As needed", "आवश्यकतानुसार"],
];
const genderOptions: [string, string][] = [["Male", "पुरुष"], ["Female", "महिला"], ["Other", "अन्य"]];

const WHATSAPP_NUMBER = "919473331919";

export default function VolunteerContent({ settings = {} }: { settings?: Record<string, { en: string; hi: string }> }) {
  const { t } = useLang();
  const availabilityLabel = (value: string) => {
    const match = availabilityOptions.find(([en]) => en === value);
    return match ? t(match[0], match[1]) : value;
  };
  const whatsappGroupLink = settings["whatsapp.groupLink"]?.en?.trim();
  const whatsappHref = whatsappGroupLink
    ? whatsappGroupLink
    : `https://wa.me/${WHATSAPP_NUMBER}`;
  const [form, setForm] = useState<VolunteerForm>({
    name: "", age: "", gender: "", mobile: "",
    email: "", address: "", skills: [], availability: "", motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [volunteerId, setVolunteerId] = useState("");
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
    setError("");
    const res = await submitVolunteer(form);
    setLoading(false);
    if (res.success) {
      setVolunteerId(res.data.volunteerId);
      setSubmitted(true);
    } else {
      setError(res.error);
    }
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
            .card { width: 3.375in; height: 2.125in; border: 3px solid ${LENITY.accent}; border-radius: 16px; overflow: hidden; background: linear-gradient(135deg, ${LENITY.soft}, #ffffff); display: flex; flex-direction: column; }
            .header { background: ${LENITY.accent}; color: ${LENITY.ink}; padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
            .org-name { font-family: 'Literata', serif; font-size: 11px; font-weight: 700; }
            .org-sub { font-size: 8px; opacity: 0.7; }
            .body { display: flex; padding: 10px 12px; flex: 1; gap: 10px; }
            .avatar { width: 56px; height: 56px; border-radius: 50%; background: ${LENITY.accent}; color: ${LENITY.ink}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; flex-shrink: 0; border: 2px solid #ffffff; }
            .info { flex: 1; }
            .name { font-family: 'Literata', serif; font-size: 14px; font-weight: 700; color: ${LENITY.ink}; line-height: 1.2; }
            .role { font-size: 10px; font-weight: 600; color: ${LENITY.muted}; margin: 2px 0; }
            .meta { font-size: 8px; color: ${LENITY.muted}; }
            .meta-item { margin: 1px 0; }
            .footer { background: ${LENITY.soft}; padding: 4px 12px; border-top: 1px solid ${LENITY.line}; display: flex; justify-content: space-between; align-items: center; }
            .id-num { font-size: 9px; font-weight: 700; color: ${LENITY.ink}; font-family: monospace; }
            .validity { font-size: 8px; color: ${LENITY.muted}; }
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
    <AdminEditProvider initialValues={settings}>
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: LENITY.soft }}>
          <img
            src={IMG.community}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            loading="lazy"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-5" style={{ background: LENITY.yellowSoft }}>
              <Users className="w-7 h-7" style={{ color: LENITY.ink }} />
            </span>
            <span className="inline-flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: LENITY.ink }}>
              <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
              <EditableText settingKey="volunteer.hero.eyebrow" label="Volunteer Hero Eyebrow" en="Get Involved" hi="जुड़ें" />
            </span>
            <EditableText as="h1" settingKey="volunteer.hero.h1" label="Volunteer Hero Heading"
              en="Become a Volunteer" hi="स्वयंसेवक बनें"
              className="text-3xl sm:text-5xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
            />
            <EditableText as="p" settingKey="volunteer.hero.sub" label="Volunteer Hero Subtext"
              en="Join our volunteer family and make a meaningful impact in your community."
              hi="हमारे स्वयंसेवक परिवार में शामिल हों और अपने समुदाय में सार्थक प्रभाव डालें।"
              className="text-lg italic max-w-xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}
            />
          </div>
        </section>

        <section className="py-16" style={{ background: LENITY.bg }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="max-w-2xl mx-auto">
                <div
                  className="bg-white rounded-3xl border overflow-hidden shadow-lg"
                  style={{ borderColor: LENITY.line }}
                >
                  <div className="p-6 text-center" style={{ background: LENITY.accent, color: LENITY.ink }}>
                    <CheckCircle className="w-14 h-14 mx-auto mb-2" />
                    <h2 className="text-xl font-bold" style={{ fontFamily: SERIF }}>
                      {t("Welcome to the Team!", "टीम में आपका स्वागत है!")}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: LENITY.muted }}>{t("Your volunteer registration is confirmed.", "आपका स्वयंसेवक पंजीकरण पुष्ट हो गया है।")}</p>
                  </div>

                  <div className="p-6">
                    <h3
                      className="font-semibold mb-4 text-center"
                      style={{ color: LENITY.ink, fontFamily: SERIF }}
                    >
                      {t("Your Volunteer ID Card", "आपका स्वयंसेवक पहचान पत्र")}
                    </h3>

                    {/* ID Card */}
                    <div
                      id="id-card-print"
                      className="max-w-xs mx-auto border-[3px] rounded-2xl overflow-hidden shadow-md"
                      style={{ borderColor: LENITY.accent, background: `linear-gradient(135deg, ${LENITY.soft}, #ffffff)` }}
                    >
                      {/* Header */}
                      <div className="px-4 py-2 flex items-center gap-2" style={{ background: LENITY.accent, color: LENITY.ink }}>
                        <Heart className="w-4 h-4 flex-shrink-0" style={{ fill: LENITY.ink }} />
                        <div>
                          <div className="text-[10px] font-bold" style={{ fontFamily: SERIF }}>
                            Hariwatika Shiv Mandir
                          </div>
                          <div className="text-[8px] opacity-70">Vivah Sewa Samiti · Bettiah, Bihar</div>
                        </div>
                        <span className="ml-auto text-[9px] rounded px-1.5 py-0.5 font-bold" style={{ background: "rgba(29,29,27,0.12)" }}>{t("VOLUNTEER", "स्वयंसेवक")}</span>
                      </div>

                      {/* Body */}
                      <div className="flex gap-3 p-4">
                        {/* Avatar */}
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 border-white"
                          style={{ background: LENITY.accent, color: LENITY.ink }}
                        >
                          {initials}
                        </div>
                        <div className="flex-1">
                          <div
                            className="font-bold text-sm leading-tight"
                            style={{ fontFamily: SERIF, color: LENITY.ink }}
                          >
                            {form.name}
                          </div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: LENITY.muted }}>
                            {t("Community Volunteer", "सामुदायिक स्वयंसेवक")}
                          </div>
                          <div className="mt-1 space-y-0.5">
                            <div className="flex items-center gap-1 text-[9px]" style={{ color: LENITY.muted }}>
                              <Clock className="w-2.5 h-2.5" style={{ color: LENITY.accent }} />
                              {t("Availability", "उपलब्धता")}: {availabilityLabel(form.availability)}
                            </div>
                            <div className="flex items-center gap-1 text-[9px]" style={{ color: LENITY.muted }}>
                              <MapPin className="w-2.5 h-2.5" style={{ color: LENITY.accent }} />
                              {form.address.split(",")[0] || "West Champaran"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div
                        className="px-4 py-2 flex items-center justify-between border-t"
                        style={{ background: LENITY.soft, borderColor: LENITY.line }}
                      >
                        <span className="font-mono text-xs font-bold" style={{ color: LENITY.ink }}>{volunteerId}</span>
                        <span className="text-[9px]" style={{ color: LENITY.muted }}>
                          {t("Valid", "वैध")}: {joinYear}–{joinYear + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={handlePrintCard}
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
                        style={{ background: LENITY.accent, color: LENITY.ink }}
                      >
                        <Printer className="w-4 h-4" />
                        {t("Print ID Card", "पहचान पत्र प्रिंट करें")}
                      </button>
                      <a
                        href={
                          whatsappGroupLink
                            ? whatsappHref
                            : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`नमस्ते, मेरा नाम ${form.name} है। मैंने स्वयंसेवक के रूप में पंजीकरण किया है। ID: ${volunteerId}`)}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                      >
                        {whatsappGroupLink ? t("Join Volunteer WhatsApp Group", "स्वयंसेवक व्हाट्सएप समूह से जुड़ें") : t("WhatsApp Confirm", "व्हाट्सएप पुष्टि")}
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
                    className="text-xl font-bold"
                    style={{ fontFamily: SERIF, color: LENITY.ink }}
                  >
                    {t("Why Volunteer?", "स्वयंसेवक क्यों बनें?")}
                  </h2>
                  {[
                    { icon: Award, titleEn: "Certificate of Service", titleHi: "सेवा प्रमाणपत्र", descEn: "Get official recognition for your volunteer work", descHi: "अपने स्वयंसेवी कार्य के लिए आधिकारिक मान्यता प्राप्त करें" },
                    { icon: Users, titleEn: "Community Impact", titleHi: "सामुदायिक प्रभाव", descEn: "Directly help hundreds of families in need", descHi: "जरूरतमंद सैकड़ों परिवारों की सीधे मदद करें" },
                    { icon: Heart, titleEn: "Volunteer ID Card", titleHi: "स्वयंसेवक पहचान पत्र", descEn: "Receive a printed ID card upon registration", descHi: "पंजीकरण पर एक मुद्रित पहचान पत्र प्राप्त करें" },
                    { icon: Clock, titleEn: "Flexible Timing", titleHi: "लचीला समय", descEn: "Volunteer on weekends or whenever you're free", descHi: "सप्ताहांत पर या जब भी आप खाली हों तब स्वयंसेवा करें" },
                  ].map((b) => (
                    <div
                      key={b.titleEn}
                      className="bg-white rounded-3xl border p-4 flex gap-3 transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ borderColor: LENITY.line }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: LENITY.yellowSoft }}
                      >
                        <b.icon className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm" style={{ color: LENITY.ink }}>{t(b.titleEn, b.titleHi)}</h4>
                        <p className="text-xs mt-0.5" style={{ color: LENITY.muted }}>{t(b.descEn, b.descHi)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl border p-6 sm:p-8" style={{ borderColor: LENITY.line }}>
                    <h2
                      className="text-xl font-bold mb-6"
                      style={{ fontFamily: SERIF, color: LENITY.ink }}
                    >
                      {t("Volunteer Registration", "स्वयंसेवक पंजीकरण")}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Full Name *", "पूरा नाम *")}</label>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder={t("Your full name", "अपना पूरा नाम")}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                            style={{ borderColor: LENITY.line }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Age *", "आयु *")}</label>
                          <input
                            required
                            type="number"
                            min="16"
                            max="80"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                            placeholder={t("Your age", "अपनी आयु")}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                            style={{ borderColor: LENITY.line }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Gender *", "लिंग *")}</label>
                          <select
                            required
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800 transition-colors"
                            style={{ borderColor: LENITY.line }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          >
                            <option value="">{t("Select Gender", "लिंग चुनें")}</option>
                            {genderOptions.map(([en, hi]) => (
                              <option key={en} value={en}>{t(en, hi)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Mobile *", "मोबाइल *")}</label>
                          <input
                            required
                            type="tel"
                            pattern="[0-9]{10}"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            placeholder={t("10-digit mobile", "10 अंकों का मोबाइल नंबर")}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                            style={{ borderColor: LENITY.line }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Email", "ईमेल")}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t("Optional", "वैकल्पिक")}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                          style={{ borderColor: LENITY.line }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Address *", "पता *")}</label>
                        <textarea
                          required
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          placeholder={t("Village/Town, Block, District", "गांव/शहर, ब्लॉक, जिला")}
                          rows={2}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                          style={{ borderColor: LENITY.line }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: LENITY.ink }}>{t("Skills *", "कौशल *")}</label>
                        <div className="flex flex-wrap gap-2">
                          {skillOptions.map(([en, hi]) => {
                            const active = form.skills.includes(en);
                            return (
                              <button
                                key={en}
                                type="button"
                                onClick={() => toggleSkill(en)}
                                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                                style={
                                  active
                                    ? { background: LENITY.accent, color: LENITY.ink, borderColor: LENITY.accent }
                                    : { background: "transparent", color: LENITY.muted, borderColor: LENITY.line }
                                }
                              >
                                {t(en, hi)}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Availability *", "उपलब्धता *")}</label>
                        <select
                          required
                          value={form.availability}
                          onChange={(e) => setForm({ ...form, availability: e.target.value })}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800 transition-colors"
                          style={{ borderColor: LENITY.line }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                        >
                          <option value="">{t("Select availability", "उपलब्धता चुनें")}</option>
                          {availabilityOptions.map(([en, hi]) => (
                            <option key={en} value={en}>{t(en, hi)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>{t("Motivation", "प्रेरणा")}</label>
                        <textarea
                          value={form.motivation}
                          onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                          placeholder={t("Why do you want to volunteer with us?", "आप हमारे साथ स्वयंसेवा क्यों करना चाहते हैं?")}
                          rows={3}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                          style={{ borderColor: LENITY.line }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                        />
                      </div>

                      {error && (
                        <p className="text-sm font-medium" style={{ color: LENITY.red }}>{translateError(error, t)}</p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full py-4 font-bold text-base transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        style={{ background: LENITY.accent, color: LENITY.ink }}
                      >
                        {loading ? (
                          <span className="animate-spin border-2 rounded-full w-5 h-5" style={{ borderColor: LENITY.ink, borderTopColor: "transparent" }} />
                        ) : (
                          <>
                            <Users className="w-4 h-4" />
                            {t("Register as Volunteer", "स्वयंसेवक के रूप में पंजीकरण करें")}
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
    </AdminEditProvider>
  );
}
