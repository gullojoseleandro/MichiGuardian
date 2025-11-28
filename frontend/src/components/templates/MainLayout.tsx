import { Navbar } from "@/components/organisms/Navbar"
import { Footer } from "@/components/organisms/Footer"

/**
 * MainLayout template.
 * Wraps pages with the standard Navbar and Footer.
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Navbar />
            <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
            <Footer />
        </div>
    )
}
