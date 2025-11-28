"use client"


import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavbarItemProps {
    href: string
    children: React.ReactNode
    className?: string
}

/**
 * NavbarItem molecule.
 * Renders a navigation link that highlights when active.
 * Uses `usePathname` to determine the active state.
 */
export function NavbarItem({ href, children, className }: NavbarItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-foreground" : "text-muted-foreground",
                className
            )}
        >
            {children}
        </Link>
    )
}
