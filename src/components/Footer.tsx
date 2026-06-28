import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle, AtSign, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1b1c19] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#00b4d8]">
                <Heart className="w-5 h-5 text-white fill-white" />
              </span>
              <span
                className="text-xl font-bold text-[#63d2ff]"
                style={{ fontFamily: "'Literata', Georgia, serif" }}
              >
                Hariwatika
              </span>
            </div>
            <p
              className="text-[#63d2ff] font-semibold mb-2"
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
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00b4d8] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00b4d8] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00b4d8] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Radio className="w-4 h-4" />
              </a>
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
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/projects", label: "Our Projects" },
                { href: "/donate", label: "Donate" },
                { href: "/volunteer", label: "Volunteer" },
                { href: "/registration", label: "Marriage Registration" },
                { href: "/blog", label: "News & Updates" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#63d2ff] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Docs */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal Documents</h3>
            <ul className="space-y-2">
              {[
                { href: "/transparency", label: "Annual Reports" },
                { href: "/transparency", label: "Audited Financials" },
                { href: "#", label: "Trust Registration" },
                { href: "#", label: "PAN Card Details" },
                { href: "#", label: "80G Certificate" },
                { href: "#", label: "12A Certificate" },
                { href: "/internship", label: "Internship" },
                { href: "/admin", label: "Admin Portal" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#63d2ff] text-sm transition-colors"
                  >
                    {link.label}
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
                <MapPin className="w-4 h-4 text-[#63d2ff] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Sukanya Utsav Bhawan, Hariwatika Chowk,<br />
                  Bettiah, West Champaran,<br />
                  Bihar — 845438
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#63d2ff] flex-shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="tel:+919473331919"
                    className="text-gray-400 hover:text-[#63d2ff] text-sm transition-colors"
                  >
                    +91 9473331919
                  </a>
                  <a
                    href="tel:+919288390016"
                    className="text-gray-400 hover:text-[#63d2ff] text-sm transition-colors"
                  >
                    +91 9288390016
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#63d2ff] flex-shrink-0" />
                <a
                  href="mailto:hariwatikaseva@gmail.com"
                  className="text-gray-400 hover:text-[#63d2ff] text-sm transition-colors break-all"
                >
                  hariwatikaseva@gmail.com
                </a>
              </li>
            </ul>

            {/* Map Placeholder */}
            <div className="mt-4 rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="w-full h-28 flex items-center justify-center text-gray-500 text-xs">
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-[#63d2ff] mx-auto mb-1" />
                  <span>Bettiah, West Champaran</span>
                </div>
              </div>
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
            Made with <Heart className="w-3 h-3 text-[#63d2ff] fill-[#63d2ff]" /> for community service
          </p>
        </div>
      </div>
    </footer>
  );
}
