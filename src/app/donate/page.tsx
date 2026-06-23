"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
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

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#fbf9f4] flex items-center justify-center pt-20 pb-16 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-[#e4e2dd] overflow-hidden">
            <div className="bg-[#006d3e] text-white p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-3" />
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Literata', serif" }}>
                Donation Registered!
              </h2>
              <p className="text-white/80 text-sm mt-1">Reference: {donorRef}</p>
            </div>
            <div className="p-8">
              {/* Receipt */}
              <div id="receipt-print" className="border border-[#e4e2dd] rounded-xl p-4 mb-6 bg-[#fbf9f4]">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-[#855300] fill-[#855300]" />
                    <span className="font-bold text-[#855300] text-sm" style={{ fontFamily: "'Literata', serif" }}>
                      Hariwatika Vivah Sewa Samiti
                    </span>
                  </div>
                  <p className="text-[9px] text-[#524435]">Sukanya Utsav Bhawan, Bettiah, Bihar 845438</p>
                  <div className="h-px bg-[#e4e2dd] my-2" />
                  <p className="text-xs font-bold text-[#1b1c19]">DONATION RECEIPT</p>
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
                      <span className="text-[#524435]">{label}</span>
                      <span className="font-semibold text-[#1b1c19]">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#e4e2dd] text-[9px] text-[#524435] text-center">
                  This is a system-generated receipt. For official receipt, contact us at hariwatikaseva@gmail.com
                </div>
              </div>

              <p className="text-[#524435] text-sm text-center mb-4">
                SMS notification will be sent to <strong>{form.mobile}</strong>
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 border border-[#855300] text-[#855300] hover:bg-orange-50 rounded-full py-2.5 text-sm font-semibold transition-colors"
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
                  className="text-xs text-[#524435] hover:text-[#855300] transition-colors mt-1"
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
          icon={<Heart className="w-8 h-8 text-[#F4A433] fill-[#F4A433]" />}
        />

        <section className="py-16 bg-[#fbf9f4] dot-grid relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#855300]/5 blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <Reveal animation="slide-right">
                  <Card3D intensity={4} className="bg-white rounded-2xl border border-[#e4e2dd] p-6 sm:p-8">
                  <h2
                    className="text-xl font-bold text-[#1b1c19] mb-6"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Donation Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-2">
                        Select Amount *
                      </label>
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {PRESET_AMOUNTS.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => { setSelectedAmount(amt); setForm({ ...form, customAmount: "", amount: String(amt) }); }}
                            className={`py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                              selectedAmount === amt && !form.customAmount
                                ? "bg-[#855300] text-white border-[#855300]"
                                : "border-[#e4e2dd] text-[#524435] hover:border-[#855300]"
                            }`}
                          >
                            ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder="Enter custom amount (₹)"
                        value={form.customAmount}
                        onChange={(e) => {
                          setForm({ ...form, customAmount: e.target.value, amount: e.target.value });
                          if (e.target.value) setSelectedAmount(0);
                        }}
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] transition-colors"
                        min="1"
                      />
                    </div>

                    {/* Personal Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1c19] mb-1">Mobile *</label>
                        <input
                          required
                          type="tel"
                          value={form.mobile}
                          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                          placeholder="10-digit mobile"
                          pattern="[0-9]{10}"
                          className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Address *</label>
                      <textarea
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Your full address"
                        rows={2}
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Purpose</label>
                      <select
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] bg-white"
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
                      className="w-full bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
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
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-[#855300]" />
                    <h3 className="font-semibold text-[#1b1c19]">Pay via UPI</h3>
                  </div>
                  {/* QR Placeholder */}
                  <div className="w-36 h-36 mx-auto bg-gray-100 rounded-xl flex flex-col items-center justify-center mb-3 border border-[#e4e2dd]">
                    <div className="grid grid-cols-5 gap-0.5">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ background: Math.random() > 0.5 ? "#1b1c19" : "transparent" }}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] text-[#524435] mt-2">Scan QR Code</p>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                    <span className="text-xs text-[#524435] flex-1 font-mono">hariwatikaseva@upi</span>
                    <button
                      onClick={() => handleCopy("hariwatikaseva@upi")}
                      className="text-[#855300] hover:text-[#653e00]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copied && <p className="text-center text-xs text-[#006d3e] mt-1">Copied!</p>}
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-[#855300]" />
                    <h3 className="font-semibold text-[#1b1c19]">Bank Transfer</h3>
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
                        <span className="text-[#524435]">{label}</span>
                        <span className="font-medium text-[#1b1c19] text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Benefit */}
                <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
                  <p className="text-[#006d3e] text-xs font-semibold mb-1">🎉 Tax Benefit</p>
                  <p className="text-[#524435] text-xs">
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
