"use client"

import Link from "next/link"
import { Cat } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { FooterCats } from "@/components/molecules/FooterCats"

/**
 * Footer organism.
 * Displays the footer with copyright info and links.
 */
export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="border-t bg-background relative">
            <FooterCats />
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Cat className="h-6 w-6 text-primary" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        {t.footer.builtBy}{" "}
                        <a
                            href="https://jlgdev.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            JLGDev.
                        </a>
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/terms" className="text-sm text-muted-foreground hover:underline">{t.footer.terms}</Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">{t.footer.privacy}</Link>
                </div>
            </div>
        </footer>
    )
}
