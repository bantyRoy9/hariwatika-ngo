"use client";

import { useState } from "react";
import { QrCode, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function StickyQRDonate() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLang();

  return (
    <>
      {/* Sticky QR Button - Right side of screen */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {/* QR Code Popup */}
        {isExpanded && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#E84523]/20 relative w-72">
              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#E84523] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#0d1229] mb-2">
                  {t("Scan to Donate", "दान के लिए स्कैन करें")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t("Scan this QR code to visit our donation page", "दान पृष्ठ पर जाने के लिए इस QR कोड को स्कैन करें")}
                </p>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl border-4 border-[#E84523]/10 mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      typeof window !== "undefined" 
                        ? `${window.location.origin}/donate`
                        : "https://hariwatika.org/donate"
                    )}`}
                    alt="Donation QR Code"
                    className="w-full h-auto"
                  />
                </div>

                {/* Info text */}
                <p className="text-xs text-gray-500">
                  {t("Use any QR scanner app on your phone", "अपने फोन पर किसी भी QR स्कैनर ऐप का उपयोग करें")}
                </p>

                {/* Direct link button */}
                <a
                  href="/donate"
                  className="mt-4 w-full inline-block px-6 py-3 bg-[#E84523] text-white text-sm font-bold rounded-full hover:bg-[#c93b1d] transition-all hover:shadow-lg"
                >
                  {t("Or Click Here", "या यहाँ क्लिक करें")}
                </a>
              </div>

              {/* Arrow pointing to button */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[12px] border-l-white" />
              </div>
            </div>
          </div>
        )}

        {/* QR Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 ${
            isExpanded
              ? "bg-[#E84523] text-white"
              : "bg-white text-[#E84523] hover:bg-[#E84523] hover:text-white"
          }`}
          aria-label={t("Donate via QR Code", "QR कोड से दान करें")}
        >
          <QrCode className="w-7 h-7" />
          
          {/* Pulse ring */}
          {!isExpanded && (
            <span className="absolute inset-0 rounded-2xl bg-[#E84523]/20 animate-ping" />
          )}

          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            {t("Scan QR to Donate", "QR स्कैन करें")}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
            </div>
          </div>
        </button>

        {/* Label below button */}
        <div className="text-center">
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            {t("Donate", "दान")}
          </span>
        </div>
      </div>
    </>
  );
}
