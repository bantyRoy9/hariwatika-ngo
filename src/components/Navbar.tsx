"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Globe, MapPin, Phone, Clock } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { LENITY, CONTACT } from "@/theme/lenity";

const navLinksEn = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Get Involved" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const navLinksHi = [
  { href: "/", label: "होम" },
  { href: "/about", label: "हमारे बारे में" },
  { href: "/projects", label: "परियोजनाएं" },
  { href: "/volunteer", label: "जुड़ें" },
  { href: "/blog", label: "समाचार" },
  { href: "/contact", label: "संपर्क" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle, t } = useLang();

  const navLinks = lang === "hi" ? navLinksHi : navLinksEn;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkColour = "text-gray-700 hover:text-[#E84523] hover:bg-[#E84523]/10";
  const activeLinkColour = "text-[#E84523] bg-[#E84523]/10 font-semibold";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E84523]/15 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* ── Top utility bar (collapses on scroll) ── */}
        <div
          className="hidden lg:block overflow-hidden transition-all duration-500 text-white"
          style={{
            background: LENITY.dark,
            maxHeight: scrolled ? 0 : 40,
            opacity: scrolled ? 0 : 1,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10 text-[11px]">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: LENITY.accent }} />{CONTACT.address}</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: LENITY.accent }} />{CONTACT.phone}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" style={{ color: LENITY.accent }} />{CONTACT.hours}</span>
            </div>
            <div className="flex items-center gap-4 font-semibold">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C200] transition-colors">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C200] transition-colors">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C200] transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E84523] shadow-md">
                <Heart className="w-5 h-5 text-white fill-white" />
              </span>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-lg font-bold text-[#E84523]"
                  style={{ fontFamily: "'Exo 2', system-ui, sans-serif" }}
                >
                  Hariwatika
                </span>
                <span className="text-[10px] font-medium hidden sm:block text-gray-500">
                  Shiv Mandir Sewa Samiti
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href) ? activeLinkColour : linkColour
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">

              {/* Language Toggle */}
              <button
                onClick={toggle}
                aria-label="Switch language"
                className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all duration-200 border border-[#E84523]/20 text-[#E84523] hover:bg-[#E84523]/10"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "hi" ? "EN" : "हि"}
              </button>

              {/* Donate CTA */}
              <Link
                href="/donate"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#E84523] hover:bg-[#c93b1d] text-white rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <Heart className="w-4 h-4 fill-[#1d1d1b]" />
                {t("Donate Now", "दान करें")}
              </Link>

              {/* Mobile burger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors text-gray-800 hover:bg-[#E84523]/10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          className={`lg:hidden bg-white border-t border-[#E84523]/15 shadow-xl overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-[#E84523] bg-[#E84523]/10 font-semibold"
                    : "text-gray-700 hover:text-[#E84523] hover:bg-[#E84523]/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-[#E84523]/15 space-y-2">
              <Link
                href="/donate"
                className="flex items-center justify-center gap-2 w-full bg-[#E84523] hover:bg-[#c93b1d] text-white rounded-full px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Heart className="w-4 h-4 fill-white" />
                {t("Donate Now", "दान करें")}
              </Link>
              <Link
                href="/volunteer"
                className="flex items-center justify-center w-full border border-[#E84523] text-[#E84523] hover:bg-[#E84523] hover:text-white rounded-full px-6 py-3 text-sm font-semibold transition-colors"
              >
                {t("Volunteer", "स्वयंसेवक बनें")}
              </Link>
              {/* Language toggle in drawer */}
              <button
                onClick={toggle}
                className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
