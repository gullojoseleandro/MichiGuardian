"use client"

import * as React from "react"
import { dictionaries, Language } from "@/lib/i18n/dictionaries"

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
    t: typeof dictionaries["en"]
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = React.useState<Language>("en")

    const t = dictionaries[language]

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = React.useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
