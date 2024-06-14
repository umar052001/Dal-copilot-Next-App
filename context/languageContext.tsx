"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface languageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const languageContext = createContext<languageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");
  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      {children}
    </languageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(languageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}