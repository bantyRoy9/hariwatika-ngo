"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/919473331919?text=${encodeURIComponent(
    `नमस्ते हरिवाटिका समिति,\n\nनाम: ${form.name}\nमोबाइल: ${form.mobile}\n\nविषय: ${form.subject}\n\n${form.message}`
  )}`;

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
              Get in Touch
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              संपर्क करें
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Reach out to us for any queries, volunteering, or assistance.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Left: Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Office Details */}
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6">
                  <h3
                    className="font-semibold text-[#1b1c19] text-lg mb-4"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Office Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#855300]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#524435] uppercase tracking-wide mb-1">Address</p>
                        <p className="text-sm text-[#1b1c19] leading-relaxed">
                          Sukanya Utsav Bhawan,<br />
                          Hariwatika Chowk, Bettiah,<br />
                          West Champaran, Bihar — 845438
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#855300]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#524435] uppercase tracking-wide mb-1">Phone</p>
                        <a href="tel:+919473331919" className="block text-sm text-[#1b1c19] hover:text-[#855300] transition-colors">
                          +91 9473331919
                        </a>
                        <a href="tel:+919288390016" className="block text-sm text-[#1b1c19] hover:text-[#855300] transition-colors">
                          +91 9288390016
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#855300]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#524435] uppercase tracking-wide mb-1">Email</p>
                        <a
                          href="mailto:hariwatikaseva@gmail.com"
                          className="text-sm text-[#1b1c19] hover:text-[#855300] transition-colors break-all"
                        >
                          hariwatikaseva@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#855300]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#524435] uppercase tracking-wide mb-1">Office Hours</p>
                        <p className="text-sm text-[#1b1c19]">Mon–Sat: 10:00 AM – 5:00 PM</p>
                        <p className="text-xs text-[#524435]">Sunday by appointment</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Link */}
                  <a
                    href="https://wa.me/919473331919?text=नमस्ते%20हरिवाटिका%20समिति%2C%20मुझे%20आपसे%20बात%20करनी%20है।"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Map Embed */}
                <div className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden">
                  <div className="p-4 border-b border-[#e4e2dd]">
                    <h3 className="font-semibold text-[#1b1c19] text-sm">Find Us on Map</h3>
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
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="bg-white rounded-2xl border border-[#e4e2dd] p-8 text-center shadow-sm">
                    <CheckCircle className="w-16 h-16 text-[#006d3e] mx-auto mb-4" />
                    <h3
                      className="text-xl font-bold text-[#1b1c19] mb-2"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      Message Received!
                    </h3>
                    <p className="text-[#524435] text-sm mb-6">
                      Thank you, <strong>{form.name}</strong>! We will get back to you within 24 hours.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> Also send via WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="border border-[#855300] text-[#855300] rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-orange-50 transition-colors"
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 sm:p-8 shadow-sm">
                    <h2
                      className="text-xl font-bold text-[#1b1c19] mb-6"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      Send us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Name *</label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                          />
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
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Subject *</label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] bg-white"
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
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Message *</label>
                        <textarea
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Type your message here..."
                          rows={5}
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
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
                          className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-3.5 font-semibold text-sm hover:bg-[#1da851] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
