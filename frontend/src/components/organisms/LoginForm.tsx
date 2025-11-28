"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/Card"
import { FormField } from "@/components/molecules/FormField"
import Link from "next/link"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { useRouter } from "next/navigation"
import { Loader2, Fingerprint } from "lucide-react"

/**
 * LoginForm organism.
 * Handles user authentication.
 */
export function LoginForm() {
    const { t } = useLanguage()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Mock authentication delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsLoading(false)
        router.push("/dashboard")
    }

    const handleBiometricLogin = async () => {
        setIsLoading(true)
        // Simulate WebAuthn / Biometric delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{t.login.title}</CardTitle>
                    <CardDescription>
                        {t.login.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <FormField
                        id="email"
                        label={t.login.emailLabel}
                        type="email"
                        placeholder={t.login.emailPlaceholder}
                        required
                    />
                    <FormField
                        id="password"
                        label={t.login.passwordLabel}
                        type="password"
                        placeholder={t.login.passwordPlaceholder}
                        required
                    />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" type="button" onClick={handleBiometricLogin} disabled={isLoading}>
                        <Fingerprint className="mr-2 h-4 w-4" />
                        Biometrics
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t.login.submit}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        {t.login.noAccount}{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                            {t.login.signUp}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}
