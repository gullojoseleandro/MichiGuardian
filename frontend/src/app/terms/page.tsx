"use client"

import { MainLayout } from "@/components/templates/MainLayout"
import { Typography } from "@/components/atoms/Typography"
import { useLanguage } from "@/components/providers/LanguageProvider"

export default function TermsPage() {
    const { t } = useLanguage()

    return (
        <MainLayout>
            <div className="container mx-auto py-12 max-w-3xl">
                <Typography variant="h1" className="mb-8">{t.terms.title}</Typography>

                <div className="space-y-6 text-muted-foreground">
                    <p>{t.terms.lastUpdated}</p>

                    <Typography variant="h3" className="text-foreground">{t.terms.acceptanceTitle}</Typography>
                    <p>
                        {t.terms.acceptanceDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.terms.licenseTitle}</Typography>
                    <p>
                        {t.terms.licenseDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.terms.disclaimerTitle}</Typography>
                    <p>
                        {t.terms.disclaimerDesc}
                    </p>

                    <Typography variant="h3" className="text-foreground">{t.terms.limitationsTitle}</Typography>
                    <p>
                        {t.terms.limitationsDesc}
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}
