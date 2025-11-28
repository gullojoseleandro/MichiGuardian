"use client"

import { MainLayout } from "@/components/templates/MainLayout"
import { Typography } from "@/components/atoms/Typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Shield, Lock, Zap, Eye, Key, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { MotionWrapper } from "@/components/atoms/MotionWrapper"
import { motion } from "framer-motion"

export default function FeaturesPage() {
    const { t } = useLanguage()

    const features = [
        {
            title: t.features.encryptionTitle,
            description: t.features.encryptionDesc,
            icon: <Shield className="h-10 w-10 text-primary" />,
        },
        {
            title: t.features.zeroKnowledgeTitle,
            description: t.features.zeroKnowledgeDesc,
            icon: <Eye className="h-10 w-10 text-primary" />,
        },
        {
            title: t.features.speedTitle,
            description: t.features.speedDesc,
            icon: <Zap className="h-10 w-10 text-primary" />,
        },
        {
            title: t.features.biometricTitle,
            description: t.features.biometricDesc,
            icon: <Key className="h-10 w-10 text-primary" />,
        },
        {
            title: t.features.breachMonitoringTitle,
            description: t.features.breachMonitoringDesc,
            icon: <AlertTriangle className="h-10 w-10 text-primary" />,
        },
        {
            title: t.features.sharingTitle,
            description: t.features.sharingDesc,
            icon: <Lock className="h-10 w-10 text-primary" />,
        },
    ]

    return (
        <MainLayout>
            <div className="container mx-auto py-12">
                <MotionWrapper>
                    <div className="text-center mb-12">
                        <Typography variant="h1" className="mb-4">
                            {t.features.title}
                        </Typography>
                        <Typography variant="lead" className="text-muted-foreground">
                            {t.features.subtitle}
                        </Typography>
                    </div>
                </MotionWrapper>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <MotionWrapper key={index} delay={index * 0.1}>
                            <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                                <Card className="border-2 hover:border-primary/50 transition-colors h-full">
                                    <CardHeader>
                                        <div className="mb-4">{feature.icon}</div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
