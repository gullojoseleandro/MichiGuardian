"use client"

import Link from "next/link"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { MotionWrapper, MotionScale } from "@/components/atoms/MotionWrapper"
import { motion } from "framer-motion"

/**
 * Hero organism.
 * Main landing page section with headline, description, and call-to-action buttons.
 */
export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="flex items-center space-y-6 min-h-[calc(100dvh-4rem)]">
            <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <MotionWrapper delay={0.2}>
                    <Typography variant="h1" className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {t.hero.title}
                    </Typography>
                </MotionWrapper>

                <MotionWrapper delay={0.3}>
                    <Typography variant="lead" className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        {t.hero.description}
                    </Typography>
                </MotionWrapper>

                <MotionScale delay={0.4}>
                    <Link href="/login">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                            <Button className={'border rounded-none cursor-pointer'} size="lg">{t.hero.getStarted}</Button>
                        </motion.div>
                    </Link>
                </MotionScale>
            </div>
        </section>
    )
}
