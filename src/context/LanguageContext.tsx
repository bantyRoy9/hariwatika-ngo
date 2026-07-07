"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "hi";

export type TranslationMap = Record<string, { en: string; hi: string }>;

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (en: string, hi: string) => string;
  /** Resolve a Translation key (form labels etc.) for the current language. Falls back to the key. */
  tk: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "hi",
  toggle: () => {},
  t: (en) => en,
  tk: (key) => key,
});

export function LanguageProvider({
  children,
  translations = {},
}: {
  children: ReactNode;
  translations?: TranslationMap;
}) {
  const [lang, setLang] = useState<Lang>("hi");

  const toggle = useCallback(() => {
    setLang((l) => (l === "hi" ? "en" : "hi"));
  }, []);

  const t = useCallback((en: string, hi: string) => (lang === "hi" ? hi : en), [lang]);

  const tk = useCallback(
    (key: string) => {
      const row = translations[key];
      if (!row) return key;
      return lang === "hi" ? row.hi || row.en : row.en;
    },
    [lang, translations],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, tk }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
