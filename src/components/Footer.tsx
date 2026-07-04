import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle, AtSign, Radio, Link as LinkIcon } from "lucide-react";
import type { NavLinkData, SocialLinkData } from "./Navbar";

interface FooterProps {
  quickLinks: NavLinkData[];
  legalLinks: NavLinkData[];
  socialLinks: SocialLinkData[];
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "Facebook": return <span className="text-xs font-bold">f</span>;
    case "Instagram": return <AtSign className="w-4 h-4" />;
    case "YouTube": return <Radio className="w-4 h-4" />;
    case "LinkedIn": return <span className="text-xs font-bold">in</span>;
    default: return <LinkIcon className="w-4 h-4" />;
  }
}

export default function Footer({ quickLinks, legalLinks, socialLinks }: FooterProps) {
  return (
    <footer className="bg-[#1b1c19] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c93b1d]">
                <Heart className="w-5 h-5 text-white fill-white" />
              </span>
              <span
                className="text-xl font-bold text-[#E84523]"
                style={{ fontFamily: "'Literata', Georgia, serif" }}
              >
                Hariwatika
              </span>
            </div>
            <p
              className="text-[#E84523] font-semibold mb-2"
              style={{ fontFamily: "'Literata', Georgia, serif" }}
            >
              सेवा ही धर्म है
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              हरिवाटिका शिव मंदिर विवाह सेवा समिति — गरीब परिवारों की विवाह सेवा,
              वृक्षारोपण और समाज उत्थान के लिए समर्पित।
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.filter((sl) => sl.platform !== "WhatsApp").map((sl) => (
                <a
                  key={sl.platform}
                  href={sl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c93b1d] flex items-center justify-center transition-colors"
                  aria-label={sl.platform}
                >
                  <SocialIcon platform={sl.platform} />
                </a>
              ))}
              <a
                href="https://wa.me/919473331919?text=नमस्ते%20हरिवाटिका%20सेवा%20समिति"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E84523] text-sm transition-colors"
                  >
                    {link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Docs */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal Documents</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E84523] text-sm transition-colors"
                  >
                    {link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#E84523] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Sukanya Utsav Bhawan, Hariwatika Chowk,<br />
                  Bettiah, West Champaran,<br />
                  Bihar — 845438
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#E84523] flex-shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="tel:+919473331919"
                    className="text-gray-400 hover:text-[#E84523] text-sm transition-colors"
                  >
                    +91 9473331919
                  </a>
                  <a
                    href="tel:+919288390016"
                    className="text-gray-400 hover:text-[#E84523] text-sm transition-colors"
                  >
                    +91 9288390016
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#E84523] flex-shrink-0" />
                <a
                  href="mailto:hariwatikaseva@gmail.com"
                  className="text-gray-400 hover:text-[#E84523] text-sm transition-colors break-all"
                >
                  hariwatikaseva@gmail.com
                </a>
              </li>
            </ul>

            {/* Map Placeholder */}
            <div className="mt-4 rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="w-full h-28 flex items-center justify-center text-gray-500 text-xs">
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-[#E84523] mx-auto mb-1" />
                  <span>Bettiah, West Champaran</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Literata', Georgia, serif" }}>
              Donation Bank Details
            </h3>
            <p className="text-gray-400 text-sm">दान के लिए बैंक विवरण</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Bank Details Card */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-[#E84523] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Bank Transfer Details
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Account Name:</span>
                  <span className="text-white font-semibold text-right">Hariwatika Sewa Samiti</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Account Number:</span>
                  <span className="text-white font-mono font-semibold">1234567890</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bank Name:</span>
                  <span className="text-white font-semibold text-right">State Bank of India</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Branch:</span>
                  <span className="text-white text-right">Bettiah, West Champaran</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">IFSC Code:</span>
                  <span className="text-white font-mono font-semibold">SBIN0001234</span>
                </div>
              </div>
            </div>

            {/* UPI & QR Code Card */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-[#E84523] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                UPI & Quick Pay
              </h4>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-300 text-sm block mb-2">UPI ID:</span>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 border border-white/10">
                    <span className="text-white font-mono text-sm flex-1">hariwatika@paytm</span>
                    <button className="text-[#E84523] hover:text-[#c93b1d] transition-colors flex-shrink-0" title="Copy UPI ID">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-center text-xs text-gray-600">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      Scan QR Code
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">Scan to donate instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Benefits Notice */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-[#E84523]/10 border border-[#E84523]/30 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-sm text-gray-200">
                <span className="font-semibold text-[#E84523]">Tax Benefits:</span> All donations are eligible for 80G tax deduction. Certificate will be issued for donations above ₹500.
              </p>
              <p className="text-xs text-gray-300 mt-1">सभी दान 80G कर कटौती के लिए पात्र हैं। ₹500 से ऊपर के दान के लिए प्रमाणपत्र जारी किया जाएगा।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2024 Hariwatika Shiv Mandir Vivah Sewa Samiti. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#E84523] fill-[#E84523]" /> for community service
          </p>
        </div>
      </div>
    </footer>
  );
}
