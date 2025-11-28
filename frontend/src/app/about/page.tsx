"use client"

import { MainLayout } from "@/components/templates/MainLayout"
import { Typography } from "@/components/atoms/Typography"
import { Cat } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { MotionWrapper } from "@/components/atoms/MotionWrapper"
import { motion } from "framer-motion"

export default function AboutPage() {
    const { t } = useLanguage()

    return (
        <MainLayout>
            <div className="container mx-auto py-12 max-w-3xl">
                <MotionWrapper>
                    <div className="text-center mb-12">
                        <Typography variant="h1" className="mb-4">
                            {t.about.title}
                        </Typography>
                        <Typography variant="lead" className="text-muted-foreground">
                            {t.about.subtitle}
                        </Typography>
                    </div>
                </MotionWrapper>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <MotionWrapper delay={0.2}>
                        <p>
                            {t.about.p1}
                        </p>
                    </MotionWrapper>
                    <MotionWrapper delay={0.3}>
                        <p>
                            {t.about.p2}
                        </p>
                    </MotionWrapper>

                    <MotionWrapper delay={0.4}>
                        <div className="flex items-center justify-center my-12">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <Cat className="h-24 w-24 text-primary" />
                            </motion.div>
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.5}>
                        <Typography variant="h2">{t.about.teamTitle}</Typography>
                        <p>
                            {t.about.teamDesc}
                        </p>
                    </MotionWrapper>
                </div>
            </div>
        </MainLayout>
    )
}
