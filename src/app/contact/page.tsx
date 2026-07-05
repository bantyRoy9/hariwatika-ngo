"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import { submitContact } from "@/app/actions/submissions";

interface ContactForm {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "", mobile: "", email: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await submitContact(form);
    setLoading(false);
    if (res.success) setSubmitted(true);
    else setError(res.error);
  };

  const whatsappLink = `https://wa.me/919473331919?text=${encodeURIComponent(
    `नमस्ते हरिवाटिका समिति,\n\nनाम: ${form.name}\nमोबाइल: ${form.mobile}\n\nविषय: ${form.subject}\n\n${form.message}`
  )}`;

  return (
    <AdminEditProvider>
      <Navbar />
      <main>
        <PremiumHero
          title="संपर्क करें"
          subtitle="Get in Touch"
          description="Reach out to us for any queries, volunteering, or assistance. We respond within 24 hours."
          image={IMG.community}
          stats={[
            { value: "24hrs", label: "Response Time" },
            { value: "100%", label: "Satisfaction" },
            { value: "365", label: "Days Open" },
            { value: "5+", label: "Contact Methods" },
          ]}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
          overlay="pattern"
          height="medium"
        />
        <section className="py-16 relative overflow-hidden" style={{ background: LENITY.soft }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${LENITY.accent}0d` }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Left: Info */}
              <div className="lg:col-span-2 space-y-6">
                <Reveal animation="slide-right">
                  <Card3D intensity={5} className="bg-white rounded-3xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <EditableText as="h3" settingKey="contact.office.h3" label="Office Details Heading"
                    en="Office Details" hi="कार्यालय विवरण"
                    className="font-bold text-lg mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
                  />
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                        <MapPin className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <div>
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: LENITY.ink }}><span className="inline-block w-5 h-0.5" style={{ background: LENITY.yellow }} />Address</p>
                        <p className="text-sm leading-relaxed" style={{ color: LENITY.ink }}>
                          Sukanya Utsav Bhawan,<br />
                          Hariwatika Chowk, Bettiah,<br />
                          West Champaran, Bihar — 845438
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                        <Phone className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <div>
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: LENITY.ink }}><span className="inline-block w-5 h-0.5" style={{ background: LENITY.yellow }} />Phone</p>
                        <a href="tel:+919473331919" className="block text-sm transition-colors hover:opacity-70" style={{ color: LENITY.ink }}>
                          +91 9473331919
                        </a>
                        <a href="tel:+919288390016" className="block text-sm transition-colors hover:opacity-70" style={{ color: LENITY.ink }}>
                          +91 9288390016
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                        <Mail className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <div>
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: LENITY.ink }}><span className="inline-block w-5 h-0.5" style={{ background: LENITY.yellow }} />Email</p>
                        <a
                          href="mailto:hariwatikaseva@gmail.com"
                          className="text-sm transition-colors hover:opacity-70 break-all"
                          style={{ color: LENITY.ink }}
                        >
                          hariwatikaseva@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                        <Clock className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <div>
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: LENITY.ink }}><span className="inline-block w-5 h-0.5" style={{ background: LENITY.yellow }} />Office Hours</p>
                        <p className="text-sm" style={{ color: LENITY.ink }}>Mon–Sat: 10:00 AM – 5:00 PM</p>
                        <p className="text-xs" style={{ color: LENITY.muted }}>Sunday by appointment</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Link */}
                  <a
                    href="https://wa.me/919473331919?text=नमस्ते%20हरिवाटिका%20समिति%2C%20मुझे%20आपसे%20बात%20करनी%20है।"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#1da851] transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                  </Card3D>
                </Reveal>

                {/* Map Embed */}
                <Reveal animation="slide-right" delay={100}>
                  <Card3D intensity={3} className="bg-white rounded-3xl border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="p-4 border-b" style={{ borderColor: LENITY.line }}>
                    <h3 className="font-bold text-sm" style={{ color: LENITY.ink, fontFamily: SERIF }}>Find Us on Map</h3>
                  </div>
                  {/* Google Maps embed for Bettiah */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.3!2d84.503!3d26.801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399278!2sBettiah%2C+West+Champaran%2C+Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hariwatika Shiv Mandir Location"
                  />
                  </Card3D>
                </Reveal>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <Reveal animation="slide-left">
                {submitted ? (
                  <div className="bg-white rounded-3xl border p-8 text-center shadow-sm" style={{ borderColor: LENITY.line }}>
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: LENITY.accent }} />
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: SERIF, color: LENITY.ink }}
                    >
                      Message Received!
                    </h3>
                    <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                      Thank you, <strong style={{ color: LENITY.ink }}>{form.name}</strong>! We will get back to you within 24 hours.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-all hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" /> Also send via WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
                        style={{ border: `2px solid ${LENITY.ink}`, color: LENITY.ink }}
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border p-6 sm:p-8 shadow-sm" style={{ borderColor: LENITY.line }}>
                  <EditableText as="h2" settingKey="contact.form.h2" label="Contact Form Heading"
                    en="Send us a Message" hi="हमें संदेश भेजें"
                    className="text-2xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}
                  />
                  <EditableText as="p" settingKey="contact.form.sub" label="Contact Form Subtext"
                    en="Tell us how we can help — we read every word."
                    hi="हमें बताएं हम कैसे मदद कर सकते हैं — हम हर शब्द पढ़ते हैं।"
                    className="text-sm italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }}
                  />
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Full Name *</label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800"
                            style={{ borderColor: LENITY.line }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Mobile *</label>
                          <input
                            required
                            type="tel"
                            pattern="[0-9]{10}"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            placeholder="10-digit mobile"
                            onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800"
                            style={{ borderColor: LENITY.line }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Optional"
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800"
                          style={{ borderColor: LENITY.line }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Subject *</label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-gray-50 text-gray-800"
                          style={{ borderColor: LENITY.line }}
                        >
                          <option value="">Select subject</option>
                          <option>Vivah Seva Inquiry</option>
                          <option>Donation Query</option>
                          <option>Volunteer Registration</option>
                          <option>Tree Plantation</option>
                          <option>Health Camp</option>
                          <option>Media / Press Inquiry</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Message *</label>
                        <textarea
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Type your message here..."
                          rows={5}
                          onFocus={(e) => (e.currentTarget.style.borderColor = LENITY.accent)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = LENITY.line)}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none bg-gray-50 text-gray-800"
                          style={{ borderColor: LENITY.line }}
                        />
                      </div>

                      {error && (
                        <p className="text-sm font-medium" style={{ color: LENITY.red }}>{error}</p>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 disabled:opacity-50 rounded-full py-3.5 font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                          style={{ background: LENITY.accent, color: LENITY.ink }}
                        >
                          {loading ? (
                            <span className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5" style={{ borderColor: LENITY.ink, borderTopColor: "transparent" }} />
                          ) : (
                            <>
                              <Send className="w-4 h-4" /> Send Message
                            </>
                          )}
                        </button>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-3.5 font-semibold text-sm hover:bg-[#1da851] transition-all hover:scale-105"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </div>
                    </form>
                  </div>
                )}
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AdminEditProvider>
  );
}
