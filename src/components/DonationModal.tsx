"use client";

import { useState } from "react";
import { X, Heart, CheckCircle, ChevronDown, MessageCircle } from "lucide-react";
import { submitDonation } from "@/app/actions/submissions";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappGroupLink?: string;
}

const PRESET_AMOUNTS = [100, 500, 1000, 2000, 5000];
const WHATSAPP_NUMBER = "919473331919";

export default function DonationModal({ isOpen, onClose, whatsappGroupLink }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    purpose: "Vivah Seva",
    about: "",
  });

  if (!isOpen) return null;

  const amount = customAmount ? Number(customAmount) : selectedAmount;
  const hasWhatsappGroup = Boolean(whatsappGroupLink?.trim());
  const whatsappHref = (prefilledText?: string) => {
    if (hasWhatsappGroup) return whatsappGroupLink!.trim();
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    return prefilledText ? `${base}?text=${encodeURIComponent(prefilledText)}` : base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    setLoading(true);
    setError("");
    const res = await submitDonation({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      address: form.address || "Not provided",
      amount,
      purpose: form.purpose,
    });
    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError("");
    setShowAbout(false);
    setForm({ name: "", mobile: "", email: "", address: "", purpose: "Vivah Seva", about: "" });
    setSelectedAmount(1000);
    setCustomAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="relative bg-[#0d1229] border border-[#63d2ff]/20 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        {/* Header */}
        <div className="bg-[#00b4d8] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <h2 className="font-semibold text-lg" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Make a Donation
            </h2>
          </div>
          <button onClick={handleClose} className="hover:bg-white/20 rounded-lg p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-[#00e5a0] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#e8f4ff] mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              धन्यवाद, {form.name}!
            </h3>
            <p className="text-[#7a8fad] text-sm mb-2">
              Your donation of <strong>₹{amount?.toLocaleString("en-IN")}</strong> has been registered.
            </p>
            <p className="text-[#e8f4ff] text-sm font-medium mb-4">
              🙏 आपके योगदान से एक ज़रूरतमंद परिवार को नई उम्मीद मिलेगी।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              {hasWhatsappGroup && (
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Join WhatsApp Community
                </a>
              )}
              <a
                href={whatsappHref(`नमस्ते हरिवाटिका समिति, मेरा नाम ${form.name} है और मैंने ₹${amount} का दान किया।${form.about ? ` ${form.about}` : ""}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${hasWhatsappGroup ? "border-2 border-[#25D366] text-[#25D366]" : "bg-[#25D366] text-white hover:bg-[#1da851]"}`}
              >
                Share on WhatsApp
              </a>
              <button
                onClick={handleClose}
                className="inline-flex items-center bg-[#00b4d8] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#0090b0] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-[#e8f4ff] mb-2">Select Amount</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      selectedAmount === amt && !customAmount
                        ? "bg-[#00b4d8] text-white border-[#63d2ff]"
                        : "border-[#63d2ff]/20 text-[#7a8fad] hover:border-[#63d2ff]"
                    }`}
                  >
                    ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff] text-[#e8f4ff]"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e8f4ff] mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8f4ff] mb-1">Mobile *</label>
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff]"
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8f4ff] mb-1">Purpose</label>
              <select
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff] bg-[#111630] text-[#e8f4ff]"
              >
                <option>Vivah Seva</option>
                <option>Vrikshaaropan</option>
                <option>Garib Sahayata</option>
                <option>Swasthya Seva</option>
                <option>Education Support</option>
                <option>General Fund</option>
              </select>
            </div>

            <div className="rounded-lg border border-[#63d2ff]/20">
              <button
                type="button"
                onClick={() => setShowAbout((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#e8f4ff]"
              >
                अपने बारे में बताएं (वैकल्पिक)
                <ChevronDown className={`w-4 h-4 transition-transform ${showAbout ? "rotate-180" : ""}`} />
              </button>
              {showAbout && (
                <div className="px-3 pb-3">
                  <textarea
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
                    placeholder="इस दान का कारण या आपके बारे में कुछ भी (वैकल्पिक)"
                    rows={2}
                    className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff] text-[#e8f4ff] resize-none"
                  />
                </div>
              )}
            </div>

            {error && <p className="text-sm font-medium text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading || (!amount || amount <= 0)}
              className="w-full bg-[#00b4d8] hover:bg-[#0090b0] disabled:bg-gray-300 text-white rounded-full py-3 font-semibold transition-colors"
            >
              {loading ? "Processing..." : `Donate ₹${amount?.toLocaleString("en-IN") || "—"}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
