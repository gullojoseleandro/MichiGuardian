"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Input } from "@/components/atoms/Input"
import { Typography } from "@/components/atoms/Typography"
import { Plus, Search, Copy, PawPrint, Check, Trash2, Edit, Save, X, Share2, ShieldAlert } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PasswordGenerator } from "@/components/molecules/PasswordGenerator"
import { useTheme } from "next-themes"
import CryptoJS from "crypto-js"

interface PasswordEntry {
    id: number
    name: string
    username: string
    password?: string // Encrypted
}

// Mock Master Key (In a real app, this would be derived from the user's master password)
const MASTER_KEY = "michi-secret-key-123"

export function Vault() {
    const { t } = useLanguage()
    const { theme } = useTheme()
    const [searchQuery, setSearchQuery] = useState("")
    const [passwords, setPasswords] = useState<PasswordEntry[]>([])
    const [copiedId, setCopiedId] = useState<number | null>(null)
    const [sharedId, setSharedId] = useState<number | null>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [showGenerator, setShowGenerator] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [breachAlert, setBreachAlert] = useState(false)

    // Form state
    const [formData, setFormData] = useState({ name: "", username: "", password: "" })

    // Load initial data (mock)
    useEffect(() => {
        const initialData = [
            { id: 1, name: "Google", username: "michi@gmail.com", password: encryptPassword("password123") },
            { id: 2, name: "GitHub", username: "michicoder", password: encryptPassword("gitcat2025") },
            { id: 3, name: "Netflix", username: "moviecat", password: encryptPassword("chill&purr") },
        ]
        setPasswords(initialData)

        // Simulate Breach Monitoring Check
        setTimeout(() => {
            setBreachAlert(true)
        }, 5000)
    }, [])

    const encryptPassword = (password: string) => {
        return CryptoJS.AES.encrypt(password, MASTER_KEY).toString()
    }

    const decryptPassword = (encryptedPassword?: string) => {
        if (!encryptedPassword) return ""
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedPassword, MASTER_KEY)
            return bytes.toString(CryptoJS.enc.Utf8)
        } catch (e) {
            return "Error decrypting"
        }
    }

    const filteredPasswords = passwords.filter(pwd =>
        pwd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwd.username.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCopy = (id: number, encryptedPassword?: string) => {
        const decrypted = decryptPassword(encryptedPassword)
        navigator.clipboard.writeText(decrypted)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const handleShare = (id: number) => {
        // Mock sharing functionality
        const link = `https://michiguardian.com/share/${Math.random().toString(36).substring(7)}`
        navigator.clipboard.writeText(link)
        setSharedId(id)
        setTimeout(() => setSharedId(null), 2000)
    }

    const handleDelete = (id: number) => {
        setPasswords(passwords.filter(p => p.id !== id))
    }

    const handleSave = () => {
        const encrypted = encryptPassword(formData.password)
        if (editingId) {
            setPasswords(passwords.map(p => p.id === editingId ? { ...p, ...formData, password: encrypted } : p))
            setEditingId(null)
        } else {
            const newId = Math.max(...passwords.map(p => p.id), 0) + 1
            setPasswords([...passwords, { id: newId, ...formData, password: encrypted }])
            setIsAddOpen(false)
        }
        setFormData({ name: "", username: "", password: "" })
    }

    const startEdit = (pwd: PasswordEntry) => {
        setEditingId(pwd.id)
        const decrypted = decryptPassword(pwd.password)
        setFormData({ name: pwd.name, username: pwd.username, password: decrypted })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="h2">{t.dashboard.title}</Typography>
                    <Typography variant="p" className="text-muted-foreground">
                        {t.dashboard.description}
                    </Typography>
                </div>
                <Dialog open={isAddOpen} onOpenChange={(open) => {
                    setIsAddOpen(open)
                    if (!open) setShowGenerator(false) // Reset on close
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setFormData({ name: "", username: "", password: "" })}>
                            <Plus className="mr-2 h-4 w-4" />
                            {t.dashboard.addPassword}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] ${theme === "dark" ? "bg-black" : "bg-white"} text-foreground border max-w-[95vw] max-h-[85vh] overflow-y-auto`}>
                        <DialogHeader>
                            <DialogTitle>{t.dashboard.addPassword}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t.dashboard.nameLabel}</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">{t.dashboard.usernameLabel}</Label>
                                <Input id="username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">{t.dashboard.passwordLabel}</Label>
                                <div className="flex gap-2">
                                    <Input id="password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                    <Button variant={showGenerator ? "default" : "outline"} size="icon" onClick={() => setShowGenerator(!showGenerator)}>
                                        <PawPrint className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <AnimatePresence>
                                {showGenerator && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <PasswordGenerator onGenerate={(pwd) => setFormData(prev => ({ ...prev, password: pwd }))} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddOpen(false)}>{t.dashboard.cancel}</Button>
                            <Button onClick={handleSave}>{t.dashboard.save}</Button>
                        </div>
                    </DialogContent>
                </Dialog >
            </div >

            <AnimatePresence>
                {breachAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg flex items-center gap-3"
                    >
                        <ShieldAlert className="h-5 w-5" />
                        <span className="font-medium">Breach Alert: Your "Netflix" password was found in a data leak! Change it meow! 😿</span>
                        <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setBreachAlert(false)}><X className="h-4 w-4" /></Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={t.dashboard.searchPlaceholder}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredPasswords.map((pwd) => (
                        <motion.div
                            key={pwd.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                        >
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full relative overflow-hidden">
                                {editingId === pwd.id ? (
                                    <div className="p-4 space-y-2 bg-muted/50 h-full">
                                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
                                        <Input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="Username" />
                                        <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                                            <Button size="sm" onClick={handleSave}><Save className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {pwd.name}
                                            </CardTitle>
                                            <PawPrint className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold truncate">{pwd.username}</div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                ************
                                            </p>
                                            <div className="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" onClick={() => startEdit(pwd)} title="Edit">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleShare(pwd.id)} title="Share Securely">
                                                    {sharedId === pwd.id ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(pwd.id)} title="Delete">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8"
                                                    onClick={() => handleCopy(pwd.id, pwd.password)}
                                                >
                                                    {copiedId === pwd.id ? (
                                                        <>
                                                            <Check className="mr-2 h-3 w-3 text-green-500" />
                                                            <span className="text-green-500">{t.dashboard.copied}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="mr-2 h-3 w-3" />
                                                            {t.dashboard.copy}
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div >
    )
}
