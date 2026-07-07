import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNavLinks, getSocialLinks, getSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [navbarLinks, footerQuickLinks, footerLegalLinks, socialLinks, settings] = await Promise.all([
    getNavLinks("navbar"),
    getNavLinks("footer-quick"),
    getNavLinks("footer-legal"),
    getSocialLinks(),
    getSettings(["bank", "contact"]),
  ]);

  return (
    <>
      <Navbar navLinks={navbarLinks} socialLinks={socialLinks} />
      {children}
      <Footer quickLinks={footerQuickLinks} legalLinks={footerLegalLinks} socialLinks={socialLinks} settings={settings} />
    </>
  );
}
