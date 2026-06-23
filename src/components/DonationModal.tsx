"use client";

import { useState } from "react";
import { X, Heart, CheckCircle } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    purpose: "Vivah Seva",
  });

  if (!isOpen) return null;

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", mobile: "", email: "", purpose: "Vivah Seva" });
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        {/* Header */}
        <div className="bg-[#855300] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <h2 className="font-semibold text-lg" style={{ fontFamily: "'Literata', serif" }}>
              Make a Donation
            </h2>
          </div>
          <button onClick={handleClose} className="hover:bg-white/20 rounded-lg p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-[#006d3e] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1b1c19] mb-2" style={{ fontFamily: "'Literata', serif" }}>
              Thank You, {form.name}!
            </h3>
            <p className="text-[#524435] text-sm mb-2">
              Your donation of <strong>₹{amount?.toLocaleString("en-IN")}</strong> has been registered.
            </p>
            <p className="text-[#524435] text-sm mb-6">
              SMS notification will be sent to your mobile number.
            </p>
            <a
              href={`https://wa.me/919473331919?text=नमस्ते%20हरिवाटिका%20समिति%2C%20मेरा%20नाम%20${encodeURIComponent(form.name)}%20है%20और%20मैंने%20₹${amount}%20का%20दान%20किया।`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-2.5 text-sm font-semibold mr-3 mb-3 hover:bg-[#1da851] transition-colors"
            >
              Share on WhatsApp
            </a>
            <button
              onClick={handleClose}
              className="inline-flex items-center bg-[#855300] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#653e00] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c19] mb-2">Select Amount</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      selectedAmount === amt && !customAmount
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
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full border border-[#e4e2dd] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#855300] text-[#1b1c19]"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1b1c19] mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#e4e2dd] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#855300]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b1c19] mb-1">Mobile *</label>
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full border border-[#e4e2dd] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#855300]"
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b1c19] mb-1">Purpose</label>
              <select
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="w-full border border-[#e4e2dd] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#855300] bg-white"
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
              disabled={loading || (!amount || amount <= 0)}
              className="w-full bg-[#855300] hover:bg-[#653e00] disabled:bg-gray-300 text-white rounded-full py-3 font-semibold transition-colors"
            >
              {loading ? "Processing..." : `Donate ₹${amount?.toLocaleString("en-IN") || "—"}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
