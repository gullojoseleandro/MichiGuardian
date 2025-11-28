"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Copy, Check } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function PasswordGenerator({ onGenerate }: { onGenerate?: (password: string) => void }) {
    const { t } = useLanguage()
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [copied, setCopied] = useState(false)

    const generatePassword = () => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numbers = "0123456789"
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

        let chars = lowercase
        if (includeUppercase) chars += uppercase
        if (includeNumbers) chars += numbers
        if (includeSymbols) chars += symbols

        let password = ""
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        setGeneratedPassword(password)
        if (onGenerate) onGenerate(password)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPassword)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{t.generator.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-2">
                    <Input value={generatedPassword} readOnly placeholder={t.generator.placeholder} />
                    <Button variant="outline" size="icon" onClick={generatePassword}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCopy} disabled={!generatedPassword}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>{t.generator.length}: {length}</Label>
                    </div>
                    <Slider
                        value={[length]}
                        onValueChange={(value) => setLength(value[0])}
                        min={8}
                        max={32}
                        step={1}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label htmlFor="uppercase">{t.generator.uppercase}</Label>
                    <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="numbers">{t.generator.numbers}</Label>
                    <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="symbols">{t.generator.symbols}</Label>
                    <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                </div>
            </CardContent>
        </Card>
    )
}
