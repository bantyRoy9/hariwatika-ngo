import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ParallaxProvider from "@/components/ParallaxProvider";
import ScrollProgress from "@/components/ScrollProgress";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300;0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col noise-texture"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <LanguageProvider>
          {/* Thin gradient progress bar at the very top */}
          <ScrollProgress />
          {/* Global ambient canvas + mouse/scroll CSS vars */}
          <ParallaxProvider>
            {children}
          </ParallaxProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
