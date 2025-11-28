"use client"

import * as React from "react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { Language } from "@/lib/i18n/dictionaries"
import { useTheme } from "next-themes"

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage()
    const { theme } = useTheme()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as Language)
        localStorage.setItem("language", event.target.value)
    }

    return (
        <select
            value={language}
            onChange={handleChange}
            className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <option className={`${theme === "dark" ? "bg-black" : "bg-white"}`} value="en">🇺🇸 English</option>
            <option className={`${theme === "dark" ? "bg-black" : "bg-white"}`} value="es">🇪🇸 Español</option>
            <option className={`${theme === "dark" ? "bg-black" : "bg-white"}`} value="pt">🇧🇷 Português</option>
            <option className={`${theme === "dark" ? "bg-black" : "bg-white"}`} value="fr">🇫🇷 Français</option>
        </select>
    )
}
