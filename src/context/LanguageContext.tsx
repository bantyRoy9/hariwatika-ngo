"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "hi";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "hi",
  toggle: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = useCallback(() => {
    setLang((l) => (l === "hi" ? "en" : "hi"));
  }, []);

  const t = useCallback(
    (en: string, hi: string) => (lang === "hi" ? hi : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
