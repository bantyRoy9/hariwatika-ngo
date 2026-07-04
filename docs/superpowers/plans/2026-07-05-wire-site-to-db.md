# Wire Site to DB — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public site read the content the admin panel already manages (nav links, social links, home stats/services/campaigns/pillars/hero-text) instead of rendering hardcoded arrays that ignore the database.

**Architecture:** `layout.tsx` becomes the single fetch point for nav/social links and renders `Navbar`/`Footer` once (deleting ~13 duplicate render sites). The home page splits into an async server `page.tsx` (fetches `HomeService`/`HomeStat`/`HomeCampaign`/`HomePillar`/`SiteSetting` rows) + a client `HomeContent.tsx` that renders them — mirroring the existing `about`/`projects`/`blog` pattern.

**Tech Stack:** Next.js 16 (App Router, async Server Components), Prisma, React 19, no test framework covers UI pages in this repo (verification is manual dev-server + curl checks, matching existing convention).

## Global Constraints

- Follow the existing `about`/`projects`/`blog` convention: `page.tsx` is an async Server Component with `export const dynamic = "force-dynamic"` that fetches via Prisma/`@/lib/content` helpers and passes data as typed props to a `"use client"` `*Content.tsx` component. Do not introduce a new pattern (no client-side fetch, no new API routes).
- Never run `tsx prisma/seed.ts` against the live dev database in this plan — it deletes and recreates nearly every table. Any seed-data addition is a source-only edit to `prisma/seed.ts`; getting it into the current database is a manual one-time action via the existing admin UI, documented in Task 3, not executed here.
- Do not touch `HeroSlider.tsx`, the donation flow, social-media URLs beyond adding one LinkedIn placeholder row, or photo replacement — those are separate, later roadmap phases (see `docs/superpowers/specs/2026-07-05-wire-site-to-db-design.md`).

---

## Task 1: Centralize Navbar/Footer in root layout, backed by DB nav/social links

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`, `src/app/contact/page.tsx`, `src/app/volunteer/page.tsx`, `src/app/internship/page.tsx`, `src/app/programs/page.tsx`, `src/app/registration/page.tsx`, `src/app/gallery/page.tsx`, `src/app/donate/page.tsx`, `src/app/about/AboutContent.tsx`, `src/app/projects/ProjectsContent.tsx`, `src/app/blog/BlogContent.tsx`, `src/app/transparency/TransparencyContent.tsx` (remove duplicate `<Navbar/>`/`<Footer/>` renders + imports only)

**Interfaces:**
- Consumes: `getNavLinks(location: string)` and `getSocialLinks()` from `src/lib/content.ts` (already exist, currently unused). `getNavLinks` returns `{id, labelEn, labelHi, href, location, sortOrder}[]`; `getSocialLinks` returns `{id, platform, url, sortOrder}[]`.
- Produces: `Navbar({ navLinks, socialLinks })` and `Footer({ quickLinks, legalLinks, socialLinks })` prop contracts, used only by `layout.tsx` after this task (no other file should render `<Navbar/>`/`<Footer/>` once this task is done).

- [ ] **Step 1: Rewrite `src/components/Navbar.tsx` to accept nav/social links as props**

Replace the entire file with:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Globe, MapPin, Phone, Clock } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { LENITY, CONTACT } from "@/theme/lenity";

export type NavLinkData = { href: string; labelEn: string; labelHi: string };
export type SocialLinkData = { platform: string; url: string };

interface NavbarProps {
  navLinks: NavLinkData[];
  socialLinks: SocialLinkData[];
}

export default function Navbar({ navLinks, socialLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle, t } = useLang();

  const links = navLinks.map((l) => ({ href: l.href, label: lang === "hi" ? l.labelHi : l.labelEn }));

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
              {socialLinks.map((sl) => (
                <a key={sl.platform} href={sl.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#F2C200] transition-colors">
                  {sl.platform}
                </a>
              ))}
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
              {links.map((link) => (
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
            {links.map((link) => (
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
```

- [ ] **Step 2: Rewrite `src/components/Footer.tsx` to accept nav/social links as props**

Replace the entire file with:

```tsx
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
```

Note: `quickLinks`/`legalLinks` use `link.labelEn` (not language-toggled) — this matches the current hardcoded Footer behavior exactly (the original footer text was always English regardless of site language), so this is not a behavior change.

- [ ] **Step 3: Wire `src/app/layout.tsx` to fetch nav/social data and render Navbar/Footer once**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ParallaxProvider from "@/components/ParallaxProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTranslations, getNavLinks, getSocialLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hariwatika Shiv Mandir Vivah Sewa Samiti | हरिवाटिका शिव मंदिर विवाह सेवा समिति",
  description:
    "हरिवाटिका शिव मंदिर विवाह सेवा समिति - Serving the community since 2000 through Vivah Seva, Vrikshaaropan, Garib Sahayata and more. Located at Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar.",
  keywords: [
    "Hariwatika Shiv Mandir", "NGO Bihar", "Vivah Sewa Samiti",
    "Bettiah NGO", "West Champaran", "विवाह सेवा", "वृक्षारोपण",
    "गरीब सहायता", "Charitable Trust Bihar",
  ],
  authors: [{ name: "Hariwatika Shiv Mandir Vivah Sewa Samiti" }],
  openGraph: {
    title: "Hariwatika Shiv Mandir Vivah Sewa Samiti",
    description: "Serving communities through marriage assistance, tree plantation, and poverty relief since 2000.",
    type: "website", locale: "hi_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariwatika Shiv Mandir Vivah Sewa Samiti",
    description: "Serving communities through marriage assistance, tree plantation, and poverty relief since 2000.",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [translations, navbarLinks, footerQuickLinks, footerLegalLinks, socialLinks] = await Promise.all([
    getTranslations(),
    getNavLinks("navbar"),
    getNavLinks("footer-quick"),
    getNavLinks("footer-legal"),
    getSocialLinks(),
  ]);

  return (
    <html lang="hi" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Rajdhani', system-ui, sans-serif" }}
      >
        {/* Warm ambient background — soft dot grid + glow orbs (behind everything) */}
        <div className="cyber-grid" aria-hidden />
        <div className="cyber-orbs" aria-hidden>
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>
        <LanguageProvider translations={translations}>
          {/* Thin gradient progress bar at the very top */}
          <ScrollProgress />
          <Navbar navLinks={navbarLinks} socialLinks={socialLinks} />
          {/* Global ambient canvas + mouse/scroll CSS vars */}
          <ParallaxProvider>
            {children}
          </ParallaxProvider>
          <Footer quickLinks={footerQuickLinks} legalLinks={footerLegalLinks} socialLinks={socialLinks} />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Remove the duplicate `<Navbar/>`/`<Footer/>` renders from every other page**

For each file below, delete the `Navbar`/`Footer` import lines and the `<Navbar />` / `<Footer />` JSX lines (leave everything else untouched):

`src/app/contact/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 45) and line `<Footer />` (line 336).

`src/app/volunteer/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 102) and line `<Footer />` (line 470).

`src/app/internship/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 161) and line `<Footer />` (line 396).

`src/app/programs/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 186) and line `<Footer />` (line 520).

`src/app/registration/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 118) and line `<Footer />` (line 354).

`src/app/gallery/page.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 55) and line `<Footer />` (line 120).

`src/app/donate/page.tsx` — this one has **two** occurrences of each (the `submitted`-state branch and the normal branch):
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete `<Navbar />` at line 89 and `<Footer />` at line 164 (inside the `if (submitted) { return (...) }` branch), and delete `<Navbar />` at line 171 and `<Footer />` at line 421 (the normal-state branch).

`src/app/about/AboutContent.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 60) and line `<Footer />` (line 406).

`src/app/projects/ProjectsContent.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 57) and line `<Footer />` (line 202).

`src/app/blog/BlogContent.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 43) and line `<Footer />` (line 131).

`src/app/transparency/TransparencyContent.tsx`:
```diff
- import Navbar from "@/components/Navbar";
- import Footer from "@/components/Footer";
```
Delete line `<Navbar />` (line 30) and line `<Footer />` (line 229).

`src/app/page.tsx` — leave for Task 2 (it gets fully rewritten there); do not edit it in this task.

Note: `src/app/admin/(dash)/_legacy-page.tsx.bak` also matches the `<Navbar`/`<Footer` grep but is a dead `.bak` file — do not touch it.

- [ ] **Step 5: Type-check and verify no page double-renders Navbar/Footer**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors referencing `Navbar` or `Footer` prop mismatches (there will likely be pre-existing unrelated errors in the repo if any — only check that none mention `Navbar`/`Footer`/`layout.tsx`).

Then confirm no file outside `layout.tsx` still renders them:
```bash
grep -rln "<Navbar\|<Footer" src/app | grep -v "_legacy-page.tsx.bak"
```
Expected output: empty (no matches) — `layout.tsx` renders `<Navbar` and `<Footer` too, wait: this grep is over `src/app`, and `layout.tsx` is inside `src/app`, so it **will** match `src/app/layout.tsx`. Expected output: exactly `src/app/layout.tsx`, nothing else.

- [ ] **Step 6: Manual dev-server verification**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/contact
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/donate
```
Expected: `200` for each. Then open `http://localhost:3000/donate` in a browser, submit the donation form to reach the "submitted" success screen, and confirm the navbar/footer still render exactly once (not duplicated, not missing).

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx src/app/layout.tsx \
  src/app/contact/page.tsx src/app/volunteer/page.tsx src/app/internship/page.tsx \
  src/app/programs/page.tsx src/app/registration/page.tsx src/app/gallery/page.tsx \
  src/app/donate/page.tsx src/app/about/AboutContent.tsx src/app/projects/ProjectsContent.tsx \
  src/app/blog/BlogContent.tsx src/app/transparency/TransparencyContent.tsx
git commit -m "refactor: centralize Navbar/Footer in root layout, backed by DB nav/social links"
```

---

## Task 2: Wire the home page to DB content (stats, services, campaigns, pillars, hero/about/quote text)

**Files:**
- Create: `src/app/HomeContent.tsx`
- Modify: `src/app/page.tsx` (full rewrite — becomes a thin async Server Component)

**Interfaces:**
- Consumes: `prisma.homeService.findMany`, `prisma.homeStat.findMany`, `prisma.homeCampaign.findMany`, `prisma.homePillar.findMany` (all ordered by `sortOrder: "asc"`), and `getSettings(["home", "image"])` from `src/lib/content.ts`.
- Produces: `HomeContent({ services, stats, campaigns, pillars, settings })` — the prop shapes are defined and exported from `HomeContent.tsx` (`HomeServiceData`, `HomeStatData`, `HomeCampaignData`, `HomePillarData`, `HomeSettings`).

**Expected content changes (intentional, not bugs):** The DB-seeded `HomeService` rows (4 items: Vivah Seva, Vrikshaaropan, Garib Sahayata, Swasthya Seva) differ from the 8 hardcoded services currently on the page — the DB becomes the source of truth going forward, and the admin can add more via `/admin/content/home`. Similarly, the DB's `HomeCampaign` rows lead with "Mass Marriage Ceremony 2025" (marriage-branded, matching client feedback item #1) instead of the hardcoded "Clean Water for 50 Villages". The `HomeStat` 4th entry becomes "Marriages Facilitated" instead of "Volunteers Trained". These are the correct, expected outcome of making the DB authoritative — flag them when verifying, don't try to make old and new match.

**Out of scope for this task:** the `blogPosts` array (News & Updates preview cards on the homepage) stays hardcoded — wiring it to the real `BlogPost` table is a later roadmap phase (see spec). Only its 3 preview images move from the removed local `IMG.svc` array to a small local `SVC_IMAGES` array (same URLs, just renamed since the rest of `IMG` is going away).

- [ ] **Step 1: Create `src/app/HomeContent.tsx`**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DonationModal from "@/components/DonationModal";
import HeroSlider from "@/components/HeroSlider";
import StickyQRDonate from "@/components/StickyQRDonate";
import HorizontalCardSlider from "@/components/HorizontalCardSlider";
import MarqueeText from "@/components/MarqueeText";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProgramsGrid from "@/components/ProgramsGrid";
import LogoCarousel from "@/components/LogoCarousel";
import PremiumStorySection from "@/components/PremiumStorySection";
import { useLang } from "@/context/LanguageContext";
import {
  TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  Quote, Heart, type LucideIcon,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

export type HomeServiceData = { id: number; iconName: string; titleEn: string; titleHi: string; descEn: string; descHi: string };
export type HomeStatData = { id: number; value: string; labelEn: string; labelHi: string };
export type HomeCampaignData = { id: number; titleEn: string; titleHi: string; raised: number; goal: number; backers: number };
export type HomePillarData = { id: number; iconName: string; titleEn: string; titleHi: string; descEn: string; descHi: string };
export type HomeSettings = Record<string, { en: string; hi: string; img: string | null }>;

interface HomeContentProps {
  services: HomeServiceData[];
  stats: HomeStatData[];
  campaigns: HomeCampaignData[];
  pillars: HomePillarData[];
  settings: HomeSettings;
}

const SVC_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
];

const ICONS: Record<string, LucideIcon> = { Heart, TreePine, Users, Stethoscope, BookOpen, Droplets, Wheat };
const iconFor = (name: string): LucideIcon => ICONS[name] ?? Heart;

const blogPosts = [
  { date: "15 Dec 2024", catEn: "Education",    catHi: "शिक्षा", img: SVC_IMAGES[0],
    titleEn: "150 Children Receive School Scholarships This Year",
    titleHi: "इस वर्ष 150 बच्चों को स्कूल छात्रवृत्ति मिली",
    excerptEn: "Hariwatika's education drive reached 150 underprivileged children with scholarships and learning kits.",
    excerptHi: "हरिवाटिका के शिक्षा अभियान ने 150 जरूरतमंद बच्चों को छात्रवृत्ति और शिक्षण सामग्री दी।" },
  { date: "05 Nov 2024", catEn: "Environment", catHi: "पर्यावरण", img: SVC_IMAGES[1],
    titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए",
    excerptEn: "Volunteers planted 2000 saplings across Bettiah and surrounding villages.",
    excerptHi: "स्वयंसेवकों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।" },
  { date: "20 Oct 2024", catEn: "Relief",      catHi: "राहत", img: SVC_IMAGES[2],
    titleEn: "Winter Blanket Distribution Reaches 500 Families",
    titleHi: "शीतकालीन कंबल वितरण 500 परिवारों तक पहुँचा",
    excerptEn: "Our team distributed warm blankets to 500 underprivileged families as winter approached.",
    excerptHi: "ठंड में हमारी टीम ने 500 जरूरतमंद परिवारों को गर्म कंबल बाँटे।" },
];

/* ── Scroll fade ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

/* ── Animated counter ── */
function Counter({ target }: { target: string }) {
  const [val, setVal] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const sfx = target.replace(/[0-9]/g, "");
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let tick = 0; const total = 70;
      const id = setInterval(() => {
        tick++;
        setVal(Math.round((tick / total) * num) + sfx);
        if (tick >= total) { setVal(target); clearInterval(id); }
      }, 20);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}

/* PAI eyebrow: yellow dash + uppercase label */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
      <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
      {children}
    </span>
  );
}

/* watercolor portrait: paint blob behind a rounded photo */
function WaterPortrait({ src, alt, blob = LENITY.yellowSoft, className = "" }:
  { src: string; alt: string; blob?: string; className?: string }) {
  return (
    <div className={`watercolor inline-block ${className}`} style={{ ["--blob" as string]: blob }}>
      <img src={src} alt={alt} className="relative rounded-[2rem] object-cover w-full h-full" loading="lazy" />
    </div>
  );
}

/* big outline number + vertical label, editorial layout */
function NumberedSection({ num, label, children, alt = false }:
  { num: string; label: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className="py-20 lg:py-28" style={{ background: alt ? LENITY.soft : LENITY.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 lg:gap-12">
          <div className="flex flex-col items-center shrink-0 pt-2">
            <span className="pai-number">{num}</span>
            <span className="pai-vlabel mt-4 hidden lg:block">{label}</span>
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — PAI editorial
═══════════════════════════════════════════════════════════════ */
export default function HomeContent({ services, stats, campaigns, pillars, settings }: HomeContentProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const { t } = useLang();
  const openDonate = () => setDonateOpen(true);

  const s = (key: string) => settings[key] ?? { en: "", hi: "", img: null as string | null };

  return (
    <>
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
      <StickyQRDonate />

      {/* ════════════ HERO SLIDER ════════════ */}
      <HeroSlider onDonate={openDonate} />

      {/* ════════════ MARQUEE TEXT BANNER ════════════ */}
      <div style={{ background: LENITY.accent, padding: "1rem 0" }}>
        <MarqueeText
          texts={[
            t("HARIWATIKA SEWA SAMITI", "हरिवाटिका सेवा समिति"),
            "✦",
            t("25 YEARS OF SERVICE", "25 वर्षों की सेवा"),
            "✦",
            t("TRANSFORMING LIVES", "जीवन बदलना"),
            "✦",
            t("BUILDING COMMUNITIES", "समुदाय बनाना"),
            "✦",
          ]}
          speed={40}
          direction="left"
          textClassName="text-white text-lg md:text-xl font-bold tracking-wider"
        />
      </div>

      {/* ════════════ MISSION & VISION ════════════ */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-16">
            <Eyebrow>{t("Our Purpose", "हमारा उद्देश्य")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Mission & Vision", "मिशन और विज़न")}
            </h2>
            <p className="text-base md:text-lg italic" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Guiding our path to serve communities with compassion and dedication", "करुणा और समर्पण के साथ समुदायों की सेवा करने का हमारा मार्ग")}
            </p>
          </Fade>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Card */}
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                    <svg className="w-7 h-7" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                    {t("Our Mission", "हमारा मिशन")}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: LENITY.muted }}>
                  {t(
                    "At Hariwatika Sewa Samiti, our mission is simple yet profound: to provide assistance and support to those in need. We believe every person deserves the opportunity to lead a dignified life, free from the burdens of poverty and hardship. Through our comprehensive programs, we aim to create a positive impact in the lives of individuals and families, fostering a spirit of resilience and hope.",
                    "हरिवाटिका सेवा समिति में, हमारा मिशन सरल लेकिन गहरा है: जरूरतमंदों को सहायता और समर्थन प्रदान करना। हम मानते हैं कि हर व्यक्ति गरिमापूर्ण जीवन जीने का हकदार है। हमारे व्यापक कार्यक्रमों के माध्यम से, हम व्यक्तियों और परिवारों के जीवन में सकारात्मक प्रभाव डालने का लक्ष्य रखते हैं।"
                  )}
                </p>
              </div>
            </Fade>

            {/* Vision Card */}
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.pinkSoft }}>
                    <svg className="w-7 h-7" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                    {t("Our Vision", "हमारी दृष्टि")}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: LENITY.muted }}>
                  {t(
                    "We envision a society where every individual has access to the resources and support they need to thrive. By bridging gaps in healthcare, education, and social welfare, we aspire to build a future where everyone can achieve their full potential and contribute meaningfully to their communities.",
                    "हम एक ऐसे समाज की कल्पना करते हैं जहाँ प्रत्येक व्यक्ति के पास वे संसाधन और समर्थन हो जो उन्हें फलने-फूलने की आवश्यकता है। स्वास्थ्य सेवा, शिक्षा और सामाजिक कल्याण में अंतराल को पाटकर, हम एक ऐसे भविष्य का निर्माण करना चाहते हैं जहाँ हर कोई अपनी पूर्ण क्षमता प्राप्त कर सके।"
                  )}
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ════════════ PREMIUM STORYTELLING SECTION ════════════ */}
      <PremiumStorySection
        eyebrow={t("Impact Stories", "प्रभाव की कहानियाँ")}
        heading={t("Transforming Lives, One Story at a Time", "एक समय में एक जीवन बदलना")}
        description={t(
          "Real stories from real people whose lives have been touched by our work. Every number represents a human story, every program brings hope to families across West Champaran.",
          "वास्तविक लोगों की वास्तविक कहानियाँ जिनके जीवन हमारे काम से छुए गए हैं। हर संख्या एक मानवीय कहानी का प्रतिनिधित्व करती है।"
        )}
        cards={[
          {
            id: "story-1",
            number: "01",
            title: t("Education Transforms Communities", "शिक्षा समुदायों को बदलती है"),
            description: t(
              "Through our Shiksha Seva program, over 500 underprivileged children have received quality education, scholarships, and learning materials. Education is not just about books—it's about opening doors to opportunity and breaking the cycle of poverty.",
              "हमारे शिक्षा सेवा कार्यक्रम के माध्यम से, 500 से अधिक वंचित बच्चों को गुणवत्तापूर्ण शिक्षा, छात्रवृत्ति और सीखने की सामग्री मिली है।"
            ),
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
            stat: "500+",
            statLabel: t("Students Supported", "छात्र समर्थित"),
          },
          {
            id: "story-2",
            number: "02",
            title: t("Green Revolution in Action", "हरित क्रांति की कार्रवाई"),
            description: t(
              "Our Vrikshaaropan initiative has planted over 10,000 trees across West Champaran, creating a greener tomorrow. Each sapling is a promise to future generations.",
              "हमारे वृक्षारोपण पहल ने पश्चिम चम्पारण में 10,000 से अधिक पेड़ लगाए हैं। हर पौधा भविष्य की पीढ़ियों के लिए एक वादा है।"
            ),
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop",
            stat: "10K+",
            statLabel: t("Trees Planted", "पेड़ लगाए गए"),
          },
          {
            id: "story-3",
            number: "03",
            title: t("Healthcare for All", "सभी के लिए स्वास्थ्य सेवा"),
            description: t(
              "Free health camps and medical assistance have reached over 5,000 patients in rural areas. Quality healthcare is a right, not a privilege.",
              "मुफ्त स्वास्थ्य शिविर और चिकित्सा सहायता ग्रामीण क्षेत्रों में 5,000 से अधिक रोगियों तक पहुँची है।"
            ),
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
            stat: "5K+",
            statLabel: t("Patients Treated", "रोगियों का इलाज"),
          },
        ]}
        ctaText={t("Explore All Programs", "सभी कार्यक्रम देखें")}
        ctaLink="/programs"
        theme="light"
      />

      {/* ════════════ 01 — CONSISTENT SERVICE ════════════ */}
      <NumberedSection num="01" label={t(s("home.about.h2").en, s("home.about.h2").hi)}>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t(s("home.about.h2").en, s("home.about.h2").hi)}
            </h2>
            <p className="text-lg italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t(s("home.about.lead").en, s("home.about.lead").hi)}
            </p>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: LENITY.muted }}>{t(s("home.about.p1").en, s("home.about.p1").hi)}</p>
            <p className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }}>{t(s("home.about.p2").en, s("home.about.p2").hi)}</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: LENITY.ink }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LENITY.yellow }}>
                <ArrowRight className="w-4 h-4" style={{ color: LENITY.ink }} />
              </span>
              {t(s("home.about.more").en, s("home.about.more").hi)}
            </Link>
          </div>
          <div className="flex justify-center items-start">
            <WaterPortrait src={s("IMG.home.portrait1").img ?? ""} alt={t("A family we serve", "एक परिवार जिसकी हम सेवा करते हैं")}
              blob={LENITY.pinkSoft} className="w-64 h-80" />
          </div>
        </div>
      </NumberedSection>

      {/* ════════════ YELLOW PULL-QUOTE ════════════ */}
      <section className="relative" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2">
          <Fade className="py-2">
            <WaterPortrait src={s("IMG.home.quote").img ?? ""} alt={t("Volunteer in the field", "क्षेत्र में स्वयंसेवक")}
              blob={LENITY.yellowSoft} className="w-full h-72 lg:h-full" />
          </Fade>
          <Fade>
            <div className="p-10 lg:p-14 h-full flex flex-col justify-center" style={{ background: LENITY.yellow }}>
              <Quote className="w-10 h-10 mb-4" style={{ color: LENITY.ink }} />
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-5" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                {t(s("home.quote.text").en, s("home.quote.text").hi)}
              </p>
              <p className="text-sm font-bold mb-7" style={{ color: LENITY.ink }}>{t(s("home.quote.who").en, s("home.quote.who").hi)}</p>
              <button onClick={openDonate}
                className="self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: LENITY.ink }}>
                {t(s("home.quote.donate").en, s("home.quote.donate").hi)} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ════════════ 02 — WHAT WE DO ════════════ */}
      <NumberedSection num="02" label={t(s("home.services.h2").en, s("home.services.h2").hi)} alt>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(s("home.services.h2").en, s("home.services.h2").hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(s("home.services.lead").en, s("home.services.lead").hi)}
        </p>

        <HorizontalCardSlider
          cards={services.map((svc) => {
            const Icon = iconFor(svc.iconName);
            return {
              id: svc.id,
              content: (
                <div className="bg-white rounded-2xl border p-7 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line, height: "280px" }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: LENITY.yellowSoft }}>
                    <Icon className="w-6 h-6" style={{ color: LENITY.ink }} />
                  </span>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(svc.titleEn, svc.titleHi)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: LENITY.muted }}>{t(svc.descEn, svc.descHi)}</p>
                </div>
              ),
            };
          })}
          autoPlay={true}
          autoPlayInterval={4000}
          cardWidth={300}
          gap={24}
        />
      </NumberedSection>

      {/* ════════════ STATS BAND ════════════ */}
      <section className="py-16" style={{ background: LENITY.yellow }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <Fade key={stat.id}>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                <Counter target={stat.value} />
              </div>
              <div className="text-sm font-semibold" style={{ color: LENITY.ink }}>{t(stat.labelEn, stat.labelHi)}</div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ════════════ PARTNERS & SPONSORS ════════════ */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: LENITY.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-14">
            <Eyebrow>{t("Working Together", "मिलकर काम करना")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Our Partners & Sponsors", "हमारे साझेदार और प्रायोजक")}
            </h2>
            <p className="text-base md:text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Grateful for the support of our partners who make our mission possible", "हमारे साझेदारों के समर्थन के लिए आभारी जो हमारे मिशन को संभव बनाते हैं")}
            </p>
          </Fade>

          {/* Associate Partners - Scroll Right to Left */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Associate Partners", "सहयोगी साझेदार")}
            </h3>
            <LogoCarousel
              logos={[
                { id: 1, name: "Tata Trust", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png" },
                { id: 2, name: "Rotary International", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/RotaryInternationalLogo.svg/200px-RotaryInternationalLogo.svg.png" },
                { id: 3, name: "United Way", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/United_Way_Worldwide_logo.svg/200px-United_Way_Worldwide_logo.svg.png" },
                { id: 4, name: "World Vision", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/World_Vision_logo.svg/200px-World_Vision_logo.svg.png" },
                { id: 5, name: "Care International", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CARE_logo.svg/200px-CARE_logo.svg.png" },
                { id: 6, name: "Oxfam", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Oxfam_logo.svg/200px-Oxfam_logo.svg.png" },
                { id: 7, name: "Red Cross", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/American_Red_Cross_logo.svg/200px-American_Red_Cross_logo.svg.png" },
                { id: 8, name: "Save the Children", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Save_the_Children_logo.svg/200px-Save_the_Children_logo.svg.png" },
              ]}
              direction="left"
              speed={30}
            />
          </div>

          {/* Medicine Sponsors - Scroll Left to Right */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Medicine Sponsored By", "दवा प्रायोजित")}
            </h3>
            <LogoCarousel
              logos={[
                { id: 1, name: "Cipla", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Cipla_logo.svg/200px-Cipla_logo.svg.png" },
                { id: 2, name: "Sun Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sun_Pharmaceutical_Logo.svg/200px-Sun_Pharmaceutical_Logo.svg.png" },
                { id: 3, name: "Dr. Reddy's", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dr._Reddy%27s_Laboratories_logo.svg/200px-Dr._Reddy%27s_Laboratories_logo.svg.png" },
                { id: 4, name: "Lupin", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lupin_Limited_Logo.svg/200px-Lupin_Limited_Logo.svg.png" },
                { id: 5, name: "Aurobindo Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Aurobindo_Pharma_logo.svg/200px-Aurobindo_Pharma_logo.svg.png" },
                { id: 6, name: "Torrent Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Torrent_Pharmaceuticals_logo.svg/200px-Torrent_Pharmaceuticals_logo.svg.png" },
              ]}
              direction="right"
              speed={35}
            />
          </div>
        </div>
      </section>

      {/* ════════════ PROGRAMS GRID WITH HOVER EFFECT ════════════ */}
      <ProgramsGrid />

      {/* ════════════ 03 — CHALLENGES & SOLUTIONS (campaigns) ════════════ */}
      <NumberedSection num="03" label={t(s("home.challenges.h2").en, s("home.challenges.h2").hi)}>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(s("home.challenges.h2").en, s("home.challenges.h2").hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(s("home.challenges.lead").en, s("home.challenges.lead").hi)}
        </p>
        <div className="grid md:grid-cols-3 gap-7">
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <Fade key={c.id}>
                <div className="bg-white rounded-2xl border p-7 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="flex items-start justify-between mb-5">
                    <h3 className="font-bold text-base leading-snug flex-1 pr-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(c.titleEn, c.titleHi)}</h3>
                    <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{ color: LENITY.ink, background: LENITY.yellowSoft }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: LENITY.line }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: LENITY.yellow, transition: "width 1.2s ease" }} />
                  </div>
                  <div className="flex justify-between text-sm mb-1" style={{ color: LENITY.muted }}>
                    <span><span className="font-bold" style={{ color: LENITY.ink }}>₹{c.raised.toLocaleString("en-IN")}</span> raised</span>
                    <span className="text-xs">Goal: <span className="font-semibold">₹{c.goal.toLocaleString("en-IN")}</span></span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: LENITY.muted }}>{c.backers} donors</p>
                  <button onClick={openDonate}
                    className="w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-[1.02]"
                    style={{ background: LENITY.yellow, color: LENITY.ink }}>
                    {t(s("home.campaigns.btn").en, s("home.campaigns.btn").hi)}
                  </button>
                </div>
              </Fade>
            );
          })}
        </div>
      </NumberedSection>

      {/* ════════════ HOW YOU CAN HELP ════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: LENITY.yellow }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ background: LENITY.accent, filter: "blur(80px)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Fade className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Join Hands With Us", "हमारे साथ हाथ मिलाएं")}
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: LENITY.ink, opacity: 0.9 }}>
              {t("On our amazing journey of helping others. Your support can transform lives.", "दूसरों की मदद करने की हमारी अद्भुत यात्रा में। आपका समर्थन जीवन बदल सकता है।")}
            </p>
          </Fade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Donate Money */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.yellowSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Donate Money", "पैसे दान करें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Make a financial contribution to support our programs", "हमारे कार्यक्रमों का समर्थन करने के लिए वित्तीय योगदान दें")}
                </p>
                <button onClick={openDonate} className="w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105" style={{ background: LENITY.accent, color: "#fff" }}>
                  {t("Donate Now", "अभी दान करें")}
                </button>
              </div>
            </Fade>

            {/* Volunteer */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.pinkSoft }}>
                  <Users className="w-8 h-8" style={{ color: LENITY.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Volunteer", "स्वयंसेवक बनें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Give your time and skills to make a difference", "बदलाव लाने के लिए अपना समय और कौशल दें")}
                </p>
                <Link href="/volunteer" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Join Us", "हमसे जुड़ें")}
                </Link>
              </div>
            </Fade>

            {/* Sponsor Program */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.yellowSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Sponsor Program", "कार्यक्रम प्रायोजित करें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Support specific initiatives like education or healthcare", "शिक्षा या स्वास्थ्य सेवा जैसी विशिष्ट पहलों का समर्थन करें")}
                </p>
                <Link href="/projects" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Learn More", "और जानें")}
                </Link>
              </div>
            </Fade>

            {/* Corporate Partnership */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.pinkSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Corporate Partnership", "कॉर्पोरेट साझेदारी")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Partner with us for CSR initiatives and social impact", "सीएसआर पहल और सामाजिक प्रभाव के लिए हमारे साथ साझेदार बनें")}
                </p>
                <Link href="/contact" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Contact Us", "संपर्क करें")}
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS / IMPACT STORIES ════════════ */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-14">
            <Eyebrow>{t("Real Impact", "वास्तविक प्रभाव")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Stories of Hope & Change", "आशा और परिवर्तन की कहानियाँ")}
            </h2>
            <p className="text-base md:text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Hear from the lives we've touched and the communities we've transformed", "उन जीवनों से सुनें जिन्हें हमने छुआ है और उन समुदायों से जिन्हें हमने बदला है")}
            </p>
          </Fade>

          <TestimonialCarousel
            testimonials={[
              {
                id: 1,
                quote: t(
                  "Hariwatika helped my daughter get scholarships for her education. Today she is a teacher helping other children. Forever grateful.",
                  "हरिवाटिका ने मेरी बेटी को उसकी शिक्षा के लिए छात्रवृत्ति प्राप्त करने में मदद की। आज वह एक शिक्षिका है जो अन्य बच्चों की मदद कर रही है। हमेशा आभारी।"
                ),
                name: t("Rekha Devi", "रेखा देवी"),
                location: t("Parent, Bettiah", "अभिभावक, बेतिया"),
                image: s("IMG.avatar").img ?? "",
              },
              {
                id: 2,
                quote: t(
                  "During the flood, Hariwatika was the first to reach our village with food and medicine. They saved many lives including my family.",
                  "बाढ़ के दौरान, हरिवाटिका भोजन और दवा के साथ हमारे गांव पहुंचने वाला पहला था। उन्होंने मेरे परिवार सहित कई जीवन बचाए।"
                ),
                name: t("Ramesh Kumar", "रमेश कुमार"),
                location: t("Farmer, West Champaran", "किसान, पश्चिम चम्पारण"),
                image: s("IMG.avatar").img ?? "",
              },
              {
                id: 3,
                quote: t(
                  "The free health camp organized by Hariwatika diagnosed my illness early. Their support for treatment gave me a second chance at life.",
                  "हरिवाटिका द्वारा आयोजित मुफ्त स्वास्थ्य शिविर ने मेरी बीमारी का जल्दी निदान किया। उनके उपचार समर्थन ने मुझे जीवन का दूसरा मौका दिया।"
                ),
                name: t("Sunita Singh", "सुनीता सिंह"),
                location: t("Village Elder", "गांव की बुजुर्ग"),
                image: s("IMG.avatar").img ?? "",
              },
            ]}
            autoPlay={true}
            interval={5000}
          />
        </div>
      </section>

      {/* ════════════ 04 — PILLARS + BLOG ════════════ */}
      <NumberedSection num="04" label={t(s("home.blog.h2").en, s("home.blog.h2").hi)} alt>
        {/* pillars row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => {
            const Icon = iconFor(p.iconName);
            return (
              <Fade key={p.id}>
                <div className="text-center">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: LENITY.yellowSoft }}>
                    <Icon className="w-7 h-7" style={{ color: LENITY.ink }} />
                  </span>
                  <h3 className="font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(p.titleEn, p.titleHi)}</h3>
                  <p className="text-xs mt-1" style={{ color: LENITY.muted }}>{t(p.descEn, p.descHi)}</p>
                </div>
              </Fade>
            );
          })}
        </div>

        {/* blog header */}
        <Fade className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(s("home.blog.h2").en, s("home.blog.h2").hi)}</h2>
            <p className="text-lg italic mt-1" style={{ fontFamily: SERIF, color: LENITY.muted }}>{t(s("home.blog.lead").en, s("home.blog.lead").hi)}</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
            {t(s("home.blog.all").en, s("home.blog.all").hi)} <ArrowRight className="w-4 h-4" />
          </Link>
        </Fade>
        <div className="grid md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <Fade key={post.titleEn}>
              <div className="bg-white rounded-2xl border overflow-hidden h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="h-48 relative overflow-hidden">
                  <img src={post.img} alt={t(post.titleEn, post.titleHi)} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1" style={{ background: LENITY.yellow, color: LENITY.ink }}>
                    {t(post.catEn, post.catHi)}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px]" style={{ color: LENITY.muted }}>{post.date}</span>
                  <h3 className="font-bold text-base leading-snug my-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(post.titleEn, post.titleHi)}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: LENITY.muted }}>{t(post.excerptEn, post.excerptHi)}</p>
                  <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: LENITY.ink }}>
                    {t(s("home.blog.more").en, s("home.blog.more").hi)} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </NumberedSection>
    </>
  );
}
```

- [ ] **Step 2: Rewrite `src/app/page.tsx` as an async Server Component**

Replace the entire file with:

```tsx
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/content";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, stats, campaigns, pillars, settings] = await Promise.all([
    prisma.homeService.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeCampaign.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homePillar.findMany({ orderBy: { sortOrder: "asc" } }),
    getSettings(["home", "image"]),
  ]);

  return (
    <HomeContent
      services={services}
      stats={stats}
      campaigns={campaigns}
      pillars={pillars}
      settings={settings}
    />
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors referencing `page.tsx` or `HomeContent.tsx`.

- [ ] **Step 4: Manual verification — DB content renders**

```bash
curl -s http://localhost:3000/ | grep -o "Mass Marriage Ceremony 2025"
curl -s http://localhost:3000/ | grep -o "Vivah Seva"
```
Expected: both commands print a match — confirms the homepage is now rendering `HomeCampaign`/`HomeService` rows from the DB, not the old hardcoded "Clean Water for 50 Villages" / "Shiksha Seva" content.

- [ ] **Step 5: Manual verification — admin edit reflects live**

1. Open `http://localhost:3000/admin/content/home` in a browser (log in with the admin password if prompted).
2. Edit any `Stats` row's "Value" field (e.g. change `3000+` to `3001+`) and save.
3. Reload `http://localhost:3000/` and confirm the new number appears in the stats band.
4. Revert the value back afterward so the demo data stays clean.

- [ ] **Step 6: Commit**

```bash
git add src/app/HomeContent.tsx src/app/page.tsx
git commit -m "feat: wire home page to DB-backed stats/services/campaigns/pillars/settings"
```

---

## Task 3: Add a LinkedIn placeholder to the SocialLink seed source

**Files:**
- Modify: `prisma/seed.ts:521-528` (the `socialLink.createMany` call)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by other tasks — this is a leaf task, safe to do independently.

- [ ] **Step 1: Add a LinkedIn row to the seed source**

In `prisma/seed.ts`, find:

```ts
  await prisma.socialLink.createMany({
    data: [
      { platform: "Facebook", url: "https://facebook.com", sortOrder: 0 },
      { platform: "Instagram", url: "https://instagram.com", sortOrder: 1 },
      { platform: "YouTube", url: "https://youtube.com", sortOrder: 2 },
      { platform: "WhatsApp", url: "https://wa.me/919473331919", sortOrder: 3 },
    ],
  });
```

Replace with:

```ts
  await prisma.socialLink.createMany({
    data: [
      { platform: "Facebook", url: "https://facebook.com", sortOrder: 0 },
      { platform: "Instagram", url: "https://instagram.com", sortOrder: 1 },
      { platform: "YouTube", url: "https://youtube.com", sortOrder: 2 },
      { platform: "WhatsApp", url: "https://wa.me/919473331919", sortOrder: 3 },
      { platform: "LinkedIn", url: "https://linkedin.com", sortOrder: 4 },
    ],
  });
```

- [ ] **Step 2: Do NOT run the seed script against the live database**

`prisma/seed.ts` opens with a `prisma.$transaction([...deleteMany()...])` that wipes nearly every table before reinserting. Running `tsx prisma/seed.ts` now would destroy any real data added since the last seed (donations, submissions, admin panel edits from Task 2's Step 5, etc.). This edit only affects *future* fresh seeds (new environments, or a deliberate reset the user explicitly asks for).

Instead, add the LinkedIn row to the **current** database through the admin UI that already exists for this exact purpose:
1. Go to `/admin/nav` (log in if prompted).
2. Find the "Social Link" manager (`CrudManager` for `socialLink`, per `src/app/admin/(dash)/nav/page.tsx:43`).
3. Add a new row: platform `LinkedIn`, URL `https://linkedin.com` (or the NGO's real LinkedIn URL if the client has provided one by then), sort order `4`.

- [ ] **Step 3: Verify the seed file still type-checks and commit**

```bash
npx tsc --noEmit
git add prisma/seed.ts
git commit -m "chore: add LinkedIn to social link seed data"
```
