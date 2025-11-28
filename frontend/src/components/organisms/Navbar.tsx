"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { NavbarItem } from "@/components/molecules/NavbarItem"
import { ModeToggle } from "@/components/molecules/ModeToggle"
import { LanguageSelector } from "@/components/molecules/LanguageSelector"
import { Cat } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { useTheme } from "next-themes"

export function Navbar() {
    const { t } = useLanguage()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { theme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-0">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Cat className="h-6 w-6 text-primary" />
                        <span className="font-bold inline-block">
                            MichiGuardian
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <NavbarItem href="/features">{t.nav.features}</NavbarItem>
                        <NavbarItem href="/pricing">{t.nav.pricing}</NavbarItem>
                        <NavbarItem href="/about">{t.nav.about}</NavbarItem>
                    </nav>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-2">
                    <LanguageSelector />
                    <ModeToggle />
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            {t.nav.login}
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">{t.nav.getStarted}</Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center space-x-4">
                    <ModeToggle />
                    <button
                        className="p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className={`md:hidden border-t ${theme === 'dark' ? 'bg-black/90' : 'bg-white/90'} p-4 space-y-4 shadow-lg absolute w-full left-0 top-14 z-50`}>
                    <nav className="flex flex-col space-y-4">
                        <Link href="/features" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            {t.nav.features}
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            {t.nav.pricing}
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            {t.nav.about}
                        </Link>
                    </nav>
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Language</span>
                            <LanguageSelector />
                        </div>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="ghost" size="sm" className="w-full border rounded-none">
                                {t.nav.login}
                            </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button size="sm" className="w-full border rounded-none">
                                {t.nav.getStarted}
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
