"use client"

import { MainLayout } from "@/components/templates/MainLayout"
import { Typography } from "@/components/atoms/Typography"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Check } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { MotionWrapper, MotionScale } from "@/components/atoms/MotionWrapper"
import { motion } from "framer-motion"

export default function PricingPage() {
    const { t } = useLanguage()

    const tiers = [
        {
            name: t.pricing.strayCat.name,
            price: "$0",
            description: t.pricing.strayCat.description,
            features: t.pricing.strayCat.features,
            buttonText: t.pricing.strayCat.button,
            variant: "outline" as const,
        },
        {
            name: t.pricing.houseCat.name,
            price: "$5",
            description: t.pricing.houseCat.description,
            features: t.pricing.houseCat.features,
            buttonText: t.pricing.houseCat.button,
            variant: "default" as const,
        },
        {
            name: t.pricing.lionKing.name,
            price: "$15",
            description: t.pricing.lionKing.description,
            features: t.pricing.lionKing.features,
            buttonText: t.pricing.lionKing.button,
            variant: "outline" as const,
        },
    ]

    return (
        <MainLayout>
            <div className="container mx-auto py-12">
                <MotionWrapper>
                    <div className="text-center mb-12">
                        <Typography variant="h1" className="mb-4">
                            {t.pricing.title}
                        </Typography>
                        <Typography variant="lead" className="text-muted-foreground">
                            {t.pricing.subtitle}
                        </Typography>
                    </div>
                </MotionWrapper>
                <div className="grid gap-8 md:grid-cols-3">
                    {tiers.map((tier, index) => (
                        <MotionScale key={index} delay={index * 0.1 + 0.2}>
                            <motion.div whileHover={{ scale: 1.02 }} className="h-full">
                                <Card className={`flex flex-col h-full ${index === 1 ? 'border-primary shadow-lg' : ''}`}>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{tier.name}</CardTitle>
                                        <CardDescription>{tier.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="text-4xl font-bold mb-6">{tier.price}<span className="text-sm font-normal text-muted-foreground">{t.pricing.month}</span></div>
                                        <ul className="space-y-2">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-center">
                                                    <Check className="h-4 w-4 text-primary mr-2" />
                                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant={tier.variant}>{tier.buttonText}</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </MotionScale>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
