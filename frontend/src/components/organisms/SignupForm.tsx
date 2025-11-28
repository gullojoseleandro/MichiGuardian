"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/Card"
import { FormField } from "@/components/molecules/FormField"
import Link from "next/link"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

/**
 * SignupForm organism.
 * Handles user registration.
 */
export function SignupForm() {
    const { t } = useLanguage()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Mock registration delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsLoading(false)
        router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{t.signup.title}</CardTitle>
                    <CardDescription>
                        {t.signup.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <FormField
                        id="email"
                        label={t.signup.emailLabel}
                        type="email"
                        placeholder={t.signup.emailPlaceholder}
                        required
                    />
                    <FormField
                        id="password"
                        label={t.signup.passwordLabel}
                        type="password"
                        placeholder={t.signup.passwordPlaceholder}
                        required
                    />
                    <FormField
                        id="confirm-password"
                        label={t.signup.confirmPasswordLabel}
                        type="password"
                        placeholder={t.signup.confirmPasswordPlaceholder}
                        required
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t.signup.submit}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        {t.signup.hasAccount}{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                            {t.signup.login}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}
