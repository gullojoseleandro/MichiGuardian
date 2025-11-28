import { MainLayout } from "@/components/templates/MainLayout"
import { LoginForm } from "@/components/organisms/LoginForm"

export default function LoginPage() {
    return (
        <MainLayout>
            <div className="flex h-[calc(100vh-theme(spacing.14))] items-center justify-center py-12">
                <LoginForm />
            </div>
        </MainLayout>
    )
}
