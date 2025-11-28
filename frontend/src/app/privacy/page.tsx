"use client"

import { MainLayout } from "@/components/templates/MainLayout"
import { Typography } from "@/components/atoms/Typography"
import { useLanguage } from "@/components/providers/LanguageProvider"

export default function PrivacyPage() {
    const { t } = useLanguage()

    return (
        <MainLayout>
            <div className="container mx-auto py-12 max-w-3xl">
                <Typography variant="h1" className="mb-8">{t.privacy.title}</Typography>

                <div className="space-y-6 text-muted-foreground">
                    <p>{t.privacy.lastUpdated}</p>

                    <Typography variant="h3" className="text-foreground">{t.privacy.collectionTitle}</Typography>
                    <p>
                        {t.privacy.collectionDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.privacy.useTitle}</Typography>
                    <p>
                        {t.privacy.useDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.privacy.securityTitle}</Typography>
                    <p>
                        {t.privacy.securityDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.privacy.zeroKnowledgeTitle}</Typography>
                    <p>
                        {t.privacy.zeroKnowledgeDesc}
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}
