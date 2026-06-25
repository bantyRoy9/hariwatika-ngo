"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { Heart, CheckCircle, Printer, Copy, Building2, Smartphone } from "lucide-react";

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000];

interface FormData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  amount: string;
  purpose: string;
  customAmount: string;
}

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    amount: "1000",
    purpose: "Vivah Seva",
    customAmount: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [donorRef] = useState(`HW-${Date.now().toString().slice(-6)}`);
  const [copied, setCopied] = useState(false);

  const finalAmount = form.customAmount ? Number(form.customAmount) : selectedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  /* shared input styling — light theme, orange focus */
  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm bg-white border transition-colors focus:outline-none";
  const inputStyle = { borderColor: LENITY.line, color: LENITY.ink } as React.CSSProperties;
  const onInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = LENITY.accent;
  };
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = LENITY.line;
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4" style={{ background: LENITY.soft }}>
          <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border overflow-hidden" style={{ borderColor: LENITY.line }}>
            <div className="text-white p-8 text-center" style={{ background: LENITY.accent }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-3" />
              <h2 className="text-2xl font-bold" style={{ fontFamily: SERIF }}>
                Donation Registered!
              </h2>
              <p className="text-white/85 text-sm mt-1">Reference: {donorRef}</p>
            </div>
            <div className="p-8">
              {/* Receipt */}
              <div id="receipt-print" className="border rounded-2xl p-4 mb-6" style={{ borderColor: LENITY.line, background: LENITY.soft }}>
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Heart className="w-4 h-4" style={{ color: LENITY.accent, fill: LENITY.accent }} />
                    <span className="font-bold text-sm" style={{ color: LENITY.accent, fontFamily: SERIF }}>
                      Hariwatika Vivah Sewa Samiti
                    </span>
                  </div>
                  <p className="text-[9px]" style={{ color: LENITY.muted }}>Sukanya Utsav Bhawan, Bettiah, Bihar 845438</p>
                  <div className="h-px my-2" style={{ background: LENITY.line }} />
                  <p className="text-xs font-bold" style={{ color: LENITY.ink }}>DONATION RECEIPT</p>
                </div>
                <div className="space-y-1.5 text-xs">
                  {[
                    ["Reference No.", donorRef],
                    ["Donor Name", form.name],
                    ["Mobile", form.mobile],
                    ["Amount", `₹${finalAmount.toLocaleString("en-IN")}`],
                    ["Purpose", form.purpose],
                    ["Date", new Date().toLocaleDateString("en-IN")],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ color: LENITY.muted }}>{label}</span>
                      <span className="font-semibold" style={{ color: LENITY.ink }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t text-[9px] text-center" style={{ borderColor: LENITY.line, color: LENITY.muted }}>
                  This is a system-generated receipt. For official receipt, contact us at hariwatikaseva@gmail.com
                </div>
              </div>

              <p className="text-sm text-center mb-4" style={{ color: LENITY.muted }}>
                SMS notification will be sent to <strong style={{ color: LENITY.ink }}>{form.mobile}</strong>
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 border rounded-full py-2.5 text-sm font-semibold transition-all hover:scale-105"
                  style={{ borderColor: LENITY.accent, color: LENITY.accent }}
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <a
                  href={`https://wa.me/919473331919?text=नमस्ते%20हरिवाटिका%20समिति%2C%20मेरा%20नाम%20${encodeURIComponent(form.name)}%20है।%20Reference%20No.%20${donorRef}%20के%20साथ%20₹${finalAmount}%20का%20दान%20पंजीकृत%20किया।`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                >
                  Share on WhatsApp
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs transition-colors mt-1"
                  style={{ color: LENITY.muted }}
                >
                  Make another donation
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          tag="Support Our Mission"
          title="दान करें"
          subtitle="Your donation directly supports marriages, tree plantation, poverty relief, and community health in Bihar."
          image={IMG.relief}
          icon={<Heart className="w-8 h-8 text-white fill-white" />}
        />

        <section className="py-20 relative overflow-hidden" style={{ background: LENITY.soft }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${LENITY.accent}0d` }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <Reveal animation="slide-right">
                  <Card3D intensity={4} className="bg-white rounded-3xl border p-6 sm:p-8" style={{ borderColor: LENITY.line }}>
                  <h2
                    className="text-xl font-bold mb-6"
                    style={{ color: LENITY.ink, fontFamily: SERIF }}
                  >
                    Donation Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: LENITY.ink }}>
                        Select Amount *
                      </label>
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {PRESET_AMOUNTS.map((amt) => {
                          const active = selectedAmount === amt && !form.customAmount;
                          return (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => { setSelectedAmount(amt); setForm({ ...form, customAmount: "", amount: String(amt) }); }}
                              className="py-2.5 rounded-xl text-sm font-semibold border transition-all hover:-translate-y-0.5"
                              style={
                                active
                                  ? { background: LENITY.accent, color: "#fff", borderColor: LENITY.accent }
                                  : { borderColor: LENITY.line, color: LENITY.muted, background: "#fff" }
                              }
                            >
                              ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="number"
                        placeholder="Enter custom amount (₹)"
                        value={form.customAmount}
                        onChange={(e) => {
                          setForm({ ...form, customAmount: e.target.value, amount: e.target.value });
                          if (e.target.value) setSelectedAmount(0);
                        }}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                        min="1"
                      />
                    </div>

                    {/* Personal Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Full Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className={inputClass}
                          style={inputStyle}
                          onFocus={onInputFocus}
                          onBlur={onInputBlur}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Mobile *</label>
                        <input
                          required
                          type="tel"
                          value={form.mobile}
                          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                          placeholder="10-digit mobile"
                          pattern="[0-9]{10}"
                          className={inputClass}
                          style={inputStyle}
                          onFocus={onInputFocus}
                          onBlur={onInputBlur}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Email (Optional)</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputClass}
                        style={inputStyle}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Address *</label>
                      <textarea
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Your full address"
                        rows={2}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>Purpose</label>
                      <select
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                      >
                        <option>Vivah Seva</option>
                        <option>Vrikshaaropan</option>
                        <option>Garib Sahayata</option>
                        <option>Swasthya Seva</option>
                        <option>Education Support</option>
                        <option>General Fund</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || (!finalAmount || finalAmount <= 0)}
                      className="w-full text-white rounded-full py-4 font-bold text-base transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                      style={{ background: LENITY.accent }}
                    >
                      {loading ? (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                      ) : (
                        <>
                          <Heart className="w-4 h-4 fill-white" />
                          Donate ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "—"}
                        </>
                      )}
                    </button>
                  </form>
                  </Card3D>
                </Reveal>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* UPI */}
                <div className="bg-white rounded-3xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5" style={{ color: LENITY.accent }} />
                    <h3 className="font-bold" style={{ color: LENITY.ink, fontFamily: SERIF }}>Pay via UPI</h3>
                  </div>
                  {/* QR Placeholder */}
                  <div className="w-36 h-36 mx-auto rounded-2xl flex flex-col items-center justify-center mb-3 border" style={{ borderColor: LENITY.line, background: LENITY.soft }}>
                    <div className="grid grid-cols-5 gap-0.5">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ background: Math.random() > 0.5 ? LENITY.ink : "transparent" }}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] mt-2" style={{ color: LENITY.muted }}>Scan QR Code</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: `${LENITY.accent}14` }}>
                    <span className="text-xs flex-1 font-mono" style={{ color: LENITY.ink }}>hariwatikaseva@upi</span>
                    <button
                      onClick={() => handleCopy("hariwatikaseva@upi")}
                      className="transition-colors hover:scale-110"
                      style={{ color: LENITY.accent }}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copied && <p className="text-center text-xs mt-1" style={{ color: LENITY.accent }}>Copied!</p>}
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-3xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5" style={{ color: LENITY.accent }} />
                    <h3 className="font-bold" style={{ color: LENITY.ink, fontFamily: SERIF }}>Bank Transfer</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      ["Account Name", "Hariwatika Shiv Mandir Vivah Sewa Samiti"],
                      ["Account No.", "XXXX XXXX XXXX 1234"],
                      ["IFSC Code", "SBIN0XXXXXX"],
                      ["Bank", "State Bank of India"],
                      ["Branch", "Bettiah, Bihar"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between gap-2">
                        <span style={{ color: LENITY.muted }}>{label}</span>
                        <span className="font-medium text-right" style={{ color: LENITY.ink }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Benefit */}
                <div className="rounded-3xl border p-4" style={{ background: `${LENITY.accent}0d`, borderColor: `${LENITY.accent}33` }}>
                  <p className="text-xs font-bold mb-1" style={{ color: LENITY.accent }}>🎉 Tax Benefit</p>
                  <p className="text-xs" style={{ color: LENITY.muted }}>
                    Donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
