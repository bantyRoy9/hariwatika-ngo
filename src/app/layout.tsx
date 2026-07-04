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
